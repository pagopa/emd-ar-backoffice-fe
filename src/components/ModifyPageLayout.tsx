import { Box, Button, CircularProgress, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { FormikProps } from 'formik';
import type { ReactNode } from 'react';
import { UnsavedChangesDialog } from './UnsavedChangesDialog';

interface ModifyPageLayoutProps<T> {
    formik: FormikProps<T>;
    titleKey: string;
    cardTitleKey: string;
    cancelRoute: string;
    showDialog: boolean;
    onConfirmExit: () => void;
    onCancelExit: () => void;
    loading: boolean;
    skeleton: ReactNode;
    children: ReactNode;
}

const ModifyPageLayout = <T,>({
    formik,
    titleKey,
    cardTitleKey,
    cancelRoute,
    showDialog,
    onConfirmExit,
    onCancelExit,
    loading,
    skeleton,
    children,
}: ModifyPageLayoutProps<T>) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <>
            <UnsavedChangesDialog
                open={showDialog}
                onConfirm={onConfirmExit}
                onCancel={onCancelExit}
            />
            <Box component="main" flex={1} display="flex" justifyContent="center" px={2} py={4}>
                <Box width="100%" maxWidth={760}>
                    <Typography variant="h4" fontWeight={700} mb={1.5}>
                        {t(titleKey)}
                    </Typography>
                    <Typography variant="caption" color="error" display="block" mb={3}>
                        {t('commonLabel.requiredField')}
                    </Typography>

                    <form onSubmit={formik.handleSubmit} noValidate>
                        <Paper elevation={0} variant="outlined" sx={{ borderRadius: 2, p: { xs: 2 } }}>
                            <Typography variant="h6" fontWeight={700} mb={3}>
                                {t(cardTitleKey)}
                            </Typography>
                            {loading ? skeleton : children}
                        </Paper>

                        <Box display="flex" justifyContent="space-between" mt={4}>
                            <Button variant="outlined" onClick={() => void navigate(cancelRoute)}>
                                {t('commonLabel.cancel')}
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={formik.isSubmitting}
                                endIcon={
                                    formik.isSubmitting
                                        ? <CircularProgress size={16} color="inherit" />
                                        : undefined
                                }
                            >
                                {t('commonLabel.save')}
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </>
    );
};

export default ModifyPageLayout;