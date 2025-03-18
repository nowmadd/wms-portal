import React, { KeyboardEventHandler, ReactHTMLElement, useState } from 'react';
import { ButtonCont, Content, DeleteUserCont } from './DeleteUserModal.styles';
// import Select from 'react-select';
import Select from '../../../../../shared/components/Select/Select';
import SelectCreatable from '../../../../../shared/components/Select/SelectCreatable';
import { COLORS } from '../../../../../shared/constants/COLORS';
import { InputLabel, TextField, Typography } from '@mui/material';
import Pill from '../../../../../shared/components/Pill/Pill';
import Button from '../../../../../shared/components/Button/Button';
import InfoPanel from '../../../../../shared/components/InfoPanel/InfoPanel';

interface Props {
  close: VoidFunction;
  user: string;
  deleteUser: VoidFunction;
  isdeleting: boolean;
}

const CreateUserModal: React.FC<Props> = ({ close, user, deleteUser, isdeleting }) => {
  const handleDelete = () => {
    deleteUser();
  };
  return (
    <DeleteUserCont>
      <Content>
        <Typography fontSize={14} fontWeight={400}>
          I would like to permanently delete {!user.includes('undefined') ? user : 'this user'}.
        </Typography>
        <Typography fontSize={14} fontWeight={400}>
          This action will remove the user from the system and replace any references to them with a traceable
          reference.
        </Typography>
        <InfoPanel color={'failure'} info={'THIS ACTION CANNOT BE UNDONE.'} />
      </Content>
      <ButtonCont>
        <Button
          variant={'solid'}
          text={'Delete User'}
          color={'failure'}
          onClick={handleDelete}
          loading={isdeleting}
          disabled={isdeleting}
        />
        <Button variant={'solid'} text={'Cancel'} color={'grey'} onClick={close} />
      </ButtonCont>
    </DeleteUserCont>
  );
};

export default CreateUserModal;
