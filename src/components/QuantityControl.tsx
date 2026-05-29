import { useState } from "react";
import { ActionRow, AmountInput, CollapsedButton, SideButton } from "../styles";
import { parseValue } from "../helpers/helpers";

interface Props {
    onChange: (delta: number) => void;
}

export function QuantityControl({ onChange }: Props) {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState("");

    const commit = (raw: string) => {
        const delta = parseValue(raw);
        if (delta !== 0) onChange(delta);
        setValue("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            commit(value);
            setIsEditing(false);
        }

        if (e.key === "Escape") {
            setIsEditing(false);
            setValue("");
        }
    };

    const handleChange = (type: "add" | "subtract") => {
        const delta = parseValue(value) || 0;
        onChange(type === "add" ? delta : -delta);
        setIsEditing(false);
        setValue("");
    };

    return (
        <ActionRow $editing={isEditing}>
            {!isEditing ? (
                <CollapsedButton
                    onClick={() => setIsEditing(true)}
                    $variant="orange"
                >
                    + / −
                </CollapsedButton>
            ) : (
                <>
                    <SideButton
                        $variant="dark"
                        onClick={() => handleChange("subtract")}
                    >
                        −
                    </SideButton>

                    <AmountInput
                        autoFocus
                        value={value}
                        onChange={(e) => {
                            setValue(
                                e.target.value.replace(/[^0-9+\-.,]/g, ""),
                            );
                        }}
                        inputMode="numeric"
                        onKeyDown={handleKeyDown}
                    />

                    <SideButton
                        $variant="orange"
                        onClick={() => handleChange("add")}
                    >
                        +
                    </SideButton>
                </>
            )}
        </ActionRow>
    );
}
