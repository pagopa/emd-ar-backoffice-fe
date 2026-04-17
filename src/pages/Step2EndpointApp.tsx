import type { FormikProps } from 'formik';
import {
    Box,
    Divider,
    FormControlLabel,
    Grid,
    Switch,
    TextField,
    Typography,
} from '@mui/material';
import * as Yup from 'yup';
import { URL_REGEX } from '../utils/constant';
import type { Step2Values } from '../types/stepsOnboarding';
import { SectionHeader } from '../components/layoutPages/SectionHeader';

export const step2Schema = Yup.object({
    endpointProduzione: Yup.string()
        .matches(URL_REGEX, 'Inserisci un URL valido (es. https://...)')
        .required('Campo obbligatorio'),
    endpointCollaudo: Yup.string().test(
        'url-collaudo',
        'Inserisci un URL valido (es. https://...)',
        (val) => !val || URL_REGEX.test(val)
    ),
    // rimane stringa — la validazione numerica è gestita dall'attributo inputProps nel TextField
    timeoutConnessione: Yup.string().optional(),
    abilitaNotifiche: Yup.boolean(),
    urlCallback: Yup.string().when('abilitaNotifiche', {
        is: true,
        then: (s) =>
            s
                .matches(URL_REGEX, 'Inserisci un URL valido')
                .required('URL callback obbligatorio'),
        otherwise: (s) =>
            s.test(
                'url-callback-optional',
                'Inserisci un URL valido',
                (val) => !val || URL_REGEX.test(val)
            ),
    }),
});

interface Props {
    formik: FormikProps<Step2Values>;
}


const Step2EndpointApp = ({ formik }: Props) => {
    const { values, errors, touched, handleChange, handleBlur, setFieldValue } =
        formik;

    return (
        <Box>
            {/* ── Endpoint ── */}
            <SectionHeader
                title="Endpoint"
                subtitle="Configura gli URL del tuo servizio per i diversi ambienti."
            />

            <Grid container spacing={2} mt={1} mb={4}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="endpointProduzione"
                        name="endpointProduzione"
                        label="Endpoint di Produzione"
                        required
                        placeholder="https://api.tuoservizio.it/pagamenti"
                        value={values.endpointProduzione}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                            touched.endpointProduzione && Boolean(errors.endpointProduzione)
                        }
                        helperText={
                            (touched.endpointProduzione && errors.endpointProduzione) ||
                            "URL base per l'ambiente di produzione"
                        }
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="endpointCollaudo"
                        name="endpointCollaudo"
                        label="Endpoint di Collaudo"
                        placeholder="https://api-uat.tuoservizio.it/pagamenti"
                        value={values.endpointCollaudo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                            touched.endpointCollaudo && Boolean(errors.endpointCollaudo)
                        }
                        helperText={
                            (touched.endpointCollaudo && errors.endpointCollaudo) ||
                            "URL base per l'ambiente di collaudo (opzionale)"
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        id="timeoutConnessione"
                        name="timeoutConnessione"
                        label="Timeout connessione (ms)"
                        type="number"
                        value={values.timeoutConnessione}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                            touched.timeoutConnessione && Boolean(errors.timeoutConnessione)
                        }
                        helperText={
                            (touched.timeoutConnessione && errors.timeoutConnessione) ||
                            'Default: 5000 ms'
                        }
                        inputProps={{ min: 1000, max: 30000, step: 500 }}
                    />
                </Grid>
            </Grid>

            <Divider sx={{ mb: 3 }} />

            {/* ── App / Callback ── */}
            <SectionHeader
                title="Configurazione App"
                subtitle="Impostazioni aggiuntive per la gestione delle notifiche e dei callback."
            />

            <Grid container spacing={2} mt={1}>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Switch
                                id="abilitaNotifiche"
                                name="abilitaNotifiche"
                                checked={values.abilitaNotifiche}
                                onChange={(e) =>
                                    void setFieldValue('abilitaNotifiche', e.target.checked)
                                }
                                color="primary"
                            />
                        }
                        label="Abilita notifiche di pagamento"
                    />
                    <Typography variant="caption" color="text.secondary" display="block">
                        Ricevi una notifica via callback ad ogni aggiornamento di stato del
                        pagamento.
                    </Typography>
                </Grid>

                {values.abilitaNotifiche && (
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="urlCallback"
                            name="urlCallback"
                            label="URL Callback"
                            required
                            placeholder="https://tuoservizio.it/webhook/pagopa"
                            value={values.urlCallback}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.urlCallback && Boolean(errors.urlCallback)}
                            helperText={touched.urlCallback && errors.urlCallback}
                        />
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default Step2EndpointApp;