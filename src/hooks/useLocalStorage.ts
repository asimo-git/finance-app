import { useState, useCallback } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(() => {
        try {
            const stored = localStorage.getItem(key);
            return stored ? (JSON.parse(stored) as T) : initialValue;
        } catch {
            return initialValue;
        }
    });

    const [error, setError] = useState<string | null>(null);

    const set = useCallback(
        (next: T | ((prev: T) => T)) => {
            setValue((prev) => {
                const nextValue =
                    typeof next === "function"
                        ? (next as (prev: T) => T)(prev)
                        : next;
                try {
                    localStorage.setItem(key, JSON.stringify(nextValue));
                    setError(null);
                } catch (e) {
                    setError(
                        e instanceof Error
                            ? e.message
                            : "Ошибка сохранения данных",
                    );
                }
                return nextValue;
            });
        },
        [key],
    );

    return [value, set, error] as const;
}
