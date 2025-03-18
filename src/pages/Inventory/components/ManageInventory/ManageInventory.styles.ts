import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { COLORS } from '../../../../shared/constants/COLORS';

export const InventoryCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
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

export const FormCont = styled(Box)(() => ({
  display: 'flex',
  gap: 30,
  alignSelf: 'stretch',
}));

export const FormChild = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '15px 0',
  gap: 15,
  flex: 1,
}));

export const Column = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 2,
  gap: 15,
}));

export const StockLevels = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
}));

export const Section = styled(Box)(() => ({
  display: 'flex',
  alignSelf: 'stretch',
  flexDirection: 'column',
  gap: 15,
}));

export const WarehouseText = styled(Box)(() => ({
  padding: '12px 12px 8px 4px',
}));

export const InputColumn = styled(Box)(() => ({
  display: 'flex',
  alignSelf: 'stretch',
  gap: 15,
}));

export const LocationsCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
}));

export const Locations = styled(Box)(() => ({
  display: 'flex',
  gap: 5,
  padding: '8px 12px 8px 8px',
}));

export const LocationDimensions = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 15,
}));

export const FieldCont = styled(Box)(() => ({
  display: 'flex',
  gap: 15,
}));

export const DeleteConfirmCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '20px 50px 30px 50px',
  gap: 20,
}));

export const ModalButtonCont = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  paddingTop: 30,
  borderTop: `solid 1px ${COLORS.BORDER_LIGHT}`,
  padding: '30px 50px',
  background: 'white',
  borderRadius: '0 0 15px 15px',
  width: '100%',
  gap: 20,
}));

export const StockCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 15,
}));

export const Stock = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 10,
}));

export const StockLevelCount = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 100,
}));
