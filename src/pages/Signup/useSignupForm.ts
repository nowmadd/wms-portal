import { FormikProps, useFormik } from 'formik';
import * as yup from 'yup';
import { ICreateUserPayload } from '../../shared/types/user.types';
import { useEffect, useMemo, useState } from 'react';
import { ls } from '../../shared/utils/ls';

type FormProps = {
  onSubmit: (values: ICreateUserPayload) => void;
};

export const useSignupForm = ({ onSubmit }: FormProps) => {
  const { getLS, setLS } = ls();

  const validationSchema: yup.Schema<ICreateUserPayload> = yup.object().shape({
    user_email: yup.string().email('Invalid email format').required('Email is required'),
    user_firstname: yup.string().required('First Name is required'),
    user_lastname: yup.string().required('Last Name is required'),
    user_password: yup.string().required('Password is required'),
    user_color: yup.string().required('Color is required'),
    account_industry: yup.string().required('Industry is required'),
    account_company_name: yup.string().required('Company Name is required'),
    account_addr_country: yup.string().required('Country is required'),
    account_addr_line2: yup.string(),
    account_addr_line1: yup.string().required('Address Line 1 is required'),
    account_addr_city: yup.string().required('Town/City is required'),
    account_addr_postcode: yup.string().required('Postcode is required'),
    user_marketing_optin: yup.boolean().required(),
    // user_notes: yup.string().required('Notes is required'),
    // user_active: yup.boolean().required('Active is required'),
    // user_role: yup.string().required('Role is required'),
    // user_account: yup.string().required('Account is required'),
    // user_deleted: yup.boolean().required('Deleted is required'),
    // user_enabled: yup.boolean().required('Enabled is required'),
  });

  const initialValues: ICreateUserPayload = useMemo(() => {
    return getLS('signup_form')
      ? JSON.parse(getLS('signup_form'))
      : {
          user_email: '',
          user_firstname: '',
          user_lastname: '',
          user_password: '',
          user_color: '#3484a2',
          account_industry: '',
          account_company_name: '',
          account_addr_country: '',
          account_addr_line2: '',
          account_addr_line1: '',
          account_addr_city: '',
          account_addr_postcode: '',
          user_marketing_optin: true,
          // user_notes: '',
          // user_active: true,
          // user_role: '',
          // user_account: '',
          // user_deleted: false,
          // user_enabled: true,
        };
  }, []);

  const form: FormikProps<ICreateUserPayload> = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    onSubmit: (values) => {
      onSubmit(values);
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    setLS('signup_form', JSON.stringify({ ...form.values }));
  }, [form.values]);

  return {
    form,
  };
};
