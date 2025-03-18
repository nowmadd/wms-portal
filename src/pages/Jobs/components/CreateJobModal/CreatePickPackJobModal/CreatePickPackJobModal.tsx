import React, { useEffect, useMemo, useState } from 'react';
import {
  ButtonCont,
  CreationJobCont,
  CreateCont,
  TwoColumnForm,
  Notes,
  NotesInput,
} from './CreatePickPackJobModal.styles';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import { COLORS } from '../../../../../shared/constants/COLORS';
import Select from '../../../../../shared/components/Select/Select';
import { IOption } from '../../../../../shared/types/common.types';
// import { useCreateForm } from './useCreateForm';
import Button from '../../../../../shared/components/Button/Button';
import { IMoveJobForm, IPickPackForm } from '../../../../../shared/types/job.types';
import { useQueryClient } from 'react-query';
import { jobsServices } from '../../../../../shared/services/jobsServices';
import { IJobDetails } from '../../../../../shared/types/jobs.types';
import { useCreateForm } from './useCreatePickPackForm';
import { ordersServices } from '../../../../../shared/services/ordersServices';
import Pill from '../../../../../shared/components/Pill/Pill';
import ErrorMessagePanel from '../../../../../shared/components/ErrorMessagePanel/ErrorMessagePanel';
import { QUERY } from '../../../../../shared/constants/QUERYNAMES';

interface Props {
  onClose: VoidFunction;
}

type OptionType = {
  value: string;
  label: string;
};

type OrderDetails = {
  order_id: string;
  order_ref: string;
  order_customer_name: string;
  order_status: string;
  order_item_count: number;
  order_shipping_method: string;
  order_created: string;
};

const { createJob } = jobsServices();
const { getOrdersList, getOrderDetails, updateOrderStatus } = ordersServices();

const getCreateShape = (formValues: IPickPackForm, order: any, orderItems: any) => {
  const orderMeta = {
    meta_variable_label: 'Order Ref',
    meta_variable_name: 'order_ref',
    meta_variable_value: order.order_ref || '',
    meta_variable_id: order.order_id,
  };

  const remappedData = orderItems.data.order_items.map((item: any) => ({
    barcode: item.item_barcode_primary,
    description: item.item_description,
    id: item.item_id,
    location_id: item.item_pick_location_id,
    location_ref: item.item_pick_location,
    make: item.item_make,
    quantity: item.item_quantity,
  }));

  const orderInventory = {
    meta_variable_id: 'inventory_array',
    meta_variable_label: 'Inventory',
    meta_variable_name: 'inventory',
    meta_variable_value: remappedData,
  };

  return {
    job_meta: [orderMeta, orderInventory],
    job_priority: formValues.job_priority,
    job_equipment: formValues.job_equipment,
    job_type: 'planned_pickandpack',
    // job_warehouse: formValues.job_warehouse,
    job_notes: formValues.job_notes,
  };
};

const CreatePickPackModal: React.FC<Props> = ({ onClose }) => {
  const { mutateAsync } = createJob();
  const { data, isLoading: isOrdersDataLoading, error } = getOrdersList({ status: 'open' });
  const { mutateAsync: updateOrder } = updateOrderStatus();

  const queryClient = useQueryClient();
  const [isCreating, setisCreating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [warehouse, setWarehouse] = useState<IOption>();
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [orderId, setOrderId] = useState('');
  const { data: orderItems, isLoading: isOrderItemsLoading } = getOrderDetails(orderId || '');

  const ordersData = useMemo(() => {
    if (isOrdersDataLoading) {
      return;
    } else {
      return data ? data.data : undefined;
    }
  }, [data, isOrdersDataLoading]);

  useEffect(() => {
    console.log('items', orderItems);
    if (!isOrderItemsLoading && orderItems) {
      const shape = getCreateShape(form.values, order, orderItems);
      mutateAsync(
        {
          payload: shape,
        },
        {
          onSuccess: async () => {
            await updateOrder(
              {
                order_id: orderId,
                payload: {
                  order_status: 'ready',
                },
              },
              {
                onSuccess: async () => {
                  await queryClient.invalidateQueries(QUERY.JOB_LIST, { refetchInactive: true });
                  await queryClient.invalidateQueries(QUERY.ORDER_LIST, { refetchInactive: true });
                  setIsLoading(false);
                  onClose();
                },
                onError(error, variables, context) {
                  setErrorMessage('Something went wrong');
                  setIsLoading(false);
                },
              },
            );
          },
        },
      );
    }
  }, [orderItems, isOrderItemsLoading]);

  const updatedOrdersData = ordersData?.map((order) => ({
    ...order,
    label: order.order_ref,
  }));

  const onSubmit = async (values: IPickPackForm) => {
    setIsLoading(true);
    setErrorMessage('');
    setOrderId(order?.order_id || '');
  };

  const { form } = useCreateForm({ onSubmit });
  const handleOrderChange = (event: any, newValue: any) => {
    setOrder(newValue);
  };

  const handleSelectChange = (value: any, e: any) => {
    if (e.name === 'job_warehouse') {
      setWarehouse(value);
      form.setValues({
        ...form.values,
        job_warehouse: value?.value || '',
      });
    } else {
      if (value) {
        form.setFieldValue(e.name, value.value);
      } else {
        form.setFieldValue(e.name, '');
      }
    }
  };

  const priorityOptions: OptionType[] = [
    { value: 'Urgent', label: 'Urgent' },
    { value: 'High', label: 'High' },
    { value: 'Normal', label: 'Normal' },
    { value: 'Low', label: 'Low' },
  ];

  const equipmentOptions: OptionType[] = [
    { value: 'None', label: 'None' },
    { value: 'Totebag', label: 'Totebag' },
    { value: 'Trolley', label: 'Trolley' },
    { value: 'Hand Truck', label: 'Hand Truck' },
    { value: 'Platform Truck', label: 'Platform Truck' },
    { value: 'Pallet Jack', label: 'Pallet Jack' },
    { value: 'Forklift', label: 'Forklift' },
  ];

  const getStatusPillColor = (status: string) => {
    let color: 'primary' | 'success' | 'info' | 'pending' | 'failure' | 'grey' | 'black' | 'white' = 'pending';
    switch (status.toUpperCase()) {
      case 'COMPLETE':
        color = 'success';
        break;
      case 'IN PROGRESS':
        color = 'pending';
        break;
      case 'OPEN':
        color = 'info';
        break;
      case 'STALLED':
        color = 'failure';
        break;
      case 'CANCELLED':
        color = 'failure';
        break;
      case 'READY':
        color = 'primary';
        break;
      default:
        color = 'white';
    }

    return color;
  };

  console.log({ form });

  return (
    <CreateCont>
      <CreationJobCont>
        {/* <Select
          onError={Boolean(form.touched.job_warehouse && form.errors.job_warehouse)}
          isSearchable
          name="job_warehouse"
          label="Warehouse"
          required
          isWarehouses
          isClearable={true}
          isDisabled={isLoading}
          value={warehouse}
          onChange={handleSelectChange}
          onBlur={form.handleBlur}
        /> */}

        <TwoColumnForm>
          <Select
            name="job_equipment"
            label="Equipment"
            required
            isClearable={false}
            isDisabled={isLoading}
            value={{ label: form.values.job_equipment }}
            onChange={handleSelectChange}
            onBlur={form.handleBlur}
            options={equipmentOptions}
            placeholder="Select Equipment"
          />
          <Select
            name="job_priority"
            label="Priority"
            required
            isClearable={false}
            isDisabled={isLoading}
            value={{ label: form.values.job_priority }}
            onChange={handleSelectChange}
            options={priorityOptions}
          />
        </TwoColumnForm>
        <Box>
          <Typography fontSize={13} fontWeight={600} color={COLORS.TEXT_GRAY} sx={{ margin: '0 0 5px 10px' }}>
            Order
            <span style={{ color: '#BE4B4A', marginLeft: 3 }}>*</span>
          </Typography>
          <Autocomplete
            onChange={handleOrderChange}
            options={updatedOrdersData || []}
            loading={isOrdersDataLoading}
            clearOnEscape
            isOptionEqualToValue={(option, value) => option.order_id === value.order_id}
            renderOption={(props, option) => (
              <Box component="li" {...props} key={option.order_ref} sx={{ gap: 1 }}>
                <span>{option.order_ref}</span>
                <Pill text={option.order_status} color={getStatusPillColor(option.order_status)} variant={'round'} />
              </Box>
            )}
            renderInput={(params) => <TextField {...params} sx={{ backgroundColor: 'white' }} />}
          />
        </Box>

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
            fullWidth
            multiline
            rows={4}
            InputProps={{ sx: { backgroundColor: 'white' } }}
            name="job_notes"
            value={form.values.job_notes}
            onChange={form.handleChange}
          />
        </Notes>
        {errorMessage !== '' && <ErrorMessagePanel errorMessage={errorMessage} />}
      </CreationJobCont>
      <ButtonCont>
        <Button
          disabled={isLoading || Object.keys(form.errors).length > 0 || !order}
          type="button"
          // loading={isCreating}
          variant={'solid'}
          text={'Create Job'}
          color={'success'}
          onClick={() => form.handleSubmit()}
          loading={isLoading}
        />
      </ButtonCont>
    </CreateCont>
  );
};

export default CreatePickPackModal;
