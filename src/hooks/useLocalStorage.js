import { useState } from "react";

// https://usehooks.com/useLocalStorage/
function useLocalStorage(key, initialValue) {

    const [storedValue, setStoredValue] = useState(() => {
        const item = window.localStorage.getItem(key);

        if (item !== null && item !== "undefined") {
            return JSON.parse(item);
        } else {
            window.localStorage.setItem(key, JSON.stringify(initialValue));
            return initialValue;
        }
    });

    const setValue = value => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            // Save state
            setStoredValue(valueToStore);
            // Save to local storage
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error);
        }
    };

    return [storedValue, setValue];
}

export default useLocalStorage;
