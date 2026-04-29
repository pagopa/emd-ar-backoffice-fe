import { Paper, Skeleton } from '@mui/material';

interface SectionSkeletonProps {
    fields?: number;
}

export const SectionSkeleton = ({ fields = 2 }: SectionSkeletonProps) => (
    <Paper elevation={0} sx={{ borderRadius: 2, p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Skeleton variant="text" width={200} height={32} />
        {Array.from({ length: fields }).map((_, i) => (
            <Skeleton key={i} variant="rounded" width={558} height={56} />
        ))}
    </Paper>
);