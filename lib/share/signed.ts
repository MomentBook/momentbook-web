import crypto from "crypto";
import { base62ToHex, hexToBase62 } from "./base62";

function base64url(buf: Buffer) {
    return buf
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/g, "");
}

/**
 * journeyId(ObjectId hex) -> short code
 * ex) "65f1..." -> "4fZkQp....aB3dE.xYz12AbCdEfG"
 */
export function encodeJourneyIdToCode(journeyIdHex: string, secret: string) {
    if (!/^[0-9a-f]{24}$/i.test(journeyIdHex)) {
        throw new Error("journeyIdHex must be a 24-hex Mongo ObjectId");
    }

    const payload = hexToBase62(journeyIdHex);
    const mac = crypto.createHmac("sha256", secret).update(payload).digest();
    const sig = base64url(mac).slice(0, 12); // 10~16 추천
    return `${payload}.${sig}`;
}

/**
 * short code -> journeyId(ObjectId hex)
 * 검증 실패/형식 오류면 null
 */
export function decodeCodeToJourneyId(
    code: string,
    secret: string,
): string | null {
    const [payload, sig] = code.split(".");
    if (!payload || !sig) return null;

    // payload 검증: base62 문자만
    if (!/^[0-9a-zA-Z]+$/.test(payload)) return null;
    if (!/^[0-9a-zA-Z_-]+$/.test(sig)) return null;

    // 서명 검증
    const mac = crypto.createHmac("sha256", secret).update(payload).digest();
    const expected = base64url(mac).slice(0, 12);

    // timing-safe compare
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return null;
    if (!crypto.timingSafeEqual(a, b)) return null;

    try {
        const journeyIdHex = base62ToHex(payload);
        // 최종 ObjectId 형태 체크
        if (!/^[0-9a-f]{24}$/i.test(journeyIdHex)) return null;
        return journeyIdHex.toLowerCase();
    } catch {
        return null;
    }
}
