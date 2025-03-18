import styled from '@emotion/styled';
import Box from '@mui/material/Box/Box';
import { COLORS } from '../../../../../shared/constants/COLORS';
import TextField from '@mui/material/TextField/TextField';
import Typography from '@mui/material/Typography/Typography';

export const GroupMainCont = styled(Box)(() => ({
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

export const SubHeader = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  width: '100%',
  alignItems: 'flex-start',
}));

export const DescriptionCont = styled(Box)(() => ({
  display: 'flex',
  flex: 1,
  fontSize: 14,
  justifyContent: 'left',
  gap: 20,
}));

export const HeaderButtonCont = styled(Box)(() => ({
  padding: '15px 0px',
  display: 'flex',
  justifyContent: 'right',
  flex: 1,
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

export const GroupContent = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  width: '100%',
  gap: 15,
}));

export const TableCont = styled(Box)(() => ({
  flex: 1,
}));
export const AccessCont = styled(Box)(() => ({
  flex: 1,
  margin: '0px 15px',
}));
export const UserNameContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const UserName = styled(Typography)(() => ({
  fontSize: 16,
  fontWeight: 600,
  color: COLORS.PRIMARY_DARK,
}));

export const UserEmail = styled(Typography)(() => ({
  fontSize: 10,
  textOverflow: 'ellipsis',
}));

export const AccessContent = styled(Box)(() => ({
  gap: 15,
  margin: '15px 0',
  display: 'flex',
  flexDirection: 'column',
}));
export const ModalHeaderCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
}));

export const HandhelAccess = styled(Box)(() => ({}));
export const ManagementAccess = styled(Box)(() => ({}));

export const GroupMembers = styled(Box)(() => ({}));
