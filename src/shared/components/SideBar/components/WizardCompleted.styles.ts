import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { COLORS } from '../../../constants/COLORS';
export const CompletedStateCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '20px 10px',
  justifyContent: 'space-between',
  gap: 5,
  flex: 1,
  cursor: 'pointer',
  borderRadius: 8,
  '&&:hover': {
    color: COLORS.PRIMARY,
    background: COLORS.PRIMARY_INACTIVE,
  },
  margin: '10px 0px 44px 0px',
}));
