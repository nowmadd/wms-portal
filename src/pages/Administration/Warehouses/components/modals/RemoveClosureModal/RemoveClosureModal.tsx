import React, { KeyboardEventHandler, ReactHTMLElement, useState } from 'react';
import { ButtonCont, Content, DeleteCont } from './RemoveClosureModal.styles';
import { Typography } from '@mui/material';
import Button from '../../../../../../shared/components/Button/Button';
import InfoPanel from '../../../../../../shared/components/InfoPanel/InfoPanel';

interface Props {
  close: VoidFunction;
  closure: string | undefined;
  deleteClosure: VoidFunction;
  isClosureDeleting: boolean;
}

const RemoveClosureModal: React.FC<Props> = ({ close, closure, deleteClosure, isClosureDeleting }) => {
  const handleDelete = () => {
    deleteClosure();
  };
  return (
    <DeleteCont>
      <Content>
        <Typography fontSize={14} fontWeight={400}>
          I would like to permanently delete the closure date <strong>{closure}</strong>.
        </Typography>
        <InfoPanel color={'failure'} info={'THIS ACTION CANNOT BE UNDONE.'} />
      </Content>
      <ButtonCont>
        <Button
          variant={'solid'}
          text={'DELETE CLOSURE'}
          color={'failure'}
          onClick={handleDelete}
          loading={isClosureDeleting}
          loadingText="Deleting"
        />
        <Button variant={'solid'} text={'CANCEL'} color={'grey'} onClick={close} />
      </ButtonCont>
    </DeleteCont>
  );
};

export default RemoveClosureModal;
