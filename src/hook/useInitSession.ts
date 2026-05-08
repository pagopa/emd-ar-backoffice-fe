import { userActions } from '@pagopa/selfcare-common-frontend/lib/redux/slices/userSlice';
import { storageUserOps } from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { useEffect } from 'react';
import { getTppByEntityId } from '../api/tpp';
import { useAppDispatch } from '../redux/hook';
import { setOrganization, setTppId, setTppIdNotFound } from '../redux/slices/organizationSlice';
import { getOrganizationFromStorage } from '../utils/organization';

export const useInitSession = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const organization = getOrganizationFromStorage();
        const tppId = localStorage.getItem('acs_tpp_id');
        const user = storageUserOps.read();

        if (organization) dispatch(setOrganization(organization));
        if (user) dispatch(userActions.setLoggedUser(user));

        if (tppId) {
            dispatch(setTppId(tppId));
        } else if (organization?.fiscalCode) {
            getTppByEntityId()
                .then((response) => {
                    if (response?.tppId) {
                        dispatch(setTppId(response.tppId));
                    } else {
                        dispatch(setTppIdNotFound());
                    }
                })
                .catch((err) => {
                    console.error('[useInitSession] getTppByEntityId failed:', err);
                    dispatch(setTppIdNotFound());
                });
        }

    }, [dispatch]);
};
