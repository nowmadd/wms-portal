import { IUserWizardSteps } from './user.types';

export interface IWizardSteps {
  create_inventory?: boolean;
  create_jobs?: boolean;
  create_location?: boolean;
  create_warehouse?: boolean;
  download_app?: boolean;
  import_orders?: boolean;
  update_profile?: boolean;
  print_location_barcode?: boolean;
}
export interface ISpecificAccount {
  account_active: string;
  account_addr_city: string;
  account_addr_country: string;
  account_addr_line1: string;
  account_addr_line2: string;
  account_addr_postcode: string;
  account_deleted: string;
  account_id: string;
  account_industry: string;
  account_name: string;
  account_owner: string[];
  account_setup_status?: {
    complete: boolean;
    progress: {
      step_completed: number;
      step_count: number;
    };
    steps: IUserWizardSteps;
  };
}

export interface ISpecificAccountResponse {
  data: ISpecificAccount;
  message: string;
  success: boolean;
}
