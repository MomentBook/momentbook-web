import crypto from "crypto";

function base64url(buf: Buffer) {
    return buf
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/g, "");
}

/**
 * publicId -> code
 * code = publicId.sig
 */
export function encodePublicIdToCode(publicId: string, secret: string) {
    // publicId 허용 문자 정책(추천): URL-safe만 허용
    // 너 publicId 포맷에 맞춰 조절 가능
    if (!/^[0-9a-zA-Z_-]{6,128}$/.test(publicId)) {
        throw new Error("publicId has invalid format");
    }

    const mac = crypto.createHmac("sha256", secret).update(publicId).digest();
    const sig = base64url(mac).slice(0, 12); // 10~16 추천
    return `${publicId}.${sig}`;
}

/**
 * code -> publicId
 * 검증 실패면 null
 */
export function decodeCodeToPublicId(
    code: string,
    secret: string,
): string | null {
    const idx = code.lastIndexOf(".");
    if (idx <= 0) return null;

    const publicId = code.slice(0, idx);
    const sig = code.slice(idx + 1);

    if (!/^[0-9a-zA-Z_-]{6,128}$/.test(publicId)) return null;
    if (!/^[0-9a-zA-Z_-]{10,16}$/.test(sig)) return null; // slice 길이와 맞추기

    const mac = crypto.createHmac("sha256", secret).update(publicId).digest();
    const expected = base64url(mac).slice(0, 12);

    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return null;
    if (!crypto.timingSafeEqual(a, b)) return null;

    return publicId;
}
