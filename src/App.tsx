import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme/theme";
import ExpenseList from "./components/ExpenseList";
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

function App() {
    const [balance, setBalance] = useState(100);

    const handleToggle = (price: number) => setBalance((b) => b + price);

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

                    <ExpenseList onToggle={handleToggle} />
                </Inner>
            </Screen>
        </ThemeProvider>
    );
}

export default App;
