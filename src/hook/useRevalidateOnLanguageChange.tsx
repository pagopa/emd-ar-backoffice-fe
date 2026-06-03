import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { FormikProps } from 'formik';

export function useRevalidateOnLanguageChange(formik: FormikProps<any>) {
    const { i18n } = useTranslation();

    useEffect(() => {
        if (Object.keys(formik.errors).length > 0) {
            void formik.validateForm();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [i18n.language]);
}