const en = {
    commonLabel: {
        requiredField: '* Required field',
        cancel: 'Cancel',
        save: 'Save',
        back: 'Back',
        modify: 'Edit',
        backToArea: 'Back to Reserved Area',
        retry: 'Try again',
    },
    unsavedChangesDialog: {
        title: 'Unsaved changes',
        description: 'You have unsaved changes. If you leave now, they will be lost.',
        exitWithoutSaving: 'Exit without saving',
    },
    sessionError: {
        unauthorized: {
            title: 'Session expired',
            message: 'Your session is no longer valid. Please log in again.',
        },
        forbidden: {
            title: 'Access denied',
            message: 'You do not have permission to access this resource.',
        },
    },
    error: {
        title: 'Something went wrong',
        description: 'The information could not be loaded. Please try again later.',
        persistsInfo: 'If the problem persists,',
        contactAssistance: 'Contact support',
    },
    header: {
        admin: 'Administrator',
        operator: 'Operator',
        logout: 'Log out',
        assistance: 'Assistance',
        documentation: 'User manual',
        assistancePopover: {
            title: 'Contact support',
            subtitle: 'Choose how to send your request:',
            copy: 'Copy email address',
            externalApp: 'External email app',
            orCopy: 'Or copy the address:',
        },
    },
    footer: {
        legalInfo: '<strong>PagoPA S.p.A.</strong> - Joint stock company with sole shareholder - Share capital of EUR 1,000,000 fully paid up - Registered office in Rome, Piazza Colonna 370, <br/> CAP 00187 - Rome Companies Register, Tax Code and VAT no. 15376371009',
    },
    sideMenu: {
        overview: 'Overview',
        credentials: 'Credentials',
        users: 'Users',
        groups: 'Groups',
    },
    auth: {
        loading: 'Authentication in progress...',
        loadingDescription: 'Please wait while your credentials are being verified.',
        error: {
            title: 'Login failed',
            description: 'Your session has expired or the access link is no longer valid.',
        },
        checkFailed: {
            title: 'Profile verification error',
            description: 'We could not complete the verification of your profile.',
        },
    },
    home: {
        title: 'Overview',
        nowCard: {
            title: 'What now?',
            description: 'View and manage credentials for connecting to PagoPA systems.',
            button: 'Manage credentials',
        },
        endpointSection: {
            title: 'Endpoint configuration',
            messageUrl: 'URL for receiving courtesy messages',
            authUrl: 'Authentication URL',
            authType: 'Authentication type',
        },
        deepLinkSection: {
            title: 'Deep link configuration',
            fallbackLink: 'Fallback link',
            copyPayload: 'Copy payload',
        },
    },
    credentials: {
        title: 'Credentials',
        subtitle:
            'Here you can view the access keys to connect to PagoPA and manage the credentials needed to receive courtesy messages on your systems.',
        pagopa: 'PagoPA Credentials',
        tpp: 'TPP Credentials',
        additionalParams: {
            title: 'Additional parameters',
            bodyParams: 'BODY PARAMETERS',
            urlParams: 'URL PARAMETERS',
        },
    },
    onboarding: {
        step1: {
            endpoint: {
                title: 'Endpoint configuration',
                description: 'PagoPA will use these endpoints to send courtesy messages to your users.',
                webhookLabel: 'URL for receiving courtesy messages (webhook)',
                webhookPlaceholder: 'https://api.yourservice.com/messages',
                authUrlLabel: 'Authentication URL',
                authUrlPlaceholder: 'https://api.yourservice.com/auth',
                authTypeLabel: 'Authentication type',
            },
            deepLink: {
                title: 'App deep link configuration',
                description: '"Deep links required" to redirect the user to the app for payment.',
                universal: 'Universal deep link',
                perDevice: 'OS-specific deep link',
                urlRedirect: 'Redirect URL',
                urlRedirectPlaceholder: 'https://yourservice.com/payment',
                addVersion: 'Add version',
                removeVersion: 'Remove version',
                versionLabel: 'Version',
                versionPlaceholder: 'e.g. v1',
                versionTooltip:
                    'We recommend naming versions with the prefix "v" and an increasing number (v1, v2). ' +
                    'Dots are not allowed (e.g. v1.2), so we suggest using other formats (e.g. v1_2).',
            },
        },
        step2: {
            credentials: {
                title: 'Access credentials',
                description: 'Credentials required to communicate with your systems securely.',
                showSecret: 'Show secret',
                hideSecret: 'Hide secret',
            },
            bodyParams: {
                title: 'Additional parameters (Body)',
                description: 'Custom parameters required by your system to issue the token (e.g. scope)',
                name: 'Name',
                value: 'Value',
                addParam: 'Add body parameter',
                removeParam: 'Remove body parameter',
            },
            urlParams: {
                title: 'Additional parameters (URL)',
                description: 'Extra parameters to append to the authentication URL (e.g. tenant_id).',
                name: 'Name',
                value: 'Value',
                addParam: 'Add URL parameter',
                removeParam: 'Remove URL parameter',
            },
        },
        page: {
            title: 'Service configuration',
            steps: ['Endpoint & deep link', 'Credentials'],
            continue: 'Continue',
            complete: 'Complete configuration',
        },
    },
    endpointModify: {
        title: 'Edit endpoint & deep link',
        cardTitle: 'Endpoint & deep link',
    },
    credentialsModify: {
        title: 'Edit credentials',
        cardTitle: 'Credentials',
    },
    environmentBanner: {
        message: 'Data for Test Environment',
    },
};

export default en;
