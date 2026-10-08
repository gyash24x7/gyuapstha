import type { APIRoute, GetStaticPaths } from "astro";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { iconSizes } from "../../data/icons";

/** /icons/icon-{size}x{size}.png, resized from src/assets/logo.png */
export const getStaticPaths = ( () => iconSizes.map( size => ( {
	params: { name: `icon-${ size }x${ size }` },
	props: { size }
} ) ) ) satisfies GetStaticPaths;

export const GET: APIRoute = async ( { props } ) => {
	const logo = await readFile( join( process.cwd(), "src/assets/logo.png" ) );
	const png = await sharp( logo ).resize( props.size, props.size ).png().toBuffer();
	return new Response( new Uint8Array( png ), { headers: { "Content-Type": "image/png" } } );
};
