const C="eyedrop-v22";
const A=["./","./index.html","./manifest.webmanifest","./background-target.jpg?v=22","./titlebar.jpg?v=22","./bottle-mini.png?v=22","./popup-bottle.png?v=22","./icon.png"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(A)))});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{e.respondWith(fetch(e.request,{cache:"no-store"}).then(r=>{const x=r.clone();caches.open(C).then(c=>c.put(e.request,x));return r}).catch(()=>caches.match(e.request)))});
