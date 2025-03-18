import { Typography } from '@mui/material';
import React from 'react';
import InfoPanel from '../../../../../shared/components/InfoPanel/InfoPanel';
import { DeleteConfirmCont, ModalButtonCont } from './ManageLocation.styles';
import Button from '../../../../../shared/components/Button/Button';

interface Props {
  confirmDelete: VoidFunction;
  locationName: string;
  closeModal: VoidFunction;
  deleteLoading: boolean;
}

const DeleteLocationConfirmationModal: React.FC<Props> = ({
  deleteLoading,
  confirmDelete,
  locationName,
  closeModal,
}) => {
  return (
    <React.Fragment>
      <DeleteConfirmCont>
        <Typography>
          I would like to permanently delete location <span style={{ fontWeight: 700 }}>{locationName}</span>.
        </Typography>
        <Typography>
          This action will stop this location being used for inventory and remove it from the warehouse.
        </Typography>
        <InfoPanel info="THIS ACTION CANNOT BE UNDONE" color={'failure'} />
      </DeleteConfirmCont>
      <ModalButtonCont>
        <Button
          loading={deleteLoading}
          onClick={confirmDelete}
          variant={'solid'}
          color={'failure'}
          text={'DELETE LOCATION'}
        />
        <Button onClick={closeModal} variant={'solid'} color={'grey'} text="CANCEL" />
      </ModalButtonCont>
    </React.Fragment>
  );
};

export default DeleteLocationConfirmationModal;
