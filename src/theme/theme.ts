import "styled-components";

export const theme = {
    colors: {
        mint: "#D6E8D5",
        mintDark: "#C4DCBF",
        white: "#FFFFFF",
        surface: "#F7F9F7",
        orange: "#F4A261",
        orangePale: "#FDDBB8",
        orangeDark: "#E07B35",
        ink: "#1C1C1C",
        inkMed: "#444444",
        inkLight: "#888888",
        inkMuted: "#BBBBBB",
        border: "rgba(28,28,28,0.10)",
        borderStrong: "rgba(28,28,28,0.20)",
    },
    fonts: {
        display: `'Manrope', sans-serif`,
        body: `'Onest', sans-serif`,
    },
    radius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        full: "9999px",
    },
} as const;

export type AppTheme = typeof theme;

declare module "styled-components" {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    export interface DefaultTheme extends AppTheme {}
}
