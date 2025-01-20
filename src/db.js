export async function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("SVGStorageDB", 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains("SVGs")) {
                db.createObjectStore("SVGs", { keyPath: "id" });
            }
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
}

export async function saveSVG(id, svgData) {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction("SVGs", "readwrite");
        const store = transaction.objectStore("SVGs");

        const data = { id, svgData };
        const request = store.put(data);

        request.onsuccess = () => {
            resolve("SVG saved successfully!");
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
}

export async function getSVG(id) {
    const db = await openDatabase();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction("SVGs", "readonly");
        const store = transaction.objectStore("SVGs");

        const request = store.get(id);

        request.onsuccess = (event) => {
            resolve(event.target.result?.svgData || null);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
}

let debounce = null;
export const queueSave = (editor) => {
  if (Date.now() - debounce < 2000) {
    return;
  }

  debounce = Date.now();
  const maxDimension = Math.max(
    editor.viewport.visibleRect.width,
    editor.viewport.visibleRect.height
  );
  const svg = editor.toSVG({ minDimension: maxDimension });
  console.log(svg);
  saveSVG(document.location.href, svg.outerHTML)
    .then(console.log)
    .catch(console.error);
};