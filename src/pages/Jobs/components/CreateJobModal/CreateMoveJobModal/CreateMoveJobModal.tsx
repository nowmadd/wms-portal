import React, { useState } from 'react';
import { ButtonCont, CreationJobCont, CreateCont, TwoColumnForm, Notes, NotesInput } from './CreateMoveJobModal.styles';
import { Autocomplete, Typography } from '@mui/material';
import { COLORS } from '../../../../../shared/constants/COLORS';
import Select from '../../../../../shared/components/Select/Select';
import { IOption } from '../../../../../shared/types/common.types';
import { useCreateForm } from './useCreateForm';
import Button from '../../../../../shared/components/Button/Button';
import { IMoveJobForm } from '../../../../../shared/types/job.types';
import { useQueryClient } from 'react-query';
import { jobsServices } from '../../../../../shared/services/jobsServices';
import { IJobDetails } from '../../../../../shared/types/jobs.types';
import { QUERY } from '../../../../../shared/constants/QUERYNAMES';

interface Props {
  onClose: VoidFunction;
}

type OptionType = {
  value: string;
  label: string;
};

const { createJob } = jobsServices();

const getCreateShape = (formValues: IMoveJobForm) => {
  const toLocation = {
    meta_variable_label: 'To Location',
    meta_variable_name: 'to_location',
    meta_variable_value: formValues.to_value || '',
    meta_variable_id: formValues.to_location,
  };

  const fromLocation = {
    meta_variable_label: 'From Location',
    meta_variable_name: 'from_location',
    meta_variable_value: formValues.from_value || '',
    meta_variable_id: formValues.from_location,
  };

  // const jobWarehouse = {
  //   meta_variable_label: 'Warehouse',
  //   meta_variable_name: 'warehouse',
  //   meta_variable_value: formValues.warehouse_label || '',
  //   meta_variable_id: formValues.warehouse_id,
  // };

  return {
    job_meta: [toLocation, fromLocation],
    job_priority: formValues.priority,
    job_equipment: formValues.equipment,
    job_type: 'planned_move',
    job_warehouse: formValues.warehouse_id,
    job_notes: formValues.notes,
  };
};

const CreateLocationModal: React.FC<Props> = ({ onClose }) => {
  const { mutateAsync } = createJob();
  const queryClient = useQueryClient();
  const [isCreating, setisCreating] = useState(false);
  // const [warehouse, setWarehouse] = useState<IOption>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: IMoveJobForm) => {
    const shape = getCreateShape(values);
    setIsLoading(true);
    mutateAsync(
      {
        payload: shape,
      },

      {
        onSuccess: async () => {
          await queryClient.invalidateQueries(QUERY.JOB_LIST, { refetchInactive: true });
          setIsLoading(false);
          onClose();
        },
      },
    );
  };

  const { form } = useCreateForm({ onSubmit });

  console.log('form', form);

  const handleSelectChange = (value: any, e: any) => {
    if (e.name === 'warehouse_id') {
      // setWarehouse(value);
      form.setValues({
        ...form.values,
        warehouse_id: value?.value || '',
        warehouse_label: value?.label || '',
        to_location: '',
        from_location: '',
      });
    } else {
      if (value) {
        if (e.name === 'from_location') {
          form.setFieldValue('from_value', value.label);
        } else if (e.name === 'to_location') {
          form.setFieldValue('to_value', value.label);
        }
        form.setFieldValue(e.name, value.value);
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

  console.log(form.values);

  return (
    <CreateCont>
      <CreationJobCont>
        {/* <Select
          onError={Boolean(form.touched.warehouse_id && form.errors.warehouse_id)}
          isSearchable
          name="warehouse_id"
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
            name="equipment"
            label="Equipment"
            required
            isClearable={false}
            isDisabled={isLoading}
            value={{ label: form.values.equipment }}
            onChange={handleSelectChange}
            onBlur={form.handleBlur}
            options={equipmentOptions}
          />
          <Select
            name="priority"
            label="Priority"
            required
            isClearable={false}
            isDisabled={isLoading}
            value={{ label: form.values.priority }}
            onChange={handleSelectChange}
            helperText={'This field is optional.'}
            options={priorityOptions}
          />
        </TwoColumnForm>

        <TwoColumnForm>
          <Select
            //onError={Boolean(form.touched.inventory_parent_warehouse && form.errors.inventory_parent_warehouse)}
            isSearchable
            name="from_location"
            label="From Location"
            required
            isWarehouses
            // selectedWarehouseId={warehouse?.value || null}
            isClearable={true}
            isDisabled={isLoading}
            onChange={handleSelectChange}
            onBlur={form.handleBlur}
            disabledOptions={[form.values.to_location]}
            value={form.values.from_location}
          />
          <Select
            isSearchable
            name="to_location"
            label="To Location"
            required
            isWarehouses
            // selectedWarehouseId={warehouse?.value || null}
            isClearable={true}
            isDisabled={isLoading}
            onChange={handleSelectChange}
            onBlur={form.handleBlur}
            disabledOptions={[form.values.from_location]}
            value={form.values.to_location}
          />
        </TwoColumnForm>

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
            name="notes"
            value={form.values.notes}
            onChange={form.handleChange}
          />
        </Notes>
      </CreationJobCont>
      <ButtonCont>
        <Button
          disabled={isLoading || Object.keys(form.errors).length > 0 || !form.dirty}
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

export default CreateLocationModal;
