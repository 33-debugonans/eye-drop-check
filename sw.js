const CACHE="eybelis-v6";
const ASSETS=["./","./index.html","./manifest.webmanifest","./icon.svg"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const r=e.request;
  if(r.mode==="navigate"){e.respondWith(fetch(r).then(x=>{const y=x.clone();caches.open(CACHE).then(c=>c.put(r,y));return x}).catch(()=>caches.match("./index.html")));return}
  e.respondWith(caches.match(r).then(x=>x||fetch(r).then(y=>{const z=y.clone();caches.open(CACHE).then(c=>c.put(r,z));return y})))
});