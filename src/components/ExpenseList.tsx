import { useState } from "react";
import { Check, Plus, X } from "lucide-react";
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
                        {item.checked && <Check size={12} strokeWidth={3} />}
                    </Checkbox>
                    <ItemLabel $checked={item.checked}>{item.label}</ItemLabel>
                    <RemoveButton
                        onClick={() => onRemove(item.id)}
                        aria-label="Удалить"
                    >
                        <X size={10} strokeWidth={2.5} />
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
                        <Plus size={14} strokeWidth={2.5} />
                    </SubmitButton>
                </InputRow>
            )}
        </Card>
    );
}
