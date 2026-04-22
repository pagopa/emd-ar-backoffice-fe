export interface OrganizationRole {
    partyRole: string;
    role: 'admin' | 'operator';
}

export interface OrganizationInfo {
    fiscal_code: string;
    id: string;
    name: string;
    roles: OrganizationRole[];
}

export interface UserInfo {
    uid: string;
    name: string;
    family_name: string;
    email: string;
}

export interface AcsResponse {
    status: string;
    message: string;
    token: string;
    userInfo: UserInfo;
    organizationInfo: OrganizationInfo;
}