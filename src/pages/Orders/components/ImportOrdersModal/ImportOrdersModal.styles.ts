import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { COLORS } from '../../../../shared/constants/COLORS';

export const ModalCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 15,
  alignSelf: 'stretch',
  background: COLORS.BG_LIGHT,
  minWidth: 647,
}));

export const ModalBody = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: 15,
  gap: 15,
  padding: '0 50px',
}));

export const ModalFooter = styled(Box)(() => ({
  display: 'flex',
  height: 116,
  padding: '30px 0',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 15,
  flexShrink: 0,
  alignSelf: 'stretch',
  background: COLORS.WHITE,
  borderTop: `${COLORS.BORDER_LIGHT} solid 1px`,
}));

export const ImportCont = styled(Box)(() => ({
  display: 'flex',
  flex: 1,
  border: `${COLORS.BORDER_LIGHT} dashed 3px`,
  borderRadius: 6,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 15,
  cursor: 'pointer',
  padding: '20px 0px',
}));

export const UploadingItemsCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
}));
