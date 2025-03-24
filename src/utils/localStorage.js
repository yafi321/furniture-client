export const loadFromLocalStorage = (key, defaultValue) => {
    try {
        const savedData = localStorage.getItem(key);
        return savedData ? JSON.parse(savedData) : defaultValue;
    } catch (error) {
        console.error("Error loading from localStorage", error);
        return defaultValue;
    }
};

export const saveToLocalStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error("Error saving to localStorage", error);
    }
};
