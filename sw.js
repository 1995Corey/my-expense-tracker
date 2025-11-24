const CACHE_NAME = "expense-tracker-v1";
const urlsToCache = ["./", "./index.html", "./manifest.json", "./icon.png"];

// 安裝 SW 並快取基本檔案
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// 攔截網路請求：有快取就用快取，沒快取就上網抓 (Stale-while-revalidate 策略的簡化版)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // 如果快取有，直接回傳
      if (response) {
        return response;
      }
      // 如果快取沒有，去網路抓
      return fetch(event.request);
    })
  );
});
