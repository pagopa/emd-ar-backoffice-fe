import { Box } from "@mui/material";
import { SectionSkeleton } from "../../../components/SectionSkeleton";

const CredentialsFormSkeleton = () => {

    return (
        <Box display="flex" flexDirection="column" gap={3}>
            <Box className="cardsFormSkeleton" >
                <SectionSkeleton fields={3} /> {/* clientId, clientSecret, grantType */}
            </Box>
            <Box className="cardsFormSkeleton" >
                <SectionSkeleton fields={1} /> {/* body params header */}
            </Box>
            <Box className="cardsFormSkeleton" >
                <SectionSkeleton fields={1} /> {/* url params header */}
            </Box>
        </Box>
    );
}

export default CredentialsFormSkeleton;