import { FormikProps, useFormik } from 'formik';
import * as yup from 'yup';
import isEqual from 'lodash/isEqual';
import { ICreateWarehouseLocationPayload } from '../../../../../shared/types/locations.types';

type FormProps = {
  onSubmit: (values: ICreateWarehouseLocationPayload) => void;
};

export const useCreateForm = ({ onSubmit }: FormProps) => {
  const validationSchema: yup.Schema<ICreateWarehouseLocationPayload> = yup.object().shape({
    // warehouse_id: yup.string().required('Warehouse is required'),
    warehouse_id: yup.string(),
    aisle: yup.string().required('Aisle is required'),
    bay: yup.string().required('Bay is required'),
    width: yup.number(),
    height: yup.number(),
    depth: yup.number(),
  });

  const initialValues: ICreateWarehouseLocationPayload = {
    warehouse_id: '',
    aisle: '',
    bay: '',
    level: '',
    width: 0,
    height: 0,
    depth: 0,
  };

  const form: FormikProps<ICreateWarehouseLocationPayload> = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    onSubmit: (values) => {
      onSubmit(values);
    },
    enableReinitialize: true,
    // validate: (values) => {
    //   const { width, height, depth } = values;
    //   const areAnyFilled = width || height || depth;
    //   const areAllFilled = width && height && depth;

    //   if (areAnyFilled && !areAllFilled) {
    //     return {
    //       width: width ? '' : 'Width is required',
    //       height: height ? '' : 'Height is required',
    //       depth: depth ? '' : 'Depth is required',
    //     };
    //   }

    //   return {};
    // },
  });

  const hasChanges = !isEqual(initialValues, form.values);

  return {
    form,
    hasChanges,
  };
};
