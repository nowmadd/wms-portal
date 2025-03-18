import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header, Stats, StatsContainer, UsersMainCont } from './Users.styles';
import { ColumnDef, FilterFn, PaginationState, Row, createColumnHelper } from '@tanstack/react-table';
import Skeleton from '@mui/material/Skeleton/Skeleton';
import Link from '@mui/material/Link/Link';
import Typography from '@mui/material/Typography/Typography';
import Button from '../../../shared/components/Button/Button';
import Table from '../../../shared/components/Table/Table';
import User from './User/User';
import BasicModal from '../../../shared/components/Modals/BasicModal/BasicModal';
import CreateUserModal from './components/CreateUserModal/CreateUserModal';
import { usersServices } from '../../../shared/services/usersServices';
import { HeaderButtonCont } from './Users.styles';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import { useFilters } from './useFilters';
import InfoPanel from '../../../shared/components/InfoPanel/InfoPanel';
import ErrorMessagePanel from '../../../shared/components/ErrorMessagePanel/ErrorMessagePanel';
import Box from '@mui/material/Box/Box';
import { COLORS } from '../../../shared/constants/COLORS';
import Tooltip from '@mui/material/Tooltip/Tooltip';
import { useQueryClient } from 'react-query';
import { QUERY } from '../../../shared/constants/QUERYNAMES';

declare module '@tanstack/table-core' {
  interface FilterFns {
    array: FilterFn<unknown>;
    checkBoolean: FilterFn<unknown>;
  }
}

const { getUsersList, resendUserInvite } = usersServices();
const Users = () => {
  const { tab, breadcrumbs } = useParams() as { tab: string; breadcrumbs: string };
  const [showCreateUser, setShowCreateUser] = useState(false);
  const { data, isLoading, error } = getUsersList();
  const { mutateAsync: sendInviteToUserAsync } = resendUserInvite();
  const [loadingUser, setLoadingUser] = useState<string | null>(null);
  const [tableLoading, setTableLoading] = useState(false);
  const queryClient = useQueryClient();

  const usersData = useMemo(() => {
    if (isLoading) {
      return;
    } else {
      return data ? data.data : undefined;
    }
  }, [data, isLoading]);

  const refreshTable = async () => {
    setTableLoading(true);
    await queryClient.invalidateQueries(QUERY.USER_LIST, { refetchInactive: true });
    await queryClient.removeQueries(QUERY.USER_DETAILS);
    setTableLoading(false);
  };

  const resendInvite = async (user_email: string) => {
    setLoadingUser(user_email);
    try {
      await sendInviteToUserAsync(
        {
          payload: { user_email },
        },
        {
          onSuccess() {
            queryClient.invalidateQueries(QUERY.USER_LIST);
          },
        },
      );
    } catch (error) {
    } finally {
      setLoadingUser(null);
    }
  };

  const filterOptionsRoles = [
    { term: 'user_role', value: '', label: 'All Roles' },
    { term: 'user_role', value: 'Administrator', label: 'Administrator' },
    { term: 'user_role', value: 'Supervisor', label: 'Supervisor' },
    { term: 'user_role', value: 'Standard', label: 'Standard' },
  ];

  const filterUserEnabled = [
    { term: 'status', value: '', label: 'All Status' },
    { term: 'status', value: 'true', label: 'Enabled Users' },
    { term: 'status', value: 'false', label: 'Disabled Users' },
  ];

  const columns = useMemo<ColumnDef<[]>[]>(
    () => [
      {
        meta: 'icon',
        accessorKey: 'user_color',
        header: '',
        cell: (props: any) => (
          <div
            style={{
              marginLeft: 24,
              backgroundColor: props.getValue(),
              width: 35,
              height: 35,
              borderRadius: 35,
              color: 'white',
              fontSize: 24,
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}
          >
            <i className="bx bxs-user"></i>
          </div>
        ),
        footer: (props) => props.column.id,
        enableColumnFilter: false,
        enableGlobalFilter: false,
      },
      {
        accessorKey: 'user_firstname',
        header: () => 'First Name',
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'user_lastname',
        header: () => 'Last Name',
        footer: (props) => props.column.id,
        enableColumnFilter: true,
      },
      {
        accessorKey: 'user_email',
        header: () => 'Email',
        footer: (props) => props.column.id,
        enableColumnFilter: true,
      },
      {
        accessorKey: 'user_role',
        id: 'user_role',
        header: () => 'Role',
        footer: (props) => props.column.id,
        enableColumnFilter: true,
      },
      // {
      //   accessorFn: (row: any) =>
      //     `${row.user_groups?.map((g: { group_name: string; group_type: string }) => g.group_name) || ''}`,
      //   id: 'groups',
      //   header: () => 'Groups',
      //   footer: (props) => props.column.id,
      //   enableColumnFilter: true,
      //   filterFn: 'array',
      // },
      {
        accessorKey: 'user_enabled',
        id: 'status',
        meta: 'icon',
        cell: (props: any) => {
          return (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              {props.row.original.user_status === 'active' && (
                <Tooltip title="Active">
                  <i className="bx bx-check" style={{ color: 'green' }} />
                </Tooltip>
              )}
              {props.row.original.user_status === 'expired' && (
                <Button
                  variant={'solid-thin'}
                  text={'Invite'}
                  color={'pending'}
                  startIcon={loadingUser === props.row.original.user_email ? 'bx bx-loader bx-spin' : 'bx bx-refresh'}
                  onClick={() => resendInvite(props.row.original.user_email)}
                  disabled={loadingUser === props.row.original.user_email}
                />
              )}
              {props.row.original.user_status === 'disabled' && (
                <Tooltip title="Disabled">
                  <i className="bx bx-x" style={{ color: COLORS.FAILURE }} />
                </Tooltip>
              )}
              {props.row.original.user_status === 'inactive' && (
                <Tooltip title="Inactive">
                  <i className="bx bx-error" style={{ color: COLORS.PENDING }} />
                </Tooltip>
              )}
            </Box>
          );
        },
        header: () => 'Status',
        enableColumnFilter: true,
        enableGlobalFilter: false,
        filterFn: 'checkBoolean',
      },
      {
        meta: 'action',
        accessorKey: 'user_email',
        header: '',
        footer: (props) => props.column.id,
        enableColumnFilter: false,
        enableGlobalFilter: false,
      },
    ],
    [loadingUser],
  );

  return breadcrumbs ? (
    <User />
  ) : (
    <UsersMainCont>
      <Header>
        <Typography fontSize={24} fontWeight={900}>
          Users
        </Typography>
        <HeaderButtonCont>
          <Button
            onClick={() => setShowCreateUser(true)}
            startIcon="bx bx-plus"
            variant={'solid-thin'}
            text={'Create User'}
            color={'primary'}
          />
          {/* <Button startIcon="bx bx-download" variant={'outlined-thin'} text={'Export Users CSV'} color={'primary'} /> */}
        </HeaderButtonCont>
      </Header>
      <Typography fontSize={14} fontWeight={500}>
        {`These are the managed user accounts from the verified domains in your account. `}
        {/* <Link sx={{ cursor: 'pointer' }} color={'#0D6EFD'}>
          Learn more
        </Link> */}
      </Typography>
      {usersData ? (
        usersData.length > 0 ? (
          <>
            <StatsContainer>
              <Stats>
                <Typography fontSize={10} fontWeight={700} color={'#767676'}>
                  All Users
                </Typography>
                <Typography fontSize={36} fontWeight={900}>
                  {(usersData && !tableLoading && usersData?.length) || <Skeleton width={40} />}
                </Typography>
              </Stats>
              <Stats>
                <Typography fontSize={10} fontWeight={700} color={'#767676'}>
                  Disabled Users
                </Typography>
                <Typography fontSize={36} fontWeight={900}>
                  {usersData && !tableLoading ? (
                    usersData.filter((x) => x.user_enabled == false).length
                  ) : (
                    <Skeleton width={40} />
                  )}
                </Typography>
              </Stats>
            </StatsContainer>
            <Table
              loading={isLoading}
              data={usersData ? usersData : {}}
              columns={columns}
              detailPage="/admin/users/user"
              search={{ term: 'user_email', placeholder: 'Search for a user, by name or email address...' }}
              refreshTable={refreshTable}
              tableLoading={tableLoading}
              filters={[
                { term: 'user_role', placeholder: 'All Roles', options: filterOptionsRoles },
                { term: 'status', placeholder: 'All Status', options: filterUserEnabled },
              ]}
            />
          </>
        ) : (
          <InfoPanel noIcon={true} color={'grey'} info={'No Data Found'}></InfoPanel>
        )
      ) : error ? (
        <ErrorMessagePanel errorCode={error.response?.status}></ErrorMessagePanel>
      ) : (
        <CircularProgress size={25} />
      )}
      {showCreateUser && (
        <BasicModal headerText="Invite new users" open={showCreateUser} onClose={() => setShowCreateUser(false)}>
          <CreateUserModal close={() => setShowCreateUser(false)} />
        </BasicModal>
      )}
    </UsersMainCont>
  );
};

export default Users;
