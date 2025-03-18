import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { IGroupDetails, IUpdateGroupDetails } from '../../../../../shared/types/groups.types';
import {
  AccessCont,
  AccessContent,
  DescriptionCont,
  GroupContent,
  GroupMainCont,
  GroupMembers,
  HandhelAccess,
  Header,
  HeaderButtonCont,
  ManagementAccess,
  ModalHeaderCont,
  SubHeader,
  TableCont,
  UserEmail,
  UserName,
  UserNameContainer,
} from './ManageGroup.styles';
import Typography from '@mui/material/Typography/Typography';
import Breadcrumbs from '../../../../../shared/components/Breadcrumbs/Breadcrumbs';
import Button from '../../../../../shared/components/Button/Button';
import Switch from '../../../../../shared/components/Switch/Switch';
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import { groupsServices } from '../../../../../shared/services/groupsServices';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import { useQueryClient } from 'react-query';
import { Stats, StatsContainer } from '../../Groups.styles';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import Table from '../../../../../shared/components/Table/Table';
import Select from '../../../../../shared/components/Select/Select';
import { useGroupForm } from './useGroupForm';
import { usersServices } from '../../../../../shared/services/usersServices';
import Link from '@mui/material/Link/Link';
import Box from '@mui/material/Box/Box';
import { ls } from '../../../../../shared/utils/ls';
import SaveRevertFooter from '../../../../../shared/components/SaveRevertFooter/SaveRevertFooter';
import BasicModal from '../../../../../shared/components/Modals/BasicModal/BasicModal';
import AddGroupUsersModal from './AddGroupUsersModal/AddGroupUsersModal';
import { IUserDetails } from '../../../../../shared/types/user.types';
import { QUERY } from '../../../../../shared/constants/QUERYNAMES';
interface Option {
  readonly label: string;
  readonly value: string;
}

const { getGroupDetails, updateGroup, removeUsersFromGroup } = groupsServices();
const { getUsersList } = usersServices();
const User = () => {
  const { getLS } = ls();
  const { account_id: ACCOUNT_ID } = JSON.parse(getLS('user'));
  const curPath = window.location.pathname;
  const [searchParams, setSearchParams] = useSearchParams();
  const searchId = searchParams.get('id') || '';
  const { data, isLoading } = getGroupDetails(searchId);
  const { data: usersData, isLoading: isUsersLoading } = getUsersList();
  const { mutateAsync: updateGroupMutate } = updateGroup();
  const { mutateAsync: removeUserMutate } = removeUsersFromGroup();
  const [group, setGroup] = useState<IGroupDetails | null>(null);
  const [users, setUsers] = useState<IUserDetails[] | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showAddMembersModal, setShowAddMembersModal] = useState(false);
  const [removedUsers, setRemovedUsers] = useState<string[]>([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isLoading) {
      return;
    } else {
      setGroup(data ? data.data : null);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if ((isLoading && isUsersLoading) || !usersData) {
      return;
    } else {
      setUsers(usersData.data);
    }
  }, [usersData]);

  const columnHelper = createColumnHelper<IUserDetails>();

  const columns = [
    columnHelper.accessor('user_color', {
      meta: 'icon',
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
    }),
    columnHelper.accessor('user_email', {
      id: 'user',
      header: 'User',
      cell: (props: any) => {
        return (
          <UserNameContainer>
            <UserName>{`${props.row.original?.user_firstname || 'Unknown'} ${
              props.row.original?.user_lastname || 'Name'
            }`}</UserName>
            <UserEmail>{props.row.original.user_email}</UserEmail>
          </UserNameContainer>
        );
      },
      footer: (props) => props.column.id,
      enableGlobalFilter: true,
    }),
    columnHelper.accessor('user_firstname', {
      meta: 'action-cell',
      header: 'Action',
      cell: (props: any) => {
        return (
          <Box sx={{ innerWidth: '20px' }}>
            <Link
              component="button"
              onClick={() => {
                removeUser(props.row.original.user_email);
              }}
            >
              Remove
            </Link>
          </Box>
        );
      },
      footer: (props) => props.column.id,
      enableColumnFilter: false,
      enableGlobalFilter: false,
    }), //
  ];

  const handleSave = async (val: IUpdateGroupDetails) => {
    setIsSaving(true);
    if (group?.group_users !== val.group_users) {
      await removeUserMutate(
        { group_id: group?.group_id || '', payload: { group_users: removedUsers } },
        {
          onSuccess() {
            setRemovedUsers([]);
          },
        },
      );
    }
    await updateGroupMutate({ group_id: group?.group_id || '', payload: val });
    await queryClient.invalidateQueries(QUERY.GROUP_DETAILS);
    await queryClient.invalidateQueries(QUERY.GROUP_LIST, { refetchInactive: true });
    setIsSaving(false);
  };

  const { form, hasChanges } = useGroupForm({
    onSubmit: handleSave,
    group: group ? group : undefined,
  });

  const handleRevert = () => {
    form.resetForm();
  };

  const moduleAccess = [
    { value: 'Standard', label: 'Standard' },
    { value: 'Supervisor', label: 'Supervisor' },
    { value: 'Administrator', label: 'Administrator' },
  ];

  const groupModuleAccessData = {
    value: group?.group_module_access,
    label: group?.group_module_access,
  };

  const { group_description, group_handheld_access, group_management_access, group_module_access, group_users } =
    form.values;

  const removeUser = async (email: string) => {
    const usersToRemove: string[] = removedUsers;
    usersToRemove.push(email);
    setRemovedUsers(usersToRemove);
    form.setFieldValue(
      'group_users',
      group?.group_users.filter((u) => u.user_email !== email),
    );
  };

  return !isLoading && !isUsersLoading ? (
    <GroupMainCont>
      <Header>
        <Typography fontSize={36} fontWeight={900}>
          {group?.group_name || ''}
        </Typography>
        <Breadcrumbs page={group?.group_name || ''} />
      </Header>
      <SubHeader>
        <DescriptionCont>
          <Typography>{group?.group_description}</Typography>
        </DescriptionCont>
        <HeaderButtonCont>
          <Button
            startIcon="bx bx-plus"
            variant={'solid-thin'}
            text={'Add Members'}
            color={'primary'}
            onClick={() => setShowAddMembersModal(true)}
          />
          <Button startIcon="bx bx-edit-alt" variant={'solid-thin'} text={'Rename Group'} color={'primary'} />
          <Button
            startIcon="bx bx-trash"
            variant={'outlined-thin'}
            text={'Delete Group'}
            color={'failure'}
            disabled={group?.group_protected}
          />
        </HeaderButtonCont>
      </SubHeader>
      <GroupMembers>
        <StatsContainer>
          <Stats>
            <Typography fontSize={10} fontWeight={700} color={'#767676'}>
              Group Members
            </Typography>
            <Typography fontSize={36} fontWeight={900}>
              {group?.group_users.length}
            </Typography>
          </Stats>
        </StatsContainer>
      </GroupMembers>
      <GroupContent>
        <TableCont>
          <Table
            loading={isUsersLoading}
            data={group_users?.length ? group_users : []}
            columns={columns}
            search={{ placeholder: 'Search for a user, by name or email address...' }}
          />
        </TableCont>
        <AccessCont>
          <AccessContent>
            <Typography fontSize={24} fontWeight={900}>
              Device Access
            </Typography>
            <HandhelAccess>
              <FormControlLabel
                control={
                  <Switch
                    disabled={false}
                    sx={{ m: 1 }}
                    onChange={form.handleChange}
                    checked={group_handheld_access}
                    name="group_handheld_access"
                  />
                }
                label={`Handheld Access`}
              />
              <Typography fontSize={12} fontWeight={400}>
                Access to the iOS and Android mobile applications
              </Typography>
            </HandhelAccess>
            <ManagementAccess>
              <FormControlLabel
                control={
                  <Switch
                    disabled={false}
                    sx={{ m: 1 }}
                    onChange={form.handleChange}
                    checked={group_management_access}
                    name="group_management_access"
                  />
                }
                label={`Management Access`}
              />
              <Typography fontSize={12} fontWeight={400}>
                Access to the Mercury WMS portal
              </Typography>
            </ManagementAccess>
          </AccessContent>
          <AccessContent>
            <Typography fontSize={24} fontWeight={900}>
              Module Access
            </Typography>
            {group && (
              <Select
                options={moduleAccess}
                label="Module Collection"
                defaultValue={groupModuleAccessData ? groupModuleAccessData : moduleAccess[0]}
                name={'group_module_access'}
                onChange={(moduleOption: any) => form.setFieldValue('group_module_access', moduleOption.value)}
              />
            )}
          </AccessContent>
        </AccessCont>
      </GroupContent>
      {showAddMembersModal && (
        <BasicModal
          open={showAddMembersModal}
          breadCrumbs={['Groups', group?.group_name || '', 'Add Users']}
          onClose={() => setShowAddMembersModal(false)}
        >
          <AddGroupUsersModal
            users={users ? users : []}
            group={group ? group : undefined}
            close={() => setShowAddMembersModal(false)}
          />
        </BasicModal>
      )}
      <SaveRevertFooter isSaving={isSaving} onSave={form.handleSubmit} onRevert={handleRevert} show={hasChanges} />
    </GroupMainCont>
  ) : (
    <CircularProgress size={25} />
  );
};

export default User;
