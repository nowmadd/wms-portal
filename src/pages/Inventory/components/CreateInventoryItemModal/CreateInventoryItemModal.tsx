import React, { useState } from 'react';
import { ButtonCont, CreateItemCont, FormCont, TwoColumnForm } from './CreateInventoryItemModal.styles';
import Button from '../../../../shared/components/Button/Button';
import { useCreateInventoryForm } from './useCreateInventoryForm';
import TextField from '../../../../shared/components/TextField/TextField';
import Select from '../../../../shared/components/Select/Select';
import { IOption } from '../../../../shared/types/common.types';
import { Typography } from '@mui/material';
import { COLORS } from '../../../../shared/constants/COLORS';
import { inventoryServices } from '../../../../shared/services/inventoryServices';
import { ICreateInventoryItemPayload } from '../../../../shared/types/inventory.types';
import ErrorMessagePanel from '../../../../shared/components/ErrorMessagePanel/ErrorMessagePanel';
import { useQueryClient } from 'react-query';
import { QUERY } from '../../../../shared/constants/QUERYNAMES';

interface Props {
  onClose: () => void;
}

const { createInventory } = inventoryServices();
const CreateInventoryItemModal: React.FC<Props> = ({ onClose }) => {
  const [isCreating, setisCreating] = useState(false);
  const [warehouse, setWarehouse] = useState<IOption>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { mutateAsync } = createInventory();
  const queryClient = useQueryClient();

  const onSubmit = async (values: ICreateInventoryItemPayload) => {
    setisCreating(true);

    await mutateAsync(
      {
        payload: { ...values, inventory_parent_warehouse: 'none' },
      },
      {
        async onSuccess(data, variables, context) {
          await queryClient.invalidateQueries(QUERY.INVENTORY_LIST, { refetchInactive: true });
          setError('');
          setisCreating(false);
          onClose();
        },
        onError(error: any, variables, context) {
          setError(error.response.data.message);
          setisCreating(false);
        },
      },
    );
  };

  const { form } = useCreateInventoryForm({
    onSubmit,
  });

  const handleSelectChange = (value: any, e: any) => {
    if (e.name === 'inventory_parent_warehouse') {
      setWarehouse(value);
      form.setValues({
        ...form.values,
        inventory_parent_warehouse: value?.value || '',
        inventory_parent_location_preferred: '',
      });
    } else {
      if (value) {
        form.setFieldValue(e.name, value.value);
      } else {
        form.setFieldValue(e.name, '');
      }
    }
  };

  return (
    <CreateItemCont>
      <FormCont>
        {error && <ErrorMessagePanel errorMessage={error} />}

        <TextField
          required
          onChange={form.handleChange}
          name="inventory_description"
          value={form.values.inventory_description}
          InputProps={{ sx: { borderRadius: '6px', backgroundColor: 'white' } }}
          label="Description"
          helperText={
            form.errors.inventory_description && form.touched.inventory_description && form.errors.inventory_description
          }
          onBlur={form.handleBlur}
          error={Boolean(form.touched.inventory_description && form.errors.inventory_description)}
        />

        <TextField
          required
          onChange={form.handleChange}
          onBeforeInput={() => setError('')}
          name="inventory_barcode_primary"
          value={form.values.inventory_barcode_primary}
          InputProps={{ sx: { borderRadius: '6px', backgroundColor: 'white' } }}
          label="Barcode Reference"
          helperText={form.errors.inventory_barcode_primary && form.touched.inventory_barcode_primary}
          onBlur={form.handleBlur}
          error={Boolean(form.touched.inventory_barcode_primary && form.errors.inventory_barcode_primary)}
          placeholder="123456789"
        />

        {/* <TwoColumnForm>
          <Select
            onError={Boolean(form.touched.inventory_parent_warehouse && form.errors.inventory_parent_warehouse)}
            isSearchable
            name="inventory_parent_warehouse"
            label="Warehouse"
            required
            isWarehouses
            isClearable={true}
            isDisabled={isLoading}
            value={warehouse}
            onChange={handleSelectChange}
            onBlur={form.handleBlur}
          />
          <Select
            isSearchable
            name="inventory_parent_location_preferred"
            label="Preferred Locations"
            required
            // isMulti
            //note: isWarehouses is required upon passing selectedWarehouseId
            isWarehouses
            selectedWarehouseId={warehouse?.value || null}
            isClearable={true}
            isDisabled={isLoading || !warehouse}
            value={form.values.inventory_parent_location_preferred}
            onChange={handleSelectChange}
            // helperText={'This field is optional.'}
          />
        </TwoColumnForm> */}
        <TwoColumnForm>
          <TextField
            name="inventory_sku_primary"
            label="SKU"
            required
            placeholder="1234567890"
            onChange={form.handleChange}
            value={form.values.inventory_sku_primary}
            InputProps={{ sx: { borderRadius: '6px', backgroundColor: 'white' } }}
            helperText={
              form.errors.inventory_sku_primary &&
              form.touched.inventory_sku_primary &&
              form.errors.inventory_sku_primary
            }
            onBlur={form.handleBlur}
            error={Boolean(form.touched.inventory_sku_primary && form.errors.inventory_sku_primary)}
          />
          <TextField
            name="inventory_barcode_alt"
            label="Alternate Barcode/SKU"
            placeholder="1234567890"
            onChange={form.handleChange}
            value={form.values.inventory_barcode_alt}
            InputProps={{ sx: { borderRadius: '6px', backgroundColor: 'white' } }}
            helperText={'This field is optional.'}
            onBlur={form.handleBlur}
          />
          {/* <TextField
            required
            endAdorment={
              <Typography fontSize={14} fontWeight={400} color={COLORS.GREY}>
                Kg
              </Typography>
            }
            name="inventory_net_weight"
            label="SKU Net Weight"
            placeholder="SKU Net Weight"
            onChange={form.handleChange}
            value={form.values.inventory_net_weight}
            InputProps={{ sx: { borderRadius: '6px', backgroundColor: 'white' } }}
            helperText={
              form.errors.inventory_net_weight && form.touched.inventory_net_weight && form.errors.inventory_net_weight
            }
            onBlur={form.handleBlur}
            error={Boolean(form.touched.inventory_net_weight && form.errors.inventory_net_weight)}
          /> */}
        </TwoColumnForm>
        {/* <TwoColumnForm> */}
        {/* two textfield for name="inventory_unit_size" and name="inventory_barcode_alt" */}
        {/* <TextField
            name="inventory_unit_size"
            label="Unit Size"
            placeholder="Unit"
            onChange={form.handleChange}
            value={form.values.inventory_unit_size}
            InputProps={{ sx: { borderRadius: '6px', backgroundColor: 'white' } }}
            helperText={'This field is optional.'}
            onBlur={form.handleBlur}
          /> */}
        {/* <TextField
            name="inventory_barcode_alt"
            label="Alternate Barcode/SKU"
            placeholder="1234567890"
            onChange={form.handleChange}
            value={form.values.inventory_barcode_alt}
            InputProps={{ sx: { borderRadius: '6px', backgroundColor: 'white' } }}
            helperText={'This field is optional.'}
            onBlur={form.handleBlur}
          /> */}
        {/* </TwoColumnForm> */}
        {/* <TwoColumnForm sx={{ width: '50%', paddingRight: '10px' }}> */}
        {/* <TextField
            name="inventory_start_quantity"
            label="Start Quantity"
            placeholder="Start Quantity"
            onChange={form.handleChange}
            value={form.values.inventory_start_quantity}
            InputProps={{ sx: { borderRadius: '6px', backgroundColor: 'white' } }}
            helperText={
              form.errors.inventory_start_quantity &&
              form.touched.inventory_start_quantity &&
              form.errors.inventory_start_quantity
            }
            onBlur={form.handleBlur}
            error={Boolean(form.touched.inventory_start_quantity && form.errors.inventory_start_quantity)}
          /> */}
        {/* </TwoColumnForm> */}
      </FormCont>
      <ButtonCont>
        <Button
          disabled={isCreating || Object.keys(form.errors).length > 0 || !form.dirty}
          type="button"
          loading={isCreating}
          variant={'solid'}
          text={'Create Item'}
          color={'success'}
          onClick={() => form.handleSubmit()}
        />
      </ButtonCont>
    </CreateItemCont>
  );
};

export default CreateInventoryItemModal;
