/**
 * Service worker kill switch.
 *
 * The v1 site (Gatsby + gatsby-plugin-offline) registered a service worker at /sw.js that caches
 * the old site and keeps serving it to returning visitors. Browsers re-check this URL on each visit;
 * when they find this file, it replaces the old worker, deletes every cache it left behind,
 * unregisters itself and reloads open tabs onto the live site.
 *
 * Keep this file deployed for a good while (months), until returning v1 visitors have all been through.
 */
self.addEventListener( "install", () => self.skipWaiting() );

self.addEventListener( "activate", event => {
	event.waitUntil( ( async () => {
		await self.clients.claim();
		const keys = await caches.keys();
		await Promise.all( keys.map( key => caches.delete( key ) ) );
		await self.registration.unregister();
		const windows = await self.clients.matchAll( { type: "window" } );
		windows.forEach( client => client.navigate( client.url ) );
	} )() );
} );
