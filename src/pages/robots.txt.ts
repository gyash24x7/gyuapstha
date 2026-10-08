import type { APIRoute } from "astro";

/** robots.txt, pointing crawlers at the sitemap on the configured `site` */
export const GET: APIRoute = ( { site } ) => new Response(
	`User-agent: *\nAllow: /\n\nSitemap: ${ new URL( "/sitemap.xml", site ) }\n`,
	{ headers: { "Content-Type": "text/plain; charset=utf-8" } }
);
