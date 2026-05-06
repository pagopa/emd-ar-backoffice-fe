import { Box, Paper, Skeleton } from "@mui/material";
import { SectionSkeleton } from "../../../components/SectionSkeleton";

const HomeSkeleton = () => (
    <Box display="flex" sx={{ padding: 3, gap: 3 }} flexDirection="column">

        {/* Header */}

        <Skeleton variant="text" width={200} height={36} />

        {/* Two-column layout */}
        <Box display="flex" gap={3} alignItems="flex-start">

            {/* LEFT column */}
            <Box display="flex" flexDirection="column" gap={3} flex={1}>

                {/* and now? card */}
                <SectionSkeleton fields={1} /> 

                {/* Configuration endpoint */}
                <SectionSkeleton fields={3} /> 
            </Box>

            {/* RIGHT column — Configuration deep link */}
            <Box flex={1}>
                <Box display="flex" flexDirection="column" gap={2} >
                    <Paper sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ paddingTop: 3, paddingLeft: 3 }}>
                            <Skeleton variant="text" width={200} height={36} />
                        </Box>
                        <Paper className="cardData">
                            <SectionSkeleton fields={2} textWidth={490} />  {/* Card OS 1 */}
                        </Paper>
                        <Paper className="cardData">
                            <SectionSkeleton fields={2} textWidth={490} />   {/* Card OS 2 */}
                        </Paper>
                    </Paper>
                </Box>

            </Box>
        </Box>
    </Box>
);

export default HomeSkeleton;