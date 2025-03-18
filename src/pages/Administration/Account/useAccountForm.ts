import { FormikProps, useFormik } from 'formik';
import * as yup from 'yup';
import { ISpecificAccount } from '../../../shared/types/account.types';

type FormProps = {
  onSubmit: (values: ISpecificAccount) => void;
  account: ISpecificAccount | undefined;
};

export const useAccountForm = ({ onSubmit, account }: FormProps) => {
  const validationSchema: yup.Schema<ISpecificAccount> = yup.object({
    account_active: yup.string().required(),
    account_addr_city: yup.string().required(),
    account_addr_country: yup.string().required(),
    account_addr_line1: yup.string().required(),
    account_addr_line2: yup.string().required(),
    account_addr_postcode: yup.string().required(),
    account_created: yup.number().required(),
    account_deleted: yup.string().required(),
    account_id: yup.string().required(),
    account_industry: yup.string().required(),
    account_name: yup.string().required(),
    account_owner: yup.array().required(),
    account_setup_status: yup.object({
      steps: yup.object({
        create_inventory: yup.boolean().required(),
        create_jobs: yup.boolean().required(),
        create_location: yup.boolean().required(),
        create_warehouse: yup.boolean().required(),
        download_app: yup.boolean().required(),
        import_orders: yup.boolean().required(),
        print_location_barcode: yup.boolean().required(),
      }),
      complete: yup.boolean().required(),
      progress: yup.object({
        step_count: yup.number().required(),
        step_completed: yup.number().required(),
      }),
    }),
  });

  const initialValues: ISpecificAccount = {
    account_active: account && account.account_active ? account.account_active : '',
    account_addr_city: account && account.account_addr_city ? account.account_addr_city : '',
    account_addr_country: account && account.account_addr_country ? account.account_addr_country : '',
    account_addr_line1: account && account.account_addr_line1 ? account.account_addr_line1 : '',
    account_addr_line2: account && account.account_addr_line2 ? account.account_addr_line2 : '',
    account_addr_postcode: account && account.account_addr_postcode ? account.account_addr_postcode : '',
    account_deleted: account && account.account_deleted ? account.account_deleted : '',
    account_id: account && account.account_id ? account.account_id : '',
    account_industry: account && account.account_industry ? account.account_industry : '',
    account_name: account && account.account_name ? account.account_name : '',
    account_owner: account && account.account_owner ? account.account_owner : [],
    account_setup_status: {
      steps: {
        create_inventory:
          account && account.account_setup_status && account.account_setup_status.steps
            ? account.account_setup_status.steps.create_inventory
            : false,
        create_jobs:
          account && account.account_setup_status && account.account_setup_status.steps
            ? account.account_setup_status.steps.create_jobs
            : false,
        create_location:
          account && account.account_setup_status && account.account_setup_status.steps
            ? account.account_setup_status.steps.create_location
            : false,
        create_warehouse:
          account && account.account_setup_status && account.account_setup_status.steps
            ? account.account_setup_status.steps.create_warehouse
            : false,
        download_app:
          account && account.account_setup_status && account.account_setup_status.steps
            ? account.account_setup_status.steps.download_app
            : false,
        import_orders:
          account && account.account_setup_status && account.account_setup_status.steps
            ? account.account_setup_status.steps.import_orders
            : false,
        print_location_barcode:
          account && account.account_setup_status && account.account_setup_status.steps
            ? account.account_setup_status.steps.print_location_barcode
            : false,
      },
      complete:
        account && account.account_setup_status && account.account_setup_status.steps
          ? account.account_setup_status.complete
          : false,
      progress: {
        step_count:
          account &&
          account.account_setup_status &&
          account.account_setup_status.steps &&
          account.account_setup_status.progress
            ? account.account_setup_status.progress.step_count
            : 0,
        step_completed:
          account &&
          account.account_setup_status &&
          account.account_setup_status.steps &&
          account.account_setup_status.progress
            ? account.account_setup_status.progress.step_completed
            : 0,
      },
    },
  };

  const form: FormikProps<ISpecificAccount> = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    onSubmit: (values) => {
      onSubmit(values);
    },
    enableReinitialize: true,
  });

  return {
    form,
  };
};
