import styled from '@emotion/styled';
import Box from '@mui/material/Box/Box';

interface Props {
  dismissing: boolean;
}
export const UploadingItemCont = styled(Box)<Props>(({ dismissing }) => ({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 8,
  background: 'white',
  boxSizing: 'border-box',
  gap: 10,
  padding: dismissing ? '0 20px' : '20px',
  height: dismissing ? 0 : 117,
  transition: '0.2s ease-in-out',
  overflow: 'hidden',
}));

export const HeaderCont = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: 20,
}));

export const SectionCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));
