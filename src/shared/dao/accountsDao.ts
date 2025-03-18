import { ENDPOINTS } from '../constants/ENDPOINTS';
import { useAxios } from '../hooks/useAxios';
import { ISpecificAccountResponse, IWizardSteps } from '../types/account.types';
import { ICommonResponse } from '../types/common.types';

export const accountsDao = () => {
  const { GET, PATCH } = useAxios();

  const getAccount = async () => {
    const response = await GET<ISpecificAccountResponse>({
      url: `${ENDPOINTS.ACCOUNTS}/account`,
    });
    return response.data;
  };

  const updateSetupStatus = async (payload: IWizardSteps) => {
    const response = await PATCH<ICommonResponse>({
      url: `${ENDPOINTS.ACCOUNTS}/account/setup/status`,
      data: payload,
    });
    return response.data;
  };

  return {
    updateSetupStatus,
    getAccount,
  };
};
