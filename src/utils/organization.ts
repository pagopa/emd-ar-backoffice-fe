import type { OrganizationInfo } from '../types/auth';
import type { StoredOrganization } from '../types/organization';
import { ORGANIZATION_STORAGE_KEY } from './constant';

import { storageTokenOps } from '@pagopa/selfcare-common-frontend/lib/utils/storage';


export const isTokenExpired = (token: string): boolean => {
    try {
        const { exp } = JSON.parse(atob(token.split('.')[1]));
        return typeof exp === 'number' && exp * 1000 < Date.now();
    } catch {
        return true;
    }
};

export const getOrganizationFromStorage = (): StoredOrganization | null => {
    const token = storageTokenOps.read();
    if (!token || isTokenExpired(token)) {
        if (token) {
            storageTokenOps.delete();
            localStorage.removeItem(ORGANIZATION_STORAGE_KEY);
        }
        return null;
    }
    try {
        const raw = localStorage.getItem(ORGANIZATION_STORAGE_KEY);
        return raw ? (JSON.parse(raw) as StoredOrganization) : null;
    } catch {
        return null;
    }
};

export const saveOrganization = ( organizationInfo: OrganizationInfo): StoredOrganization => {
    const organization: StoredOrganization = {
        id: organizationInfo.id,
        fiscalCode: organizationInfo.fiscalCode,
        name: organizationInfo.name,
        roles: organizationInfo.roles,
    };
    localStorage.setItem(ORGANIZATION_STORAGE_KEY, JSON.stringify(organization));
    return organization;
};