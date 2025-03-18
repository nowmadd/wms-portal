import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const SetupWizardCont = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  overflow: 'hidden',
  height: '100%',
}));

export const Header = styled(Box)(() => ({
  width: '100%',
  padding: '20px 30px 5px',
}));
export const Body = styled(Box)(() => ({
  // width: '60%',
  overflowY: 'auto',
  flex: '1 1 auto',
  scrollbarGutter: 'stable',
  padding: '0px 20px 10px 30px',
}));

export const ButtonCont = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

export const Wrapper = styled(Box)(() => ({
  margin: 'auto auto 20px auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  overflow: 'hidden',
  background: 'white',
  width: '60%',
  position: 'relative',
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
