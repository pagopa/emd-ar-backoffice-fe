import OneTrustNotice from "../components/layoutPages/Onetrustnotice";
import { CONFIG } from "../config";
import '../assets/css/oneTrustSidebar.css'
import '../assets/css/tearmsAndConditions.css'

function TermsAndConditionsPage() {
    return <OneTrustNotice noticeId={CONFIG.ONE_TRUST.TERMS_AND_CONDITIONS_NOTICE_ID} language={'it'} />;
}

export default TermsAndConditionsPage;