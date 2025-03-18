import { FormikProps, useFormik } from 'formik';
import * as yup from 'yup';
import isEqual from 'lodash/isEqual';
import { IUpdateInventoryDetails } from '../../../../shared/types/inventory.types';

type FormProps = {
  onSubmit: (values: IUpdateInventoryDetails) => void;
  inventory: IUpdateInventoryDetails | undefined;
};

const numericalRegex = /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/;
const alphanumericRegex = /^[a-zA-Z0-9]+$/;
const alphanumericRegexWithDashAndQoute = /^[a-zA-Z0-9' .-]+$/;
const alphanumericRegexWithDash = /^[a-zA-Z0-9\-]+$/;

export const useInventoryForm = ({ onSubmit, inventory }: FormProps) => {
  const validationSchema: yup.Schema<IUpdateInventoryDetails> = yup.object().shape({
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
      .required('Oops, please enter SKU')
      .matches(
        alphanumericRegexWithDash,
        'SKU must contain only letters and numbers. Special characters are not allowed.',
      ),
    inventory_barcode_alt: yup
      .string()
      .matches(
        alphanumericRegexWithDash,
        'Barcode must contain only letters and numbers. Special characters are not allowed.',
      )
      .max(30, 'Oops, Barcode too long.'),
    inventory_net_weight: yup.number().required('This is required'),
    inventory_unit_size: yup.number().max(4, 'Oops, too many items.'),
  });

  const initialValues: IUpdateInventoryDetails = {
    inventory_description: inventory && inventory.inventory_description ? inventory.inventory_description : '',
    inventory_barcode_primary:
      inventory && inventory.inventory_barcode_primary ? inventory.inventory_barcode_primary : '',
    inventory_sku_primary: inventory && inventory.inventory_sku_primary ? inventory.inventory_sku_primary : '',
    inventory_unit_size: inventory && inventory.inventory_unit_size ? inventory.inventory_unit_size : 0,
    inventory_net_weight: inventory && inventory.inventory_net_weight ? inventory.inventory_net_weight : 0,
    inventory_barcode_alt: inventory && inventory.inventory_barcode_alt ? inventory.inventory_barcode_alt : '',
  };

  const form: FormikProps<IUpdateInventoryDetails> = useFormik({
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
