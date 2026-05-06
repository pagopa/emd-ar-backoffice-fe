import { Box } from "@mui/material";
import { SectionSkeleton } from "../../../components/SectionSkeleton";

const EndpointFormSkeleton = () => (
    <Box display="flex" flexDirection="column" gap={3}>

        {/* configuration endpoint */}
        <Box className="cardsFormSkeleton" >
            <SectionSkeleton fields={3} />
        </Box>

        {/* configuration deep link app */}
        <Box className="cardsFormSkeleton" >
            <SectionSkeleton fields={2} />
            <SectionSkeleton fields={2} />
            <SectionSkeleton fields={1} />
        </Box>
    </Box>
);

export default EndpointFormSkeleton;