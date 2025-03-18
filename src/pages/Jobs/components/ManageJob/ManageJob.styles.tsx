import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { COLORS } from '../../../../shared/constants/COLORS';

export const ManageJobCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '40px 30px 80px 30px',
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

export const JobDetailsCont = styled(Box)(() => ({
  display: 'flex',
  gap: 30,
  alignSelf: 'stretch',
}));
