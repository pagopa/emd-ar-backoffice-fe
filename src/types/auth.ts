export interface OrganizationRole {
    partyRole: string;
    role: 'admin' | 'operator';
}

export interface OrganizationInfo {
    id: string;
    ipaCode: string;
    name: string;
    fiscalCode: string;
    roles: OrganizationRole[];
}

export interface UserInfo {
    uid: string;
    name: string;
    familyName: string;
    email: string;
}


export interface UserInfoResponse {
    uid: string;
    name: string;
    familyName: string;
    email: string;
    organization: OrganizationInfo;
}

export interface AcsResponse {
    token: string;
    userInfo: UserInfoResponse;
}