import React, { KeyboardEventHandler, ReactHTMLElement, useState } from 'react';
import { ButtonCont, Content, LogoutCont } from './LogoutModal.styles';
// import Select from 'react-select';
import Select from '../../../Select/Select';
import SelectCreatable from '../../../Select/SelectCreatable';
import { COLORS } from '../../../../constants/COLORS';
import { InputLabel, TextField, Typography } from '@mui/material';
import Pill from '../../..//Pill/Pill';
import Button from '../../..//Button/Button';

interface Props {
  close: VoidFunction;
  logout: VoidFunction;
}

const LogoutModal: React.FC<Props> = ({ close, logout }) => {
  const handleLogout = () => {
    logout();
    close();
  };
  return (
    <LogoutCont>
      <Content>
        <Typography fontSize={14} fontWeight={600}>
          Are you sure you want to logout?
        </Typography>
        <Typography fontSize={14} fontWeight={400}>
          This action will log you out of the system, requiring you to log back in using your email and password.
        </Typography>
      </Content>
      <ButtonCont>
        <Button variant={'solid'} text={'Logout'} color={'failure'} onClick={handleLogout} />
        <Button variant={'solid'} text={'Cancel'} color={'grey'} onClick={close} />
      </ButtonCont>
    </LogoutCont>
  );
};

export default LogoutModal;
