import React, { KeyboardEventHandler, ReactHTMLElement, useState } from 'react';
import { ButtonCont, Content, DeleteCont } from './DeleteWarehouseModal.styles';
import { Typography } from '@mui/material';
import Button from '../../../../../../shared/components/Button/Button';
import InfoPanel from '../../../../../../shared/components/InfoPanel/InfoPanel';

interface Props {
  close: VoidFunction;
  warehouse: string;
  deleteWarehouse: VoidFunction;
}

const DeleteWarehouseModal: React.FC<Props> = ({ close, warehouse, deleteWarehouse }) => {
  const handleDelete = () => {
    deleteWarehouse();
    close();
  };
  return (
    <DeleteCont>
      <Content>
        <Typography fontSize={14} fontWeight={400}>
          I would like to permanently delete warehouse <strong>{warehouse}</strong>, removing all warehouse operations
          and users.
        </Typography>
        <Typography fontSize={14} fontWeight={400}>
          This action will cease operation of any and all WMS features within this warehouse.
        </Typography>
        <InfoPanel color={'failure'} info={'THIS ACTION CANNOT BE UNDONE.'} />
      </Content>
      <ButtonCont>
        <Button variant={'solid'} text={'DELETE WAREHOUSE'} color={'failure'} onClick={handleDelete} />
        <Button variant={'solid'} text={'CANCEL'} color={'grey'} onClick={close} />
      </ButtonCont>
    </DeleteCont>
  );
};

export default DeleteWarehouseModal;
