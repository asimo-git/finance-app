import { useState, useRef } from "react";
import { Plus, X } from "lucide-react";
import {
    InputRow,
    InputRowRelative,
    TextInput,
    PriceInput,
    SecondButton,
    DropdownWrapper,
    DropdownItem,
    DropdownPrice,
} from "../styles";
import type { Item } from "../hooks/usePresets";

function fmt(price: number) {
    return price.toLocaleString("ru-RU") + " ₽";
}

interface Props {
    presets?: Item[];
    labelPlaceholder?: string;
    onAdd: (label: string, price: number) => void;
    onClose: () => void;
}

export default function AddItemForm({
    presets = [],
    labelPlaceholder = "Название…",
    onAdd,
    onClose,
}: Props) {
    const [draft, setDraft] = useState("");
    const [draftPrice, setDraftPrice] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const labelRef = useRef<HTMLInputElement>(null);

    const filteredPresets = presets.filter((p) =>
        draft ? p.label.toLowerCase().includes(draft.toLowerCase()) : true,
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const label = draft.trim();
        if (!label) return;
        const price = parseFloat(draftPrice) || 0;
        onAdd(label, price);
        setDraft("");
        setDraftPrice("");
    };

    const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDraft(e.target.value);
        setShowDropdown(!e.target.value);
    };

    const handleLabelFocus = () => {
        if (!draft) setShowDropdown(true);
    };

    const handleLabelBlur = () => {
        setTimeout(() => setShowDropdown(false), 120);
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

    const selectPreset = (label: string, price: number) => {
        setDraft(label);
        setDraftPrice(String(price));
        setShowDropdown(false);
        labelRef.current?.blur();
    };

    return (
        <InputRow onSubmit={handleSubmit}>
            <InputRowRelative>
                <TextInput
                    ref={labelRef}
                    autoFocus={presets.length === 0}
                    value={draft}
                    onChange={handleLabelChange}
                    onFocus={handleLabelFocus}
                    onBlur={handleLabelBlur}
                    placeholder={labelPlaceholder}
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
                    aria-label="Закрыть"
                    $bg="black"
                    onClick={onClose}
                >
                    <X size={14} strokeWidth={2.5} />
                </SecondButton>

                {showDropdown && filteredPresets.length > 0 && (
                    <DropdownWrapper>
                        {filteredPresets.map((p) => (
                            <DropdownItem
                                key={p.id}
                                onMouseDown={() =>
                                    selectPreset(p.label, p.price)
                                }
                            >
                                <span>{p.label}</span>
                                <DropdownPrice>{fmt(p.price)}</DropdownPrice>
                            </DropdownItem>
                        ))}
                    </DropdownWrapper>
                )}
            </InputRowRelative>
        </InputRow>
    );
}
