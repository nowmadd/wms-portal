import { useEffect, useState } from 'react';
import { COLORS } from '../../../../shared/constants/COLORS';
import {
  UserMainCont,
  Header,
  HeaderButtonCont,
  Column,
  Row,
  GroupMembership,
  UserPanel,
  ProfileCard,
  Avatar,
  ProfileDetails,
  Notes,
  NotesInput,
  EmailContainer,
} from './User.styles';
import { useSearchParams } from 'react-router-dom';
import { IUpdateUserDetails, IUserDetails } from '../../../../shared/types/user.types';
import Typography from '@mui/material/Typography/Typography';
import Breadcrumbs from '../../../../shared/components/Breadcrumbs/Breadcrumbs';
import Button from '../../../../shared/components/Button/Button';
import Switch from '../../../../shared/components/Switch/Switch';
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import InfoPanel from '../../../../shared/components/InfoPanel/InfoPanel';
import BasicModal from '../../../../shared/components/Modals/BasicModal/BasicModal';
import DeleteUserModal from '../components/DeleteUserModal/DeleteUserModal';
import { usersServices } from '../../../../shared/services/usersServices';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import { useQueryClient } from 'react-query';
import { useUserForm } from './useUserForm';
import SaveRevertFooter from '../../../../shared/components/SaveRevertFooter/SaveRevertFooter';
import Select from '../../../../shared/components/Select/Select';
import { QUERY } from '../../../../shared/constants/QUERYNAMES';
import { ls } from '../../../../shared/utils/ls';
import { Box } from '@mui/material';
import UserRoleDescription from '../../../../shared/components/UserRoleDescription/UserRoleDescription';
import { ROUTES } from '../../../../shared/constants/ROUTES';

const { getUserDetails, updateUser, deleteUser, updateUserStatus } = usersServices();
const User = () => {
  const curPath = window.location.pathname;
  const [searchParams, setSearchParams] = useSearchParams();
  const searchId = searchParams.get('id') || '';
  const { data, isLoading } = getUserDetails(searchId);
  const [user, setUser] = useState<IUserDetails | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { mutateAsync: updateUserMutate } = updateUser();
  const { mutateAsync: updateUserStatusMutate } = updateUserStatus();
  const { mutateAsync: deleteUserMutate } = deleteUser();
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();
  const { getLS } = ls();
  const localUser = JSON.parse(getLS('user') || '{}');
  const myEmail = localUser ? localUser.email : '';
  const myRole = localUser ? localUser.role : '';
  const [roleAccess, setRoleAccess] = useState([
    { value: 'Standard', label: 'Standard', isDisabled: false },
    { value: 'Supervisor', label: 'Supervisor', isDisabled: false },
    { value: 'Administrator', label: 'Administrator', isDisabled: false },
    { value: 'Owner', label: 'Owner', isDisabled: false },
  ]);

  useEffect(() => {
    if (isLoading) {
      return;
    } else {
      setUser(data ? data.data : null);
      roleChangeRestrictions();
    }
  }, [data, isLoading]);

  const handleSave = async (val: IUpdateUserDetails) => {
    setIsSaving(true);

    // const currentGroups = user?.user_groups?.map((group) => group.group_id);
    // const newGroups = val.user_groups?.map((group) => group.group_id);

    // //compare current groups with new groups create an object for added and removed groups
    // const user_groups = {
    //   add: newGroups?.filter((group) => !currentGroups?.includes(group)) || [],
    //   remove: currentGroups?.filter((group) => !newGroups?.includes(group)) || [],
    // };

    await updateUserMutate({
      user_id: user?.user_email || '',
      payload: {
        ...val,
        // user_groups
      },
    });
    if (user?.user_enabled !== val.user_enabled) {
      await updateUserStatusMutate({
        payload: { user_enabled: Boolean(val.user_enabled), user_id: user?.user_email || '' },
      });
    }
    await queryClient.invalidateQueries(QUERY.USER_DETAILS);
    await queryClient.invalidateQueries(QUERY.USER_LIST, { refetchInactive: true });
    setIsSaving(false);
  };

  const { form, hasChanges } = useUserForm({ onSubmit: handleSave, user: user ? user : undefined });
  const handleRevert = () => {
    form.resetForm();
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteUserMutate({
      user_id: searchId,
    });
    await queryClient.invalidateQueries(QUERY.USER_DETAILS);
    await queryClient.invalidateQueries(QUERY.USER_LIST, { refetchInactive: true });
    setIsDeleting(false);
    //navigate back to users list
    window.location.href = `${ROUTES.ADMINISTRATION}/users`;
  };

  const { user_enabled, user_role, user_deleted, user_notes } = form.values;

  // const handleGroupChange = (e: any) => {
  //   const groups = e?.map((group: { value: string; label: string }) => ({
  //     group_id: group.value,
  //     group_name: group.label,
  //   }));
  //   form.setFieldValue('user_groups', groups);
  // };

  const handleRoleChange = (e: any) => {
    e?.map((role: { value: string; label: string }) => form.setFieldValue('user_groups', role.value));
  };

  const roleModuleAccessData = {
    value: myRole,
    label: myRole,
  };

  const roleRestrictions = () => {
    // If the user role of the user being viewed is higher than my own, then I cannot disable or delete them (the toggle and button will appear disabled).
    // The role hierarchy is
    // Owner (can disable and delete anyone)
    // Administrator (can disable and delete 2, 3 & 4)
    // Supervisor (can disable and delete  no-one - has no access to admin)
    // Standard (can disable and delete  no-one - has no access to admin)

    if (myRole === 'Owner') {
      if (user?.user_role === 'Owner') return true;
      return false;
    } else if (myRole === 'Administrator') {
      if (user?.user_role === 'Owner' || user?.user_role === 'Administrator') {
        return true;
      }
    } else if (myRole === 'Supervisor' || myRole === 'Standard') {
      return true;
    }
  };

  console.log(
    'role restriction : ',
    roleRestrictions(),
    'it`s me:',
    user?.user_email === myEmail,
    'user deleted:',
    user?.user_deleted,
    'user enabled:',
    user?.user_enabled,
    isDeleting,
    'user is not active:',
    !user?.user_active,
  );

  const roleChangeRestrictions = () => {
    // If the possible role of my own user is higher than my own, then I cannot change my role to be higher (only options for lower roles will be possible).
    // The role hierarchy is
    // Owner (can disable and delete anyone)
    // Administrator (can disable and delete 2, 3 & 4)
    // Supervisor (can disable and delete  no-one - has no access to admin)
    // Standard (can disable and delete  no-one - has no access to admin)

    if (myRole === 'Administrator') {
      setRoleAccess([
        { value: 'Standard', label: 'Standard', isDisabled: false },
        { value: 'Supervisor', label: 'Supervisor', isDisabled: false },
        { value: 'Administrator', label: 'Administrator', isDisabled: false },
        { value: 'Owner', label: 'Owner', isDisabled: true },
      ]);
    } else if (myRole === 'Supervisor') {
      setRoleAccess([
        { value: 'Standard', label: 'Standard', isDisabled: false },
        { value: 'Supervisor', label: 'Supervisor', isDisabled: false },
        { value: 'Administrator', label: 'Administrator', isDisabled: true },
        { value: 'Owner', label: 'Owner', isDisabled: true },
      ]);
      return true;
    } else if (myRole === 'Standard') {
      setRoleAccess([
        { value: 'Standard', label: 'Standard', isDisabled: false },
        { value: 'Supervisor', label: 'Supervisor', isDisabled: true },
        { value: 'Administrator', label: 'Administrator', isDisabled: true },
        { value: 'Owner', label: 'Owner', isDisabled: true },
      ]);
    }
  };

  const isAdminViewingOwner = myRole === 'Administrator' && user?.user_role === 'Owner';

  return !isLoading ? (
    <UserMainCont>
      <Header>
        <Typography fontSize={36} fontWeight={900}>
          {user?.user_active ? user.user_firstname + ' ' + user.user_lastname : user?.user_email}
        </Typography>
        <Breadcrumbs
          page={user?.user_active ? user.user_firstname + ' ' + user.user_lastname : user?.user_email || ''}
        />
        <HeaderButtonCont>
          <Button
            startIcon="bx bx-trash"
            variant={'outlined-thin'}
            text={user_deleted ? 'Deletion Requested' : 'Delete User'}
            color={'failure'}
            disabled={
              roleRestrictions() ||
              user?.user_email === myEmail ||
              user?.user_deleted ||
              user?.user_enabled ||
              isDeleting
            }
            onClick={() => setShowDeleteModal(true)}
          />
        </HeaderButtonCont>
      </Header>
      <Row>
        <Column>
          <FormControlLabel
            style={{ pointerEvents: 'none' }}
            control={
              <Switch
                disabled={
                  roleRestrictions() || user_deleted || user?.user_email === myEmail || user?.user_role === myRole
                }
                sx={{ m: 1, pointerEvents: 'auto' }}
                onChange={form.handleChange}
                checked={user_enabled}
                name="user_enabled"
              />
            }
            label={`User is ${user_enabled ? 'enabled' : 'disabled'}`}
          />

          <GroupMembership>
            <Select
              value={roleAccess.find((role) => role.value === user_role)}
              options={roleAccess}
              label="Role Access"
              defaultValue={roleModuleAccessData}
              name={'user_role'}
              isDisabled={
                roleRestrictions() ||
                user_deleted ||
                user?.user_email === myEmail ||
                user?.user_role === myRole ||
                isAdminViewingOwner
              }
              onChange={(moduleOption: any) => form.setFieldValue('user_role', moduleOption.value)}
            />
            <Typography fontSize={10} fontWeight={500} color={COLORS.GREY} sx={{ marginLeft: '10px' }}>
              Roles give users access to specific modules or areas
            </Typography>
          </GroupMembership>
          <Box>
            <Typography fontSize={22} fontWeight={700}>
              Device Access
            </Typography>
            <UserRoleDescription role={form.values.user_role || 'Standard'} />
          </Box>
        </Column>
        <Column>
          <UserPanel>
            <ProfileCard sx={{ borderRadius: 4, backgroundColor: COLORS.PRIMARY_DARK }}>
              <Avatar>
                <i
                  className="bx bxs-user bx-border-circle"
                  style={{ fontSize: 80, borderColor: 'white', backgroundColor: user?.user_color }}
                />
              </Avatar>
              <ProfileDetails>
                <Typography fontSize={36} fontWeight={600}>
                  {user?.user_active ? user.user_firstname + ' ' + user.user_lastname : 'Unknown Name'}
                </Typography>
                <EmailContainer>
                  <i className={'bx bx-envelope'}></i>
                  <Typography fontSize={13} fontWeight={700}>
                    {user?.user_email}
                  </Typography>
                </EmailContainer>
              </ProfileDetails>
            </ProfileCard>
            <Notes>
              <Typography
                fontSize={13}
                color={COLORS.GREY}
                fontWeight={600}
                sx={{ marginLeft: '10px', marginBottom: '5px' }}
              >
                Notes
              </Typography>
              <NotesInput
                disabled={user_deleted || isAdminViewingOwner}
                fullWidth
                multiline
                rows={4}
                InputProps={{ sx: { backgroundColor: 'white' } }}
                value={user_notes}
                name="user_notes"
                onChange={form.handleChange}
              />
            </Notes>
          </UserPanel>
        </Column>
      </Row>
      <SaveRevertFooter isSaving={isSaving} onSave={form.handleSubmit} onRevert={handleRevert} show={hasChanges} />

      {showDeleteModal && (
        <BasicModal open={showDeleteModal}>
          <DeleteUserModal
            isdeleting={isDeleting}
            deleteUser={handleDelete}
            user={user?.user_firstname + ' ' + user?.user_lastname}
            close={() => setShowDeleteModal(false)}
          />
        </BasicModal>
      )}
    </UserMainCont>
  ) : (
    <CircularProgress size={25} />
  );
};

export default User;
