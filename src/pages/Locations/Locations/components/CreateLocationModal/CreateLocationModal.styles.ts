import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { COLORS } from '../../../../../shared/constants/COLORS';

export const CreationLocationCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: 15,
  padding: '0 50px 50px 50px',
}));

export const ThreeColumnsCont = styled(Box)(() => ({
  display: 'flex',
  gap: 15,
}));

export const ButtonCont = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  paddingTop: 30,
  borderTop: `solid 1px ${COLORS.BORDER_LIGHT}`,
  padding: '30px 50px',
  background: 'white',
  borderRadius: '0 0 15px 15px',
  width: '100%',
}));

export const CreateCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 15,
}));
