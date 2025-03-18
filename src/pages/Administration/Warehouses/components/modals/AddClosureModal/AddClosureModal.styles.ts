import styled from '@emotion/styled';
import { Box, TextField } from '@mui/material';
import { COLORS } from '../../../../../../shared/constants/COLORS';

export const AddClosureCont = styled(Box)(() => ({
  display: 'flex',
  maxWidth: '100%',
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
export const TimeClosure = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 5,
}));
