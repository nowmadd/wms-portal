import React, { useEffect, useState } from 'react';
import { InfoPanelCont } from './InfoPanel.styles';
import { Typography } from '@mui/material';
import Button from '../Button/Button';
import { COLORS } from '../../constants/COLORS';

interface Props {
  dismissable?: boolean;
  color: 'primary' | 'success' | 'info' | 'pending' | 'failure' | 'grey' | 'black';
  onButtonClick?: VoidFunction;
  info: string;
  buttonText?: string;
  buttonDisabled?: boolean;
  noIcon?: boolean;
  isButtonLoading?: boolean;
  buttonWidth?: number;
  style?: React.CSSProperties;
}

const InfoPanel: React.FC<Props> = ({
  noIcon,
  buttonDisabled,
  buttonText,
  dismissable,
  color,
  onButtonClick,
  info,
  isButtonLoading,
  buttonWidth,
  style,
}) => {
  const [bg, setbg] = useState('');
  const [textColor, settextColor] = useState('');

  useEffect(() => {
    switch (color) {
      case 'primary':
        setbg(COLORS.PRIMARY_LIGHT);
        settextColor(COLORS.PRIMARY_DARK);
        break;
      case 'success':
        setbg(COLORS.SUCCESS_LIGHT);
        settextColor(COLORS.SUCCESS_DARK);
        break;
      case 'info':
        setbg(COLORS.INFO_LIGHT);
        settextColor(COLORS.INFO_DARK);
        break;
      case 'pending':
        setbg(COLORS.PENDING_LIGHT);
        settextColor(COLORS.PENDING_DARK);
        break;
      case 'failure':
        setbg(COLORS.FAILURE_LIGHT);
        settextColor(COLORS.FAILURE_DARK);
        break;
      case 'grey':
        setbg(COLORS.GREY_LIGHT);
        settextColor(COLORS.GREY_DARK);
        break;
      case 'black':
        setbg(COLORS.BLACK_LIGHT);
        settextColor(COLORS.BLACK);
        break;

      default:
        break;
    }
  }, [color]);

  return (
    <InfoPanelCont sx={{ background: bg, ...style }}>
      {!noIcon ? (
        color === 'success' ? (
          <i className="bx bx-check" style={{ color: COLORS.SUCCESS, fontSize: 26 }} />
        ) : (
          <i className="bx bx-info-circle" style={{ color: textColor, fontSize: 26 }} />
        )
      ) : (
        <React.Fragment />
      )}
      <Typography fontSize={14} fontWeight={500} color={textColor} sx={{ whiteSpace: 'break-spaces' }}>
        {info}
      </Typography>
      {onButtonClick ? (
        <Button
          loading={isButtonLoading}
          disabled={buttonDisabled || isButtonLoading}
          variant={'solid'}
          text={buttonText || ''}
          color={color}
          style={{ minWidth: buttonWidth || 300, marginLeft: 'auto', ...(buttonWidth && { width: buttonWidth }) }}
          onClick={onButtonClick}
        />
      ) : dismissable ? (
        <i className="bx bx-x" style={{ color: textColor, fontSize: 24 }} />
      ) : (
        <React.Fragment />
      )}
    </InfoPanelCont>
  );
};

export default InfoPanel;
