import { accountsDao } from '../dao/accountsDao';
import { useMutation, useQuery } from 'react-query';
import { IAxiosErrorResponse } from '../types/axios.types';
import { ISpecificAccountResponse, IWizardSteps } from '../types/account.types';
import { ICommonResponse } from '../types/common.types';

export const accountsServices = () => {
  const { getAccount: getAccountDao, updateSetupStatus: updateSetupStatusDao } = accountsDao();

  const getAccount = () => {
    return useQuery<ISpecificAccountResponse, IAxiosErrorResponse>(['account'], () => getAccountDao());
  };

  const updateSetupStatus = () => {
    return useMutation<ICommonResponse, IAxiosErrorResponse, IWizardSteps>((payload) => updateSetupStatusDao(payload));
  };

  return { getAccount, updateSetupStatus };
};
