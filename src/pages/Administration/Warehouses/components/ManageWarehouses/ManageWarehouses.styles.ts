import styled from '@emotion/styled';
import { Box, TextField } from '@mui/material';

export const ManageWarehouseCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,

  gap: 30,
}));

export const Header = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const Body = styled(Box)(() => ({
  display: 'flex',
  gap: 0,
  width: '100%',
}));

export const Section = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 15,
  flex: 1,
}));

export const ScheduleSection = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 15,
  flex: 1,
}));

export const Col = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 5,
}));

export const Row = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
}));

//Delete modal

export const ModalCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const ModalSection = styled(Box)(() => ({
  display: 'flex',
  borderRadius: '0 0 15px 15px',
  padding: '30px 50px 30px 50px',
}));
export const BusinessAddressForm = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const Notes = styled(Box)(() => ({
  flex: 1,
}));

export const NotesInput = styled(TextField)(() => ({
  display: 'flex',
  input: {
    padding: '5px',
  },
}));

export const HeaderButtonCont = styled(Box)(() => ({
  padding: '15px 0px',
  display: 'flex',
  justifyContent: 'right',
  gap: 20,
}));

export const DateLabel = styled(Box)(() => ({
  flex: 1,
}));

export const DateInput = styled(Box)(() => ({
  flex: 8,
  display: 'flex',
  flexDirection: 'row',
  gap: 10,
}));

export const ClosureDates = styled(Box)(() => ({
  gap: 15,
  display: 'flex',
  flexDirection: 'column',
}));

export const ClosureButton = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'end',
}));
