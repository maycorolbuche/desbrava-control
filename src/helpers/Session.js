const Session = {
  // --- LOCAL STORAGE ---
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },

  get(key, defaultValue = null) {
    const item = localStorage.getItem(key);
    try {
      return item !== null ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  },
};

export default Session;
