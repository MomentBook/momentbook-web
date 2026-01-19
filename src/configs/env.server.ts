export const ENV = {
    APP_ENV: process.env.NEXT_PUBLIC_APP_ENV as "production" | "development",
    APP_IS_LOCAL: Boolean(process.env.NEXT_PUBLIC_APP_IS_LOCAL) as true | false,
    API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL as string,
} as const;
