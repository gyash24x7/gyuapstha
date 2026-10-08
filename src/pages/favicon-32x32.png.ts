import type { APIRoute } from "astro";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

/** The favicon, resized from src/assets/logo.png as gatsby-plugin-manifest did */
export const GET: APIRoute = async () => {
	const logo = await readFile( join( process.cwd(), "src/assets/logo.png" ) );
	const png = await sharp( logo ).resize( 32, 32 ).png().toBuffer();
	return new Response( new Uint8Array( png ), { headers: { "Content-Type": "image/png" } } );
};
