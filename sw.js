const CACHE_NAME = 'math-game-cache-v1';
const urlsToCache = [
  './math-airplane-game.html',
  './manifest.json'
];

// 安裝 Service Worker 並快取必要檔案
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// 攔截網路請求，提供離線支援
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 如果在快取中找到就回傳快取
        if (response) {
          return response;
        }
        // 否則就發送網路請求
        return fetch(event.request);
      })
  );
});
