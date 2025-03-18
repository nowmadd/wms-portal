import styled from '@emotion/styled';
import Box from '@mui/material/Box/Box';
import TextField from '@mui/material/TextField/TextField';
import Typography from '@mui/material/Typography/Typography';

export const JobDetails = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 2,
  gap: 15,
  marginBottom: 50,
}));

export const Side = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  gap: 15,
}));

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

export const NotesInput = styled(TextField)(() => ({
  display: 'flex',
  marginTop: 10,
  input: {
    padding: '8px 12px',
  },
}));

export const CommentInput = styled(TextField)(() => ({
  display: 'flex',
  input: {
    padding: '8px 12px',
  },
}));

export const Column = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 2,
  gap: 15,
}));

export const InputColumn = styled(Box)(() => ({
  display: 'flex',
  alignSelf: 'stretch',
  gap: 15,
}));

export const ButtonCont = styled(Box)(() => ({
  gap: 10,
  justifyContent: 'flex-end',
  width: '100%',
  display: 'flex',
}));

export const ListItemCont = styled(Box)(() => ({
  marginTop: '8px',
  marginBottom: '8px',
  borderRadius: '18px',
}));

export const CommentTitle = styled(Box)(() => ({
  gap: 15,
  alignItems: 'center',
  width: '100%',
  display: 'inline-flex',
}));
