import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { COLORS } from '../../../../shared/constants/COLORS';

export const PickJobTypeCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 15,
}));

export const CardContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 15,
  padding: '30px 30px 30px 30px',
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

export const Content = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  flexDirection: 'row',
  padding: '0px 30px 0px 30px',
  gap: 15,
}));
