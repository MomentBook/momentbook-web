"use client";

import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { ENV } from "@/src/configs/env.client";

const firebaseConfig = {
    apiKey: ENV.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: ENV.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: ENV.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket: ENV.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: ENV.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    appId: ENV.NEXT_PUBLIC_FIREBASE_APP_ID!,
    measurementId: ENV.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID, // optional
};

export function getFirebaseApp(): FirebaseApp {
    return getApps().length ? getApp() : initializeApp(firebaseConfig);
}

export const firebaseApp = getFirebaseApp();
