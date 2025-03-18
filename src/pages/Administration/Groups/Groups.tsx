import { ColumnDef, FilterFn } from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  GroupNameContainer,
  Header,
  HeaderButtonCont,
  Stats,
  StatsContainer,
  UsersMainCont,
  GroupName,
  GroupDescription,
  ModalCont,
  ModalHeader,
} from './Groups.styles';
import Typography from '@mui/material/Typography/Typography';
import Button from '../../../shared/components/Button/Button';
import Link from '@mui/material/Link/Link';
import Table from '../../../shared/components/Table/Table';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import BasicModal from '../../../shared/components/Modals/BasicModal/BasicModal';
import { COLORS } from '../../../shared/constants/COLORS';
import Pill from '../../../shared/components/Pill/Pill';
import Skeleton from '@mui/material/Skeleton/Skeleton';
import { groupsServices } from '../../../shared/services/groupsServices';
import ManageGroup from './components/ManageGroup/ManageGroup';
import CreateGroupModal from './components/CreateGroupModal/CreateGroupModal';
import Modal from '@mui/material/Modal/Modal';
import Breadcrumbs from '../../../shared/components/Breadcrumbs/Breadcrumbs';
import { IconButton } from './components/CreateGroupModal/CreateGroupModal.styles';
import InfoPanel from '../../../shared/components/InfoPanel/InfoPanel';
import ErrorMessagePanel from '../../../shared/components/ErrorMessagePanel/ErrorMessagePanel';
import { QUERY } from '../../../shared/constants/QUERYNAMES';
import { useQueryClient } from 'react-query';

declare module '@tanstack/table-core' {
  interface FilterFns {
    checkBoolean: FilterFn<unknown>;
  }
}

const { getGroupsList } = groupsServices();
const Groups = () => {
  const { tab, breadcrumbs } = useParams() as { tab: string; breadcrumbs: string };
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const { data, isLoading, error } = getGroupsList();
  const curPath = window.location.pathname;
  const [tableLoading, setTableLoading] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const groupsData = useMemo(() => {
    if (isLoading) {
      return;
    } else {
      return data ? data.data : undefined;
    }
  }, [data, isLoading]);

  const refreshTable = async () => {
    setTableLoading(true);
    await queryClient.invalidateQueries(QUERY.GROUP_LIST, { refetchInactive: true });
    await queryClient.removeQueries(QUERY.GROUP_DETAILS);
    setTableLoading(false);
  };

  const filterOptionsModules = [
    { term: 'group_module_access', value: '', label: 'All Modules' },
    { term: 'group_module_access', value: 'Administrator', label: 'Administrator' },
    { term: 'group_module_access', value: 'Supervisor', label: 'Supervisor' },
    { term: 'group_module_access', value: 'Standard', label: 'Standard' },
  ];

  const filterOptionsManagementAccess = [
    { term: 'group_management_access', value: '', label: 'All Management Access' },
    { term: 'group_management_access', value: 'true', label: 'Enabled' },
    { term: 'group_management_access', value: 'false', label: 'Disabled' },
  ];

  const filterOptionsHandheldAccess = [
    { term: 'group_handheld_access', value: '', label: 'All Handheld Access' },
    { term: 'group_handheld_access', value: 'true', label: 'Enabled' },
    { term: 'group_handheld_access', value: 'false', label: 'Disabled' },
  ];

  const columns = useMemo<ColumnDef<[]>[]>(
    () => [
      {
        accessorKey: 'group_name',
        header: () => 'Group Name',
        cell: (props: any) => {
          return (
            <Link
              style={{ textDecoration: 'none', cursor: 'pointer' }}
              onClick={() => navigate(`/admin/groups/group?id=${props.row.original.group_id}`)}
            >
              <GroupNameContainer>
                <GroupName>{props.row.original.group_name}</GroupName>
                <GroupDescription>{props.row.original.group_description}</GroupDescription>
              </GroupNameContainer>
            </Link>
          );
        },
        footer: (props) => props.column.id,
      },
      {
        id: 'group_members',
        meta: 'icon',
        cell: (props: any) => {
          return (
            <div style={{ padding: 10 }}>
              <Pill
                slim={true}
                text={
                  props.row.original.group_users.length +
                  (props.row.original.group_users.length > 1 ? ' members' : ' member')
                }
                variant={'square'}
                color={'grey'}
              />
            </div>
          );
        },

        footer: (props) => props.column.id,
        enableColumnFilter: true,
      },
      {
        accessorKey: 'group_module_access',
        meta: 'slim',
        header: () => 'Module Access',
        footer: (props) => props.column.id,
        enableColumnFilter: true,
      },
      {
        accessorKey: 'group_management_access',
        meta: 'icon',
        header: () => 'Management Access',
        // filterFn: 'checkTrue',
        cell: (props: any) => {
          // getLogo(props.row.original.user_active, props.row.original.user_deleted, props.row.original.user_enabled);
          return props.row.original.group_management_access ? (
            <i className="bx bx-check"></i>
          ) : (
            <i className="bx bx-x"></i>
          );
        },
        enableColumnFilter: true,
        filterFn: 'checkBoolean',
      },

      {
        accessorKey: 'group_handheld_access',
        meta: 'icon',
        header: () => 'Handheld Access',
        // filterFn: 'checkTrue',
        cell: (props: any) => {
          // getLogo(props.row.original.user_active, props.row.original.user_deleted, props.row.original.user_enabled);
          return props.row.original.group_handheld_access ? (
            <i className="bx bx-check"></i>
          ) : (
            <i className="bx bx-x"></i>
          );
        },
        enableColumnFilter: true,
        filterFn: 'checkBoolean',
      },
      {
        meta: 'action',
        accessorKey: 'group_id',
        header: '',
        footer: (props) => props.column.id,
        enableColumnFilter: false,
        enableGlobalFilter: false,
      },
    ],
    [],
  );

  return breadcrumbs ? (
    <ManageGroup />
  ) : (
    <UsersMainCont>
      <Header>
        <Typography fontSize={24} fontWeight={900}>
          Groups
        </Typography>
        <HeaderButtonCont>
          <Button
            onClick={() => setShowCreateGroup(true)}
            startIcon="bx bx-plus"
            variant={'solid-thin'}
            text={'Create Group'}
            color={'primary'}
          />
          {/* <Button startIcon="bx bx-download" variant={'outlined-thin'} text={'Export Users CSV'} color={'primary'} /> */}
        </HeaderButtonCont>
      </Header>
      <Typography fontSize={14} fontWeight={500}>
        {`Manage product access and roles in bulk by adding users to groups that have the required permissions. `}
        {/* <Link sx={{ cursor: 'pointer' }} color={'#0D6EFD'}>
          Learn more
        </Link> */}
      </Typography>
      {groupsData ? (
        <>
          <StatsContainer>
            <Stats>
              <Typography fontSize={10} fontWeight={700} color={'#767676'}>
                All Groups
              </Typography>
              <Typography fontSize={36} fontWeight={900}>
                {groupsData && !tableLoading ? groupsData?.length : <Skeleton width={40} />}
              </Typography>
            </Stats>
            <Stats>
              <Typography fontSize={10} fontWeight={700} color={'#767676'}>
                Empty Groups
              </Typography>
              <Typography fontSize={36} fontWeight={900}>
                {groupsData && !tableLoading ? (
                  groupsData.filter((x) => x.group_users.length == 0).length
                ) : (
                  <Skeleton width={40} />
                )}
              </Typography>
            </Stats>
          </StatsContainer>
          <Table
            loading={false}
            data={groupsData ? groupsData : {}}
            columns={columns}
            detailPage="/admin/groups/group"
            search={{ term: 'group_name', placeholder: 'Search for a group, by name...' }}
            refreshTable={refreshTable}
            tableLoading={tableLoading}
            filters={[
              { term: 'group_module_access', placeholder: 'All Modules', options: filterOptionsModules },
              {
                term: 'group_management_access',
                placeholder: 'Management Access',
                options: filterOptionsManagementAccess,
              },
              { term: 'group_handheld_access', placeholder: 'Handheld Access', options: filterOptionsHandheldAccess },
            ]}
          />
        </>
      ) : error ? (
        <ErrorMessagePanel errorCode={error.response?.status}></ErrorMessagePanel>
      ) : (
        <CircularProgress size={25} />
      )}

      {showCreateGroup && (
        <BasicModal headerText="Create New Group" open={showCreateGroup} onClose={() => setShowCreateGroup(false)}>
          <CreateGroupModal close={() => setShowCreateGroup(false)} />
        </BasicModal>
      )}
    </UsersMainCont>
  );
};

export default Groups;
