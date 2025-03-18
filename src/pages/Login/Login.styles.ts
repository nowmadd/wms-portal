import { Box, styled } from '@mui/material';

export const LoginMainCont = styled(Box)(() => ({
  display: 'flex',
  height: '100vh',
  justifyContent: 'center',
  width: '100vw',
}));

export const Form = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: 500,
  padding: 80,
  gap: 30,
  minWidth: 320,
  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: '100%',
    padding: '20px !important',
  },
}));

export const Header = styled(Box)(() => ({
  fontWeight: 900,
  fontSize: 36,
  lineHeight: 'normal',
}));

export const FieldWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 15,
  width: '100%',
}));

export const Image = styled('img')(() => ({
  objectFit: 'cover',
  width: '100%',
  height: '100%',
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
  position: 'relative',
}));
