import type { AgentLink } from '../types/tpp';
import type { DeviceLink, VersionEntry, Step1Values } from '../types/stepsOnboarding';

const parseVersions = (versions: Record<string, { link: string }>): VersionEntry[] =>
    Object.entries(versions).map(([versionKey, { link }]) => ({ versionKey, link }));

const findDevice = (
    agentLinks: Record<string, AgentLink>,
    normalizedKey: string
): { originalKey: string; link: AgentLink } | undefined => {
    const key = Object.keys(agentLinks).find(k => k.toUpperCase() === normalizedKey);
    return key ? { originalKey: key, link: agentLinks[key] } : undefined;
};

const isUniversalConfig = (agentLinks: Record<string, AgentLink>): boolean => {
    const android = findDevice(agentLinks, 'ANDROID')?.link;
    const ios = findDevice(agentLinks, 'IOS')?.link;
    if (!android || !ios) return false;

    const candidates = [android, ios];
    const web = findDevice(agentLinks, 'WEB')?.link;
    if (web) candidates.push(web);

    const serialized = candidates.map(d => JSON.stringify(d));
    return serialized.every(s => s === serialized[0]);
};

/** Converts form values into the agentLinks format expected by the BE. */
export function buildAgentLinks(values: Step1Values): Record<string, AgentLink> {
    if (values.deepLinkType === 'universale') {
        const sharedLink: AgentLink = {
            fallBackLink: values.deepLinkUniversale.fallBackLink,
            versions: Object.fromEntries(
                values.deepLinkUniversale.versions.map(({ versionKey, link }) => [versionKey, { link }])
            ),
        };
        return { ANDROID: sharedLink, IOS: sharedLink, WEB: sharedLink };
    }

    const entries = values.deepLinkDevices
        .filter(device => device.so !== 'WEB' || device.fallBackLink || device.versions.length > 0)
        .map(device => [
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

/**
 * Remaps normalized keys (ANDROID/IOS/WEB) back to the original BE keys (e.g. Android, iOS)
 * to avoid breaking existing TPP integrations. Keys not present in the original are kept as-is.
 */
export const remapAgentLinkKeys = (
    newLinks: Record<string, AgentLink>,
    originalLinks: Record<string, AgentLink>
): Record<string, AgentLink> => {
    const originalKeyMap: Record<string, string> = Object.fromEntries(
        Object.keys(originalLinks).map(k => [k.toUpperCase(), k])
    );

    return Object.fromEntries(
        Object.entries(newLinks).map(([key, value]) => [
            originalKeyMap[key.toUpperCase()] ?? key,
            value,
        ])
    );
};

/**
 * Converts agentLinks from the BE into Step1Values format.
 * Detects "universale" automatically if ANDROID and IOS share the same config.
 * Always populates both deepLinkUniversale and deepLinkDevices so switching modes doesn't clear fields.
 */
export const parseAgentLinks = (
    agentLinks: Record<string, AgentLink>
): Pick<Step1Values, 'deepLinkType' | 'deepLinkUniversale' | 'deepLinkDevices'> => {
    const deepLinkDevices: DeviceLink[] = (['ANDROID', 'IOS', 'WEB'] as const).map(normalizedKey => {
        const found = findDevice(agentLinks, normalizedKey);
        return {
            so: normalizedKey,
            fallBackLink: found?.link.fallBackLink ?? '',
            versions: found?.link.versions ? parseVersions(found.link.versions) : [],
        };
    });

    if (isUniversalConfig(agentLinks)) {
        const reference = findDevice(agentLinks, 'ANDROID')!.link;
        return {
            deepLinkType: 'universale',
            deepLinkUniversale: {
                fallBackLink: reference.fallBackLink,
                versions: reference.versions ? parseVersions(reference.versions) : [],
            },
            deepLinkDevices,
        };
    }

    return {
        deepLinkType: 'specifico',
        deepLinkUniversale: { fallBackLink: '', versions: [] },
        deepLinkDevices,
    };
};

