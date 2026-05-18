import { userActions } from '@pagopa/selfcare-common-frontend/lib/redux/slices/userSlice';
import { storageUserOps } from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { useEffect } from 'react';
import { getTppProfile } from '../api/tpp';
import { useAppDispatch } from '../redux/hook';
import {
    setOrganization,
    setTppRegistered,
    setTppIdCheckFailed,
} from '../redux/slices/organizationSlice';
import { getOrganizationFromStorage } from '../utils/organization';

export const useInitSession = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const organization = getOrganizationFromStorage();
        const user = storageUserOps.read();

        if (organization) dispatch(setOrganization(organization));
        if (user) dispatch(userActions.setLoggedUser(user));

        getTppProfile()
            .then((response) => {
                dispatch(setTppRegistered(response !== null));
            })
            .catch(() => {
                dispatch(setTppIdCheckFailed());
            });
    }, [dispatch]);
};