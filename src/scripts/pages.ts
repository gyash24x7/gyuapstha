/**
 * Page-by-page scrolling on desktop, after CodyHouse's "opacity" page scroll effect.
 *
 * Each [data-page] becomes a full-screen page. One scroll gesture, arrow key or nav click moves one
 * page: the current page fades out while scaling up (going forward) or down (going back), and the
 * next one fades in from the other side. A page taller than the screen scrolls inside first; the
 * flip happens once you're at its end.
 *
 * Only on wide screens with a fine pointer and without prefers-reduced-motion; everyone else gets
 * the normal scrolling page. The `paged` class on <html> switches the CSS (see PageNav.astro).
 * A "pagechange" event ({ index, direction }) fires on every flip, and with direction 0 when paging
 * starts or stops.
 */

const DURATION = 700;
/** Wheel distance at a page's edge before it flips, in px */
const FLIP_THRESHOLD = 50;
/** Wheel events closer together than this are one gesture (trackpad momentum included) */
const GESTURE_GAP = 180;
/** After a flip, scrolling must pause this long before the next flip can start */
const QUIET_AFTER_FLIP = 300;
/** Ignore edge wheel events this soon after the page itself scrolled, so momentum doesn't flip it */
const SCROLL_SETTLE = 300;

export const PAGED_QUERY = "(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

type State = "before" | "current" | "after";

export const initPages = () => {
	const root = document.documentElement;
	const pages = Array.from( document.querySelectorAll<HTMLElement>( "[data-page]" ) );
	const links = Array.from( document.querySelectorAll<HTMLAnchorElement>( "[data-page-link]" ) );
	const media = window.matchMedia( PAGED_QUERY );
	if ( pages.length < 2 ) {
		return;
	}

	let enabled = false;
	let current = 0;
	let animating = false;
	let lockUntil = 0;
	let lastWheel = 0;
	let lastInnerScroll = 0;
	let travelled = 0;
	let parkTimer = 0;

	const now = () => performance.now();

	const canScroll = ( page: HTMLElement, direction: number ) => direction > 0
		? page.scrollTop + page.clientHeight < page.scrollHeight - 2
		: page.scrollTop > 2;

	const pageIndexOf = ( element: Element | null ) => {
		const page = element?.closest<HTMLElement>( "[data-page]" );
		return page ? pages.indexOf( page ) : -1;
	};

	const setStates = () => {
		pages.forEach( ( page, i ) => {
			const state: State = i < current ? "before" : i > current ? "after" : "current";
			page.dataset.state = state;
			page.inert = state !== "current";
		} );
		links.forEach( ( link, i ) => {
			if ( i === current ) {
				link.setAttribute( "aria-current", "true" );
			} else {
				link.removeAttribute( "aria-current" );
			}
		} );
	};

	// Pages off screen are moved far away once hidden, so features that watch visibility
	// (the portrait's animation loop, the toolbox graph) pause or wait until their page is shown
	const park = () => pages.forEach( ( page, i ) => page.toggleAttribute(
		"data-parked",
		i !== current
	) );

	const updateUrl = () => {
		const id = pages[ current ].dataset.page;
		const url = current === 0 ? location.pathname + location.search : `#${ id }`;
		history.replaceState( null, "", url );
	};

	const go = ( index: number, options: { instant?: boolean; scrollTo?: Element } = {} ) => {
		index = Math.max( 0, Math.min( pages.length - 1, index ) );
		if ( index === current && !options.scrollTo ) {
			return;
		}

		const direction = Math.sign( index - current );
		const target = pages[ index ];
		clearTimeout( parkTimer );

		// Bring the target back into place in its waiting state before animating it in
		target.removeAttribute( "data-parked" );
		if ( options.scrollTo &&
			options.scrollTo !==
			target &&
			!options.scrollTo.matches( "[data-page] > :first-child" ) ) {
			target.scrollTop = ( options.scrollTo as HTMLElement ).offsetTop - 24;
		} else {
			// Arriving from below lands at the end of a long page, as if you'd scrolled up into it
			target.scrollTop = direction < 0 ? target.scrollHeight : 0;
		}

		if ( options.instant ) {
			root.classList.add( "paged-instant" );
		}
		void target.offsetWidth;

		current = index;
		setStates();
		updateUrl();
		document.dispatchEvent( new CustomEvent( "pagechange", { detail: { index, direction } } ) );
		target.focus( { preventScroll: true } );

		if ( options.instant ) {
			void target.offsetWidth;
			root.classList.remove( "paged-instant" );
			park();
			return;
		}

		animating = true;
		lockUntil = now() + DURATION;
		parkTimer = window.setTimeout( () => {
			animating = false;
			park();
		}, DURATION );
	};

	// Wheel and trackpad
	const onWheel = ( event: WheelEvent ) => {
		if ( !enabled || event.ctrlKey || Math.abs( event.deltaY ) < Math.abs( event.deltaX ) ) {
			return;
		}
		const time = now();
		const direction = Math.sign( event.deltaY );
		const page = pages[ current ];

		if ( animating || time < lockUntil ) {
			// Swallow the rest of the gesture that caused the flip, including trackpad momentum and
			// slow wheel notches: the next flip needs a short pause in scrolling first
			event.preventDefault();
			lockUntil = Math.max( lockUntil, time + QUIET_AFTER_FLIP );
			lastWheel = time;
			return;
		}

		if ( canScroll( page, direction ) ) {
			// Let the page scroll itself
			lastInnerScroll = time;
			lastWheel = time;
			travelled = 0;
			return;
		}

		event.preventDefault();
		if ( time - lastInnerScroll < SCROLL_SETTLE ) {
			lastInnerScroll = time;
			lastWheel = time;
			return;
		}
		if ( time - lastWheel > GESTURE_GAP || Math.sign( travelled ) !== direction ) {
			travelled = 0;
		}
		lastWheel = time;
		travelled += event.deltaMode === 1 ? event.deltaY * 16 : event.deltaY;

		if ( Math.abs( travelled ) >= FLIP_THRESHOLD ) {
			travelled = 0;
			go( current + direction );
		}
	};

	// Keyboard: scroll inside a long page first, then flip
	const onKey = ( event: KeyboardEvent ) => {
		if ( !enabled || event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey ) {
			return;
		}
		const target = event.target instanceof Element ? event.target : document.body;
		if ( target.closest( "input, textarea, select, [contenteditable]" ) ) {
			return;
		}
		// Space activates focused buttons and links; only use it for paging otherwise
		if ( event.key === " " && target.closest( "button, a" ) ) {
			return;
		}

		const page = pages[ current ];
		const step = ( key: string ) => {
			switch ( key ) {
				case "ArrowDown":
					return { direction: 1, distance: 80 };
				case "ArrowUp":
					return { direction: -1, distance: 80 };
				case "PageDown":
					return { direction: 1, distance: page.clientHeight * .9 };
				case "PageUp":
					return { direction: -1, distance: page.clientHeight * .9 };
				case " ":
					return { direction: event.shiftKey ? -1 : 1, distance: page.clientHeight * .9 };
			}
		};

		if ( event.key === "Home" || event.key === "End" ) {
			event.preventDefault();
			go( event.key === "Home" ? 0 : pages.length - 1 );
			return;
		}

		const move = step( event.key );
		if ( !move ) {
			return;
		}
		event.preventDefault();
		if ( animating ) {
			return;
		}
		if ( canScroll( page, move.direction ) ) {
			page.scrollBy( { top: move.direction * move.distance, behavior: "smooth" } );
		} else {
			go( current + move.direction );
		}
	};

	// In-page links (nav dots, "scroll", "back to top") flip to the page holding their target
	const onClick = ( event: MouseEvent ) => {
		if ( !enabled ||
			event.defaultPrevented ||
			event.button !==
			0 ||
			event.metaKey ||
			event.ctrlKey ||
			event.shiftKey ) {
			return;
		}
		const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>(
			"a[href^='#']" ) : null;
		const id = link?.getAttribute( "href" )?.slice( 1 );
		const target = id ? document.getElementById( id ) : null;
		const index = pageIndexOf( target );
		if ( !target || index < 0 ) {
			return;
		}
		event.preventDefault();
		go( index, { scrollTo: target } );
	};

	const onInnerScroll = () => {
		lastInnerScroll = now();
	};

	const enable = () => {
		if ( enabled ) {
			return;
		}
		// Start on the page in the URL. Otherwise, when switching over from normal scrolling (a resize),
		// keep the section that's on screen; on load PagedBoot has already stacked the pages, so that
		// can't be measured and we start at the top
		const fromHash = location.hash
			? pageIndexOf( document.getElementById( location.hash.slice( 1 ) ) )
			: -1;
		const stacked = root.classList.contains( "paged" );
		const onScreen = stacked ? 0 : pages.reduce(
			( found, page, i ) => page.getBoundingClientRect().top <= innerHeight / 2 ? i : found,
			0
		);
		
		current = fromHash >= 0 ? fromHash : onScreen;

		enabled = true;
		root.classList.add( "paged", "paged-instant" );
		window.scrollTo( 0, 0 );
		setStates();
		park();
		void pages[ current ].offsetWidth;
		root.classList.remove( "paged-instant" );
		document.dispatchEvent(
			new CustomEvent( "pagechange", { detail: { index: current, direction: 0 } } )
		);
	};

	const disable = () => {
		if ( !enabled ) {
			return;
		}
		enabled = false;
		clearTimeout( parkTimer );
		animating = false;
		root.classList.remove( "paged" );
		pages.forEach( page => {
			delete page.dataset.state;
			page.removeAttribute( "data-parked" );
			page.inert = false;
		} );
		pages[ current ].scrollIntoView();
		document.dispatchEvent(
			new CustomEvent( "pagechange", { detail: { index: current, direction: 0 } } )
		);
	};

	window.addEventListener( "wheel", onWheel, { passive: false } );
	document.addEventListener( "keydown", onKey );
	document.addEventListener( "click", onClick );
	pages.forEach( page => page.addEventListener( "scroll", onInnerScroll, { passive: true } ) );
	media.addEventListener( "change", () => media.matches ? enable() : disable() );

	if ( media.matches ) {
		enable();
	}
};
