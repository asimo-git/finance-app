import { useEffect, useRef } from "react";
import styled from "styled-components";
import { HelpCircle, Settings2 } from "lucide-react";
import type { View } from "../App";

const Backdrop = styled.div<{ $visible: boolean }>`
    position: fixed;
    inset: 0;
    z-index: 100;
    background: rgba(0, 0, 0, ${(p) => (p.$visible ? "0.25" : "0")});
    transition: background 200ms;
    pointer-events: ${(p) => (p.$visible ? "all" : "none")};
`;

const Drawer = styled.div<{ $visible: boolean }>`
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%)
        translateY(${(p) => (p.$visible ? "0" : "-100%")});
    width: 100%;
    max-width: 430px;
    background: ${(p) => p.theme.colors.white};
    border-radius: 0 0 ${(p) => p.theme.radius.xl} ${(p) => p.theme.radius.xl};
    padding: 56px 16px 20px;
    z-index: 101;
    transition: transform 260ms cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
`;

const MenuItem = styled.button`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 12px;
    background: transparent;
    border: none;
    border-radius: ${(p) => p.theme.radius.md};
    cursor: pointer;
    text-align: left;
    transition: background 120ms;
    &:hover {
        background: ${(p) => p.theme.colors.surface};
    }
    &:active {
        transform: scale(0.98);
    }
`;

const MenuItemIcon = styled.div`
    width: 36px;
    height: 36px;
    border-radius: ${(p) => p.theme.radius.md};
    background: ${(p) => p.theme.colors.orangePale};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${(p) => p.theme.colors.orange};
    flex-shrink: 0;
`;

const MenuItemLabel = styled.span`
    font-family: ${(p) => p.theme.fonts.body};
    font-size: 15px;
    font-weight: 500;
    color: ${(p) => p.theme.colors.ink};
`;

const MenuItemSub = styled.span`
    font-family: ${(p) => p.theme.fonts.body};
    font-size: 12px;
    color: ${(p) => p.theme.colors.inkMuted};
    display: block;
    margin-top: 1px;
`;

interface Props {
    visible: boolean;
    onClose: () => void;
    onChooseItem: (item: View) => void;
}

export default function MenuDrawer({ visible, onClose, onChooseItem }: Props) {
    const drawerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!visible) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [visible, onClose]);

    return (
        <Backdrop $visible={visible} onClick={onClose}>
            <Drawer
                $visible={visible}
                ref={drawerRef}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label="Меню"
            >
                <MenuItem
                    onClick={() => {
                        onClose();
                        onChooseItem("presets");
                    }}
                >
                    <MenuItemIcon>
                        <Settings2 size={18} />
                    </MenuItemIcon>
                    <div>
                        <MenuItemLabel>Категории расходов</MenuItemLabel>
                        <MenuItemSub>
                            Настройте список быстрого выбора
                        </MenuItemSub>
                    </div>
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        onClose();
                        onChooseItem("help");
                    }}
                >
                    <MenuItemIcon>
                        <HelpCircle size={18} />
                    </MenuItemIcon>
                    <div>
                        <MenuItemLabel>Как этим пользоваться?</MenuItemLabel>
                        <MenuItemSub>Введение в банк психоджоулей</MenuItemSub>
                    </div>
                </MenuItem>
            </Drawer>
        </Backdrop>
    );
}
