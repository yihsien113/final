const CACHE_NAME = 'card-counter-v1';
// 加入需要快取的檔案清單
const urlsToCache = [
  './icon.webp',
  './index.html',
  './manifest.json'
];

// 安裝 Service Worker 並進行初始快取
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// 攔截網頁請求，優先提供快取的檔案（支援離線）
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

// 啟動並清理舊版本的快取
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});