import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const AccountCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 15,
  flex: 1,
}));

export const FormCont = styled(Box)(() => ({
  display: 'flex',
  gap: 15,
}));

export const Section = styled(Box)(() => ({
  display: 'flex',
  padding: '15px 0',
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'space-evenly',
}));

export const InfoCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: 15,
  padding: '30px 0',
}));
