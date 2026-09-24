import { useEffect, useRef } from 'react';
import { loadOrReloadNotice } from '../../utils/oneTrust';

export interface OneTrustNoticeProps {
    noticeId: string;
    language?: string;
    showLanguageDropdown?: boolean;
}

function OneTrustNotice({ noticeId, language, showLanguageDropdown = false }: Readonly<OneTrustNoticeProps>) {
    const hasLoadedRef = useRef(false);

    useEffect(() => {
        if (hasLoadedRef.current) return;
        hasLoadedRef.current = true;
        loadOrReloadNotice({ noticeId, language });
    }, [noticeId, language]);

    return (
        <div>
            {showLanguageDropdown && (
                <div className="ot-privacy-notice-language-dropdown-container" />
            )}
            <div id={`otnotice-${noticeId}`} className="otnotice" />
        </div>
    );
}

export default OneTrustNotice;