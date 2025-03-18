import styled from '@emotion/styled';
import { Box, Grid, Typography } from '@mui/material';
import { COLORS } from '../../../../../shared/constants/COLORS';

export const ManageIntegrationCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '0px 20px 80px 20px',
  gap: 15,
  width: '100%',
}));

export const Header = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
}));

export const Body = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: 30,
  gap: 20,
}));

export const HeaderBody = styled(Box)(() => ({
  display: 'flex',
  gap: 20,
}));

export const DetailsCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
}));

export const DetailsSection = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
}));

export const Labels = styled(Typography)(() => ({
  fontWeight: 800,
  fontSize: 12,
  color: COLORS.GREY,
}));

export const LabelDesc = styled(Box)(() => ({
  fontWeight: 400,
  fontSize: 16,
}));

export const ButtonCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 15,
  borderRadius: '0 0 15px 15px',
  justifyContent: 'flex-end',
}));

export const HeaderContent = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'space-between',
}));
