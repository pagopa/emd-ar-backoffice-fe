import type { OrganizationRole } from './auth';

export interface StoredOrganization {
    id: string;
    fiscal_code: string;
    name: string;
    roles: OrganizationRole[];
}