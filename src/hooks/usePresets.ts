import { useState } from "react";

export interface Item {
    id: string;
    label: string;
    checked?: boolean;
    price: number;
}

const DEFAULT_PRESETS: Item[] = [
    { id: "1", label: "Аренда квартиры", price: 25000 },
    { id: "2", label: "Продукты", price: 8000 },
    { id: "3", label: "Транспорт", price: 3500 },
    { id: "4", label: "Коммунальные услуги", price: 4200 },
    { id: "5", label: "Интернет и связь", price: 900 },
    { id: "6", label: "Спортзал", price: 2500 },
    { id: "7", label: "Подписки", price: 1200 },
    { id: "8", label: "Медицина", price: 3000 },
];

export function usePresets() {
    const [presets, setPresets] = useState<Item[]>(DEFAULT_PRESETS);

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
