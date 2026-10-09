const CACHE_NAME='kerjaku-pwa-v2';
const APP_SHELL=['./','./index.html','./manifest.json','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(APP_SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(r=>{if(r.ok)caches.open(CACHE_NAME).then(c=>c.put('./index.html',r.clone()));return r;}).catch(()=>caches.match('./index.html')));return;}e.respondWith(fetch(e.request).then(r=>{if(r&&r.ok)caches.open(CACHE_NAME).then(c=>c.put(e.request,r.clone()));return r;}).catch(()=>caches.match(e.request)));});
