import type { AgentLink } from '../types/tpp';
import type { DeviceLink, VersionEntry, Step1Values } from '../types/stepsOnboarding';

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
            IOS: sharedLink,
            ANDROID: sharedLink,
            WEB: sharedLink,
        };
    }

    // Per-device — each OS has its own config, Web skipped if not filled
    const entries = values.deepLinkDevices
        .filter((device) => {
            if (device.so === 'WEB' && !device.fallBackLink && device.versions.length === 0) {
                return false;
            }
            return true;
        })
        .map((device) => [
            device.so,
            {
                fallBackLink: device.fallBackLink,
                versions: Object.fromEntries(
                    device.versions.map(({ versionKey, link }) => [versionKey, { link }])
                ),
            } satisfies AgentLink,
        ]);

    return Object.fromEntries(entries);
}

/** Converts versions from BE format ({ v1: { link } }) to form format ([{ versionKey, link }]) */
const parseVersions = (versions: Record<string, { link: string }>): VersionEntry[] =>
    Object.entries(versions).map(([versionKey, { link }]) => ({ versionKey, link }));

/**
 * Converts agentLinks from the BE into the Step1Values format (deepLinkType, deepLinkUniversale, deepLinkDevices).
 */
export const parseAgentLinks = (
    agentLinks: Record<string, AgentLink>
): Pick<Step1Values, 'deepLinkType' | 'deepLinkUniversale' | 'deepLinkDevices'> => {

    const DEVICE_KEY_MAP: Record<string, DeviceLink['so']> = {
        IOS: 'IOS',
        ANDROID: 'ANDROID',
        WEB: 'WEB',
    };

    const deepLinkDevices: DeviceLink[] = (['ANDROID', 'IOS', 'WEB'] as const).map((key) => {
        const device = agentLinks[key];
        return {
            so: DEVICE_KEY_MAP[key],
            fallBackLink: device?.fallBackLink ?? '',
            versions: device?.versions ? parseVersions(device.versions) : [],
        };
    });

    return {
        deepLinkType: 'specifico',
        deepLinkUniversale: { fallBackLink: '', versions: [] },
        deepLinkDevices,
    };
};

