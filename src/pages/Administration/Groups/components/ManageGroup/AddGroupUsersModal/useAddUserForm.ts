import { FormikProps, useFormik } from 'formik';
import * as yup from 'yup';
import { IUpdateGroupDetails } from '../../../../../../shared/types/groups.types';
import isEqual from 'lodash/isEqual';

type FormProps = {
  onSubmit: (values: IUpdateGroupDetails) => void;
  group: IUpdateGroupDetails | undefined;
};

export const useAddUserForm = ({ onSubmit, group }: FormProps) => {
  const validationSchema: yup.Schema<IUpdateGroupDetails> = yup.object({
    group_users: yup.array(),
  });

  const initialValues: IUpdateGroupDetails = {
    group_users: group && group.group_users ? group.group_users : [],
  };

  const form: FormikProps<IUpdateGroupDetails> = useFormik({
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
