import { FormikProps, useFormik } from 'formik';
import * as yup from 'yup';
import isEqual from 'lodash/isEqual';
import { IPickPackForm } from '../../../../../shared/types/job.types';

type FormProps = {
  onSubmit: (values: IPickPackForm) => void;
};

const exampleOrder = {
  job_type: 'planned_pickandpack',
  job_priority: 'Normal',
  job_equipment: 'trolly',
  job_meta: [
    {
      meta_variable_label: 'Order Ref',
      meta_variable_name: 'order_ref',
      meta_variable_id: 'O-LSDI898C1C4-9Y6LJR',
      meta_variable_value: 'Shopify #0101',
    },
    {
      meta_variable_id: 'inventory_array',
      meta_variable_label: 'Inventory',
      meta_variable_name: 'inventory',
      meta_variable_value: [
        {
          barcode: '5555555555',
          description: 'Nike Golf Club',
          id: 'I-LSEK3G6H3B1-RWRQAV',
          location_id: 'L-LV2J8R063HE-PR9ZJW',
          location_ref: 'JJ-01-J',
          quantity: 5,
        },
      ],
    },
  ],
};

export const useCreateForm = ({ onSubmit }: FormProps) => {
  const validationSchema: yup.Schema<IPickPackForm> = yup.object().shape({
    job_warehouse: yup.string(),
    job_equipment: yup
      .string()
      .oneOf(['None', 'Totebag', 'Trolley', 'Hand Truck', 'Platform Truck', 'Pallet Jack', 'Forklift'])
      .required('Equipment is required'),
    job_priority: yup.string().oneOf(['Urgent', 'High', 'Normal', 'Low']).default('Normal'),
    job_notes: yup.string(),
  });

  const initialValues: IPickPackForm = {
    job_warehouse: '',
    job_equipment: 'None',
    job_priority: 'Normal',
    job_notes: '',
  };

  const form: FormikProps<IPickPackForm> = useFormik({
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
