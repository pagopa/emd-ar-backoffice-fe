export interface OneTrustNoticeApi {
    Initialized: Promise<void>;
    LoadNotices: (urls: string[], trackLoad?: boolean, languageCode?: string) => void;
}

interface OneTrustGlobal {
    NoticeApi: OneTrustNoticeApi;
}

declare global {
    interface Window {
        OneTrust?: OneTrustGlobal;
    }
    var OneTrust: OneTrustGlobal | undefined;
}

export interface OneTrustPrivacyNoticeProps {
    noticeId?: string;
    language?: string;
}