import styled from '@emotion/styled';
import Box from '@mui/material/Box/Box';
import { COLORS } from '../../../shared/constants/COLORS';
import { Typography } from '@mui/material';

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

export const GroupNameContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const GroupName = styled(Typography)(() => ({
  fontSize: 16,
  fontWeight: 600,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  maxWidth: '100%',
  color: COLORS.PRIMARY_DARK,
}));

export const GroupDescription = styled(Typography)(() => ({
  fontSize: 10,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  maxWidth: '200px',
  color: 'black',
}));

export const ModalCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: COLORS.BG_LIGHT,
  minWidth: 650,
  paddingTop: 40,
  borderRadius: 15,
  // overflow: 'hidden',
}));

export const ModalHeader = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 50px',
}));

export const IconButton = styled(Box)(() => ({
  display: 'flex',
  borderRadius: 4,
  backgroundColor: '#DDDDDD90',
  '&&:hover': {
    backgroundColor: '#DDDDDD',
  },
}));
