import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';
import { COLORS } from '../../shared/constants/COLORS';

export const InventoryCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '40px 30px',
}));

export const Header = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const ButtonCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 15,
  paddingBottom: 20,
  marginTop: 15,
  borderRadius: '0 0 15px 15px',
}));

export const Body = styled(Box)(() => ({
  display: 'flex',
}));

export const InventoryButtons = styled(Button)<{ active: number }>(({ active }) => ({
  padding: '15px 30px',
  borderRadius: 25,
  border: `solid 2px ${active === 1 ? COLORS.PRIMARY : 'transparent'}`,
  background: active === 1 ? COLORS.PRIMARY_LIGHT : 'white',
  color: active === 1 ? COLORS.PRIMARY : '#000',
  fontSize: 14,
  fontWeight: 900,
  '&&:hover': {
    color: COLORS.PRIMARY,
    background: COLORS.PRIMARY_LIGHT,
  },
  height: 49,
}));

export const TextCont = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  alignItems: 'top',
  lineHeight: 'normal',
}));
