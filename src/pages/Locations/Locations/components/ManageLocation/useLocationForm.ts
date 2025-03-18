import { FormikProps, useFormik } from 'formik';
import * as yup from 'yup';
import isEqual from 'lodash/isEqual';
import { IUpdateLocationDetails } from '../../../../../shared/types/locations.types';

type FormProps = {
  onSubmit: (values: IUpdateLocationDetails) => void;
  location: IUpdateLocationDetails | undefined;
};

export const useLocationForm = ({ onSubmit, location }: FormProps) => {
  const validationSchema: yup.Schema<IUpdateLocationDetails> = yup.object({
    location_enabled: yup.boolean(),
    location_size: yup.object().shape({
      width: yup.number(),
      height: yup.number(),
      depth: yup.number(),
    }),
  });

  const initialValues: IUpdateLocationDetails = {
    location_enabled: location?.location_enabled ? location?.location_enabled : false,
    location_size: {
      width: location?.location_size?.width ? location?.location_size?.width : 0,
      height: location?.location_size?.height ? location?.location_size?.height : 0,
      depth: location?.location_size?.depth ? location?.location_size?.depth : 0,
    },
  };

  const form: FormikProps<IUpdateLocationDetails> = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    onSubmit: (values) => {
      onSubmit(values);
    },
    enableReinitialize: true,
    // validate: (values) => {
    //   const { width, height, depth } = values.location_size || {};
    //   const areAnyFilled = width || height || depth;
    //   const areAllFilled = width && height && depth;

    //   if (areAnyFilled && !areAllFilled) {
    //     return {
    //       location_size: {
    //         width: width ? '' : 'Width is required',
    //         height: height ? '' : 'Height is required',
    //         depth: depth ? '' : 'Depth is required',
    //       },
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
