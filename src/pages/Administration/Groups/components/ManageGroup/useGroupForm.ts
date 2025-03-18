import { FormikProps, useFormik } from 'formik';
import * as yup from 'yup';
import { IUpdateGroupDetails } from '../../../../../shared/types/groups.types';
import isEqual from 'lodash/isEqual';

type FormProps = {
  onSubmit: (values: IUpdateGroupDetails) => void;
  group: IUpdateGroupDetails | undefined;
};

export const useGroupForm = ({ onSubmit, group }: FormProps) => {
  const validationSchema: yup.Schema<IUpdateGroupDetails> = yup.object({
    group_handheld_access: yup.boolean(),
    group_management_access: yup.boolean(),
    group_module_access: yup.string(),
    group_description: yup.string(),
    group_users: yup.array(),
  });

  const initialValues: IUpdateGroupDetails = {
    group_handheld_access: group && group.group_handheld_access ? group.group_handheld_access : false,
    group_management_access: group && group.group_management_access ? group.group_management_access : false,
    group_module_access: group && group.group_module_access ? group.group_module_access : '',
    group_description: group && group.group_description ? group.group_description : '',
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
