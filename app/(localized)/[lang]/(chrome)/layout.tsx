import styles from "./layout.module.scss";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { type Language } from "@/lib/i18n/config";
import { ChromeFooter } from "./ChromeFooter";
import { ChromeHeader } from "./ChromeHeader";
import { getJourneysNavLabel, supportEmail } from "./chrome.helpers";

export default async function ChromeLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang: string }>;
}) {
    const { lang } = (await params) as { lang: Language };
    const dict = await getDictionary(lang);
    const journeysNavLabel = getJourneysNavLabel(lang);

    return (
        <>
            <ChromeHeader
                lang={lang}
                dict={dict}
                journeysLabel={journeysNavLabel}
            />

            <main className={styles.main}>{children}</main>

            <ChromeFooter
                lang={lang}
                dict={dict}
                journeysLabel={journeysNavLabel}
                supportEmail={supportEmail}
            />
        </>
    );
}
