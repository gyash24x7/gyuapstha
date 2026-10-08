/**
 * Site-wide particle background: a slowly turning 3D cloud of dots, projected onto one fixed
 * 2D canvas behind every page. Plain canvas, no three.js, so it costs almost nothing to load.
 *
 * It drifts with the pointer, turns a little as the window scrolls and, in paged mode, pushes
 * toward you or away on each page flip (the "pagechange" event from scripts/pages.ts).
 * Under prefers-reduced-motion it draws one still frame.
 */

interface Particle {
	x: number;
	y: number;
	z: number;
	marigold: boolean;
}

/** Dots per square pixel of viewport, capped */
const DENSITY = 1 / 2600;
const MAX_PARTICLES = 640;
/** The cloud's shorter half-extent, in cloud units; the longer one follows the viewport's aspect ratio */
const BASE_EXTENT = 1.7;

const seededRandom = ( seed: number ) => () => {
	seed |= 0;
	seed = seed + 0x6d2b79f5 | 0;
	let t = Math.imul( seed ^ seed >>> 15, 1 | seed );
	t = t + Math.imul( t ^ t >>> 7, 61 | t ) ^ t;
	return ( ( t ^ t >>> 14 ) >>> 0 ) / 4294967296;
};

export const mountParticles = ( canvas: HTMLCanvasElement ) => {
	const ctx = canvas.getContext( "2d" );
	if ( !ctx ) {
		return;
	}
	const reducedMotion = window.matchMedia( "(prefers-reduced-motion: reduce)" );

	let width = 0;
	let height = 0;
	let particles: Particle[] = [];
	// Cloud shape and camera, recomputed for the viewport on resize
	let radius = 1;
	let halfHeight = 1;
	let camera = 1;
	let focal = 1;
	let colors = { marigold: "#fca311", muted: "#55546f" };

	const readColors = () => {
		const style = getComputedStyle( document.documentElement );
		colors = {
			marigold: style.getPropertyValue( "--marigold" ).trim() || colors.marigold,
			muted: style.getPropertyValue( "--ink-muted" ).trim() || colors.muted
		};
	};

	// Points spread evenly through an upright cylinder as wide as the viewport, so they reach every
	// edge and keep doing so as it turns. The camera sits outside it, framing its middle to fill the
	// screen: its radius projects to just past the sides, its half-height to just past top and bottom
	const seed = () => {
		const random = seededRandom( 7 );
		const aspect = width / height;
		radius = BASE_EXTENT * Math.max( 1, aspect );
		halfHeight = BASE_EXTENT * Math.max( 1, 1 / aspect );
		camera = radius + 1.2;
		focal = height * .58 * camera / halfHeight;

		const count = Math.min( MAX_PARTICLES, Math.round( width * height * DENSITY ) );
		particles = Array.from( { length: count }, () => {
			const r = radius * Math.sqrt( random() );
			const theta = random() * Math.PI * 2;
			return {
				x: r * Math.cos( theta ),
				y: ( random() * 2 - 1 ) * halfHeight * 1.1,
				z: r * Math.sin( theta ),
				marigold: random() < .65
			};
		} );
	};

	const resize = () => {
		const ratio = Math.min( window.devicePixelRatio, 2 );
		width = window.innerWidth;
		height = window.innerHeight;
		canvas.width = Math.round( width * ratio );
		canvas.height = Math.round( height * ratio );
		ctx.setTransform( ratio, 0, 0, ratio, 0, 0 );
		seed();
	};

	// Motion state, each eased toward its target every frame
	let spin = 0;
	const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
	let dolly = 0;
	let dollyTarget = 0;

	const draw = () => {
		ctx.clearRect( 0, 0, width, height );

		const yaw = spin + pointer.x * .35;
		const pitch = .25 + pointer.y * .2 + window.scrollY * .0004;
		const cosY = Math.cos( yaw );
		const sinY = Math.sin( yaw );
		const cosX = Math.cos( pitch );
		const sinX = Math.sin( pitch );
		const cx = width / 2 + pointer.x * 24;
		const cy = height / 2 + pointer.y * 18;
		const distance = camera - dolly * camera;

		for ( const group of [ false, true ] ) {
			ctx.fillStyle = group ? colors.marigold : colors.muted;
			for ( const p of particles ) {
				if ( p.marigold !== group ) {
					continue;
				}
				// Rotate around Y, then X
				const x1 = p.x * cosY + p.z * sinY;
				const z1 = -p.x * sinY + p.z * cosY;
				const y2 = p.y * cosX - z1 * sinX;
				const z2 = p.y * sinX + z1 * cosX;

				const depth = distance + z2;
				if ( depth < .4 ) {
					continue;
				}
				const sx = cx + x1 * focal / depth;
				const sy = cy + y2 * focal / depth;
				if ( sx < -10 || sx > width + 10 || sy < -10 || sy > height + 10 ) {
					continue;
				}
				// Nearer dots are bigger and stronger; `near` is 1 at the cloud's centre
				const near = camera / depth;
				ctx.globalAlpha = Math.min( .7, .42 * near );
				ctx.beginPath();
				ctx.arc( sx, sy, Math.min( 3.6, Math.max( .6, 1.5 * near ) ), 0, Math.PI * 2 );
				ctx.fill();
			}
		}
		ctx.globalAlpha = 1;
	};

	let frame = 0;
	let previous = performance.now();
	const tick = ( now: number ) => {
		const dt = Math.min( ( now - previous ) / 16.7, 3 );
		previous = now;

		spin += .0006 * dt;
		pointer.x += ( pointer.tx - pointer.x ) * .04 * dt;
		pointer.y += ( pointer.ty - pointer.y ) * .04 * dt;
		dolly += ( dollyTarget - dolly ) * .08 * dt;
		dollyTarget *= Math.pow( .9, dt );

		draw();
		frame = requestAnimationFrame( tick );
	};

	const start = () => {
		if ( !frame && !document.hidden && !reducedMotion.matches ) {
			previous = performance.now();
			frame = requestAnimationFrame( tick );
		}
	};
	const stop = () => {
		cancelAnimationFrame( frame );
		frame = 0;
	};
	const still = () => {
		stop();
		draw();
	};

	window.addEventListener( "pointermove", event => {
		pointer.tx = event.clientX / window.innerWidth - .5;
		pointer.ty = event.clientY / window.innerHeight - .5;
	}, { passive: true } );

	// Push through the cloud on a forward flip, pull back on a backward one
	document.addEventListener( "pagechange", event => {
		const direction = ( event as CustomEvent<{ direction: number }> ).detail.direction;
		dollyTarget = direction * .14;
	} );

	window.addEventListener( "resize", () => {
		resize();
		draw();
	} );
	document.addEventListener( "visibilitychange", () => document.hidden ? stop() : start() );
	reducedMotion.addEventListener( "change", () => reducedMotion.matches ? still() : start() );

	const repaint = () => {
		readColors();
		draw();
	};
	new MutationObserver( repaint ).observe( document.documentElement, { attributes: true, attributeFilter: [ "data-theme" ] } );
	window.matchMedia( "(prefers-color-scheme: dark)" ).addEventListener( "change", repaint );

	readColors();
	resize();
	reducedMotion.matches ? still() : start();
};
