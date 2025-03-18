import { Box, styled } from '@mui/material';

import { COLORS } from '../../shared/constants/COLORS';
import Typography from '@mui/material/Typography/Typography';

export const DashboardMainCont = styled(Box)(() => ({
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
  alignItems: 'center',
  lineHeight: 'normal',
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

export const JobsNameContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
}));

export const JobsName = styled(Typography)(() => ({
  fontSize: 16,
  fontWeight: 600,
  color: COLORS.PRIMARY_DARK,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  maxWidth: '300px',
}));
