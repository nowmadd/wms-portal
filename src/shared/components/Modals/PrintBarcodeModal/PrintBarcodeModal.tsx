import React, { useState } from 'react';
import { ButtonCont, Content, DeleteCont } from './PrintBarcodeModal.styles';
import { Typography } from '@mui/material';
import Button from '../../Button/Button';
import { CONFIG } from '../../../utils/config';
import ErrorMessagePanel from '../../ErrorMessagePanel/ErrorMessagePanel';
import { warehousesServices } from '../../../services/warehousesServices';
interface Props {
  close: VoidFunction;
  location: any;
}
const { printBarcode } = warehousesServices();
const PrintWarehouseDetailsModal: React.FC<Props> = ({ close, location }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { mutateAsync: printBarcodeMutate } = printBarcode();
  const [printError, setPrintError] = useState('');
  const handlePrint = async () => {
    setIsGenerating(true);
    await printBarcodeMutate(
      { location_id: location.location_id },
      {
        onSuccess: async (data) => {
          if (data.success) {
            setPrintError('');
            window.open(data.data.uri, '_blank');
            setIsGenerating(false);
            close();
          } else {
            setIsGenerating(false);
            setPrintError('Error in printing the barcode.');
          }
        },
        onError: async () => {
          setIsGenerating(false);
          setPrintError('Error in printing the barcode.');
        },
      },
    );
  };
  return (
    <DeleteCont>
      <Content>
        <Typography fontSize={14} fontWeight={400}>
          Are you sure you would like to generate and print a barcode for this location?
        </Typography>

        <Typography fontSize={14} fontWeight={400}>
          The barcode will be produced as a PDF that will open in a new tab, please print this barcode using your
          browsers or devices built in print functionality.
        </Typography>
        {printError !== '' && <ErrorMessagePanel errorMessage={printError}></ErrorMessagePanel>}
      </Content>
      <ButtonCont>
        <Button variant={'solid'} text={'CANCEL'} color={'grey'} onClick={() => close()} />
        <Button
          loadingText={'Generating Barcode'}
          variant={'solid'}
          text={'PRINT DETAILS'}
          color={'info'}
          onClick={() => handlePrint()}
          disabled={isGenerating}
          loading={isGenerating}
        />
        {/* </a> */}
      </ButtonCont>
    </DeleteCont>
  );
};

export default PrintWarehouseDetailsModal;
