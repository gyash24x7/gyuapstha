/**
 * Toolbox graph: a 3D network of the tools Yash uses, drawn as sticker discs with
 * their logos, linked to category hubs and to each other, over drifting particles.
 *
 * Drag (or swipe sideways) to spin it; hover or tap a logo to highlight what it
 * connects to. Colours come from the design tokens and follow the theme.
 * Under prefers-reduced-motion it does not spin or drift on its own.
 */
import * as THREE from "three";
import { groups, links, tools } from "../data/toolbox";

interface GraphNode {
	id: string;
	label: string;
	kind: "tool" | "hub";
	icon?: string;
	monogram?: string;
	position: THREE.Vector3;
	/** Layout position inside a unit sphere; scaled to the stage's shape on resize */
	unit: THREE.Vector3;
	force: THREE.Vector3;
	sprite?: THREE.Sprite;
	neighbours: Set<string>;
}

interface Palette {
	ink: string;
	inkMuted: string;
	paper: string;
	marigold: string;
	onMarigold: string;
	shadow: string;
	mono: string;
	display: string;
}

const TOOL_HEIGHT = 64;
const MAX_TILT = .12;
const HUB_HEIGHT = 21;

const readPalette = (): Palette => {
	const style = getComputedStyle( document.documentElement );
	const token = ( name: string, fallback: string ) => style.getPropertyValue( name ).trim() || fallback;
	return {
		ink: token( "--ink", "#1b1a3a" ),
		inkMuted: token( "--ink-muted", "#55546f" ),
		paper: token( "--paper-raised", "#ffffff" ),
		marigold: token( "--marigold", "#fca311" ),
		onMarigold: token( "--on-marigold", "#1b1a3a" ),
		shadow: token( "--shadow-ink", "#1b1a3a" ),
		mono: token( "--font-mono", "monospace" ),
		display: token( "--font-display", "sans-serif" )
	};
};

/** Small deterministic PRNG so the layout is the same on every visit */
const seededRandom = ( seed: number ) => () => {
	seed |= 0;
	seed = seed + 0x6d2b79f5 | 0;
	let t = Math.imul( seed ^ seed >>> 15, 1 | seed );
	t = t + Math.imul( t ^ t >>> 7, 61 | t ) ^ t;
	return ( ( t ^ t >>> 14 ) >>> 0 ) / 4294967296;
};

const buildGraph = () => {
	const random = seededRandom( 24 );
	const nodes = new Map<string, GraphNode>();
	const edges: [ string, string, number ][] = [];

	const spherePoint = ( radius: number ) => {
		const u = random() * 2 - 1;
		const theta = random() * Math.PI * 2;
		const r = Math.sqrt( 1 - u * u );
		return new THREE.Vector3( r * Math.cos( theta ), r * Math.sin( theta ), u ).multiplyScalar( radius );
	};

	groups.forEach( group => {
		nodes.set( `hub:${ group.id }`, {
			id: `hub:${ group.id }`,
			label: `~/${ group.label }`,
			kind: "hub",
			position: spherePoint( 120 ),
			unit: new THREE.Vector3(),
			force: new THREE.Vector3(),
			neighbours: new Set()
		} );
	} );

	tools.forEach( tool => {
		const hub = nodes.get( `hub:${ tool.group }` )!;
		nodes.set( tool.id, {
			id: tool.id,
			label: tool.name,
			kind: "tool",
			icon: tool.icon,
			monogram: tool.monogram,
			position: hub.position.clone().add( spherePoint( 40 ) ),
			unit: new THREE.Vector3(),
			force: new THREE.Vector3(),
			neighbours: new Set()
		} );
		edges.push( [ hub.id, tool.id, 90 ] );
	} );

	links.forEach( ( [ a, b ] ) => edges.push( [ a, b, 120 ] ) );

	edges.forEach( ( [ a, b ] ) => {
		nodes.get( a )!.neighbours.add( b );
		nodes.get( b )!.neighbours.add( a );
	} );

	// A few hundred steps of a spring-electric layout, run once up front
	const list = [ ...nodes.values() ];
	const delta = new THREE.Vector3();
	for ( let step = 0; step < 450; step++ ) {
		const cooling = 1 - step / 450;
		list.forEach( node => node.force.set( 0, 0, 0 ) );

		for ( let i = 0; i < list.length; i++ ) {
			for ( let j = i + 1; j < list.length; j++ ) {
				const a = list[ i ];
				const b = list[ j ];
				delta.subVectors( a.position, b.position );
				const distanceSq = Math.max( delta.lengthSq(), 25 );
				const charge = ( a.kind === "hub" ? 5 : 1 ) * ( b.kind === "hub" ? 5 : 1 );
				delta.normalize().multiplyScalar( 5200 * charge / distanceSq );
				a.force.add( delta );
				b.force.sub( delta );
			}
		}

		edges.forEach( ( [ a, b, rest ] ) => {
			const from = nodes.get( a )!;
			const to = nodes.get( b )!;
			delta.subVectors( to.position, from.position );
			const stretch = ( delta.length() - rest ) * .04;
			delta.normalize().multiplyScalar( stretch );
			from.force.add( delta );
			to.force.sub( delta );
		} );

		list.forEach( node => {
			node.force.addScaledVector( node.position, -.004 );
			node.force.clampLength( 0, 12 );
			node.position.addScaledVector( node.force, cooling );
		} );
	}

	// Centre and normalise into a unit sphere
	const centre = new THREE.Vector3();
	list.forEach( node => centre.add( node.position ) );
	centre.divideScalar( list.length );
	list.forEach( node => node.position.sub( centre ) );
	// Even out the density: keep each node's direction, but re-space the distances from the
	// centre by rank, biased outward so the graph doesn't bunch up in the middle when projected
	const byDistance = [ ...list ].sort( ( a, b ) => a.position.length() - b.position.length() );
	byDistance.forEach( ( node, rank ) => {
		const radius = Math.pow( ( rank + .5 ) / byDistance.length, .45 );
		node.unit.copy( node.position ).normalize().multiplyScalar( radius );
	} );

	// Stretch each axis so the outermost nodes reach the edge of the unit shape both
	// vertically and horizontally; a sphere's nodes rarely sit near its poles
	const maxY = Math.max( ...list.map( node => Math.abs( node.unit.y ) ) ) || 1;
	const maxXZ = Math.max( ...list.map( node => Math.hypot( node.unit.x, node.unit.z ) ) ) || 1;
	list.forEach( node => node.unit.set( node.unit.x / maxXZ, node.unit.y / maxY, node.unit.z / maxXZ ) );

	return { nodes, edges };
};

const makeCanvas = ( width: number, height: number ) => {
	const canvas = document.createElement( "canvas" );
	canvas.width = width;
	canvas.height = height;
	return { canvas, ctx: canvas.getContext( "2d" )! };
};

const toTexture = ( canvas: HTMLCanvasElement ) => {
	const texture = new THREE.CanvasTexture( canvas );
	texture.colorSpace = THREE.SRGBColorSpace;
	texture.anisotropy = 4;
	return texture;
};

/** A sticker disc: hard shadow, raised paper fill, ink outline, logo, name underneath */
const drawTool = ( node: GraphNode, palette: Palette ) => {
	const { canvas, ctx } = makeCanvas( 256, 320 );
	const cx = 122;
	const cy = 118;
	const r = 92;

	ctx.fillStyle = palette.shadow;
	ctx.beginPath();
	ctx.arc( cx + 9, cy + 9, r, 0, Math.PI * 2 );
	ctx.fill();

	ctx.fillStyle = palette.paper;
	ctx.strokeStyle = palette.ink;
	ctx.lineWidth = 8;
	ctx.beginPath();
	ctx.arc( cx, cy, r, 0, Math.PI * 2 );
	ctx.fill();
	ctx.stroke();

	ctx.fillStyle = palette.ink;
	if ( node.icon ) {
		const size = 104;
		ctx.save();
		ctx.translate( cx - size / 2, cy - size / 2 );
		ctx.scale( size / 24, size / 24 );
		ctx.fill( new Path2D( node.icon ) );
		ctx.restore();
	} else if ( node.monogram ) {
		ctx.font = `800 ${ node.monogram.length > 2 ? 54 : 70 }px ${ palette.display }`;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText( node.monogram, cx, cy + 4 );
	}

	ctx.font = `600 30px ${ palette.mono }`;
	ctx.textAlign = "center";
	ctx.textBaseline = "alphabetic";
	const width = ctx.measureText( node.label ).width;
	if ( width > 244 ) {
		ctx.font = `600 ${ Math.floor( 30 * 244 / width ) }px ${ palette.mono }`;
	}
	ctx.fillText( node.label, 128, 300 );

	return { texture: toTexture( canvas ), aspect: 256 / 320 };
};

/** A hub: marigold pill sticker with the group's path label */
const drawHub = ( node: GraphNode, palette: Palette ) => {
	const probe = makeCanvas( 1, 1 ).ctx;
	const font = `600 40px ${ palette.mono }`;
	probe.font = font;
	const textWidth = probe.measureText( node.label ).width;
	const pillWidth = Math.ceil( textWidth + 64 );
	const pillHeight = 80;
	const { canvas, ctx } = makeCanvas( pillWidth + 16, pillHeight + 16 );

	const pill = ( x: number, y: number ) => {
		ctx.beginPath();
		ctx.roundRect( x, y, pillWidth - 8, pillHeight - 8, ( pillHeight - 8 ) / 2 );
	};

	ctx.fillStyle = palette.shadow;
	pill( 12, 12 );
	ctx.fill();

	ctx.fillStyle = palette.marigold;
	ctx.strokeStyle = palette.ink;
	ctx.lineWidth = 6;
	pill( 4, 4 );
	ctx.fill();
	ctx.stroke();

	ctx.fillStyle = palette.onMarigold;
	ctx.font = font;
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.fillText( node.label, 4 + ( pillWidth - 8 ) / 2, 4 + ( pillHeight - 8 ) / 2 + 2 );

	return { texture: toTexture( canvas ), aspect: canvas.width / canvas.height };
};

const drawDot = () => {
	const { canvas, ctx } = makeCanvas( 64, 64 );
	ctx.fillStyle = "#ffffff";
	ctx.beginPath();
	ctx.arc( 32, 32, 28, 0, Math.PI * 2 );
	ctx.fill();
	return toTexture( canvas );
};

export const mountToolboxGraph = ( container: HTMLElement ) => {
	const reducedMotion = window.matchMedia( "(prefers-reduced-motion: reduce)" );
	const renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
	renderer.setPixelRatio( Math.min( window.devicePixelRatio, 2 ) );
	renderer.setClearColor( 0x000000, 0 );
	container.appendChild( renderer.domElement );

	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera( 24, 1, 1, 8000 );
	const graph = new THREE.Group();
	scene.add( graph );

	const { nodes, edges } = buildGraph();
	let palette = readPalette();

	// Edges: every link, plus a second layer for the highlighted ones
	const edgePositions = new Float32Array( edges.length * 6 );
	const edgeGeometry = new THREE.BufferGeometry();
	edgeGeometry.setAttribute( "position", new THREE.BufferAttribute( edgePositions, 3 ) );
	const edgeMaterial = new THREE.LineBasicMaterial( { transparent: true, opacity: .2, depthWrite: false } );
	graph.add( new THREE.LineSegments( edgeGeometry, edgeMaterial ) );

	const highlightGeometry = new THREE.BufferGeometry();
	const highlightMaterial = new THREE.LineBasicMaterial( { transparent: true, opacity: 1, depthWrite: false } );
	graph.add( new THREE.LineSegments( highlightGeometry, highlightMaterial ) );

	// Nodes
	const sprites: THREE.Sprite[] = [];
	const paintNodes = () => {
		nodes.forEach( node => {
			const { texture, aspect } = node.kind === "hub" ? drawHub( node, palette ) : drawTool( node, palette );
			const height = node.kind === "hub" ? HUB_HEIGHT : TOOL_HEIGHT;
			if ( node.sprite ) {
				node.sprite.material.map?.dispose();
				node.sprite.material.map = texture;
				node.sprite.material.needsUpdate = true;
			} else {
				const material = new THREE.SpriteMaterial( { map: texture, transparent: true, alphaTest: .02 } );
				const sprite = new THREE.Sprite( material );
				sprite.userData.id = node.id;
				sprite.renderOrder = node.kind === "hub" ? 2 : 1;
				node.sprite = sprite;
				sprites.push( sprite );
				graph.add( sprite );
			}
			node.sprite.userData.baseScale = new THREE.Vector2( height * aspect, height );
			node.sprite.scale.set( height * aspect, height, 1 );
		} );
	};

	// Background particles
	const particleCount = window.innerWidth < 700 ? 320 : 700;
	const particlePositions = new Float32Array( particleCount * 3 );
	const particleColors = new Float32Array( particleCount * 3 );
	const random = seededRandom( 7 );
	for ( let i = 0; i < particleCount; i++ ) {
		const radius = 500 + random() * 1400;
		const u = random() * 2 - 1;
		const theta = random() * Math.PI * 2;
		const r = Math.sqrt( 1 - u * u );
		particlePositions.set( [ r * Math.cos( theta ) * radius, u * radius * .7, r * Math.sin( theta ) * radius ], i * 3 );
	}
	const particleGeometry = new THREE.BufferGeometry();
	particleGeometry.setAttribute( "position", new THREE.BufferAttribute( particlePositions, 3 ) );
	particleGeometry.setAttribute( "color", new THREE.BufferAttribute( particleColors, 3 ) );
	const dotTexture = drawDot();
	const particleMaterial = new THREE.PointsMaterial( {
		size: 14,
		map: dotTexture,
		vertexColors: true,
		transparent: true,
		opacity: .65,
		depthWrite: false,
		sizeAttenuation: true
	} );
	const particles = new THREE.Points( particleGeometry, particleMaterial );
	scene.add( particles );

	const paintParticles = () => {
		const marigold = new THREE.Color( palette.marigold );
		const muted = new THREE.Color( palette.inkMuted );
		const pick = seededRandom( 11 );
		for ( let i = 0; i < particleCount; i++ ) {
			( pick() < .65 ? marigold : muted ).toArray( particleColors, i * 3 );
		}
		particleGeometry.attributes.color.needsUpdate = true;
	};

	const paint = () => {
		palette = readPalette();
		edgeMaterial.color.set( palette.ink );
		highlightMaterial.color.set( palette.marigold );
		paintNodes();
		paintParticles();
	};
	paint();

	// Highlighting
	let active: GraphNode | undefined;
	let pinned: GraphNode | undefined;
	const setActive = ( node?: GraphNode ) => {
		if ( node === active ) {
			return;
		}
		active = node;
		renderer.domElement.style.cursor = node ? "pointer" : dragging ? "grabbing" : "grab";

		nodes.forEach( other => {
			const lit = !node || other === node || node.neighbours.has( other.id );
			other.sprite!.material.opacity = lit ? 1 : .22;
		} );

		drawHighlight();
	};

	const drawHighlight = () => {
		const node = active;
		const lit = node ? edges.filter( ( [ a, b ] ) => a === node.id || b === node.id ) : [];
		const positions = new Float32Array( lit.length * 6 );
		lit.forEach( ( [ a, b ], i ) => {
			nodes.get( a )!.position.toArray( positions, i * 6 );
			nodes.get( b )!.position.toArray( positions, i * 6 + 3 );
		} );
		highlightGeometry.setAttribute( "position", new THREE.BufferAttribute( positions, 3 ) );
	};

	/** Stretch the unit layout into an ellipsoid that suits the stage: wide on desktop, round on phones */
	const layout = ( radiusXZ: number, radiusY: number ) => {
		nodes.forEach( node => {
			node.position.set( node.unit.x * radiusXZ, node.unit.y * radiusY, node.unit.z * radiusXZ );
			node.sprite!.position.copy( node.position );
		} );
		edges.forEach( ( [ a, b ], i ) => {
			nodes.get( a )!.position.toArray( edgePositions, i * 6 );
			nodes.get( b )!.position.toArray( edgePositions, i * 6 + 3 );
		} );
		edgeGeometry.attributes.position.needsUpdate = true;
		edgeGeometry.computeBoundingSphere();
		drawHighlight();
	};

	const raycaster = new THREE.Raycaster();
	const pointer = new THREE.Vector2();
	const pick = ( event: PointerEvent ) => {
		const box = renderer.domElement.getBoundingClientRect();
		pointer.set( ( event.clientX - box.left ) / box.width * 2 - 1, -( ( event.clientY - box.top ) / box.height ) * 2 + 1 );
		raycaster.setFromCamera( pointer, camera );
		const hit = raycaster.intersectObjects( sprites, false )[ 0 ];
		return hit ? nodes.get( hit.object.userData.id as string ) : undefined;
	};

	// Spinning: drag to rotate with a little inertia, slow auto-spin when idle
	let dragging = false;
	let dragDistance = 0;
	let lastX = 0;
	let lastY = 0;
	let spinX = 0;
	let spinY = 0;
	let lastInteraction = 0;
	/** Stickers are drawn bigger on narrow stages so logos and labels stay legible */
	let nodeScale = 1;
	const parallax = new THREE.Vector2();
	const canvas = renderer.domElement;
	canvas.style.cursor = "grab";

	canvas.addEventListener( "pointerdown", event => {
		dragging = true;
		dragDistance = 0;
		lastX = event.clientX;
		lastY = event.clientY;
		canvas.setPointerCapture( event.pointerId );
		canvas.style.cursor = "grabbing";
	} );

	canvas.addEventListener( "pointermove", event => {
		const box = canvas.getBoundingClientRect();
		parallax.set( ( event.clientX - box.left ) / box.width - .5, ( event.clientY - box.top ) / box.height - .5 );

		if ( dragging ) {
			const dx = event.clientX - lastX;
			const dy = event.clientY - lastY;
			dragDistance += Math.abs( dx ) + Math.abs( dy );
			lastX = event.clientX;
			lastY = event.clientY;
			spinY = dx * .006;
			// Vertical drags scroll the page on touch screens, so only mice tilt the graph
			spinX = event.pointerType === "touch" ? 0 : dy * .006;
			graph.rotation.y += spinY;
			graph.rotation.x = THREE.MathUtils.clamp( graph.rotation.x + spinX, -MAX_TILT, MAX_TILT );
			lastInteraction = performance.now();
		} else if ( event.pointerType === "mouse" && !pinned ) {
			setActive( pick( event ) );
		}
	} );

	const endDrag = ( event: PointerEvent ) => {
		if ( !dragging ) {
			return;
		}
		dragging = false;
		canvas.style.cursor = active ? "pointer" : "grab";
		if ( dragDistance < 6 ) {
			// A tap or click pins the highlight; tapping the same logo or empty space clears it
			const node = pick( event );
			pinned = node && node !== pinned ? node : undefined;
			setActive( pinned );
		}
	};
	canvas.addEventListener( "pointerup", endDrag );
	canvas.addEventListener( "pointercancel", () => dragging = false );
	canvas.addEventListener( "pointerleave", () => {
		if ( !dragging && !pinned ) {
			setActive( undefined );
		}
	} );

	// Sizing: keep the whole graph in view at any aspect ratio
	const resize = () => {
		const width = container.clientWidth;
		const height = container.clientHeight;
		renderer.setSize( width, height, false );
		camera.aspect = width / height;

		// Match the graph's proportions to the stage so it fills both directions:
		// wide and shallow on desktop, tall and narrow on phones
		const radiusXZ = camera.aspect >= 1 ? THREE.MathUtils.clamp( 240 * camera.aspect * 1.15, 260, 900 ) : 260;
		const radiusY = camera.aspect >= 1 ? 240 : THREE.MathUtils.clamp( radiusXZ / camera.aspect * .9, 240, 520 );
		layout( radiusXZ, radiusY );

		nodeScale = camera.aspect < 1 ? 1.3 : 1;

		const tanV = Math.tan( THREE.MathUtils.degToRad( camera.fov / 2 ) );
		const tanH = tanV * camera.aspect;
		const extentY = radiusY * Math.cos( MAX_TILT ) + radiusXZ * Math.sin( MAX_TILT );
		// Every node sits inside the unit radius. Near-side stickers project wider, so the
		// horizontal fit leaves more room for perspective than the vertical one
		const fitWidth = radiusXZ * 1.02 / tanH + radiusXZ * ( camera.aspect < 1 ? .9 : .35 );
		// Leave half a sticker of room above the top node and below the bottom one
		const fitHeight = ( extentY + TOOL_HEIGHT * nodeScale * .6 ) / tanV + radiusXZ * .1;
		camera.position.set( 0, 0, Math.max( fitWidth, fitHeight ) );
		camera.lookAt( 0, 0, 0 );
		camera.updateProjectionMatrix();
	};
	const resizeObserver = new ResizeObserver( resize );
	resizeObserver.observe( container );
	resize();

	// Render loop, only while the section is on screen
	let frame = 0;
	let visible = false;
	let previous = performance.now();
	const tick = ( now: number ) => {
		const dt = Math.min( ( now - previous ) / 16.7, 3 );
		previous = now;
		const still = reducedMotion.matches;

		if ( !dragging ) {
			if ( !still ) {
				spinY *= .94;
				spinX *= .94;
				graph.rotation.y += spinY * dt;
				graph.rotation.x = THREE.MathUtils.clamp( graph.rotation.x + spinX * dt, -MAX_TILT, MAX_TILT );
				if ( !active && now - lastInteraction > 1800 ) {
					graph.rotation.y += .0016 * dt;
					graph.rotation.x += ( .05 - graph.rotation.x ) * .01 * dt;
				}
			}
		}

		if ( !still ) {
			particles.rotation.y += .0004 * dt;
			particles.position.x += ( parallax.x * 40 - particles.position.x ) * .04 * dt;
			particles.position.y += ( -parallax.y * 30 - particles.position.y ) * .04 * dt;
		}

		// Grow the active logo a little
		nodes.forEach( node => {
			const sprite = node.sprite!;
			const base = sprite.userData.baseScale as THREE.Vector2;
			const target = node === active ? 1.22 : 1;
			const current = ( sprite.userData.grow as number | undefined ) ?? 1;
			const next = still ? target : current + ( target - current ) * .2;
			sprite.userData.grow = next;
			sprite.scale.set( base.x * next * nodeScale, base.y * next * nodeScale, 1 );
		} );

		renderer.render( scene, camera );
		frame = visible && !document.hidden ? requestAnimationFrame( tick ) : 0;
	};

	const start = () => {
		if ( !frame ) {
			previous = performance.now();
			frame = requestAnimationFrame( tick );
		}
	};
	const stop = () => {
		cancelAnimationFrame( frame );
		frame = 0;
	};

	const visibility = new IntersectionObserver( ( [ entry ] ) => {
		visible = entry.isIntersecting;
		visible ? start() : stop();
	} );
	visibility.observe( container );
	document.addEventListener( "visibilitychange", () => document.hidden ? stop() : visible && start() );

	// Repaint when the theme changes
	const themeObserver = new MutationObserver( paint );
	themeObserver.observe( document.documentElement, { attributes: true, attributeFilter: [ "data-theme" ] } );
	window.matchMedia( "(prefers-color-scheme: dark)" ).addEventListener( "change", paint );

	return renderer;
};
