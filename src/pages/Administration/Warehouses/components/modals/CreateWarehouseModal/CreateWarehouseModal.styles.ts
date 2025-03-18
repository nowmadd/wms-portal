import styled from '@emotion/styled';
import { Box, TextField } from '@mui/material';
import TextFieldStyle from '../../../../../../shared/components/TextField/TextField';
import { COLORS } from '../../../../../../shared/constants/COLORS';

export const CreateWarehouseCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const Header = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
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
  gap: 20,
}));

export const BusinessAddressForm = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const Notes = styled(Box)(() => ({
  flex: 1,
  gap: 10,
}));

export const NotesInput = styled(TextField)(() => ({
  display: 'flex',
  input: {
    padding: '5px',
  },
}));

export const NumberInput = styled(TextFieldStyle)(() => ({
  '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
    display: 'none',
  },
  '& input[type=number]': {
    MozAppearance: 'textfield',
  },
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
