import type { Step1Values } from "../types/stepsOnboarding";
import type { TppResponse, EndpointLinkPageDto } from "../types/tpp";
import { buildAgentLinks, remapAgentLinkKeys } from "./deepLink";

export const buildPatchPayload = (
    original: TppResponse,
    values: Step1Values
): Partial<EndpointLinkPageDto> => {
    const patch: Partial<EndpointLinkPageDto> = {};

    if (values.webhookUrl !== original.messageUrl) {
        patch.messageUrl = values.webhookUrl;
    }

    if (values.authUrl !== original.authenticationUrl) {
        patch.authenticationUrl = values.authUrl;
    }

    if ("OAUTH2" !== original.authenticationType) {
        patch.authenticationType = "OAUTH2";
    }

    const newAgentLinks = buildAgentLinks(values);
    const remappedAgentLinks = original.agentLinks
        ? remapAgentLinkKeys(newAgentLinks, original.agentLinks)
        : newAgentLinks;

    if (JSON.stringify(remappedAgentLinks) !== JSON.stringify(original.agentLinks ?? {})) {
        patch.agentLinks = remappedAgentLinks;
    }

    return patch;
};