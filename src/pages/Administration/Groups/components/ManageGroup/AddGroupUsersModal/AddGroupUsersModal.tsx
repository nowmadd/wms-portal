import React, { useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import TextField from '../../../../../../shared/components/TextField/TextField';
import { ButtonCont, CreateGroupCont, FormCont, ModalHeader } from './AddGroupUsersModal.styles';
import Select from '../../../../../../shared/components/Select/Select';
import Button from '../../../../../../shared/components/Button/Button';
import { groupsServices } from '../../../../../../shared/services/groupsServices';
import { ls } from '../../../../../../shared/utils/ls';
import { IUserDetails } from '../../../../../../shared/types/user.types';
import Box from '@mui/material/Box/Box';
import { IGroupDetails, IUpdateGroupDetails } from '../../../../../../shared/types/groups.types';
import Alert from '@mui/material/Alert/Alert';
import { QUERY } from '../../../../../../shared/constants/QUERYNAMES';

interface Props {
  close: VoidFunction;
  users: IUserDetails[];
  group: IGroupDetails | undefined;
}

const { addUsersToGroup } = groupsServices();

const AddUsersModal: React.FC<Props> = ({ close, users, group }) => {
  const { mutateAsync: addUsersToGroupMutate } = addUsersToGroup();
  const [isAdding, setIsAdding] = useState(false);
  const [groupUsers, setGroupUsers] = useState([]);

  const queryClient = useQueryClient();

  const handleSave = async () => {
    setIsAdding(true);
    try {
      await addUsersToGroupMutate(
        { group_id: group?.group_id || '', payload: { group_users: groupUsers } },
        {
          async onSuccess(data, variables, context) {
            await queryClient.invalidateQueries(QUERY.GROUP_LIST, { refetchInactive: true });
            await queryClient.invalidateQueries(QUERY.GROUP_DETAILS);
            setIsAdding(false);
            close();
          },
          onError(error, variables, context) {},
        },
      );
    } catch {
      console.log('error');
    }
  };

  const handleGroupChange = (e: any) => {
    const user = e?.map((user: { value: string; label: string }) => user.value);
    setGroupUsers(user);
  };

  const existingUsers = group?.group_users.map((user: any) => user.user_email);

  return (
    <CreateGroupCont>
      <FormCont>
        <Box style={{ maxWidth: 550 }}>
          <Select
            label="Users"
            required
            isMulti
            isUsersList
            removeFromSelection={existingUsers}
            isClearable={true}
            value={groupUsers?.map((user) => ({ value: user, label: user }))}
            onChange={handleGroupChange}
            isDisabled={isAdding}
          />
        </Box>
      </FormCont>

      <ButtonCont>
        <Button
          type="button"
          loading={isAdding}
          variant={'solid'}
          text={'Add Users'}
          color={'success'}
          onClick={handleSave}
          disabled={groupUsers?.length === 0 || isAdding}
        />
      </ButtonCont>
    </CreateGroupCont>
  );
};

export default AddUsersModal;
