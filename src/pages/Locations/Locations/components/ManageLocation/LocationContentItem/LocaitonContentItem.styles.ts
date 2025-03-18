import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { COLORS } from '../../../../../../shared/constants/COLORS';

export const ItemCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  background: COLORS.WHITE,
  borderRadius: 6,
  minWidth: 750,
  border: `solid 1px ${COLORS.BORDER_LIGHT}`,
}));

export const ItemHeader = styled(Box)(() => ({
  height: '50px',
  padding: '8px 24px',
  display: 'flex',
  alignItems: 'center',
  gap: 5,
  borderBottom: `solid 1px ${COLORS.BORDER_LIGHT}`,
}));

export const ItemContent = styled(Box)(() => ({
  padding: '8px 24px',
  display: 'flex',
  gap: '30px',
}));

export const ItemContentInfo = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  padding: '15px 0',
  gap: 5,
}));

export const StockPills = styled(Box)(() => ({
  padding: '8px 0 15px 8px',
}));

export const Pills = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 5,
  cursor: 'default',
}));
