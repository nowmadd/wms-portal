import { BrowserRouter } from 'react-router-dom';
import { Routes } from './shared/navigation/Routes';
import 'boxicons/css/boxicons.min.css';
import { AuthProvider } from './shared/contexts/AuthContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import THEME from './shared/utils/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import './App.scss';
import { GeneralProvider } from './shared/contexts/GeneralContext';
const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        retry: false,
        staleTime: 5 * 60 * 1000,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GeneralProvider>
          <ThemeProvider theme={THEME}>
            <CssBaseline />
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </ThemeProvider>
        </GeneralProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
