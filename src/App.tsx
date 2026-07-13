import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme/theme";
import { usePresets } from "./hooks/usePresets";
import ExpenseList from "./components/ExpenseList";
import MenuDrawer from "./components/MenuDrawer";
import PresetsPage from "./components/PresetsPage";
import {
    Amount,
    Inner,
    Screen,
    MenuButton,
    Header,
    HeaderTitle,
} from "./styles";
import { Menu } from "lucide-react";
import "./index.css";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { QuantityControl } from "./components/QuantityControl";
import HelpPage from "./components/HelpPage";

export type View = "main" | "presets" | "help";

function App() {
    const [balance, setBalance] = useLocalStorage<number>("app:balance", 100);
    const [view, setView] = useState<View>("main");
    const [menuOpen, setMenuOpen] = useState(false);
    const { presets, add, remove, update } = usePresets();

    const handleToggle = (price: number, checked: boolean) =>
        setBalance((b) => (checked ? b + price : b - price));

    return (
        <ThemeProvider theme={theme}>
            {view === "presets" && (
                <PresetsPage
                    presets={presets}
                    onAdd={add}
                    onRemove={remove}
                    onUpdate={update}
                    onBack={() => setView("main")}
                />
            )}

            {view === "main" && (
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
                        <QuantityControl
                            onChange={(delta) =>
                                setBalance((prev) => prev + delta)
                            }
                        />

                        <ExpenseList
                            onToggle={handleToggle}
                            presets={presets}
                        />
                    </Inner>

                    <MenuDrawer
                        visible={menuOpen}
                        onClose={() => setMenuOpen(false)}
                        onChooseItem={(item) => setView(item)}
                    />
                </Screen>
            )}

            {view === "help" && <HelpPage onBack={() => setView("main")} />}
        </ThemeProvider>
    );
}

export default App;
