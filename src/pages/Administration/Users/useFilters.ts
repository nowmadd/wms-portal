import { groupsServices } from '../../../shared/services/groupsServices';

const { getGroupsList } = groupsServices();

export const useFilters = () => {
  const { data: getGroupsListData } = getGroupsList();

  const groupsList = getGroupsListData?.data;

  const filterOptionsGroups = groupsList?.map((group) => {
    return {
      term: 'groups',
      label: group.group_name,
      value: group.group_name,
    };
  });

  filterOptionsGroups?.unshift({ term: 'groups', label: 'All Groups', value: '' });

  return { filterOptionsGroups };
};
