class StorageService {
  static setItem(
    key: string,
    value: string | object,
    isSessionStorage: boolean = true,
  ): void {
    if (typeof window !== 'undefined') {
      const storage = isSessionStorage
        ? window.localStorage
        : window.sessionStorage;
      const valueToStore =
        typeof value === 'string' ? value : JSON.stringify(value);
      storage.setItem(key, valueToStore);
    }
  }

  static getItem(
    key: string,
    isSessionStorage: boolean = true,
  ): string | object | null {
    if (typeof window !== 'undefined') {
      const storage = isSessionStorage
        ? window.localStorage
        : window.sessionStorage;
      const item = storage.getItem(key);
      try {
        return JSON.parse(item || '');
      } catch {
        return item;
      }
    }
    return null;
  }

  static removeItem(key: string, isSessionStorage: boolean = true): void {
    if (typeof window !== 'undefined') {
      const storage = isSessionStorage
        ? window.localStorage
        : window.sessionStorage;
      storage.removeItem(key);
    }
  }
}

export default StorageService;
