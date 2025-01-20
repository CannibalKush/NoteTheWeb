import { Editor } from "js-draw";

export async function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("SVGStorageDB", 1);
    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains("SVGs")) {
        db.createObjectStore("SVGs", { keyPath: "id" });
      }
    };
    request.onsuccess = (event: Event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = (event: Event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
}

export async function saveSVG(id: string, svgData: string) {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = (db as IDBDatabase).transaction("SVGs", "readwrite");
    const store = transaction.objectStore("SVGs");

    const data = { id, svgData };
    const request = store.put(data);

    request.onsuccess = () => {
      resolve("SVG saved successfully!");
    };

    request.onerror = (event) => {
      reject((event.target as IDBRequest).error);
    };
  });
}

export async function getSVG(id: string) {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = (db as IDBDatabase).transaction("SVGs", "readonly");
    const store = transaction.objectStore("SVGs");

    const request = store.get(id);

    request.onsuccess = (event: Event) => {
      resolve((event.target as IDBRequest).result?.svgData || null);
    };

    request.onerror = (event: Event) => {
      reject((event.target as IDBRequest).error);
    };
  });
}

let debounce: number | null = null;
export const queueSave = (editor: Editor) => {
  if (debounce && Date.now() - debounce < 2000) {
    return;
  }

  debounce = Date.now();
  const maxDimension = Math.max(
    editor.viewport.visibleRect.width,
    editor.viewport.visibleRect.height
  );
  const svg = editor.toSVG({ minDimension: maxDimension });
  saveSVG(document.location.href, svg.outerHTML).catch(console.error);
};
