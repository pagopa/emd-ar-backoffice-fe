import type { FormikProps } from 'formik';
import { Box, Grid, TextField } from '@mui/material';
import type { Step1Values } from '../types/stepsOnboarding';
import * as Yup from 'yup';
import { PARTITA_IVA_REGEX, PHONE_REGEX } from '../utils/constant';
import { SectionHeader } from '../components/SectionHeader';

interface Props {
    formik: FormikProps<Step1Values>;
}

export const step1Schema = Yup.object({
    ragioneSociale: Yup.string().min(2, 'Minimo 2 caratteri').required('Campo obbligatorio'),
    partitaIva: Yup.string()
        .matches(
            PARTITA_IVA_REGEX,
            'Inserisci una Partita IVA (11 cifre) o un Codice Fiscale valido'
        )
        .required('Campo obbligatorio'),
    sedeLegale: Yup.string().min(5, 'Inserisci un indirizzo completo').required('Campo obbligatorio'),
    codiceIdentificativoPSP: Yup.string().optional(),
    nomeReferente: Yup.string().min(3, 'Inserisci nome e cognome').required('Campo obbligatorio'),
    emailReferente: Yup.string().email('Inserisci un indirizzo email valido').required('Campo obbligatorio'),
    telefonoReferente: Yup.string()
        .matches(PHONE_REGEX, 'Inserisci un numero di telefono valido')
        .required('Campo obbligatorio'),
});

// ─── Section header senza icone ───────────────────────────────────────────────

const Step1DatiContatti = ({ formik }: Props) => {
    const { values, errors, touched, handleChange, handleBlur } = formik;

    return (
        <Box>
            {/* ── Dati Aziendali ── */}
            <SectionHeader
                title="Dati Aziendali"
                subtitle="Inserisci i dati anagrafici e fiscali del tuo ente."
            />

            <Grid container spacing={2} mt={1} mb={4}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="ragioneSociale"
                        name="ragioneSociale"
                        label="Ragione Sociale"
                        required
                        value={values.ragioneSociale}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.ragioneSociale && Boolean(errors.ragioneSociale)}
                        helperText={touched.ragioneSociale && errors.ragioneSociale}
                        InputLabelProps={{
                            sx: { '& .MuiFormLabel-asterisk': { color: 'error.main' } },
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="partitaIva"
                        name="partitaIva"
                        label="Partita IVA o Codice Fiscale"
                        required
                        value={values.partitaIva}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.partitaIva && Boolean(errors.partitaIva)}
                        helperText={touched.partitaIva && errors.partitaIva}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="sedeLegale"
                        name="sedeLegale"
                        label="Sede Legale"
                        required
                        value={values.sedeLegale}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.sedeLegale && Boolean(errors.sedeLegale)}
                        helperText={touched.sedeLegale && errors.sedeLegale}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="codiceIdentificativoPSP"
                        name="codiceIdentificativoPSP"
                        label="Codice Identificativo PSP"
                        value={values.codiceIdentificativoPSP}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                            touched.codiceIdentificativoPSP &&
                            Boolean(errors.codiceIdentificativoPSP)
                        }
                        helperText={
                            touched.codiceIdentificativoPSP && errors.codiceIdentificativoPSP
                        }
                    />
                </Grid>
            </Grid>

            {/* ── Referente tecnico-operativo ── */}
            <SectionHeader
                title="Referente tecnico-operativo"
                subtitle="Riferimenti della persona da contattare per comunicazioni tecniche o di servizi."
            />

            <Grid container spacing={2} mt={1}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="nomeReferente"
                        name="nomeReferente"
                        label="Nome e Cognome referente"
                        required
                        value={values.nomeReferente}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.nomeReferente && Boolean(errors.nomeReferente)}
                        helperText={touched.nomeReferente && errors.nomeReferente}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="emailReferente"
                        name="emailReferente"
                        label="Email referente"
                        type="email"
                        required
                        value={values.emailReferente}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.emailReferente && Boolean(errors.emailReferente)}
                        helperText={touched.emailReferente && errors.emailReferente}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="telefonoReferente"
                        name="telefonoReferente"
                        label="Telefono referente"
                        type="tel"
                        required
                        value={values.telefonoReferente}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                            touched.telefonoReferente && Boolean(errors.telefonoReferente)
                        }
                        helperText={touched.telefonoReferente && errors.telefonoReferente}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Step1DatiContatti;