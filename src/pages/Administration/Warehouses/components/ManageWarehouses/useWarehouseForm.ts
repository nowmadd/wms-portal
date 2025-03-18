import { FormikProps, useFormik } from 'formik';
import * as yup from 'yup';
import { IUpdateWarehouseDetails } from '../../../../../shared/types/warehouse.types';
import isEqual from 'lodash/isEqual';

type FormProps = {
  onSubmit: (values: IUpdateWarehouseDetails) => void;
  warehouse: IUpdateWarehouseDetails | undefined;
};

export const useWarehouseForm = ({ onSubmit, warehouse }: FormProps) => {
  const validationSchema: yup.Schema<IUpdateWarehouseDetails> = yup.object({
    location_size: yup.object({
      gross: yup.number(),
    }),
    location_name: yup.string(),
    location_enabled: yup.boolean(),
    location_deleted: yup.boolean(),
    loaction_address: yup.object(),
    location_notes: yup.string(),
    location_opening_hours: yup.object({
      monday: yup.object({ start: yup.string(), end: yup.string() }),
      tuesday: yup.object({ start: yup.string(), end: yup.string() }),
      wednesday: yup.object({ start: yup.string(), end: yup.string() }),
      thursday: yup.object({ start: yup.string(), end: yup.string() }),
      friday: yup.object({ start: yup.string(), end: yup.string() }),
      saturday: yup.object({ start: yup.string(), end: yup.string() }),
      sunday: yup.object({ start: yup.string(), end: yup.string() }),
    }),
  });

  const initialValues: IUpdateWarehouseDetails = {
    location_size:
      warehouse && warehouse.location_size && warehouse.location_size.gross
        ? warehouse.location_size
        : {
            gross: 0,
          },
    location_name: warehouse && warehouse.location_name ? warehouse.location_name : '',
    location_enabled: warehouse && warehouse.location_enabled ? warehouse.location_enabled : false,
    location_deleted: warehouse && warehouse.location_deleted ? warehouse.location_deleted : false,
    location_address:
      warehouse && warehouse.location_address
        ? warehouse.location_address
        : {
            addr_line1: '',
            addr_line2: '',
            addr_city: '',
            addr_postcode: '',
            addr_country: '',
          },
    location_notes: warehouse && warehouse.location_notes ? warehouse.location_notes : '',
    location_opening_hours:
      warehouse && warehouse.location_opening_hours
        ? warehouse.location_opening_hours
        : {
            monday: { start: '', end: '' },
            tuesday: { start: '', end: '' },
            wednesday: { start: '', end: '' },
            thursday: { start: '', end: '' },
            friday: { start: '', end: '' },
            saturday: { start: '', end: '' },
            sunday: { start: '', end: '' },
          },
  };

  const form: FormikProps<IUpdateWarehouseDetails> = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    onSubmit: (values) => {
      onSubmit(values);
    },
    enableReinitialize: true,
  });

  const hasChanges = !isEqual(initialValues, form.values);

  return {
    form,
    hasChanges,
  };
};
