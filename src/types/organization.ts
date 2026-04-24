import type { OrganizationRole } from './auth';

export interface StoredOrganization {
    id: string;
    fiscalCode: string; 
    name: string;
    roles: OrganizationRole[];
}