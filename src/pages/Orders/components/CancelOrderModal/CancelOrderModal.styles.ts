import styled from '@emotion/styled';
import { Box, TextField } from '@mui/material';
import { COLORS } from '../../../../shared/constants/COLORS';

export const DeleteCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '650px',
}));

export const Content = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '0px 50px 30px 50px',
  gap: 15,
}));

export const ButtonCont = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  paddingTop: 30,
  borderTop: `solid 1px ${COLORS.BORDER_LIGHT}`,
  padding: '30px 50px',
  background: 'white',
  gap: 20,
  borderRadius: '0 0 15px 15px',
}));
