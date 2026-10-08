import type { APIRoute } from "astro";

/** The site is one page (the 404 is excluded), so the sitemap is written by hand rather than with an integration */
const paths = [ "/" ];

export const GET: APIRoute = ( { site } ) => {
	const urls = paths
		.map( path => `\t<url><loc>${ new URL( path, site ) }</loc></url>` )
		.join( "\n" );
	
	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${ urls }\n</urlset>\n`,
		{ headers: { "Content-Type": "application/xml; charset=utf-8" } }
	);
};
