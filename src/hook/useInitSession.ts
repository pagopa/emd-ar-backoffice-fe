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
import { appStateActions } from '@pagopa/selfcare-common-frontend/lib/redux/slices/appStateSlice';
import { store } from '../redux/store';

export const useInitSession = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        localStorage.removeItem('acs_tpp_id');

        const organization = getOrganizationFromStorage();
        const user = storageUserOps.read();

        if (organization) dispatch(setOrganization(organization));
        if (user) dispatch(userActions.setLoggedUser(user));

        checkTppExists()
            .then((response) => {
                if (response === null) {
                    const wasRegistered = localStorage.getItem('tpp_registered') === 'true';
                    if (wasRegistered) {
                        localStorage.removeItem('tpp_registered');
                        store.dispatch(appStateActions.addError({
                            id: 'TPP_NOT_FOUND',
                            error: new Error('TPP not found'),
                            techDescription: 'TPP not found',
                            blocking: false,
                            toNotify: true,
                            component: 'Toast',
                            displayableDescription: "La TPP non è più disponibile. Ripetere la registrazione o contattare l'assistenza",
                        }));
                    }
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