import createTheme from '@mui/material/styles/createTheme';
import { COLORS } from '../constants/COLORS';

const THEME = createTheme({
  palette: {
    primary: {
      main: COLORS.PRIMARY,
    },
    success: {
      main: COLORS.SUCCESS,
    },
    background: {
      default: COLORS.BG_LIGHT,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  //tooltip
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: COLORS.PRIMARY,
          color: COLORS.WHITE,
          fontSize: 14,
        },
        arrow: {
          color: COLORS.PRIMARY,
        },
      },
    },
  },
});
export default THEME;
