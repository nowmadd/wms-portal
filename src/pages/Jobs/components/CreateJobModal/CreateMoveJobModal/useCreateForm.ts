import { FormikProps, useFormik } from 'formik';
import * as yup from 'yup';
import isEqual from 'lodash/isEqual';
import { IMoveJobForm } from '../../../../../shared/types/job.types';

type FormProps = {
  onSubmit: (values: IMoveJobForm) => void;
};

const exampleOrder = {
  job_account: 'string',
  job_meta: [
    {
      meta_variable_label: 'From Location',
      meta_variable_name: 'from_location',
      meta_variable_value: 'AA-001-A',
      meta_variable_id: 'L-LSDI898C1C4-9Y6LJR',
    },
    {
      meta_variable_label: 'To Location',
      meta_variable_name: 'to_location',
      meta_variable_value: 'AA-001-B',
      meta_variable_id: 'L-LSEK01DN1E4-UDNCU5',
    },
  ],
  job_priority: 'string',
  job_type: 'string',
};

export const useCreateForm = ({ onSubmit }: FormProps) => {
  const validationSchema: yup.Schema<IMoveJobForm> = yup.object().shape({
    warehouse_id: yup.string(),
    equipment: yup
      .string()
      .oneOf(['None', 'Totebag', 'Trolley', 'Hand Truck', 'Platform Truck', 'Pallet Jack', 'Forklift'])
      .required('Equipment is required'),
    priority: yup.string().oneOf(['Urgent', 'High', 'Normal', 'Low']).default('Normal'),
    from_location: yup.string().required('From location is required'),
    to_location: yup.string().required('To location is required'),
    warehouse_label: yup.string(),
    notes: yup.string(),
    to_value: yup.string(),
    from_value: yup.string(),
  });

  const initialValues: IMoveJobForm = {
    warehouse_id: '',
    equipment: 'Forklift',
    priority: 'Normal',
    from_location: '',
    to_location: '',
    warehouse_label: '',
    notes: '',
  };

  const form: FormikProps<IMoveJobForm> = useFormik({
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
