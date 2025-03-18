import { FormikProps, useFormik } from 'formik';
import * as yup from 'yup';
import { IUpdateProfileDetails } from '../../../shared/types/user.types';
import isEqual from 'lodash/isEqual';

type FormProps = {
  onSubmit: (values: IUpdateProfileDetails) => void;
  user: IUpdateProfileDetails | undefined;
};

export const useGeneralForm = ({ onSubmit, user }: FormProps) => {
  const validationSchema: yup.Schema<IUpdateProfileDetails> = yup.object({
    user_marketing_optin: yup.boolean(),
    user_firstname: yup.string(),
    user_lastname: yup.string(),
  });

  const initialValues: IUpdateProfileDetails = {
    user_marketing_optin: user && user.user_marketing_optin ? user.user_marketing_optin : false,
    user_firstname: user && user.user_firstname ? user.user_firstname : '',
    user_lastname: user && user.user_lastname ? user.user_lastname : '',
  };

  const form: FormikProps<IUpdateProfileDetails> = useFormik({
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
