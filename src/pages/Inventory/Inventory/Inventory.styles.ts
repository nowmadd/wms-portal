import styled from '@emotion/styled';
import Box from '@mui/material/Box/Box';
import { COLORS } from '../../../shared/constants/COLORS';
import Typography from '@mui/material/Typography/Typography';

export const InventoryMainCont = styled(Box)(() => ({
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

export const StatsContainer = styled(Box)(() => ({
  display: 'flex',
  gap: 20,
}));

export const Stats = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const ActionButton = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  backgroundColor: 'white',
  color: 'black',
  fontSize: 24,
  height: 35,
  width: 35,
  borderRadius: 35,
}));

export const InventoryNameContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
}));

export const InventoryName = styled(Typography)(() => ({
  fontSize: 16,
  fontWeight: 600,
  color: COLORS.PRIMARY_DARK,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  maxWidth: '300px',
}));

export const StockLevelPills = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 5,
  cursor: 'cursor',
}));
