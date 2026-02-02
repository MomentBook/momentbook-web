export const ENV = {
    APP_ENV: process.env.NEXT_PUBLIC_APP_ENV as "production" | "development",
    APP_IS_LOCAL: Boolean(process.env.NEXT_PUBLIC_APP_IS_LOCAL) as true | false,
    API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL as string,

    NEXT_PUBLIC_FIREBASE_API_KEY: process.env
        .NEXT_PUBLIC_FIREBASE_API_KEY as string,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env
        .NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env
        .NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env
        .NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env
        .NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID as string,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env
        .NEXT_PUBLIC_FIREBASE_APP_ID as string,
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: process.env
        .NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID as string,
} as const;
