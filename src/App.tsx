import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme/theme";
import ExpenseList, { type Item } from "./components/ExpenseList";
import {
    ActionRow,
    Amount,
    MainButton,
    Inner,
    Screen,
    MenuButton,
    Header,
    HeaderTitle,
} from "./styles";
import { Menu } from "lucide-react";
import "./index.css";

const SEED: Item[] = [
    { id: "1", label: "Upcoming Expenses", checked: true },
    { id: "2", label: "Full budget planner", checked: false },
    { id: "3", label: "Easy tracking", checked: false },
    { id: "4", label: "Smart notifications", checked: false },
    { id: "5", label: "Multi-currency", checked: false },
];

function App() {
    const [balance, setBalance] = useState(516_000);
    const [items, setItems] = useState<Item[]>(SEED);

    const handleToggle = (id: string) =>
        setItems((prev) =>
            prev.map((it) =>
                it.id === id ? { ...it, checked: !it.checked } : it,
            ),
        );

    const handleAdd = (label: string) =>
        setItems((prev) => [
            { id: crypto.randomUUID(), label, checked: false },
            ...prev,
        ]);

    const handleRemove = (id: string) =>
        setItems((prev) => prev.filter((it) => it.id !== id));

    return (
        <ThemeProvider theme={theme}>
            <Screen>
                <Header>
                    <HeaderTitle>Ваш ресурс</HeaderTitle>

                    <MenuButton aria-label="Menu">
                        <Menu size={18} />
                    </MenuButton>
                </Header>
                <Inner>
                    <Amount>{balance}</Amount>
                    <ActionRow>
                        <MainButton
                            $variant="dark"
                            aria-label="Minus"
                            onClick={() => setBalance((b) => b - 1000)}
                        >
                            −
                        </MainButton>
                        <MainButton
                            $variant="orange"
                            aria-label="Plus"
                            onClick={() => setBalance((b) => b + 1000)}
                        >
                            +
                        </MainButton>
                    </ActionRow>

                    <ExpenseList
                        items={items}
                        onToggle={handleToggle}
                        onAdd={handleAdd}
                        onRemove={handleRemove}
                    />
                </Inner>
            </Screen>
        </ThemeProvider>
    );
}

export default App;
