import { FormikProps, useFormik } from 'formik';
import * as yup from 'yup';
import isEqual from 'lodash/isEqual';
import { IResetPasswordPayload } from '../../../shared/types/user.types';

type FormProps = {
  onSubmit: (values: IResetPasswordPayload) => void;
};

export const usePasswordForm = ({ onSubmit }: FormProps) => {
  const validationSchema: yup.Schema<IResetPasswordPayload> = yup.object({
    user_email: yup.string().email('Invalid email format').required('Email is required'),
    newPassword: yup.string().required('New Password is required.'),
    confirmPassword: yup.string().required('Confirm password is required.'),
  });

  const initialValues: IResetPasswordPayload = {
    user_email: '',
    newPassword: '',
    confirmPassword: '',
  };

  const form: FormikProps<IResetPasswordPayload> = useFormik({
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
