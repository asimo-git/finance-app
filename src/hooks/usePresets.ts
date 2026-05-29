import { useLocalStorage } from "./useLocalStorage";

export interface Item {
    id: string;
    label: string;
    checked?: boolean;
    price: number;
}

const DEFAULT_PRESETS: Item[] = [
    { id: "1", label: "Сходить на работу", price: -80 },
    { id: "2", label: "Почитать", price: +40 },
];

export function usePresets() {
    const [presets, setPresets] = useLocalStorage<Item[]>(
        "app:presets",
        DEFAULT_PRESETS,
    );

    const add = (label: string, price: number) =>
        setPresets((prev) => [
            ...prev,
            { id: crypto.randomUUID(), label, price },
        ]);

    const remove = (id: string) =>
        setPresets((prev) => prev.filter((p) => p.id !== id));

    const update = (id: string, label: string, price: number) =>
        setPresets((prev) =>
            prev.map((p) => (p.id === id ? { ...p, label, price } : p)),
        );

    return { presets, add, remove, update };
}
