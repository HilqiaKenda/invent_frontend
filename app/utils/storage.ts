export const storage = {
  get: (key: string) => {
    if (typeof window === "undefined") return null;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },

  set: (key: string, value: any) => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
    }
  },

  remove: (key: string) => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(key);
  },

  clear: () => {
    if (typeof window === "undefined") return;
    localStorage.clear();
  },
};
