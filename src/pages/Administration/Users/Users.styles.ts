import styled from '@emotion/styled';
import Box from '@mui/material/Box/Box';
import { COLORS } from '../../../shared/constants/COLORS';

export const UsersMainCont = styled(Box)(() => ({
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
export const UserIcon = styled(Box)<{ color: string }>(({ color }) => ({
  backgroundColor: color,
  padding: 0,
  margin: 0,
  color: '#FFFFFF',
  fontSize: 24,
  height: 35,
  width: 35,
  borderRadius: 35,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
}));

// export const UserIcon = styled.div<{ color: string }>`
//   /* Adapt the colors based on primary prop */
//   background: ${(props) => props.color};
//   font-size: 24px;
//   width: 35px,
//   height: 35px,
//   border-radius: 35px,
// `;

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
