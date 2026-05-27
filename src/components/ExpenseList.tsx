import { useState } from "react";
import { Check, Plus, X } from "lucide-react";
import {
    Card,
    CardHeader,
    Checkbox,
    Empty,
    ItemLabel,
    PriceLabel,
    RemoveButton,
    Row,
    SecondButton,
    Title,
} from "../styles";
import type { Item } from "../hooks/usePresets";
import AddItemForm from "./AddItemForm";
import { formatPrice } from "../helpers/helpers";

interface Props {
    onToggle: (price: number) => void;
    presets: Item[];
}

const SEED: Item[] = [
    { id: "1", label: "Upcoming Expenses", checked: true, price: 100 },
    { id: "2", label: "Full budget planner", checked: false, price: 100 },
    { id: "3", label: "Easy tracking", checked: false, price: 100 },
    { id: "4", label: "Smart notifications", checked: false, price: 100 },
    { id: "5", label: "Multi-currency", checked: false, price: 100 },
    { id: "6", label: "Multi-currency", checked: false, price: 100 },
    { id: "7", label: "Multi-currency", checked: false, price: 100 },
    { id: "8", label: "Multi-currency", checked: false, price: 100 },
    { id: "9", label: "Multi-currency", checked: false, price: 100 },
];

// --- пресеты ---
// const PRESETS = [
//     { label: "Аренда квартиры", price: 25000 },
//     { label: "Продукты", price: 8000 },
//     { label: "Транспорт", price: 3500 },
//     { label: "Коммунальные услуги", price: 4200 },
//     { label: "Интернет и связь", price: 900 },
//     { label: "Спортзал", price: 2500 },
//     { label: "Подписки", price: 1200 },
//     { label: "Медицина", price: 3000 },
// ];

export default function ExpenseList({ onToggle, presets }: Props) {
    const [items, setItems] = useState<Item[]>(SEED);
    const [open, setOpen] = useState(false);

    const handleToggle = (id: string, price: number) => {
        setItems((prev) =>
            prev.map((it) =>
                it.id === id ? { ...it, checked: !it.checked } : it,
            ),
        );
        onToggle(price);
    };

    const handleRemove = (id: string) =>
        setItems((prev) => prev.filter((it) => it.id !== id));

    return (
        <Card>
            <CardHeader>
                <Title>Запланировано:</Title>
                <SecondButton
                    onClick={() => {
                        setOpen((o) => !o);
                    }}
                    aria-label="Добавить"
                >
                    <Plus size={16} />
                </SecondButton>
            </CardHeader>

            {items.length === 0 && !open && (
                <Empty>Нет расходов — нажмите +</Empty>
            )}

            {items.map((item) => (
                <Row key={item.id}>
                    <Checkbox
                        $checked={Boolean(item.checked)}
                        onClick={() => handleToggle(item.id, item.price)}
                        aria-label="Отметить"
                    >
                        {item.checked && <Check size={12} strokeWidth={3} />}
                    </Checkbox>
                    <ItemLabel $checked={Boolean(item.checked)}>
                        {item.label}
                    </ItemLabel>
                    <PriceLabel>{formatPrice(item.price)}</PriceLabel>
                    <RemoveButton
                        onClick={() => handleRemove(item.id)}
                        aria-label="Удалить"
                    >
                        <X size={10} strokeWidth={2.5} />
                    </RemoveButton>
                </Row>
            ))}

            {open && (
                <AddItemForm
                    presets={presets}
                    labelPlaceholder="Название расхода…"
                    onAdd={(label, price) => {
                        setItems((prev) => [
                            ...prev,
                            {
                                id: crypto.randomUUID(),
                                label,
                                checked: false,
                                price,
                            },
                        ]);
                        setOpen(false);
                    }}
                    onClose={() => setOpen(false)}
                />
            )}
        </Card>
    );
}
