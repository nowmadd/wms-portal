import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { COLORS } from '../../../constants/COLORS';

export const WizardCont = styled(Box)(() => ({
  display: 'flex',
  padding: '20px 15px',
  color: 'white',
  marginTop: 10,
  borderRadius: 8,
  gap: 10,
  cursor: 'pointer',
  //add hover
  '&:hover': {
    opacity: 0.8,
  },
  transition: 'opacity 0.1s ease-in-out',
}));

export const InfoCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 5,
  flex: 1,
}));
