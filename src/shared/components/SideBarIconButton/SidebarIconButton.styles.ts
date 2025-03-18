import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { COLORS } from '../../constants/COLORS';

export const SidebarIconButtonCont = styled(Box)(() => ({
  lineHeight: '20px',
  margin: 0,
  padding: 7,
  textTransform: 'none',
  borderRadius: 8,
  transition: 'background-color 0.1s ease-in-out',
  '&&:hover': {
    color: COLORS.WHITE,
    background: COLORS.PRIMARY,
  },
}));
