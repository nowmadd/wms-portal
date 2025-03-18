import styled from '@emotion/styled';
import Box from '@mui/material/Box/Box';
import { COLORS } from '../../../../../shared/constants/COLORS';

export const ImportCont = styled(Box)(() => ({
  display: 'flex',
}));

export const Top = styled(Box)(() => ({
  display: 'flex',
  padding: 30,
  flexDirection: 'column',
  gap: 10,
}));

export const Bottom = styled(Box)(() => ({
  display: 'flex',
  padding: '30px 50px',
  background: 'white',
  borderTop: `1px solid ${COLORS.BORDER_LIGHT}`,
  justifyContent: 'end',
}));

export const DetailsWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const SummaryWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  alignItems: 'center',
}));

export const ImportOptionCont = styled(Box)(() => ({
  display: 'flex',
  gap: 15,
}));

export const ImportOption = styled(Box)(() => ({
  display: 'flex',
  flex: 1,
  border: `${COLORS.BORDER_LIGHT} dashed 2px`,
  borderRadius: 6,
  flexDirection: 'column',
  height: 200,
  justifyContent: 'center',
  alignItems: 'center',
  gap: 15,
  cursor: 'pointer',
}));

export const UploadingItemsCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
}));
