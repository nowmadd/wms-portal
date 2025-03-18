import styled from '@emotion/styled';
import Box from '@mui/material/Box/Box';
import { COLORS } from '../../../shared/constants/COLORS';
import { Typography } from '@mui/material';

export const ActivityMainCont = styled(Box)(() => ({
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

export const PerformedActivityContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const PerformedActivityTitle = styled(Typography)(() => ({
  fontSize: 16,
  fontWeight: 600,
  color: COLORS.PRIMARY_DARK,
}));

export const PerformedActivityDescription = styled(Typography)(() => ({
  fontSize: 10,
  textOverflow: 'ellipsis',
}));
