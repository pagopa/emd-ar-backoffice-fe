import { userActions } from '@pagopa/selfcare-common-frontend/lib/redux/slices/userSlice';
import { storageUserOps } from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { useEffect } from 'react';
import { checkTppExists } from '../api/tpp';
import { useAppDispatch } from '../redux/hook';
import {
    setOrganization,
    setTppRegistered,
    setTppIdCheckFailed,
} from '../redux/slices/organizationSlice';
import { getOrganizationFromStorage } from '../utils/organization';
import ROUTES from '../routes';
import { useLocation } from 'react-router-dom';

export const useInitSession = () => {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    useEffect(() => {
        localStorage.removeItem('acs_tpp_id');

        if (pathname === ROUTES.AUTH) return;

        const organization = getOrganizationFromStorage();
        const user = storageUserOps.read();

        if (organization) dispatch(setOrganization(organization));
        if (user) dispatch(userActions.setLoggedUser(user));

        checkTppExists()
            .then((response) => {
                if (response === null) {
                    localStorage.removeItem('tpp_registered');
                    dispatch(setTppRegistered(false));
                } else {
                    localStorage.setItem('tpp_registered', 'true');
                    dispatch(setTppRegistered(true));
                }
            })
            .catch(() => {
                dispatch(setTppIdCheckFailed());
            });
    }, [dispatch]);
};