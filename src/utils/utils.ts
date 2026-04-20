import type { AgentLink } from '../types/tpp';
import type { Step1Values } from '../types/stepsOnboarding';

/**
 * Converte i valori del form deep link nel formato agentLinks atteso dal BE.
 */
export function buildAgentLinks(values: Step1Values): Record<string, AgentLink> {
    if (values.deepLinkType === 'universale') {
        const sharedVersions = Object.fromEntries(
            values.deepLinkUniversale.versions.map(({ versionKey, link }) => [
                versionKey,
                { link },
            ])
        );

        const sharedLink: AgentLink = {
            fallBackLink: values.deepLinkUniversale.fallBackLink,
            versions: sharedVersions,
        };

        // Stessa config per tutti e 3 i SO
        return {
            iOS: sharedLink,
            Android: sharedLink,
            Web: sharedLink,
        };
    }

    // Specifico — ogni SO ha la propria config
    return Object.fromEntries(
        values.deepLinkDevices.map((device) => [
            device.so,
            {
                fallBackLink: device.fallBackLink,
                versions: Object.fromEntries(
                    device.versions.map(({ versionKey, link }) => [versionKey, { link }])
                ),
            } satisfies AgentLink,
        ])
    );
}