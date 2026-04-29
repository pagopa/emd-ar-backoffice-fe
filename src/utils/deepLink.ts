import type { Step1Values } from '../types/stepsOnboarding';
import type { AgentLink } from '../types/tpp';

/**
 * Converts the deep link form values into the agentLinks format expected by the BE.
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

        // Same config applied to all operating systems
        return {
            iOS: sharedLink,
            Android: sharedLink,
            Web: sharedLink,
        };
    }

    // Per-device — each OS has its own config
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