import type { Step1Values } from "../types/stepsOnboarding";
import type { TppResponse, EndpointLinkPageDto } from "../types/tpp";
import { buildAgentLinks } from "./deepLink";

export const buildPatchPayload = (
    original: TppResponse,
    values: Step1Values
): Partial<EndpointLinkPageDto> => {
    const patch: Partial<EndpointLinkPageDto> = {};

    const newMessageUrl = values.webhookUrl;
    if (newMessageUrl !== original.messageUrl) {
        patch.messageUrl = newMessageUrl;
    }

    const newAuthUrl = values.authUrl;
    if (newAuthUrl !== original.authenticationUrl) {
        patch.authenticationUrl = newAuthUrl;
    }

    if ("OAUTH2" !== original.authenticationType) {
        patch.authenticationType = "OAUTH2";
    }

    const newAgentLinks = buildAgentLinks(values);
    if (JSON.stringify(newAgentLinks) !== JSON.stringify(original.agentLinks ?? {})) {
        patch.agentLinks = newAgentLinks;
    }

    return patch;
};