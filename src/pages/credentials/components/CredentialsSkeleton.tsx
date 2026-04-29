import { Box, Skeleton } from "@mui/material";
import { SectionSkeleton } from "../../../components/SectionSkeleton";

const CredentialsSkeleton = () => {

    return (
        <Box display="flex" sx={{ padding: 3, gap: 3 }} flexDirection="column">
            <Box display="flex" flexDirection="column" gap="16px">
                <Skeleton variant="text" width={180} height={40} />
                <Skeleton variant="text" width="60%" height={24} />
            </Box>
            <SectionSkeleton fields={3} /> {/* PagoPA credentials */}
            <SectionSkeleton fields={1} /> {/* TPP ID */}
            <SectionSkeleton fields={3} /> {/* TPP credentials */}
            <SectionSkeleton />            {/* Additional params */}
        </Box>
    );
}

export default CredentialsSkeleton;