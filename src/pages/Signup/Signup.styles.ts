import { Box, Typography, styled } from '@mui/material';
import { COLORS } from '../../shared/constants/COLORS';

export const SignupCont = styled(Box)(() => ({
  display: 'flex',
  minHeight: '100vh',
  overflowY: 'auto',
  justifyContent: 'center',
  width: '100vw',
}));

export const Form = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  maxWidth: 600,
  padding: 80,
  gap: 30,
  width: 540,
  backgroundColor: 'white',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: '100%',
    padding: '20px !important',
  },
}));

export const Terms = styled('span')(() => ({
  color: COLORS.PRIMARY_OLD,
  cursor: 'pointer',
  fontWeight: 600,
  //hover
  '&:hover': {
    textDecoration: 'underline',
  },
}));

export const NameTextFieldWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: 15,
  width: '100%',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

export const Header = styled(Box)(() => ({
  fontWeight: 900,
  maxWidth: 350,
  fontSize: 36,
  lineHeight: 'normal',
}));

export const FieldWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  width: '100%',
}));

export const PromotionWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 15,
  width: '100%',
}));

export const PromotionText = styled(Typography)(() => ({
  display: 'flex',
  gap: 15,
}));

export const Image = styled('img')(() => ({
  objectFit: 'cover',
  width: '100%',
  position: 'absolute',
}));

export const Logo = styled('img')(({ theme }) => ({
  objectFit: 'cover',
  width: 489,
  left: 0,
  right: 0,
  marginLeft: 'auto',
  marginRight: 'auto',
  top: 0,
  bottom: 0,
  marginTop: 'auto',
  marginBottom: 'auto',
  position: 'absolute',
  [theme.breakpoints.down('lg')]: {
    width: 300,
  },
  [theme.breakpoints.down('md')]: {
    width: 200,
  },
}));

export const ImageCont = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
}));

export const BottomCont = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  padding: '0px 20px',
}));

export const BottomText = styled(Typography)(() => ({
  textDecoration: 'underline',
  cursor: 'pointer',
}));

export const ButtonCont = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  paddingTop: 30,
  borderTop: `solid 1px ${COLORS.BORDER_LIGHT}`,
  padding: '30px 50px',
  background: 'white',
  gap: 20,
  borderRadius: '0 0 15px 15px',
}));

//Loading Page

export const LoadingCont = styled(Box)(() => ({
  display: 'flex',
  height: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '100vw',
  alignItems: 'center',
  gap: 75,
  padding: 20,
}));
