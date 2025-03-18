import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const JobTypeCardStyle = styled(Box)(() => ({
  cursor: 'pointer',
  flex: 1,
  color: 'white',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  flexGrow: 1,
  minWidth: 240,
  maxWidth: 240,
  maxHeight: 125,
  minHeight: 125,
  padding: '20px 0px 0px 10px',
  gap: 15,
  overflow: 'hidden',
}));

export const Content = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: 15,
}));

export const Image = styled('img')(() => ({
  objectFit: 'contain',
  height: '100px',
}));
