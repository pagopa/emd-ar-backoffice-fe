import { CONFIG } from '../config';

const NOTICE_SCRIPT_ID = 'otprivacy-notice-script';
const NOTICE_LOADER_SRC = 'https://privacyportalde-cdn.onetrust.com/privacy-notice-scripts/otnotice-1.0.min.js';

const STYLE_IDS = {
    core: 'otnotice-style-core',
    layout: 'otnotice-style-layout-left-aligned-menu',
} as const;

const STYLE_URLS = {
    layout: 'https://privacyportalde-cdn.onetrust.com/privacy-notice-scripts/css/v2/otnotice-layout-left-aligned-menu.css',
} as const;

function ensureOneTrustStylesLoaded(): void {
    (Object.keys(STYLE_URLS) as Array<keyof typeof STYLE_URLS>).forEach((key) => {
        if (document.getElementById(STYLE_IDS[key])) return;

        const link = document.createElement('link');
        link.id = STYLE_IDS[key];
        link.rel = 'stylesheet';
        link.href = STYLE_URLS[key];
        document.head.appendChild(link);
    });
}

let scriptLoadingPromise: Promise<void> | null = null;

// Loads the OneTrust notice script once and caches the promise,
// so concurrent calls don't inject the script tag multiple times.
function ensureOneTrustScriptLoaded(): Promise<void> {
    if (scriptLoadingPromise !== null) return scriptLoadingPromise;

    scriptLoadingPromise = new Promise((resolve, reject) => {
        const existing = document.getElementById(NOTICE_SCRIPT_ID) as HTMLScriptElement | null;
        if (existing) {
            if (globalThis.OneTrust?.NoticeApi) {
                resolve();
                return;
            }
            existing.addEventListener('load', () => resolve());
            existing.addEventListener('error', () =>
                reject(new Error('OneTrust script tag failed to load (existing <script>)'))
            );
            return;
        }

        const script = document.createElement('script');
        script.id = NOTICE_SCRIPT_ID;
        script.src = NOTICE_LOADER_SRC;
        script.type = 'text/javascript';
        script.setAttribute('charset', 'UTF-8');
        script.text = `settings="${CONFIG.ONE_TRUST.SETTINGS_TOKEN}"`;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('OneTrust script failed to load from CDN'));
        document.body.appendChild(script);
    });

    return scriptLoadingPromise;
}

function buildNoticeJsonUrl(noticeId: string): string {
    return `https://privacyportalde-cdn.onetrust.com/storage-container/${CONFIG.ONE_TRUST.STORAGE_CONTAINER_ID}/privacy-notices/${noticeId}/published/privacynotice.json`;
}

// Waits for an element matching selector to appear in the DOM.
// Because OneTrust injects the notice markup asynchronously
// after LoadNotices, so we can't query it right away.
function waitForElement(selector: string, root: ParentNode = document, timeoutMs = 5000): Promise<Element> {
    return new Promise((resolve, reject) => {
        const existing = root.querySelector(selector);
        if (existing) {
            resolve(existing);
            return;
        }

        const observer = new MutationObserver(() => {
            const el = root.querySelector(selector);
            if (el) {
                observer.disconnect();
                clearTimeout(timeoutId);
                resolve(el);
            }
        });

        observer.observe(root === document ? document.body : (root), {
            childList: true,
            subtree: true,
        });

        const timeoutId = setTimeout(() => {
            observer.disconnect();
            reject(new Error(`Timed out waiting for "${selector}" to appear`));
        }, timeoutMs);
    });
}

export function loadOrReloadNotice(noticeId: string, language: string): void {
    document.documentElement.lang = language;

    ensureOneTrustScriptLoaded()
        .catch((error: unknown) => {
            console.error('[OneTrust] Failed to load notice script', error);
            throw error; // stop the chain, nothing else can proceed without the script
        })
        .then(() => globalThis.OneTrust!.NoticeApi.Initialized)
        .then(() => {
            globalThis.OneTrust?.NoticeApi.LoadNotices([buildNoticeJsonUrl(noticeId)], true, language);
            ensureOneTrustStylesLoaded();

            return waitForElement(`#otnotice-${noticeId} .otnotice-content`);
        })
        .catch((error: unknown) => {
            console.error(`[OneTrust] Failed to render notice "${noticeId}"`, error);
        });
}