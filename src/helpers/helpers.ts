export function formatPrice(price: number) {
    return price.toLocaleString("ru-RU") + " ₽";
}

export function parseValue(value: string) {
    if (!value) return 0;
    const normalized = value.replace(",", ".");
    const num = Number(normalized);
    return Number.isFinite(num) ? num : 0;
}
