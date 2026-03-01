import { SignJWT, jwtVerify, JWTPayload } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.JWT_SECRET || "super-secret-key-for-ustatap";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: JWTPayload) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(key);
}

export async function decrypt(input: string): Promise<JWTPayload> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"],
    });
    return payload;
}

export async function setSession(user: { id: string; email: string; role: string; name: string }) {
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const session = await encrypt({ user, expires });

    const cookieStore = await cookies();
    cookieStore.set("session", session, {
        expires,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    });
}

export async function getSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;
    if (!session) return null;

    try {
        const payload = await decrypt(session);
        return payload as unknown as { user: { id: string; email: string; role: string; name: string } };
    } catch {
        return null;
    }
}

export async function clearSession() {
    const cookieStore = await cookies();
    cookieStore.set("session", "", {
        expires: new Date(0),
        path: "/",
    });
}
