import { useState } from "react";
import {
    AddButton,
    Card,
    CardHeader,
    Checkbox,
    Empty,
    InputRow,
    ItemLabel,
    RemoveButton,
    Row,
    SubmitButton,
    TextInput,
    Title,
} from "../styles";

export interface Item {
    id: string;
    label: string;
    checked: boolean;
}

interface Props {
    items: Item[];
    onToggle: (id: string) => void;
    onAdd: (label: string) => void;
    onRemove: (id: string) => void;
}

/* ── CheckIcon ─────────────────────────────────────────────────────────── */
const Check = () => (
    <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
    >
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const Plus = () => (
    <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
    >
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

const X = () => (
    <svg
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
    >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

/* ── Component ─────────────────────────────────────────────────────────── */
export default function ExpenseList({
    items,
    onToggle,
    onAdd,
    onRemove,
}: Props) {
    const [draft, setDraft] = useState("");
    const [open, setOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const t = draft.trim();
        if (!t) return;
        onAdd(t);
        setDraft("");
    };

    return (
        <Card>
            <CardHeader>
                <Title>Запланировано:</Title>
                <AddButton
                    onClick={() => setOpen((o) => !o)}
                    aria-label="Добавить"
                >
                    <Plus />
                </AddButton>
            </CardHeader>

            {items.length === 0 && !open && (
                <Empty>Нет расходов — нажмите +</Empty>
            )}

            {items.map((item) => (
                <Row key={item.id}>
                    <Checkbox
                        $checked={item.checked}
                        onClick={() => onToggle(item.id)}
                        aria-label="Отметить"
                    >
                        {item.checked && <Check />}
                    </Checkbox>
                    <ItemLabel $checked={item.checked}>{item.label}</ItemLabel>
                    <RemoveButton
                        onClick={() => onRemove(item.id)}
                        aria-label="Удалить"
                    >
                        <X />
                    </RemoveButton>
                </Row>
            ))}

            {open && (
                <InputRow onSubmit={handleSubmit}>
                    <TextInput
                        autoFocus
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        placeholder="Название расхода…"
                    />
                    <SubmitButton type="submit" aria-label="Добавить">
                        <Plus />
                    </SubmitButton>
                </InputRow>
            )}
        </Card>
    );
}
