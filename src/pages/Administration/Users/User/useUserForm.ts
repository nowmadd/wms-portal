import { FormikProps, useFormik } from 'formik';
import * as yup from 'yup';
import { IUpdateUserDetails } from '../../../../shared/types/user.types';
import isEqual from 'lodash/isEqual';

type FormProps = {
  onSubmit: (values: IUpdateUserDetails) => void;
  user: IUpdateUserDetails | undefined;
};

export const useUserForm = ({ onSubmit, user }: FormProps) => {
  const validationSchema: yup.Schema<IUpdateUserDetails> = yup.object({
    user_enabled: yup.boolean(),
    user_notes: yup.string(),
    user_deleted: yup.boolean(),
    user_groups: yup.array(),
    user_role: yup.string(),
  });

  const initialValues: IUpdateUserDetails = {
    user_enabled: user && user.user_enabled ? user.user_enabled : false,
    user_notes: user && user.user_notes ? user.user_notes : '',
    user_deleted: user && user.user_deleted ? user.user_deleted : false,
    // user_groups: user && user.user_groups ? user.user_groups : [],
    user_role: user && user.user_role ? user.user_role : 'Standard',
  };

  const form: FormikProps<IUpdateUserDetails> = useFormik({
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
