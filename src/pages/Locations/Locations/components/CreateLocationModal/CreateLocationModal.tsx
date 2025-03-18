import React, { useState } from 'react';
import { ButtonCont, CreateCont, CreationLocationCont, ThreeColumnsCont } from './CreateLocationModal.styles';
import { Typography } from '@mui/material';
import Link from '@mui/material/Link/Link';
import SelectCreatable from '../../../../../shared/components/Select/SelectCreatable';
import { COLORS } from '../../../../../shared/constants/COLORS';
import Select from '../../../../../shared/components/Select/Select';
import { IOption } from '../../../../../shared/types/common.types';
import TextField from '../../../../../shared/components/TextField/TextField';
import { useCreateForm } from './useCreateForm';
import Button from '../../../../../shared/components/Button/Button';
import ReactSelect from 'react-select';
import { locationsServices } from '../../../../../shared/services/locationsServices';
import { ICreateLocationPayload, ICreateWarehouseLocationPayload } from '../../../../../shared/types/locations.types';
import { useQueryClient } from 'react-query';
import WidthHeightDepth from '../../../../../shared/components/WidthHeightDepth/WidthHeightDepth';
import ErrorMessagePanel from '../../../../../shared/components/ErrorMessagePanel/ErrorMessagePanel';
import { QUERY } from '../../../../../shared/constants/QUERYNAMES';
interface Props {
  onClose: VoidFunction;
}

const { createLocation } = locationsServices();
const CreateLocationModal: React.FC<Props> = ({ onClose }) => {
  const { mutateAsync, isLoading: isCreating } = createLocation();
  const [warehouse, setWarehouse] = useState<IOption>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const queryClient = useQueryClient();
  const onSubmit = async (values: ICreateWarehouseLocationPayload) => {
    const { warehouse_id, aisle, bay, level, width, height, depth } = values;
    const location_name = `${aisle}-${bay}${level ? `-${level}` : ''}`;
    setIsLoading(true);
    mutateAsync(
      {
        payload: {
          location_name,
          location_ref: {
            aisle,
            bay,
            level: level || '',
          },
          location_parent: {
            warehouse: 'none',
          },
          location_type: 'location',
          location_enabled: true,
          location_size: {
            width,
            height,
            depth,
          },
        },
      },

      {
        onSuccess: async () => {
          await queryClient.invalidateQueries(QUERY.LOCATION_LIST, { refetchInactive: true });
          await queryClient.invalidateQueries(QUERY.WAREHOUSE_LIST, { refetchInactive: true });
          setIsLoading(false);
          setError('');
          onClose();
        },
        onError(error: any, variables, context) {
          setError(error.response.data.message);
          setIsLoading(false);
        },
        onSettled: () => {},
      },
    );
  };

  const { form } = useCreateForm({ onSubmit });
  const handleWarehouseChange = (value: any) => {
    setWarehouse(value);

    form.setFieldValue('warehouse_id', value?.value || '');
  };

  return (
    <CreateCont>
      <CreationLocationCont>
        <Typography fontSize={14} color={COLORS.TEXT_SUBTITLE}>
          Locations are identified by using an aisle, bay and level structure, which follows the format of most
          warehouses. When created, the location can be identified by the location reference created by combining these
          descriptors (e.g. AA-001-C or AA-001 if no level is defined).
          <Link
            href={'https://indigowms.atlassian.net/wiki/spaces/MERCURY/pages/492568623/Locations'}
            style={{ cursor: 'pointer' }}
            color={'#0D6EFD'}
            target="_blank"
          >
            Learn more
          </Link>
        </Typography>
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
          onChange={handleWarehouseChange}
        /> */}

        <ThreeColumnsCont>
          <TextField
            required
            onChange={(e) =>
              form.handleChange({ target: { name: e.target.name, value: e.target.value.toUpperCase() } })
            }
            name="aisle"
            value={form.values.aisle}
            InputProps={{
              sx: { borderRadius: '6px', backgroundColor: 'white' },
              inputProps: { style: { textTransform: 'uppercase' } },
            }}
            label="Aisle"
            helperText={form.errors.aisle && form.touched.aisle && form.errors.aisle}
            onBlur={form.handleBlur}
            error={Boolean(form.touched.aisle && form.errors.aisle)}
            placeholder="AA"
          />

          <TextField
            placeholder="001"
            required
            onChange={(e) =>
              form.handleChange({ target: { name: e.target.name, value: e.target.value.toUpperCase() } })
            }
            name="bay"
            value={form.values.bay}
            InputProps={{
              sx: { borderRadius: '6px', backgroundColor: 'white' },
              inputProps: { style: { textTransform: 'uppercase' } },
            }}
            label="Bay"
            helperText={form.touched.bay && form.errors.bay && form.errors.bay}
            onBlur={form.handleBlur}
            error={Boolean(form.touched.bay && form.errors.bay)}
          />

          <TextField
            placeholder="C"
            helperText="This field is optional."
            onChange={(e) =>
              form.handleChange({ target: { name: e.target.name, value: e.target.value.toUpperCase() } })
            }
            name="level"
            value={form.values.level}
            InputProps={{
              sx: { borderRadius: '6px', backgroundColor: 'white' },
              inputProps: { style: { textTransform: 'uppercase' } },
            }}
            label="Level"
          />
        </ThreeColumnsCont>
        <WidthHeightDepth
          values={{
            width: form.values.width,
            height: form.values.height,
            depth: form.values.depth,
          }}
          handleChange={form.handleChange}
          onError={(width, height, depth) => {
            if (width || height || depth) {
              form.setErrors({
                ...form.errors,
                width,
                height,
                depth,
              });
            }
          }}
        />
        {/* <ThreeColumnsCont>
          <TextField
            onChange={form.handleChange}
            name="width"
            value={form.values.width}
            InputProps={{ sx: { borderRadius: '6px', backgroundColor: 'white' } }}
            label="Width"
            helperText={form.errors.width ? form.errors.width : 'This field is optional.'}
            onBlur={form.handleBlur}
            error={Boolean(form.errors.width)}
          />

          <TextField
            onChange={form.handleChange}
            name="height"
            value={form.values.height}
            InputProps={{ sx: { borderRadius: '6px', backgroundColor: 'white' } }}
            label="Height"
            helperText={form.errors.height ? form.errors.height : 'This field is optional.'}
            onBlur={form.handleBlur}
            error={Boolean(form.errors.height)}
          />

          <TextField
            onChange={form.handleChange}
            name="depth"
            value={form.values.depth}
            InputProps={{ sx: { borderRadius: '6px', backgroundColor: 'white' } }}
            label="Depth"
            helperText={form.errors.depth ? form.errors.depth : 'This field is optional.'}
            onBlur={form.handleBlur}
            error={Boolean(form.errors.depth)}
          />
        </ThreeColumnsCont> */}
        {error && <ErrorMessagePanel errorMessage={error} />}
      </CreationLocationCont>
      <ButtonCont>
        <Button
          disabled={isCreating || isLoading || Object.keys(form.errors).length > 0 || !form.dirty}
          type="button"
          loading={isCreating || isLoading}
          variant={'solid'}
          text={'Create Location'}
          color={'success'}
          onClick={() => form.handleSubmit()}
        />
      </ButtonCont>
    </CreateCont>
  );
};

export default CreateLocationModal;
