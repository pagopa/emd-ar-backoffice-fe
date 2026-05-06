import { URL_REGEX } from './constant';

import * as Yup from 'yup';

export const credentialsSchema = Yup.object({
    clientId: Yup.string().required('Campo obbligatorio'),
    clientSecret: Yup.string().required('Campo obbligatorio'),
    grantType: Yup.string().required('Campo obbligatorio'),
    bodyParams: Yup.array().of(
        Yup.object({
            name: Yup.string().required('Campo obbligatorio'),
            value: Yup.string().required('Campo obbligatorio'),
        })
    ),
    urlParams: Yup.array().of(
        Yup.object({
            name: Yup.string().required('Campo obbligatorio'),
            value: Yup.string().required('Campo obbligatorio'),
        })
    ),
});

export const endpointSchema = Yup.object({
    webhookUrl: Yup.string()
        .matches(URL_REGEX, 'Inserisci un URL valido')
        .required('Campo obbligatorio'),
    authUrl: Yup.string()
        .matches(URL_REGEX, 'Inserisci un URL valido')
        .required('Campo obbligatorio'),
    authType: Yup.string().required(),
    deepLinkType: Yup.string().required(),
    // Validated only when deepLinkType === 'universale'
    deepLinkUniversale: Yup.object().when('deepLinkType', {
        is: 'universale',
        then: (schema) =>
            schema.shape({
                fallBackLink: Yup.string()
                    .matches(URL_REGEX, 'URL non valido')
                    .required('Campo obbligatorio'),
                versions: Yup.array().of(
                    Yup.object({
                        versionKey: Yup.string().required('Campo obbligatorio'),
                        link: Yup.string().matches(URL_REGEX, 'URL non valido').required('Campo obbligatorio'),
                    })
                ),
            }),
    }),
    // Validated only when deepLinkType === 'specifico'
    deepLinkDevices: Yup.array().when('deepLinkType', {
        is: 'specifico',
        then: (schema) =>
            schema.of(
                Yup.object({
                    so: Yup.string(),
                    fallBackLink: Yup.string().when('so', {
                        is: (so: string) => so !== 'Web',
                        then: (s) =>
                            s.matches(URL_REGEX, 'URL non valido').required('Campo obbligatorio'),
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
                    versions: Yup.array().of(
                        Yup.object({
                            versionKey: Yup.string().required('Campo obbligatorio'),
                            link: Yup.string().matches(URL_REGEX, 'URL non valido').required('Campo obbligatorio'),
                        })
                    ),
                })
            ),
    }),
});