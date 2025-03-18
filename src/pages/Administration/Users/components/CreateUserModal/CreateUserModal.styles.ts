import styled from '@emotion/styled';
import { Box, TextField } from '@mui/material';
import { COLORS } from '../../../../../shared/constants/COLORS';

export const CreateUserCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '650px',
}));

export const Header = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const UserGroupsText = styled(TextField)(() => ({
  display: 'flex',
  input: {
    padding: '8px 12px',
  },
}));

export const UserNotesText = styled(TextField)(() => ({
  display: 'flex',
  input: {
    padding: '8px 12px',
  },
}));

export const ButtonCont = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  paddingTop: 30,
  borderTop: `solid 1px ${COLORS.BORDER_LIGHT}`,
  padding: '30px 50px',
  background: 'white',
  borderRadius: '0 0 15px 15px',
}));

export const FormCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '15px 50px 50px 50px',
}));
