import {
    StepConnector,
    stepConnectorClasses,
} from '@mui/material';
import { styled } from '@mui/material/styles';
export const ColoredConnector = styled(StepConnector)(({ theme }) => ({
    flex: 1,
    alignSelf: 'flex-start',
    marginTop: '13px',

    [`&.${stepConnectorClasses.active} .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.primary.main,
        borderWidth: 4,
    },
    [`&.${stepConnectorClasses.completed} .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.primary.main,
        borderWidth: 4,
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.grey[300],
        borderWidth: 4,
    },
}));