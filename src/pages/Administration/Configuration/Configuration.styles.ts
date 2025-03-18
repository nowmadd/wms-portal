import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { COLORS } from '../../../shared/constants/COLORS';

export const ConfigurationMainCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: 15,
}));

export const Header = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
}));

export const HeaderButtonCont = styled(Box)(() => ({
  display: 'flex',
  gap: 20,
}));
