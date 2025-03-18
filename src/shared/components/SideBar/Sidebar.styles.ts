import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { COLORS } from '../../constants/COLORS';

export const SidebarCont = styled(Box)(() => ({
  display: 'flex',
  width: '320px',
  borderRight: `solid 1px ${COLORS.BORDER_LIGHT}`,
  flexDirection: 'column',
  padding: '50px 0 100px 0',
  background: COLORS.WHITE,
  justifyContent: 'space-between',
  overflowY: 'auto',
}));

export const SidebarTop = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 15,
}));

export const SidebarMid = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: 15,
  padding: '0 15px',
}));

export const SidebarBot = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'end',
  gap: 15,
  padding: 15,
}));

//NOTE: to solve Warning: Received "true" for a non-boolean attribute
//se need to convert 'Active' props of SidebarButton from Boolean to number
//ref: https://maximeblanc.fr/blog/how-to-fix-the-received-true-for-a-non-boolean-attribute-error/
export const SidebarButton = styled(Button)<{ active: number }>(({ active }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  padding: '10px',
  fontSize: 16,
  color: active === 1 ? COLORS.PRIMARY : '#404040',
  background: active === 1 ? COLORS.PRIMARY_LIGHT : 'unset',
  fontWeight: 700,
  textTransform: 'none',
  borderRadius: 8,
  transition: 'background-color 0.1s ease-in-out',
  '&&:hover': {
    color: COLORS.PRIMARY,
    background: active === 1 ? COLORS.PRIMARY_LIGHT : COLORS.PRIMARY_INACTIVE,
  },
  '& > span': {
    marginRight: 0,
  },
  gap: 15,
}));

export const SidebarButtonText = styled(Box)(() => ({
  display: 'flex',
  flex: 1,
}));

export const SidebarButtonPreIcon = styled(Box)(() => ({
  margin: 0,
  padding: 7,
  lineHeight: '20px',
}));
