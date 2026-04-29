import { useRef } from 'react';
import { useBlocker, useNavigate } from 'react-router-dom';

export const useUnsavedChangesBlocker = (isDirty: boolean) => {
    const navigate = useNavigate();
    const intentionalExit = useRef(false);

    const blocker = useBlocker(() => isDirty && !intentionalExit.current);

    const showDialog = blocker.state === 'blocked';

    const handleConfirmExit = (route: string) => {
        if (blocker.state === 'blocked') {
            blocker.proceed();
            return;
        }
        intentionalExit.current = true;
        void navigate(route);
    };

    const handleCancelExit = () => {
        if (blocker.state === 'blocked') blocker.reset();
    };

    return { showDialog, handleConfirmExit, handleCancelExit };
};