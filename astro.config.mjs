// @ts-check
import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig( {
	fonts: [
		{
			provider: fontProviders.google(),
			name: "Bricolage Grotesque",
			cssVariable: "--font-display",
			weights: [ "400 800" ],
			fallbacks: [ "Arial Narrow", "sans-serif" ]
		},
		{
			provider: fontProviders.google(),
			name: "Instrument Sans",
			cssVariable: "--font-body",
			weights: [ "400 700" ],
			styles: [ "normal", "italic" ],
			fallbacks: [ "system-ui", "sans-serif" ]
		},
		{
			provider: fontProviders.google(),
			name: "JetBrains Mono",
			cssVariable: "--font-mono",
			weights: [ 400, 500 ],
			fallbacks: [ "ui-monospace", "monospace" ]
		}
	]
} );
