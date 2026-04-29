import type { UserInfo } from '../types/auth';

import type { User } from '@pagopa/selfcare-common-frontend/lib/model/User';
import { storageUserOps } from '@pagopa/selfcare-common-frontend/lib/utils/storage';

export const saveUser = (userInfo: UserInfo): User => {
    const user: User = {
        uid: userInfo.uid,
        name: userInfo.name,
        surname: userInfo.familyName,
        email: userInfo.email
    };
    storageUserOps.write(user);
    return user;
};