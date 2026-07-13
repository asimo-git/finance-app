import { ArrowLeft } from "lucide-react";
import {
    Screen,
    Header,
    HeaderTitle,
    MenuButton,
    Inner,
    Card,
} from "../styles";
import styled from "styled-components";

const Section = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const Paragraph = styled.p`
    font-family: ${(p) => p.theme.fonts.body};
    font-size: 15px;
    line-height: 1.65;
    color: ${(p) => p.theme.colors.ink};
`;

const Highlight = styled.span`
    color: ${(p) => p.theme.colors.orange};
    font-weight: 600;
`;

interface Props {
    onBack: () => void;
}

export default function HelpPage({ onBack }: Props) {
    return (
        <Screen>
            <Header>
                <MenuButton onClick={onBack} aria-label="Назад">
                    <ArrowLeft size={18} />
                </MenuButton>
                <HeaderTitle>Справка</HeaderTitle>
                <div style={{ width: 42 }} />
            </Header>

            <Inner>
                <Card>
                    <Section>
                        <Paragraph>
                            <Highlight>
                                Добро пожаловать в банк психоджоулей!
                            </Highlight>
                        </Paragraph>

                        <Paragraph>
                            Это приложение поможет вам планировать повседневные
                            дела с учётом имеющихся у вас ресурсов.
                        </Paragraph>

                        <Paragraph>
                            Обычно составляя список дел на день, мы вносим в
                            него только необходимые вещи, формируя список
                            требований, но не поощрений. Наш внутренний ресурс
                            тратится на выполнение этих дел, и мы редко
                            учитываем то, что помогает его восполнить.
                        </Paragraph>

                        <Paragraph>
                            Мы предлагаем попробовать другой подход: оценивайте
                            каждое дело в условных единицах — давайте будем
                            называть их <Highlight>психоджоулями</Highlight>.
                            Сколько сил у вас отнимет получасовая уборка? А
                            часовая тренировка? Конечно, если тренировка
                            приносит вам удовольствие, она может не отнимать
                            ресурс, а прибавлять его! Ориентируйтесь на
                            собственные ощущения.
                        </Paragraph>

                        <Paragraph>
                            Представьте это как игру: у вас есть стартовый
                            баланс; некоторые дела его уменьшают, другие —
                            увеличивают. Старайтесь не уходить в минус — кредиты
                            банка психоджоулей выглядят заманчиво, но{" "}
                            <Highlight>проценты по ним высоки</Highlight> и
                            часто незаметны. Они почти так же плохи, как
                            микрозаймы!
                        </Paragraph>

                        <Paragraph>
                            Берегите свои психоджоули: немного пополнений — и
                            жизнь станет легче.
                        </Paragraph>
                    </Section>
                </Card>
            </Inner>
        </Screen>
    );
}
