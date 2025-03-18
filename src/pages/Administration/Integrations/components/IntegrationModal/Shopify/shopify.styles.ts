import { Box, styled } from '@mui/material';

export const ShopifyCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
  padding: '20px 50px',
}));

export const ShopifyTop = styled(Box)(() => ({
  display: 'flex',
  gap: 25,
  alignItems: 'center',
}));

export const ShopifyBottom = styled(Box)(() => ({
  display: 'flex',
  gap: 20,
}));

export const TableMain = styled(Box)(() => ({
  borderRadius: 1,
  width: '100%',
  padding: '20px 50px 50px',
  gap: '20px',
  display: 'flex',
  flexDirection: 'column',
}));

export const RowItem = styled(Box)(() => ({
  display: 'flex',
}));

export const Cell = styled(Box)(() => ({
  flex: 2,
  alignItems: 'center',
  display: 'flex',
}));

export const Row = styled(Box)(() => ({
  display: 'flex',
  gap: 20,
  padding: '10px 20px',
}));
