import { ENDPOINTS } from '../constants/ENDPOINTS';
import { useAxios } from '../hooks/useAxios';
import { IActivityListResponse } from '../types/activities.types';

export const activitiesDao = () => {
  const { GET, PATCH, DELETE, PUT, POST } = useAxios();

  const getActivityList = async () => {
    const response = await GET<IActivityListResponse>({
      url: `${ENDPOINTS.ACTIVITIES}`,
    });
    return response.data;
  };

  return {
    getActivityList,
  };
};
