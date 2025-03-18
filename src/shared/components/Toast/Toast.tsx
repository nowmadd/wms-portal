import React from 'react';
import { COLORS } from '../../constants/COLORS';
import { Box, Typography, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { LINKS } from '../../constants/LINKS';
import { ToastContentProps } from 'react-toastify';

// Custom toast props (props you want to pass, e.g., `message` and `type`)
interface CustomToastProps {
  message: string;
  customHeader?: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

// Props injected by react-toastify
interface InjectedProps extends ToastContentProps {
  closeToast: () => void;
}

// Combine the two types
type Props = CustomToastProps & InjectedProps;

const Toast: React.FC<Props> = ({ message, type, customHeader, closeToast }) => {
  const bgColor = () => {
    switch (type) {
      case 'success':
        return COLORS.SUCCESS;
      case 'error':
        return COLORS.FAILURE;
      case 'info':
        return COLORS.INFO;
      case 'warning':
        return COLORS.PENDING;
      default:
        return COLORS.SUCCESS;
    }
  };

  const headerText = () => {
    if (customHeader) return customHeader;
    switch (type) {
      case 'success':
        return 'Success';
      case 'error':
        return 'An error has occurred';
      case 'info':
        return 'Info';
      case 'warning':
        return 'Warning';
      default:
        return 'Success';
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: bgColor(),
        color: '#fff',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: 3,
        flexDirection: 'column',
        maxWidth: '400px',
        minWidth: '400px',
      }}
    >
      <Box sx={{ display: 'flex', marginBottom: '8px', gap: '8px', flex: 1, alignItems: 'center', width: '100%' }}>
        {type === 'success' ? (
          <i className="bx bx-check" style={{ fontSize: 26 }} />
        ) : (
          <i className="bx bx-info-circle" style={{ fontSize: 26 }} />
        )}
        <Typography fontWeight={700} fontSize={18}>
          {headerText()}
        </Typography>
        <IconButton onClick={closeToast} sx={{ padding: '5px', marginLeft: 'auto', color: 'white' }}>
          <i className="bx bx-x" style={{ marginLeft: 'auto', fontSize: 26 }} />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: '8px',
          width: '100%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        <Typography sx={{ flex: 1 }}>{message}</Typography>
      </Box>
      {/* <Link
        to={LINKS.REPORT_BUG}
        //open in new tab
        target="_blank"
        style={{
          width: 'fit-content',
        }}
      >
        <Typography sx={{ textDecoration: 'underline', marginTop: '8px' }}>Get help</Typography>
      </Link> */}

      {/* replace link component to be used outside react router */}
      {type === 'error' ? (
        <a
          href={LINKS.REPORT_BUG}
          //open in new tab
          target="_blank"
          style={{
            width: 'fit-content',
          }}
        >
          <Typography sx={{ textDecoration: 'underline', marginTop: '8px' }}>Get help</Typography>
        </a>
      ) : null}
    </Box>
  );
};

export default Toast;
