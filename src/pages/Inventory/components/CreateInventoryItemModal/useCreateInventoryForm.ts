import { FormikProps, useFormik } from 'formik';
import * as yup from 'yup';
import isEqual from 'lodash/isEqual';
import { ICreateInventoryItemPayload } from '../../../../shared/types/inventory.types';

type FormProps = {
  onSubmit: (values: ICreateInventoryItemPayload) => void;
};

const numericalRegex = /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/;
const alphanumericRegex = /^[a-zA-Z0-9]+$/;
const alphanumericRegexWithDashAndQoute = /^[a-zA-Z0-9' .-]+$/;
const alphanumericRegexWithDash = /^[a-zA-Z0-9\-]+$/;

export const useCreateInventoryForm = ({ onSubmit }: FormProps) => {
  const validationSchema: yup.Schema<ICreateInventoryItemPayload> = yup.object().shape({
    inventory_description: yup
      .string()
      .required('Oops, please enter a description')
      .matches(alphanumericRegexWithDashAndQoute, 'Oops, Description cannot contain special characters'),
    inventory_barcode_primary: yup
      .string()
      .required('Oops, please enter a barcode')
      .matches(alphanumericRegex, 'Barcode must contain only letters and numbers. Special characters are not allowed.')
      .max(30, 'Oops, Barcode too long.'),
    inventory_sku_primary: yup
      .string()
      .matches(alphanumericRegexWithDash, 'SKU must contain only letters and numbers')
      .required('Oops, please enter a SKU'),
    inventory_barcode_alt: yup
      .string()
      .matches(
        alphanumericRegexWithDash,
        'Barcode must contain only letters and numbers. Special characters are not allowed.',
      )
      .max(30, 'Oops, Barcode too long.'),
    inventory_type: yup.string().oneOf(['item', 'packaging']).required('Oops, please select a value'),
    inventory_parent_warehouse: yup.string(),
    inventory_parent_location_preferred: yup.string(),
    inventory_parent_location_overflow: yup.array(),
    inventory_net_weight: yup.number().typeError('Oops, please enter numerical values').required('Required'),
    inventory_start_quantity: yup.number().typeError('Oops, please enter numerical values').required('Required'),
    inventory_unit_size: yup.number().typeError('Oops, please enter numerical values').required('Required'),
  });

  const initialValues: ICreateInventoryItemPayload = {
    inventory_type: 'item',
    inventory_description: '',
    inventory_barcode_primary: '',
    inventory_sku_primary: '',
    inventory_barcode_alt: '',
    inventory_parent_warehouse: '',
    inventory_parent_location_preferred: '',
    inventory_parent_location_overflow: [],
    inventory_net_weight: 0,
    inventory_start_quantity: 0,
    inventory_unit_size: 1,
  };

  const form: FormikProps<ICreateInventoryItemPayload> = useFormik({
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
