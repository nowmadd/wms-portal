import styled from '@emotion/styled';
import { Box, TextField } from '@mui/material';
import { COLORS } from '../../../../../shared/constants/COLORS';

export const ButtonCont = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  paddingTop: 30,
  borderTop: `solid 1px ${COLORS.BORDER_LIGHT}`,
  padding: '30px 50px',
  background: 'white',
  gap: 20,
  borderRadius: '0 0 15px 15px',
}));

export const Content = styled(Box)(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-end',
  justifyContent: 'center',
  flexDirection: 'row',
  padding: '0px 30px 0px 30px',
  gap: 15,
}));

export const CreationJobCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: 15,
  padding: '20px 50px 50px 50px',
}));

export const CreateCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 15,
}));

export const TwoColumnForm = styled(Box)(() => ({
  display: 'flex',
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
