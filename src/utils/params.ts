import type { ParamEntry } from '../types/stepsOnboarding';

/** Record<string,string> → ParamEntry[]  (API → form) */
export const recordToParams = (record?: Record<string, string>): ParamEntry[] => {
    if (!record) return [];
    return Object.entries(record).map(([name, value]) => ({ name, value }));
};

/** ParamEntry[] → Record<string,string>  (form → API) */
export const paramsToRecord = (params: ParamEntry[]): Record<string, string> =>
    Object.fromEntries(params.map(p => [p.name, p.value]));