import React, { KeyboardEventHandler, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import TextField from '../../../../../../shared/components/TextField/TextField';
import { BusinessAddressForm, ButtonCont, CreateWarehouseCont, FormCont, Notes } from './CreateWarehouseModal.styles';
import Button from '../../../../../../shared/components/Button/Button';
import { ls } from '../../../../../../shared/utils/ls';
import { warehousesServices } from '../../../../../../shared/services/warehousesServices';
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import Switch from '../../../../../../shared/components/Switch/Switch';
import { NotesInput } from '../../../../Users/User/User.styles';
import { Typography } from '@mui/material';
import { COLORS } from '../../../../../../shared/constants/COLORS';
import { QUERY } from '../../../../../../shared/constants/QUERYNAMES';

interface Props {
  close: VoidFunction;
}
const { createWarehouse } = warehousesServices();

const CreateWarehouseModal: React.FC<Props> = ({ close }) => {
  const { getLS } = ls();
  const { account_id: ACCOUNT_ID } = JSON.parse(getLS('user'));
  const { mutateAsync: createWarehouseMutate } = createWarehouse();
  const [warehouseName, setWarehouseName] = useState('');
  const [warehouseSize, setWarehouseSize] = useState('');
  const [warehouseAddress, setWarehouseAddress] = useState({
    addr_line1: '',
    addr_line2: '',
    addr_city: '',
    addr_country: '',
    addr_postcode: '',
  });
  const [warehouseEnabled, setWarehouseEnabled] = useState(true);
  const [warehouseNotes, setWarehouseNotes] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const queryClient = useQueryClient();

  const handleCreate = async () => {
    setIsCreating(true);
    await createWarehouseMutate(
      {
        payload: {
          location_type: 'warehouse',
          location_name: warehouseName,
          location_address: warehouseAddress,
          location_children: [],
          location_size: {
            gross: Number(warehouseSize.replace(/,/g, '')),
          },
          location_notes: warehouseNotes,
          location_enabled: warehouseEnabled,
        },
      },
      {
        onSuccess: async () => {
          close();
        },
      },
    );
    await queryClient.invalidateQueries(QUERY.WAREHOUSE_LIST);
    setIsCreating(false);
  };

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (/^[0-9]$/i.test(event.key) || event.key === 'Backspace' || event.key === 'Tab') {
      return;
    } else {
      event.preventDefault();
    }
  };

  const handleWarehouseSizeNumber = (event: any) => {
    const { value } = event.target;

    const sanitizedValue = value.replace(/,/g, '');
    const formattedValue = Number(sanitizedValue).toLocaleString();

    if (value !== '') {
      setWarehouseSize(formattedValue);
    } else {
      setWarehouseSize('');
    }
  };

  return (
    <CreateWarehouseCont>
      <FormCont>
        <TextField
          disabled={isCreating}
          onChange={(e) => setWarehouseName(e.target.value)}
          value={warehouseName}
          InputProps={{ sx: { borderRadius: '6px', backgroundColor: 'white' } }}
          label="Name"
          required
        />
        <TextField
          disabled={isCreating}
          type="text"
          inputProps={{
            maxLength: 7,
          }}
          onKeyDown={(event) => {
            handleKeyDown(event);
          }}
          onChange={(e) => handleWarehouseSizeNumber(e)}
          value={warehouseSize}
          label="Gross Square Meterage (sq. m)"
          required
        />
        <BusinessAddressForm>
          <TextField
            disabled={isCreating}
            placeholder="Address Line 1"
            onChange={(e) => setWarehouseAddress({ ...warehouseAddress, addr_line1: e.target.value })}
            value={warehouseAddress.addr_line1}
            label="Warehouse Address"
            required
          />
          <TextField
            disabled={isCreating}
            autoComplete="off"
            placeholder="Address Line 2"
            onChange={(e) => setWarehouseAddress({ ...warehouseAddress, addr_line2: e.target.value })}
            value={warehouseAddress.addr_line2}
          />
          <TextField
            disabled={isCreating}
            placeholder="City"
            onChange={(e) => setWarehouseAddress({ ...warehouseAddress, addr_city: e.target.value })}
            value={warehouseAddress.addr_city}
          />
          <TextField
            disabled={isCreating}
            placeholder="Country"
            onChange={(e) => setWarehouseAddress({ ...warehouseAddress, addr_country: e.target.value })}
            value={warehouseAddress.addr_country}
          />
          <TextField
            disabled={isCreating}
            placeholder="Postcode / Zip Code"
            onChange={(e) => setWarehouseAddress({ ...warehouseAddress, addr_postcode: e.target.value })}
            value={warehouseAddress.addr_postcode}
          />
        </BusinessAddressForm>
        <FormControlLabel
          style={{ pointerEvents: 'none' }}
          control={
            <Switch
              disabled={isCreating}
              sx={{ m: 1, pointerEvents: 'auto' }}
              onChange={() => setWarehouseEnabled(!warehouseEnabled)}
              checked={warehouseEnabled}
              name="user_enabled"
            />
          }
          label={warehouseEnabled ? 'Warehouse is enabled when created' : 'Warehouse is disabled when created'}
        />
        <Notes>
          <Typography
            fontSize={13}
            color={COLORS.GREY}
            fontWeight={600}
            sx={{ marginLeft: '10px', marginBottom: '5px' }}
          >
            Notes
          </Typography>
          <NotesInput
            disabled={isCreating}
            fullWidth
            multiline
            rows={2}
            InputProps={{ sx: { backgroundColor: 'white' } }}
            value={warehouseNotes}
            onChange={(e) => setWarehouseNotes(e.target.value)}
          />
        </Notes>
      </FormCont>

      <ButtonCont>
        <Button
          disabled={
            warehouseName == '' ||
            warehouseSize == '' ||
            warehouseAddress.addr_line1 == '' ||
            warehouseAddress.addr_city === '' ||
            warehouseAddress.addr_postcode === '' ||
            warehouseAddress.addr_country === ''
          }
          loading={isCreating}
          variant={'solid'}
          text={'Create Warehouse'}
          color={'success'}
          onClick={handleCreate}
        />
      </ButtonCont>
    </CreateWarehouseCont>
  );
};

export default CreateWarehouseModal;
