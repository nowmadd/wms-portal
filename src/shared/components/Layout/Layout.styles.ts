import { Grid, styled } from '@mui/material';

export const MainCont = styled(Grid)(() => ({
  display: ' flex ',
  height: '100vh',
}));

export const ChildrenCont = styled(Grid)(() => ({
  overflowY: 'auto',
  // background: 'yellow',
  flex: 1,
  // height: '100vh',
}));
