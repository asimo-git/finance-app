import { useState } from "react";
import { ArrowLeft, Plus, X, Check } from "lucide-react";
import {
    Screen,
    Header,
    HeaderTitle,
    MenuButton,
    Inner,
    Card,
    CardHeader,
    Title,
    Row,
    ItemLabel,
    RemoveButton,
    Empty,
    SecondButton,
    EditInput,
    EditPriceInput,
    SaveButton,
    PriceLabel,
} from "../styles";
import AddItemForm from "./AddItemForm";
import type { Item } from "../hooks/usePresets";
import { formatPrice } from "../helpers/helpers";

interface EditState {
    id: string;
    label: string;
    price: string;
}

interface Props {
    presets: Item[];
    onAdd: (label: string, price: number) => void;
    onRemove: (id: string) => void;
    onUpdate: (id: string, label: string, price: number) => void;
    onBack: () => void;
}

export default function PresetsPage({
    presets,
    onAdd,
    onRemove,
    onUpdate,
    onBack,
}: Props) {
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<EditState | null>(null);

    const startEdit = (p: Item) =>
        setEditing({ id: p.id, label: p.label, price: String(p.price) });

    const commitEdit = () => {
        if (!editing) return;
        const label = editing.label.trim();
        const price = parseFloat(editing.price) || 0;
        if (label) onUpdate(editing.id, label, price);
        setEditing(null);
    };

    return (
        <Screen>
            <Header>
                <MenuButton onClick={onBack} aria-label="Назад">
                    <ArrowLeft size={18} />
                </MenuButton>
                <HeaderTitle>Категории</HeaderTitle>
            </Header>

            <Inner>
                <Card>
                    <CardHeader>
                        <Title>Мои категории</Title>
                        <SecondButton
                            onClick={() => setOpen((o) => !o)}
                            aria-label="Добавить"
                        >
                            <Plus size={16} />
                        </SecondButton>
                    </CardHeader>

                    {presets.length === 0 && !open && (
                        <Empty>Нет категорий — нажмите +</Empty>
                    )}

                    {presets.map((p) =>
                        editing?.id === p.id ? (
                            <Row
                                key={p.id}
                                onBlur={(e) => {
                                    if (
                                        e.currentTarget.contains(
                                            e.relatedTarget,
                                        )
                                    )
                                        return;
                                    commitEdit();
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") commitEdit();
                                    if (e.key === "Escape") setEditing(null);
                                }}
                            >
                                <EditInput
                                    autoFocus
                                    value={editing.label}
                                    onChange={(e) =>
                                        setEditing((s) =>
                                            s
                                                ? {
                                                      ...s,
                                                      label: e.target.value,
                                                  }
                                                : s,
                                        )
                                    }
                                />
                                <EditPriceInput
                                    value={editing.price}
                                    onChange={(e) =>
                                        setEditing((s) =>
                                            s
                                                ? {
                                                      ...s,
                                                      price: e.target.value,
                                                  }
                                                : s,
                                        )
                                    }
                                />
                                <SaveButton
                                    onClick={commitEdit}
                                    aria-label="Сохранить"
                                >
                                    <Check size={14} />
                                </SaveButton>
                            </Row>
                        ) : (
                            <Row
                                key={p.id}
                                onClick={() => startEdit(p)}
                                style={{ cursor: "pointer" }}
                            >
                                <ItemLabel $checked={false}>
                                    {p.label}
                                </ItemLabel>
                                <PriceLabel>{formatPrice(p.price)}</PriceLabel>
                                <RemoveButton
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onRemove(p.id);
                                    }}
                                    aria-label="Удалить"
                                >
                                    <X size={10} strokeWidth={2.5} />
                                </RemoveButton>
                            </Row>
                        ),
                    )}

                    {open && (
                        <AddItemForm
                            labelPlaceholder="Название категории…"
                            onAdd={(label, price) => {
                                onAdd(label, price);
                                setOpen(false);
                            }}
                            onClose={() => setOpen(false)}
                        />
                    )}
                </Card>
            </Inner>
        </Screen>
    );
}
