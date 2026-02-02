const ALPHABET =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const BASE = BigInt(ALPHABET.length);

export function hexToBase62(hex: string): string {
    if (!/^[0-9a-fA-F]+$/.test(hex)) throw new Error("Invalid hex");
    let num = BigInt("0x" + hex);

    if (num === 0n) return "0";

    let out = "";
    while (num > 0n) {
        const rem = Number(num % BASE);
        out = ALPHABET[rem] + out;
        num = num / BASE;
    }
    return out;
}

export function base62ToHex(b62: string): string {
    let num = 0n;
    for (const ch of b62) {
        const idx = ALPHABET.indexOf(ch);
        if (idx === -1) throw new Error("Invalid base62");
        num = num * BASE + BigInt(idx);
    }

    // Mongo ObjectId는 12 bytes = 24 hex 고정
    let hex = num.toString(16);
    hex = hex.padStart(24, "0");
    return hex;
}
