import { FormikProps, useFormik } from 'formik';
import * as yup from 'yup';
import isEqual from 'lodash/isEqual';
import { IUpdateJobDetails } from '../../../../../../shared/types/jobs.types';

type FormProps = {
  onSubmit: (values: IUpdateJobDetails) => void;
  job: IUpdateJobDetails | undefined;
};

const numericalRegex = /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/;
const alphanumericRegex = /^[a-zA-Z0-9]+$/;
const alphanumericRegexWithDashAndQoute = /^[a-zA-Z0-9' .-]+$/;

export const useMoveForm = ({ onSubmit, job }: FormProps) => {
  const validationSchema: yup.Schema<IUpdateJobDetails> = yup.object().shape({
    job_notes: yup.string(),
    job_equipment: yup.string(),
    job_priority: yup.string(),
  });

  const initialValues: IUpdateJobDetails = {
    job_notes: job && job.job_notes ? job.job_notes : '',
    job_priority: job && job.job_priority ? job.job_priority : '',
    job_equipment: job && job.job_equipment ? job.job_equipment : '',
  };

  const form: FormikProps<IUpdateJobDetails> = useFormik({
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
