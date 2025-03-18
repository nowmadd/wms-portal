import { ISpecificAccount } from './account.types';
import { IUserDetails, IUserProfileSetupStatus, IUserWizardSteps } from './user.types';

export interface IDefaultValue {
  account_setup_status: ISpecificAccount['account_setup_status'];
  setAccountSetupStatus: (data: ISpecificAccount['account_setup_status']) => void;
  showToast: (
    message: string,
    type: 'success' | 'error' | 'info' | 'warning',
    autoClose: number,
    customHeader?: string,
  ) => void;
}

export interface IUserSetupDefaultValue {
  user_setup_status: IUserProfileSetupStatus['user_setup_status'];
  setUserSetupStatus: (data: IUserProfileSetupStatus['user_setup_status']) => void;
}
