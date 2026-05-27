const it = {
    commonLabel: {
        requiredField: '* Campo obbligatorio',
        cancel: 'Annulla',
        save: 'Salva',
        back: 'Indietro',
        modify: 'Modifica',
        backToArea: "Torna all'Area Riservata",
        retry: 'Riprova',
    },
    unsavedChangesDialog: {
        title: 'Modifiche non salvate',
        description: 'Hai delle modifiche non salvate. Se esci ora le perderai.',
        exitWithoutSaving: 'Esci senza salvare',
    },
    sessionError: {
        unauthorized: {
            title: 'Sessione scaduta',
            message: 'Il tuo accesso non è più valido. Effettua nuovamente il login.',
        },
        forbidden: {
            title: 'Accesso negato',
            message: 'Non hai i permessi per accedere a questa risorsa.',
        },
    },
    error: {
        title: 'Qualcosa è andato storto',
        description: 'Non è stato possibile caricare le informazioni. Riprova più tardi.',
        persistsInfo: "Se il problema persiste,",
        contactAssistance: "Contatta l'assistenza",
        interceptor: {
            tppNotFound: "La TPP non è più disponibile. Ripetere la registrazione o contattare l'assistenza.",
            unexpected: "Si è verificato un errore imprevisto. Riprova più tardi."
        },
        api: {
            conflict: "Il TPP esiste già nel sistema.",
            notFound: "Risorsa non trovata.",
            unprocessable: "Dati non validi. Controlla i campi e riprova.",
            badRequest: "Dati non validi. Controlla i campi e riprova.",
            unexpected: "Si è verificato un errore imprevisto. Riprova più tardi."
        }
    },
    header: {
        admin: 'Amministratore',
        operator: 'Operatore',
        logout: 'Esci',
        assistance: 'Assistenza',
        documentation: 'Manuale operativo',
        assistancePopover: {
            title: "Contatta l'assistenza",
            subtitle: 'Scegli come inviare la richiesta:',
            copy: 'Copia indirizzo email',
            externalApp: 'App email esterna',
            orCopy: 'Oppure copia l\'indirizzo:',
        },
    },
    footer: {
        legalInfo: '<strong>PagoPA S.p.A.</strong> - Società per azioni con socio unico - Capitale sociale di euro 1.000.000 interamente versato - Sede legale in Roma, Piazza Colonna 370, <br/> CAP 00187 - N. di iscrizione a Registro Imprese di Roma, CF e P.IVA 15376371009',
    },
    sideMenu: {
        overview: 'Panoramica',
        credentials: 'Credenziali',
        users: 'Utenti',
        groups: 'Gruppi',
    },
    auth: {
        loading: 'Autenticazione in corso...',
        loadingDescription: 'Attendere, verifica delle credenziali in corso.',
        error: {
            title: 'Accesso non riuscito',
            description: 'La sessione è scaduta o il link di accesso non è più valido.',
        },
        checkFailed: {
            title: 'Errore durante la verifica del profilo',
            description: 'Non è stato possibile completare la verifica del tuo profilo.',
        },
    },
    home: {
        title: 'Panoramica',
        nowCard: {
            title: 'E ora?',
            description: 'Visualizza e gestisci le credenziali per la connessione con i sistemi di PagoPA.',
            button: 'Gestisci credenziali',
        },
        endpointSection: {
            title: 'Configurazione endpoint',
            messageUrl: 'URL per ricezione messaggi di cortesia',
            authUrl: 'URL di autenticazione',
            authType: 'Tipo di autenticazione',
        },
        deepLinkSection: {
            title: 'Configurazione deep link',
            fallbackLink: 'Fallback link',
            copyPayload: 'Copia payload',
        },
    },
    credentials: {
        title: 'Credenziali',
        subtitle:
            'Qui puoi visualizzare le chiavi di accesso per collegarti a PagoPA e gestire le credenziali necessarie per ricevere i messaggi di cortesia sui tuoi sistemi.',
        pagopa: 'Credenziali PagoPA',
        tpp: 'Credenziali TPP',
        additionalParams: {
            title: 'Parametri aggiuntivi',
            bodyParams: 'PARAMETRI BODY',
            urlParams: 'PARAMETRI URL',
        },
    },
    onboarding: {
        step1: {
            endpoint: {
                title: 'Configurazione endpoint',
                description: 'PagoPA utilizzerà questi endpoint per inviarti i messaggi di cortesia destinati agli utenti.',
                webhookLabel: 'URL per ricezione messaggi di cortesia (webhook)',
                webhookPlaceholder: 'https://api.tuoservizio.it/messages',
                authUrlLabel: 'URL di autenticazione',
                authUrlPlaceholder: 'https://api.tuoservizio.it/auth',
                authTypeLabel: 'Tipo di autenticazione',
            },
            deepLink: {
                title: 'Configurazione deep link app',
                description: '"Deep link necessari" per reindirizzare l\'utente sull\'app per il pagamento.',
                universal: 'Deep link universale',
                perDevice: 'Deep link specifico per SO',
                urlRedirect: 'URL Redirect',
                urlRedirectPlaceholder: 'https://tuoservizio.it/pagamento',
                addVersion: 'Aggiungi versione',
                removeVersion: 'Rimuovi versione',
                versionLabel: 'Versione',
                versionPlaceholder: 'es. v1',
                versionTooltip:
                    'Ti consigliamo di nominare le versioni con il prefisso "v" e un numero crescente (v1, v2). ' +
                    'Non è possibile utilizzare punti (esempio: v1.2), quindi consigliamo di utilizzare altre modalità (esempio: v1_2).',
            },
        },
        step2: {
            credentials: {
                title: 'Credenziali di accesso',
                description: 'Credenziali necessarie per comunicare coi vostri sistemi in modo sicuro.',
                showSecret: 'Mostra secret',
                hideSecret: 'Nascondi secret',
            },
            bodyParams: {
                title: 'Parametri aggiuntivi (Body)',
                description: 'Parametri personalizzati richiesti dal tuo sistema per il rilascio del token (es. scope)',
                name: 'Nome',
                value: 'Valore',
                addParam: 'Aggiungi parametro body',
                removeParam: 'Rimuovi parametro body',
            },
            urlParams: {
                title: 'Parametri aggiuntivi (URL)',
                description: "Parametri extra da accodare all'indirizzo web dell'autenticazione (es. tenant_id).",
                name: 'Nome',
                value: 'Valore',
                addParam: 'Aggiungi parametro URL',
                removeParam: 'Rimuovi parametro URL',
            },
        },
        page: {
            title: 'Configurazione del servizio',
            steps: ['Endpoint e deep link', 'Credenziali'],
            continue: 'Continua',
            complete: 'Completa configurazione',
        },
    },
    endpointModify: {
        title: 'Modifica endpoint e deep link',
        cardTitle: 'Endpoint e deep link',
    },
    credentialsModify: {
        title: 'Modifica credenziali',
        cardTitle: 'Credenziali',
    },
    environmentBanner: {
        message: 'Dati per Ambiente di Collaudo',
    },
};

export default it;
