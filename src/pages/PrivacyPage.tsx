import OneTrustNotice from "../components/layoutPages/Onetrustnotice";
import { CONFIG } from "../config";
import '../assets/css/oneTrustSidebar.css'

function PrivacyPage() {
    return <OneTrustNotice noticeId={CONFIG.ONE_TRUST.PRIVACY_NOTICE_ID} language={'it'} />
}

export default PrivacyPage;