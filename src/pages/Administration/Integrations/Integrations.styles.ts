import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { COLORS } from '../../../shared/constants/COLORS';

export const IntegrationsMainCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: 15,
}));

export const Header = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
}));

export const HeaderButtonCont = styled(Box)(() => ({
  display: 'flex',
  gap: 20,
}));

export const IntegrationItemCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
}));

export const IntegrationItemMain = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignContent: 'center',
  padding: 15,
  background: 'white',
  borderRadius: 18,
  rowGap: 5,
}));

export const IntegrationRow = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
}));

export const IntegrationAvatarRow = styled(Box)(() => ({
  display: 'flex',
}));

export const ItemLeft = styled(Box)(() => ({
  display: 'flex',
  gap: 10,
}));

export const IntegrationAvatar = styled(Box)<{ color: string }>(({ color }) => ({
  display: 'flex',
  borderRadius: 5,
  color: color,
  fontSize: 170,
}));

export const NameIDCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const ItemRight = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'flex-end',
  columnGap: 5,
}));

export const Footer = styled(Box)(() => ({
  position: 'fixed',
  bottom: 0,
  transition: 'all 0.3s ease-in-out',
  left: 320,
  right: 0,
  padding: 30,
  backgroundColor: '#FFFFFF',
  borderTop: `solid 1px ${COLORS.BORDER_LIGHT}`,
  justifyContent: 'space-between',
  flexDirection: 'row',
  display: 'flex',
}));

export const FooterButtonCont = styled(Box)(() => ({
  display: 'flex',
  gap: 15,
}));

export const AddIntegration = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignContent: 'center',
  padding: 15,

  borderRadius: 18,
  rowGap: 5,
}));

export const AddIntegrationCont = styled(Box)(() => ({
  display: 'flex',
  alignSelf: 'center',
  flexDirection: 'column',
  alignItems: 'center',
}));

export const AddIntegrationIcon = styled(Box)<{ color: string }>(({ color }) => ({
  display: 'flex',
  borderRadius: 5,
  color: color,
  fontSize: 170,
}));
