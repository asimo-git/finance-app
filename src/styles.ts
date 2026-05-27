import styled from "styled-components";

export const Screen = styled.div`
    min-height: 100dvh;
    background: ${(p) => p.theme.colors.mint};
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Inner = styled.div`
    width: 100%;
    max-width: 430px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
    align-items: stretch;
`;

export const Header = styled.header`
    width: 100%;
    max-width: 430px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 16px 8px;
`;

export const HeaderTitle = styled.h1`
    font-family: ${(p) => p.theme.fonts.display};
    font-size: 30px;
    font-weight: 700;
    color: ${(p) => p.theme.colors.orangeDark};
    margin: 0;
`;

export const MenuButton = styled.button`
    width: 42px;
    height: 42px;
    border-radius: ${(p) => p.theme.radius.md};
    background: rgba(28, 28, 28, 0.08);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(p) => p.theme.colors.ink};
    transition: background 140ms;
    &:hover {
        background: rgba(28, 28, 28, 0.14);
    }
    &:active {
        transform: scale(0.95);
    }
`;

export const Amount = styled.h2`
    font-family: ${(p) => p.theme.fonts.display};
    font-size: clamp(44px, 12vw, 60px);
    font-weight: 700;
    color: ${(p) => p.theme.colors.ink};
    letter-spacing: -2px;
    line-height: 1;
    text-align: center;
`;

export const ActionRow = styled.div`
    display: flex;
    gap: 16px;
    margin: 0 auto;
`;

export const MainButton = styled.button<{ $variant: "dark" | "orange" }>`
    width: 120px;
    height: 40px;
    border-radius: ${(p) => p.theme.radius.md};
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${(p) =>
        p.$variant === "dark" ? p.theme.colors.ink : p.theme.colors.orange};
    color: #fff;
    font-size: 26px;
    font-weight: 300;
    line-height: 1;
    transition:
        opacity 120ms,
        transform 80ms;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
    &:hover {
        opacity: 0.7;
    }
    &:active {
        transform: scale(0.93);
    }
`;

/////////////////////////////////////////////////////////
export const Card = styled.div`
    background: ${(p) => p.theme.colors.white};
    border-radius: ${(p) => p.theme.radius.xl};
    padding: 20px;
`;

export const CardHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
`;

export const Title = styled.h2`
    font-family: ${(p) => p.theme.fonts.body};
    font-size: 17px;
    font-weight: 600;
    color: ${(p) => p.theme.colors.ink};
`;

export const SecondButton = styled.button<{
    $bg?: string;
}>`
    width: 38px;
    height: 38px;
    border-radius: ${(p) => p.theme.radius.lg};
    background: ${(p) => p.$bg || p.theme.colors.orange};
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    transition:
        opacity 120ms,
        transform 80ms;
    flex-shrink: 0;

    &:active {
        transform: scale(0.92);
    }

    &:hover {
        opacity: 0.7;
    }
`;

export const Row = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 11px 0;
    border-bottom: 1px solid ${(p) => p.theme.colors.border};

    &:last-of-type {
        border-bottom: none;
    }
`;

export const Checkbox = styled.button<{ $checked: boolean }>`
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    border-radius: ${(p) => p.theme.radius.sm};
    border: 1.5px solid
        ${(p) =>
            p.$checked ? p.theme.colors.orange : p.theme.colors.borderStrong};
    background: ${(p) =>
        p.$checked ? p.theme.colors.orangePale : "transparent"};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 140ms;

    &:active {
        transform: scale(0.9);
    }
`;

export const ItemLabel = styled.span<{ $checked: boolean }>`
    font-family: ${(p) => p.theme.fonts.body};
    font-size: 14px;
    font-weight: 400;
    flex: 1;
    color: ${(p) =>
        p.$checked ? p.theme.colors.inkMuted : p.theme.colors.ink};
    text-decoration: ${(p) => (p.$checked ? "line-through" : "none")};
    transition: color 140ms;
    text-align: start;
`;

export const RemoveButton = styled.button`
    flex-shrink: 0;
    width: 24px;
    height: 24px;
    border-radius: ${(p) => p.theme.radius.full};
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(p) => p.theme.colors.inkMuted};
    opacity: 0;
    transition:
        opacity 140ms,
        color 140ms;

    ${Row}:hover & {
        opacity: 1;
    }

    &:hover {
        color: #d9534f;
    }
    &:active {
        transform: scale(0.88);
    }
`;

export const InputRow = styled.form`
    display: flex;
    gap: 8px;
    margin-top: 14px;
    padding-top: 14px;
    border-top: 1px solid ${(p) => p.theme.colors.border};
`;

export const TextInput = styled.input`
    flex: 1;
    min-width: 0;
    font-family: ${(p) => p.theme.fonts.body};
    font-size: 14px;
    color: ${(p) => p.theme.colors.ink};
    background: ${(p) => p.theme.colors.surface};
    border: 1.5px solid ${(p) => p.theme.colors.border};
    border-radius: ${(p) => p.theme.radius.lg};
    padding: 9px 14px;
    outline: none;
    transition: border-color 140ms;

    &::placeholder {
        color: ${(p) => p.theme.colors.inkMuted};
    }
    &:focus {
        border-color: ${(p) => p.theme.colors.ink};
    }
`;

export const Empty = styled.p`
    font-family: ${(p) => p.theme.fonts.body};
    font-size: 13px;
    color: ${(p) => p.theme.colors.inkMuted};
    text-align: center;
    padding: 16px 0 4px;
`;

export const PriceLabel = styled.span`
    font-size: 13px;
    font-weight: 500;
    color: ${(p) => p.theme.colors.inkMuted};
    white-space: nowrap;
`;

export const PriceInput = styled.input`
    width: 70px;
    font-family: ${(p) => p.theme.fonts.body};
    font-size: 14px;
    color: ${(p) => p.theme.colors.ink};
    background: ${(p) => p.theme.colors.surface};
    border: 1.5px solid ${(p) => p.theme.colors.border};
    border-radius: ${(p) => p.theme.radius.lg};
    padding: 9px 10px;
    outline: none;
    transition: border-color 140ms;
    &:focus {
        border-color: ${(p) => p.theme.colors.ink};
    }
`;

export const DropdownWrapper = styled.div`
    position: absolute;
    bottom: calc(100% + 4px);
    left: 0;
    right: 100px;
    background: ${(p) => p.theme.colors.white};
    border: 1px solid ${(p) => p.theme.colors.border};
    border-radius: ${(p) => p.theme.radius.lg};
    z-index: 10;
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`;

export const DropdownItem = styled.div`
    padding: 10px 14px;
    font-size: 14px;
    color: ${(p) => p.theme.colors.ink};
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    &:hover {
        background: ${(p) => p.theme.colors.surface};
    }
`;

export const DropdownPrice = styled.span`
    font-size: 12px;
    color: ${(p) => p.theme.colors.inkMuted};
    white-space: nowrap;
`;

export const InputRowRelative = styled.div`
    display: flex;
    gap: 8px;
    position: relative;
    width: 100%;
`;

export const EditInput = styled.input`
    flex: 1;
    font-family: ${(p) => p.theme.fonts.body};
    font-size: 14px;
    color: ${(p) => p.theme.colors.ink};
    background: transparent;
    border: none;
    outline: none;
    padding: 0;
`;

export const EditPriceInput = styled(PriceInput)`
    width: 72px;
    padding: 5px 8px;
    font-size: 13px;
`;

export const SaveButton = styled(MenuButton)`
    width: 28px;
    height: 28px;
    border-radius: ${(p) => p.theme.radius.sm};
    background: ${(p) => p.theme.colors.orangePale};
    color: ${(p) => p.theme.colors.orange};
`;
