import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { buildValidationSchemas } from '../utils/validations';
import type { ObjectSchema } from 'yup';

export type SchemaKey = 'endpointSchema' | 'credentialsSchema';

export function useValidationSchemas() {
    const { t, i18n } = useTranslation();

    const schemasRef = useRef(buildValidationSchemas(t));

    useEffect(() => {
        schemasRef.current = buildValidationSchemas(t);
    }, [i18n.language, t]);
    

    const getSchema = (key: SchemaKey): ObjectSchema<any> =>
        new Proxy({} as ObjectSchema<any>, {
            get(_target, prop) {
                const current = schemasRef.current[key];
                const value = (current as any)[prop];
                return typeof value === 'function' ? value.bind(current) : value;
            }
        });

    return { getSchema };
}