import { URL_REGEX, NO_SPACES } from './constant';
import * as Yup from 'yup';

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

// Reusable uniqueness tests for array fields
const uniqueParamNames  = makeUniqueFieldTest<{ name?: string; value?: string }>('name', 'Chiave duplicata');
const uniqueVersionKeys = makeUniqueFieldTest<{ versionKey?: string; link?: string }>('versionKey', 'Versione già inserita');

// Parametri body/url
const paramEntrySchema = Yup.object({
    name: Yup.string()
        .required('Campo obbligatorio')
        .matches(NO_SPACES, 'Non sono ammessi spazi'),
    value: Yup.string()
        .required('Campo obbligatorio')
        .matches(NO_SPACES, 'Non sono ammessi spazi'),
});

const versionEntrySchema = Yup.object({
    versionKey: Yup.string()
        .required('Campo obbligatorio')
        .matches(NO_SPACES, 'Non sono ammessi spazi'),
    link: Yup.string()
        .matches(URL_REGEX, 'URL non valido')
        .required('Campo obbligatorio'),
});

const versionsSchema = Yup.array()
    .of(versionEntrySchema)
    .test('unique-version-keys', 'Versione già inserita', uniqueVersionKeys);

// Credentials form validation
export const credentialsSchema = Yup.object({
    clientId: Yup.string()
        .required('Campo obbligatorio')
        .matches(NO_SPACES, 'Non sono ammessi spazi'),
    clientSecret: Yup.string()
        .required('Campo obbligatorio')
        .matches(NO_SPACES, 'Non sono ammessi spazi'),
    grantType: Yup.string().required('Campo obbligatorio'),
    bodyParams: Yup.array()
        .of(paramEntrySchema)
        .test('unique-body-names', 'Chiave duplicata', uniqueParamNames),
    urlParams: Yup.array()
        .of(paramEntrySchema)
        .test('unique-url-names', 'Chiave duplicata', uniqueParamNames),
});

// Endpoint form validation
export const endpointSchema = Yup.object({
    webhookUrl: Yup.string().matches(URL_REGEX, 'Inserisci un URL valido').required('Campo obbligatorio'),
    authUrl:    Yup.string().matches(URL_REGEX, 'Inserisci un URL valido').required('Campo obbligatorio'),
    authType:   Yup.string().required(),
    deepLinkType: Yup.string().required(),
    deepLinkUniversale: Yup.object().when('deepLinkType', {
        is: 'universale',
        then: (schema) =>
            schema.shape({
                fallBackLink: Yup.string().matches(URL_REGEX, 'URL non valido').required('Campo obbligatorio'),
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
                        then: (s) => s.matches(URL_REGEX, 'URL non valido').required('Campo obbligatorio'),
                        otherwise: (s) =>
                            s.matches(URL_REGEX, 'URL non valido').test(
                                'web-fallback-if-versions',
                                'Campo obbligatorio se aggiungi una versione',
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