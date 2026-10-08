import type { APIRoute } from "astro";
import { iconSizes } from "../data/icons";

/** The web app manifest, with v1's gatsby-plugin-manifest settings */
export const GET: APIRoute = () => Response.json( {
	name: "Yash Gupta",
	short_name: "yash-gupta",
	start_url: "/",
	background_color: "#141414",
	theme_color: "#fca311",
	display: "standalone",
	icons: iconSizes.map( size => ( {
		src: `/icons/icon-${ size }x${ size }.png`,
		sizes: `${ size }x${ size }`,
		type: "image/png",
		purpose: "any maskable"
	} ) )
}, { headers: { "Content-Type": "application/manifest+json" } } );
