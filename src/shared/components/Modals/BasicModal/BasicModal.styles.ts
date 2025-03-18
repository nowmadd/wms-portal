import { Box, styled } from '@mui/material';
import { COLORS } from '../../../constants/COLORS';

//added to keep borderradius on scroll
export const ModalContScroll = styled(Box)(() => ({
  maxHeight: '80vh',
  overflow: 'auto',
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

export const ModalCont = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: COLORS.BG_LIGHT,
  minWidth: 650,
  paddingTop: 30,
  borderRadius: 15,
  maxHeight: '100vh',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    minWidth: '100%',
  },
}));

export const Header = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 50px',
}));

export const IconButton = styled(Box)(() => ({
  display: 'flex',
  borderRadius: 4,
  backgroundColor: '#DDDDDD90',
  '&&:hover': {
    backgroundColor: '#DDDDDD',
  },
}));

export const BreadCrumbsCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
}));
