import { useMutation, useQuery } from 'react-query';
import { IAxiosErrorResponse } from '../types/axios.types';
import { groupsDao } from '../dao/groupsDao';
import {
  ICreateGroupPayload,
  ICreateGroupResponse,
  IGroupDetailsReponse,
  IGroupsListResponse,
  IUpdateGroupDetails,
  IUpdateGroupResponse,
  IUpdateGroupUsers,
} from '../types/groups.types';
import { QUERY } from '../constants/QUERYNAMES';

export const groupsServices = () => {
  const {
    getGroupsList: getGroupsListDao,
    getGroupDetails: getGroupDetailsDao,
    createGroup: createGroupDao,
    updateGroup: updateGroupDao,
    addUsersToGroup: addUserToGroupDao,
    removeUsersFromGroup: removeUsersFromGroupDao,
  } = groupsDao();

  const getGroupsList = () => {
    return useQuery<IGroupsListResponse, IAxiosErrorResponse>([QUERY.GROUP_LIST], () => getGroupsListDao());
  };

  const getGroupDetails = (group_id: string) => {
    return useQuery<IGroupDetailsReponse, IAxiosErrorResponse>([QUERY.GROUP_DETAILS, group_id], () =>
      getGroupDetailsDao(group_id),
    );
  };
  const createGroup = () => {
    return useMutation<ICreateGroupResponse, IAxiosErrorResponse, { payload: ICreateGroupPayload }>(({ payload }) =>
      createGroupDao(payload),
    );
  };

  const updateGroup = () => {
    return useMutation<IUpdateGroupResponse, IAxiosErrorResponse, { group_id: string; payload: IUpdateGroupDetails }>(
      ({ group_id, payload }) => updateGroupDao(group_id, payload),
    );
  };

  const addUsersToGroup = () => {
    return useMutation<IUpdateGroupResponse, IAxiosErrorResponse, { group_id: string; payload: IUpdateGroupUsers }>(
      ({ group_id, payload }) => addUserToGroupDao(group_id, payload),
    );
  };

  const removeUsersFromGroup = () => {
    return useMutation<IUpdateGroupResponse, IAxiosErrorResponse, { group_id: string; payload: IUpdateGroupUsers }>(
      ({ group_id, payload }) => removeUsersFromGroupDao(group_id, payload),
    );
  };

  return { getGroupsList, getGroupDetails, createGroup, updateGroup, addUsersToGroup, removeUsersFromGroup };
};
