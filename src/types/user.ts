
export type UserRole = 'admin' | 'user';

export interface StoredUser {
    uid: string;
    sub: string;
    role: UserRole;
    name?: string;
}