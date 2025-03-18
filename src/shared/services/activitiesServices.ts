import { useMutation, useQuery } from 'react-query';
import { IAxiosErrorResponse } from '../types/axios.types';
import { activitiesDao } from '../dao/activitiesDao';
import { IActivityListResponse } from '../types/activities.types';
import { QUERY } from '../constants/QUERYNAMES';

export const activitiesServices = () => {
  const { getActivityList: getActivityListDao } = activitiesDao();

  const getActivityList = () => {
    return useQuery<IActivityListResponse, IAxiosErrorResponse>([QUERY.ACTIVITY_LIST], () => getActivityListDao());
  };
  return { getActivityList };
};
