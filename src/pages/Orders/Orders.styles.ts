import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { COLORS } from '../../shared/constants/COLORS';

export const OrderCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '40px 30px 80px 30px',
  gap: 15,
}));

export const Header = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 15,
}));

export const ButtonCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 15,
  borderRadius: '0 0 15px 15px',
  justifyContent: 'flex-end',
}));

export const TextCont = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  alignItems: 'top',
  lineHeight: 'normal',
}));

export const OrderContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
}));

export const OrderName = styled(Typography)(() => ({
  fontSize: 16,
  fontWeight: 600,
  color: COLORS.PRIMARY_DARK,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
}));
