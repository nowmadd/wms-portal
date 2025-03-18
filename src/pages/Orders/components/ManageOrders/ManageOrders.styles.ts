import styled from '@emotion/styled';
import Box from '@mui/material/Box/Box';
import { COLORS } from '../../../../shared/constants/COLORS';
import TextField from '@mui/material/TextField/TextField';
import Typography from '@mui/material/Typography/Typography';

export const ManageOrderCont = styled(Box)(() => ({
  padding: '40px 30px',
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

export const HeaderButtonCont = styled(Box)(() => ({
  padding: '15px 0px',
  display: 'flex',
  justifyContent: 'right',
  gap: 20,
}));

export const OrderDetailsCont = styled(Box)(() => ({
  display: 'flex',
  gap: 30,
  alignSelf: 'stretch',
}));

export const CustomerDetails = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 2,
  gap: 15,
}));

export const OrderDetails = styled(Box)(() => ({
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

export const TableCont = styled(Box)(() => ({}));

export const ItemDescriptionContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
}));

export const ItemName = styled(Typography)(() => ({
  fontSize: 16,
  fontWeight: 600,
  color: COLORS.PRIMARY_DARK,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  maxWidth: '300px',
}));
