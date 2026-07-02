import { useEffect, useRef } from 'react';
import { CONFIG } from '../../config';
import { loadOrReloadNotice } from '../../utils/oneTrust';
import type { OneTrustPrivacyNoticeProps } from '../../types/oneTrust';

const LANGUAGE = 'it';

function OneTrustPrivacyNotice({
    noticeId = CONFIG.ONE_TRUST.PRIVACY_NOTICE_ID,
}: OneTrustPrivacyNoticeProps = {}) {

    const hasLoadedRef = useRef(false);

    useEffect(() => {
        if (hasLoadedRef.current) return;
        hasLoadedRef.current = true;
        loadOrReloadNotice(noticeId, LANGUAGE);
    }, [noticeId]);

    return (
        <div>
            <div id={`otnotice-${noticeId}`} className="otnotice"></div>
        </div>
    );
}

export default OneTrustPrivacyNotice;