import styled from '@emotion/styled';
import TextField from '@mui/material/TextField/TextField';
import Box from '@mui/material/Box/Box';
import { Typography } from '@mui/material';
import { COLORS } from '../../constants/COLORS';

export const TextFiledWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
}));

export const MUITextField = styled(TextField)(() => ({
  display: 'flex',
  input: {
    padding: '8px 12px',
    background: 'white',
  },
  formHelperTextProps: {
    color: 'red !important',
  },
}));

export const TipText = styled(Typography)(() => ({
  lineHeight: '18px',
  margin: '5px 10px',
  fontSize: 10,
  color: COLORS.GREY,
}));

export const FieldWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  alignItems: 'center',
  gap: 10,
}));

export const Underlines = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: '6px',
  gap: 4,
}));

export const Underline = styled(Box)(() => ({
  flexGrow: 1,
  transition: 'background-color 0.3s',
}));

export const PasswordTextFieldWrapper = styled(Box)(() => ({
  width: '100%',
}));

export const PasswordInput = styled(TextField)<{ currentColor?: any }>(({ currentColor }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderBottom: 'none',
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
    },
    '&:hover fieldset': {
      borderColor: 'gray',
    },
    '&.Mui-focused fieldset': {
      borderColor: !currentColor ? COLORS['PRIMARY'] : currentColor,
    },
  },
  '& .MuiOutlinedInput-input': {
    padding: '8px 12px',
  },
}));
