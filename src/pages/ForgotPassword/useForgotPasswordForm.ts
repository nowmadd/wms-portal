import { FormikProps, useFormik } from 'formik';
import * as yup from 'yup';
import isEqual from 'lodash/isEqual';
import { IResetPasswordPayload } from '../../shared/types/user.types';
import { ls } from '../../shared/utils/ls';
import { useEffect, useMemo } from 'react';

type FormProps = {
  onSubmit: (values: IResetPasswordPayload) => void;
};

export const useForgotPasswordForm = ({ onSubmit }: FormProps) => {
  const { getLS, setLS } = ls();

  const validationSchema: yup.Schema<IResetPasswordPayload> = yup.object().shape({
    user_email: yup.string().email('Invalid email format').required('Email is required'),
    newPassword: yup.string().required('New Password is required.'),
    confirmPassword: yup.string().required('Confirm password is required.'),
  });

  const initialValues: IResetPasswordPayload = useMemo(() => {
    return getLS('reset_password_form')
      ? JSON.parse(getLS('reset_password_form'))
      : {
          user_email: '',
          newPassword: '',
          confirmPassword: '',
        };
  }, []);

  const form: FormikProps<IResetPasswordPayload> = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    onSubmit: (values) => {
      onSubmit(values);
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    setLS('reset_password_form', JSON.stringify({ ...form.values }));
  }, [form.values]);

  return {
    form,
  };
};
