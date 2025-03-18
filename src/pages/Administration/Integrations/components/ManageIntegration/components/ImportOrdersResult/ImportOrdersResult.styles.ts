import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';
import { COLORS } from '../../../../../../../shared/constants/COLORS';

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

export const ModalHeader = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'row',
  gap: 15,
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

export const ResultTable = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
}));

export const PillButton = styled(Button)<{ active: number; tabcolor: string }>(({ active, tabcolor }) => ({
  padding: '15px 30px',
  borderRadius: 25,
  border: `solid 2px ${active === 1 ? tabcolor : 'transparent'}`,
  background: active === 1 ? `${tabcolor}50` : 'white',
  color: active === 1 ? tabcolor : '#000',
  fontSize: 14,
  fontWeight: 900,
  width: '100%',
  '&&:hover': {
    color: tabcolor,
    background: `${tabcolor}50`,
  },
  height: 49,
  gap: 10,
}));
