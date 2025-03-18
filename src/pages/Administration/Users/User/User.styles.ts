import styled from '@emotion/styled';
import Box from '@mui/material/Box/Box';
import { COLORS } from '../../../../shared/constants/COLORS';
import TextField from '@mui/material/TextField/TextField';

export const UserMainCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: 15,
}));

export const Header = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
}));

export const HeaderButtonCont = styled(Box)(() => ({
  padding: '15px 0px',
  display: 'flex',
  justifyContent: 'right',
  gap: 20,
}));

export const Row = styled(Box)(() => ({
  display: 'flex',
  gap: 30,
}));

export const Column = styled(Box)(() => ({
  display: 'flex',
  padding: '15px 0px',
  flexDirection: 'column',
  flex: 1,
  gap: 15,
}));

export const GroupMembership = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 5,
}));

export const GroupMembershipInput = styled(TextField)(() => ({
  display: 'flex',
  input: {
    padding: '8px 12px',
    fontSize: 13,
  },
}));

export const InfoPanelContainer = styled(Box)(() => ({
  color: '#005FCC',
  display: 'flex',
  flexDirection: 'row',
  padding: 15,
  gap: 15,
  justifyContent: 'center',
  alignItems: 'center',
}));

export const UserPanel = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 30,
}));

export const ProfileCard = styled(Box)(() => ({
  flex: 1,
  color: 'white',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: 35,
  gap: 15,
}));

export const ProfileDetails = styled(Box)(() => ({
  flex: 1,
  gap: 15,
}));

export const Notes = styled(Box)(() => ({
  flex: 1,
  gap: 10,
}));

export const NotesInput = styled(TextField)(() => ({
  display: 'flex',
  input: {
    padding: '8px 12px',
  },
}));

export const EmailContainer = styled(Box)(() => ({
  display: 'flex',
  gap: 5,
  alignItems: 'center',
}));

export const Footer = styled(Box)(() => ({
  position: 'fixed',
  bottom: 0,
  left: 320,
  right: 0,
  padding: 30,
  backgroundColor: '#FFFFFF',
  borderTop: `solid 1px ${COLORS.BORDER_LIGHT}`,
  justifyContent: 'space-between',
  flexDirection: 'row',
  display: 'flex',
}));

export const FooterButtonCont = styled(Box)(() => ({
  display: 'flex',
  gap: 15,
}));

export const Avatar = styled(Box)(() => ({}));
