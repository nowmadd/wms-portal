import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const ButtonCont = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

export const Keyframes = styled('div')({
  '@keyframes shake': {
    '10%, 90%': {
      transform: 'translate3d(-1px, 0, 0)',
    },
    '20%, 80%': {
      transform: 'translate3d(2px, 0, 0)',
    },
    '30%, 50%, 70%': {
      transform: 'translate3d(-3px, 0, 0)',
    },
    '40%, 60%': {
      transform: 'translate3d(3px, 0, 0)',
    },
  },
  animation: 'shake .7s',
});
