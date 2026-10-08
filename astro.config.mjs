// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig( {
	// Used for the canonical URL and absolute link-preview image URLs
	site: "https://v1.yashgupta.me",
	// Inline the (small) stylesheets into the HTML so the first paint doesn't wait on CSS requests
	build: {
		inlineStylesheets: "always"
	}
} );
