import styled from '@emotion/styled';
import Box from '@mui/material/Box/Box';
import { COLORS } from '../../../shared/constants/COLORS';
import TextField from '@mui/material/TextField/TextField';
import Typography from '@mui/material/Typography/Typography';
import { Grid } from '@mui/material';

export const ProfilePasswordCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: 15,
}));

export const PasswordDetailsCont = styled(Grid)(() => ({
  // gap: 30,
}));

export const PasswordDetails = styled(Grid)(() => ({}));

export const Section = styled(Box)(() => ({
  display: 'flex',
  alignSelf: 'stretch',
  flexDirection: 'column',
  gap: 15,
}));

export const DetailsColumn = styled(Box)(() => ({
  display: 'flex',
  alignSelf: 'stretch',
  gap: 15,
}));

export const FieldCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
}));

export const InputColumn = styled(Box)(() => ({
  display: 'flex',
  alignSelf: 'stretch',
  gap: 15,
}));

export const Firstname = styled(Box)(() => ({
  flex: 1,
  gap: 10,
}));

export const FirstnameInput = styled(TextField)(() => ({
  display: 'flex',
  input: {
    padding: '8px 12px',
  },
}));

export const Lastname = styled(Box)(() => ({
  flex: 1,
  gap: 10,
}));

export const LastnameInput = styled(TextField)(() => ({
  display: 'flex',
  input: {
    padding: '8px 12px',
  },
}));

export const StaticForm = styled(Box)(() => ({}));

export const StaticValueText = styled(Box)(() => ({
  padding: '12px 8px',
}));

export const PillsCont = styled(Box)(() => ({
  display: 'flex',
  gap: 5,
  padding: '8px 12px 8px 8px',
}));
