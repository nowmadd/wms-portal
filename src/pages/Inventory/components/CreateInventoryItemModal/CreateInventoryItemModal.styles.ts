import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { COLORS } from '../../../../shared/constants/COLORS';

export const CreateItemCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
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
  position: 'fixed',
  bottom: 0
}));

export const FormCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '15px 50px 150px 50px',
  gap: 15,
}));

export const TwoColumnForm = styled(Box)(() => ({
  display: 'flex',
  gap: 15,
}));
