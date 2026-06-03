import { URL_REGEX, NO_SPACES } from './constant';
import * as Yup from 'yup';
import type { TFunction } from 'i18next';

/**
 * Yup test factory: finds the first duplicate value in the given `field` of an array
 * and reports the error on the duplicate item (not the first occurrence).
 * The `message` parameter is the string displayed in the UI.
 */
function makeUniqueFieldTest<T extends Record<string, unknown>>(
    field: keyof T,
    message: string,
) {
    return function (
        this: Yup.TestContext,
        items: T[] | undefined
    ): boolean | Yup.ValidationError {
        if (!items || items.length === 0) return true;

        const seen = new Map<string, number>();
        for (let i = 0; i < items.length; i++) {
            const value = items[i]?.[field] as string | undefined;
            if (!value) continue;
            if (seen.has(value)) {
                return this.createError({
                    path: `${this.path}[${i}].${String(field)}`,
                    message,   
                });
            }
            seen.set(value, i);
        }
        return true;
    };
}

export function buildValidationSchemas(t: TFunction) {

    const uniqueParamNames = makeUniqueFieldTest<{ name?: string; value?: string }>(
        'name', t('validation.duplicateKey')
    );
    const uniqueVersionKeys = makeUniqueFieldTest<{ versionKey?: string; link?: string }>(
        'versionKey', t('validation.duplicateVersion')
    );

    const paramEntrySchema = Yup.object({
        name: Yup.string()
            .required(t('validation.required'))
            .matches(NO_SPACES, t('validation.noSpaces')),
        value: Yup.string()
            .required(t('validation.required'))
            .matches(NO_SPACES, t('validation.noSpaces')),
    });

    const versionEntrySchema = Yup.object({
        versionKey: Yup.string()
            .required(t('validation.required'))
            .matches(NO_SPACES, t('validation.noSpaces')),
        link: Yup.string()
            .matches(URL_REGEX, t('validation.invalidUrl'))
            .required(t('validation.required')),
    });

    const versionsSchema = Yup.array()
        .of(versionEntrySchema)
        .test('unique-version-keys', t('validation.duplicateVersion'), uniqueVersionKeys);

    const credentialsSchema = Yup.object({
        clientId: Yup.string()
            .required(t('validation.required'))
            .matches(NO_SPACES, t('validation.noSpaces')),
        clientSecret: Yup.string()
            .required(t('validation.required'))
            .matches(NO_SPACES, t('validation.noSpaces')),
        grantType: Yup.string().required(t('validation.required')),
        bodyParams: Yup.array()
            .of(paramEntrySchema)
            .test('unique-body-names', t('validation.duplicateKey'), uniqueParamNames),
        urlParams: Yup.array()
            .of(paramEntrySchema)
            .test('unique-url-names', t('validation.duplicateKey'), uniqueParamNames),
    });

    const endpointSchema = Yup.object({
        webhookUrl: Yup.string().matches(URL_REGEX, t('validation.invalidUrl')).required(t('validation.required')),
        authUrl: Yup.string().matches(URL_REGEX, t('validation.invalidUrl')).required(t('validation.required')),
        authType: Yup.string().required(),
        deepLinkType: Yup.string().required(),
        deepLinkUniversale: Yup.object().when('deepLinkType', {
            is: 'universale',
            then: (schema) =>
                schema.shape({
                    fallBackLink: Yup.string().matches(URL_REGEX, t('validation.invalidUrl')).required(t('validation.required')),
                    versions: versionsSchema,
                }),
        }),
        deepLinkDevices: Yup.array().when('deepLinkType', {
            is: 'specifico',
            then: (schema) =>
                schema.of(
                    Yup.object({
                        so: Yup.string(),
                        fallBackLink: Yup.string().when('so', {
                            is: (so: string) => so !== 'WEB',
                            then: (s) => s.matches(URL_REGEX, t('validation.invalidUrl')).required(t('validation.required')),
                            otherwise: (s) =>
                                s.matches(URL_REGEX, t('validation.invalidUrl')).test(
                                    'web-fallback-if-versions',
                                    t('validation.requiredIfVersion'),
                                    function (value) {
                                        const versions = (this.parent as { versions: unknown[] }).versions;
                                        if (versions?.length > 0 && !value) return false;
                                        return true;
                                    }
                                ),
                        }),
                        versions: versionsSchema,
                    })
                ),
        }),
    });

    return { credentialsSchema, endpointSchema };
}