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
import { useLocalStorage } from "../hooks/useLocalStorage";

interface Props {
    onToggle: (price: number, checked: boolean) => void;
    presets: Item[];
}

const SEED: Item[] = [
    { id: "1", label: "Помыть полы", checked: true, price: -10 },
    { id: "2", label: "Встретиться с друзьями", checked: false, price: +90 },
];

export default function ExpenseList({ onToggle, presets }: Props) {
    const [items, setItems] = useLocalStorage<Item[]>(
        "app:expense-items",
        SEED,
    );
    const [open, setOpen] = useState(false);

    const handleToggle = (id: string, price: number, checked: boolean) => {
        setItems((prev) =>
            prev.map((it) => (it.id === id ? { ...it, checked } : it)),
        );
        onToggle(price, checked);
    };

    const handleOpen = () => {
        setOpen(true);
        requestAnimationFrame(() => {
            window.scrollTo({
                top: document.body.scrollHeight,
            });
        });
    };

    const handleRemove = (id: string) =>
        setItems((prev) => prev.filter((it) => it.id !== id));

    return (
        <Card>
            <CardHeader>
                <Title>Запланировано:</Title>
                <SecondButton onClick={handleOpen} aria-label="Добавить">
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
                        onClick={() =>
                            handleToggle(item.id, item.price, !item.checked)
                        }
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
