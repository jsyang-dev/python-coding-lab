// Service Worker: Pyodide WASM 캐싱
const CACHE_NAME = 'pyodide-cache-v1'
const PYODIDE_CDN = 'https://cdn.jsdelivr.net/pyodide/v0.26.0/full/'

const PRECACHE_URLS = [
  `${PYODIDE_CDN}pyodide.js`,
  `${PYODIDE_CDN}pyodide.asm.wasm`,
  `${PYODIDE_CDN}pyodide_py.tar`,
]

self.addEventListener('install', (event: any) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS).catch(() => {
        // 프리캐싱 실패해도 Service Worker는 활성화
      })
    })
  )
})

self.addEventListener('activate', (event: any) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  )
})

self.addEventListener('fetch', (event: any) => {
  const url = event.request.url
  if (url.startsWith(PYODIDE_CDN)) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        return cached || fetch(event.request).then((response) => {
          if (response.ok) {
            const clone = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone))
          }
          return response
        })
      })
    )
  }
})
