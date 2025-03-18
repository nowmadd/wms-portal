import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { COLORS } from '../../constants/COLORS';

export const FooterMainCont = styled(Box)(() => ({
  position: 'fixed',
  transition: 'all 0.3s ease-in-out',
  left: 320,
  right: 0,
  padding: 30,
  backgroundColor: '#FFFFFF',
  borderTop: `solid 1px ${COLORS.BORDER_LIGHT}`,
  justifyContent: 'space-between',
  flexDirection: 'row',
  display: 'flex',
}));

export const FooterButtonCont = styled(Box)(() => ({
  display: 'flex',
  gap: 15,
}));
