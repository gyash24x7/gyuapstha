// @ts-check
import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig( {
	// Used for canonical URLs and absolute link-preview image URLs
	site: "https://yashgupta.me",
	// Inline the (small) stylesheets into the HTML so the first paint doesn't wait on CSS requests
	build: {
		inlineStylesheets: "always"
	},
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
