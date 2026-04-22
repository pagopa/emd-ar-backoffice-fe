import { storageUserOps } from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import type { User } from '@pagopa/selfcare-common-frontend/lib/model/User';
import type { UserInfo } from '../types/auth';

export const saveUser = (userInfo: UserInfo): User => {
    const user: User = {
        uid: userInfo.uid,
        name: userInfo.name,
        surname: userInfo.family_name,
        email: userInfo.email
    };
    storageUserOps.write(user);
    return user;
};