/**
 * The link-preview image (1200×630), rendered at build time to /og-image.png.
 *
 * Text is laid out with satori using the site's own fonts (Fontsource WOFF files), so previews
 * match the site. The portrait is taken from Portrait.astro itself and its colours resolved from
 * tokens.css (light theme), so the preview always shows the current drawing.
 */
import type { APIRoute } from "astro";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import satori from "satori";
import sharp from "sharp";

const WIDTH = 1200;
const HEIGHT = 630;
const root = process.cwd();
const read = ( path: string ) => readFile( join( root, path ), "utf8" );
const font = ( pkg: string, file: string ) => readFile( join(
	root,
	"node_modules/@fontsource",
	pkg,
	"files",
	file
) );

/** Light-theme token values from the first :root block of tokens.css */
const readTokens = async () => {
	const css = await read( "src/styles/tokens.css" );
	const block = css.slice( css.indexOf( ":root {" ), css.indexOf( "}", css.indexOf( ":root {" ) ) );
	const entries = Array.from(
		block.matchAll( /--([\w-]+):\s*([^;]+);/g ),
		( match ): [ string, string ] => [ match[ 1 ], match[ 2 ].trim() ]
	);
	return Object.fromEntries( entries ) as Record<string, string>;
};

const resolveVars = ( css: string, tokens: Record<string, string> ) => css
	.replace( /var\(--font-mono\)/g, "monospace" )
	.replace( /var\(--([\w-]+)\)/g, ( _, name: string ) => tokens[ name ] ?? "none" );

/** The portrait SVG from Portrait.astro, with its styles inlined as plain colours */
const renderPortrait = async ( tokens: Record<string, string> ) => {
	const source = await read( "src/components/Portrait.astro" );
	const svg = source.match( /<svg viewBox="0 0 400 420"[\s\S]*?<\/svg>/ )?.[ 0 ];
	const style = source.match( /<style>([\s\S]*?)<\/style>/ )?.[ 1 ];
	if ( !svg || !style ) {
		throw new Error( "og-image: couldn't find the portrait SVG or its styles in Portrait.astro" );
	}
	const standalone = svg
		.replace( "<svg ", `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="840" ` )
		.replace( /(<svg[^>]*>)/, `$1<style>${ resolveVars( style, tokens ) }</style>` );
	return sharp( Buffer.from( standalone ) ).png().toBuffer();
};

/** The YG monogram from Logo.astro, in ink */
const renderLogo = async ( ink: string ) => {
	const source = await read( "src/components/Logo.astro" );
	const shapes = source.match( /<path[\s\S]*<\/svg>/ )?.[ 0 ]
		.replace( /clip-path=\{ `url\(#\$\{ id \}-a\)` \}/, "clip-path=\"url(#a)\"" )
		.replace( /clip-path=\{ `url\(#\$\{ id \}-b\)` \}/, "clip-path=\"url(#b)\"" );
	if ( !shapes || shapes.includes( "{" ) ) {
		throw new Error( "og-image: couldn't read the logo shapes from Logo.astro" );
	}
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1283.27 1064.57" width="290" height="240" fill="${ ink }"><defs><clipPath id="a"><rect x="6.37" y="1.02" width="382.12" height="1063.56"/></clipPath><clipPath id="b"><rect x="388.48" y="1.02" width="382.12" height="1063.56" transform="translate(1159.08 1065.59) rotate(-180)"/></clipPath></defs>${ shapes }`;
	return sharp( Buffer.from( svg ) ).png().toBuffer();
};

const dataUri = ( png: Buffer ) => `data:image/png;base64,${ png.toString( "base64" ) }`;

// Minimal element builder for satori (it takes React-like objects; no React needed)
type Node = string | { type: string; props: Record<string, unknown> };
const h = ( type: string, props: Record<string, unknown>, ...children: Node[] ): Node => ( {
	type,
	props: {
		...props, ...( children.length ? {
			children: children.length === 1
				? children[ 0 ]
				: children
		} : {} )
	}
} );

/** A light scatter of particles, like the site background */
const particles = ( tokens: Record<string, string> ) => {
	let seed = 7;
	const random = () => {
		seed = ( seed * 16807 ) % 2147483647;
		return seed / 2147483647;
	};
	return Array.from( { length: 46 }, () => {
		const size = 3 + random() * 5;
		return h( "div", {
			style: {
				position: "absolute",
				left: Math.round( random() * WIDTH ),
				top: Math.round( random() * HEIGHT ),
				width: size,
				height: size,
				borderRadius: size,
				backgroundColor: random() < .65 ? tokens[ "marigold" ] : tokens[ "ink-muted" ],
				opacity: .25 + random() * .35
			}
		} );
	} );
};

export const GET: APIRoute = async () => {
	const tokens = await readTokens();
	const [ portrait, logo ] = await Promise.all( [
		renderPortrait( tokens ),
		renderLogo( tokens[ "ink" ] )
	] );

	const tree = h(
		"div", {
			style: {
				position: "relative",
				display: "flex",
				alignItems: "center",
				width: WIDTH,
				height: HEIGHT,
				padding: "56px 72px",
				backgroundColor: tokens[ "paper" ],
				color: tokens[ "ink" ],
				fontFamily: "Instrument Sans"
			}
		},
		...particles( tokens ),
		h(
			"div", { style: { display: "flex", flexDirection: "column", flex: 1, gap: 22 } },
			h( "img", { src: dataUri( logo ), width: 58, height: 48 } ),
			h(
				"div",
				{
					style: {
						display: "flex",
						fontFamily: "JetBrains Mono",
						fontSize: 24,
						color: tokens[ "ink-muted" ],
						letterSpacing: 1
					}
				},
				"> ~/home"
			),
			h(
				"div",
				{
					style: {
						display: "flex",
						fontFamily: "Bricolage Grotesque",
						fontWeight: 800,
						fontSize: 108,
						lineHeight: 1,
						letterSpacing: -3,
						whiteSpace: "pre"
					}
				},
				"Hi, I'm ",
				h( "span", {
					style: {
						backgroundImage: `linear-gradient(to bottom, transparent 55%, ${ tokens[ "marigold-soft" ] } 55%, ${ tokens[ "marigold-soft" ] } 92%, transparent 92%)`
					}
				}, "Yash" ),
				"."
			),
			h(
				"div",
				{
					style: {
						display: "flex",
						fontSize: 32,
						lineHeight: 1.4,
						color: tokens[ "ink-muted" ],
						maxWidth: 560
					}
				},
				"Full-stack developer from Kanpur, India. I build websites, apps and everything in between."
			),
			h(
				"div",
				{
					style: {
						display: "flex",
						fontFamily: "JetBrains Mono",
						fontSize: 26,
						color: tokens[ "accent-ink" ],
						marginTop: 6
					}
				},
				"yashgupta.me"
			)
		),
		h( "img", { src: dataUri( portrait ), width: 440, height: 462 } )
	);

	const svg = await satori( tree as Parameters<typeof satori>[ 0 ], {
		width: WIDTH,
		height: HEIGHT,
		fonts: [
			{
				name: "Bricolage Grotesque",
				data: await font( "bricolage-grotesque", "bricolage-grotesque-latin-800-normal.woff" ),
				weight: 800,
				style: "normal"
			},
			{
				name: "Instrument Sans",
				data: await font( "instrument-sans", "instrument-sans-latin-400-normal.woff" ),
				weight: 400,
				style: "normal"
			},
			{
				name: "JetBrains Mono",
				data: await font( "jetbrains-mono", "jetbrains-mono-latin-500-normal.woff" ),
				weight: 500,
				style: "normal"
			}
		]
	} );

	const png = await sharp( Buffer.from( svg ) ).png().toBuffer();
	return new Response( new Uint8Array( png ), { headers: { "Content-Type": "image/png" } } );
};
