import { useRef, useState } from "react";
import { Check, Plus, X } from "lucide-react";
import {
    Card,
    CardHeader,
    Checkbox,
    DropdownItem,
    DropdownPrice,
    DropdownWrapper,
    Empty,
    InputRow,
    InputRowRelative,
    ItemLabel,
    PriceInput,
    PriceLabel,
    RemoveButton,
    Row,
    SecondButton,
    TextInput,
    Title,
} from "../styles";

export interface Item {
    id: string;
    label: string;
    checked: boolean;
    price: number;
}

interface Props {
    onToggle: (price: number) => void;
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

function fmt(price: number) {
    return price.toLocaleString("ru-RU") + " ₽";
}

// --- пресеты ---
const PRESETS = [
    { label: "Аренда квартиры", price: 25000 },
    { label: "Продукты", price: 8000 },
    { label: "Транспорт", price: 3500 },
    { label: "Коммунальные услуги", price: 4200 },
    { label: "Интернет и связь", price: 900 },
    { label: "Спортзал", price: 2500 },
    { label: "Подписки", price: 1200 },
    { label: "Медицина", price: 3000 },
];

export default function ExpenseList({ onToggle }: Props) {
    const [items, setItems] = useState<Item[]>(SEED);
    const [open, setOpen] = useState(false);
    const [draft, setDraft] = useState("");
    const [draftPrice, setDraftPrice] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const labelRef = useRef<HTMLInputElement>(null);

    const filteredPresets = PRESETS.filter((p) =>
        draft ? p.label.toLowerCase().includes(draft.toLowerCase()) : true,
    );

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const label = draft.trim();
        const price = parseFloat(draftPrice) || 0;
        if (!label) return;
        setItems((prev) => [
            ...prev,
            { id: crypto.randomUUID(), label, checked: false, price },
        ]);
        setDraft("");
        setDraftPrice("");
        setOpen(false);
        setShowDropdown(false);
    };

    const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDraft(e.target.value);
        if (!e.target.value) {
            setShowDropdown(true);
        } else {
            setShowDropdown(false);
        }
    };

    const handleLabelFocus = () => {
        // при фокусе на пустом поле — показываем дропдаун
        if (!draft) setShowDropdown(true);
    };

    const handleLabelBlur = () => {
        // небольшая задержка, чтобы onMouseDown на пункте успел сработать
        setTimeout(() => setShowDropdown(false), 120);
    };

    const selectPreset = (label: string, price: number) => {
        setDraft(label);
        setDraftPrice(String(price));
        setShowDropdown(false);
        labelRef.current?.blur();
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (value === "" || value === "-") {
            setDraftPrice(value);
            return;
        }

        if (/^-?\d*$/.test(value)) {
            setDraftPrice(value);
        }
    };

    return (
        <Card>
            <CardHeader>
                <Title>Запланировано:</Title>
                <SecondButton
                    onClick={() => {
                        setOpen((o) => !o);
                        setDraft("");
                        setDraftPrice("");
                        setShowDropdown(false);
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
                        $checked={item.checked}
                        onClick={() => handleToggle(item.id, item.price)}
                        aria-label="Отметить"
                    >
                        {item.checked && <Check size={12} strokeWidth={3} />}
                    </Checkbox>
                    <ItemLabel $checked={item.checked}>{item.label}</ItemLabel>
                    <PriceLabel>{fmt(item.price)}</PriceLabel>
                    <RemoveButton
                        onClick={() => handleRemove(item.id)}
                        aria-label="Удалить"
                    >
                        <X size={10} strokeWidth={2.5} />
                    </RemoveButton>
                </Row>
            ))}

            {open && (
                <InputRow onSubmit={handleSubmit}>
                    <InputRowRelative>
                        <TextInput
                            ref={labelRef}
                            autoFocus
                            value={draft}
                            onChange={handleLabelChange}
                            onFocus={handleLabelFocus}
                            onBlur={handleLabelBlur}
                            placeholder="Название расхода…"
                            autoComplete="off"
                        />
                        <PriceInput
                            value={draftPrice}
                            onChange={handlePriceChange}
                            placeholder="Цена"
                        />
                        <SecondButton type="submit" aria-label="Добавить">
                            <Plus size={14} strokeWidth={2.5} />
                        </SecondButton>
                        <SecondButton
                            type="button"
                            aria-label="Закрыть добавление"
                            $bg="black"
                            onClick={() => setOpen(false)}
                        >
                            <X size={14} strokeWidth={2.5} />
                        </SecondButton>

                        {showDropdown && filteredPresets.length > 0 && (
                            <DropdownWrapper>
                                {filteredPresets.map((p) => (
                                    <DropdownItem
                                        key={p.label}
                                        onMouseDown={() =>
                                            selectPreset(p.label, p.price)
                                        }
                                    >
                                        <span>{p.label}</span>
                                        <DropdownPrice>
                                            {fmt(p.price)}
                                        </DropdownPrice>
                                    </DropdownItem>
                                ))}
                            </DropdownWrapper>
                        )}
                    </InputRowRelative>
                </InputRow>
            )}
        </Card>
    );
}
