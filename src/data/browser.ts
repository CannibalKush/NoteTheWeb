/**
 * Browser storage utility functions for Firefox extension
 */

/**
 * Store a key-value pair in browser storage
 * @param key Storage key
 * @param value String value to store
 */
export async function storeValue(key: string, value: string): Promise<void> {
  try {
    await browser.storage.sync.set({ [key]: value });
  } catch (error) {
    console.error("Failed to store value:", error);
    return;
  }
}

/**
 * Retrieve a value from browser storage
 * @param key Storage key
 * @returns The stored string value, or null if not found
 */
export async function getValue(key: string): Promise<string | null> {
  try {
    const result = await browser.storage.sync.get(key);
    return result[key] || null;
  } catch (error) {
    console.error("Failed to retrieve value:", error);
    return null;
  }
}

/**
 * Remove a key-value pair from browser storage
 * @param key Storage key to remove
 */
export async function removeValue(key: string): Promise<void> {
  try {
    await browser.storage.sync.remove(key);
  } catch (error) {
    console.error("Failed to remove value:", error);
    return;
  }
}
