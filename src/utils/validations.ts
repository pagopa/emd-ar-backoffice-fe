import * as Yup from 'yup';
import { URL_REGEX } from './constant';

export const credentialsSchema = Yup.object({
    clientId: Yup.string().required('Campo obbligatorio'),
    clientSecret: Yup.string().min(8, 'Minimo 8 caratteri').required('Campo obbligatorio'),
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

export const endpointDeepLinkSchema = Yup.object({
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
                    fallBackLink: Yup.string()
                        .matches(URL_REGEX, 'URL non valido')
                        .required('Campo obbligatorio'),
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