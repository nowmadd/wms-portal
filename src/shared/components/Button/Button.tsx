import React from 'react';
import './Button.scss';
import { CircularProgress } from '@mui/material';

const Button = ({ loading, text, variant, startIcon, endIcon, color, loadingText = '', ...props }: IButtonProps) => {
  return (
    <button disabled={loading} {...props} className={`button__${variant} button__${variant}__${color}`}>
      <div className={`button__${variant}__text`} style={{ ...(color === 'primary_pale' && { color: '#380982' }) }}>
        {startIcon ? (
          loading ? (
            <CircularProgress sx={{ color: '#000' }} size={16} />
          ) : (
            <i className={startIcon} />
          )
        ) : (
          <React.Fragment />
        )}
        {loadingText && loading ? <>{loadingText}</> : <></>}
        {loading && (variant == 'solid' || variant == 'solid-thin') ? (
          <CircularProgress sx={{ color: 'white' }} size={18} />
        ) : (
          text
        )}
        {endIcon ? <i className={endIcon}> </i> : <React.Fragment />}
      </div>
    </button>
  );
};

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'solid' | 'outlined' | 'solid-thin' | 'outlined-thin' | 'refresh' | 'flat';
  text: string;
  startIcon?: string;
  endIcon?: string;
  color: 'primary' | 'success' | 'info' | 'pending' | 'failure' | 'grey' | 'black' | 'primary_pale' | 'white';
  loading?: boolean;
  loadingText?: string;
}

export default Button;
