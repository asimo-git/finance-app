import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme/theme";
import { usePresets } from "./hooks/usePresets";
import ExpenseList from "./components/ExpenseList";
import MenuDrawer from "./components/MenuDrawer";
import PresetsPage from "./components/PresetsPage";
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
import { useLocalStorage } from "./hooks/useLocalStorage";

type View = "main" | "presets";

function App() {
    const [balance, setBalance] = useLocalStorage<number>("app:balance", 100);
    const [view, setView] = useState<View>("main");
    const [menuOpen, setMenuOpen] = useState(false);
    const { presets, add, remove, update } = usePresets();

    const handleToggle = (price: number) => setBalance((b) => b + price);

    if (view === "presets") {
        return (
            <ThemeProvider theme={theme}>
                <PresetsPage
                    presets={presets}
                    onAdd={add}
                    onRemove={remove}
                    onUpdate={update}
                    onBack={() => setView("main")}
                />
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <Screen>
                <Header>
                    <HeaderTitle>Ваш ресурс</HeaderTitle>
                    <MenuButton
                        aria-label="Menu"
                        onClick={() => setMenuOpen(true)}
                    >
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

                    <ExpenseList onToggle={handleToggle} presets={presets} />
                </Inner>

                <MenuDrawer
                    visible={menuOpen}
                    onClose={() => setMenuOpen(false)}
                    onOpenPresets={() => setView("presets")}
                />
            </Screen>
        </ThemeProvider>
    );
}

export default App;
