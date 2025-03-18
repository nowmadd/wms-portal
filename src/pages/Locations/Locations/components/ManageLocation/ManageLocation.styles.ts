import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { COLORS } from '../../../../../shared/constants/COLORS';

export const LocationCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 15,
}));

export const Header = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
}));

export const ButtonCont = styled(Box)(() => ({
  gap: 20,
  justifyContent: 'flex-end',
  width: '100%',
  display: 'flex',
}));

export const FormCont = styled(Box)(() => ({
  display: 'flex',
  gap: 30,
}));

export const FormChild = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '15px 0',
  gap: 15,
}));

export const LocationDimensions = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 15,
}));

export const FieldCont = styled(Box)(() => ({
  display: 'flex',
  gap: 15,
}));

export const DeleteConfirmCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '20px 50px 30px 50px',
  gap: 20,
}));

export const ModalButtonCont = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  paddingTop: 30,
  borderTop: `solid 1px ${COLORS.BORDER_LIGHT}`,
  padding: '30px 50px',
  background: 'white',
  borderRadius: '0 0 15px 15px',
  width: '100%',
  gap: 20,
}));

export const LocationContentsList = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 15,
}));
