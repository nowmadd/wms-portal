import React, { useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import TextField from '../../../../../shared/components/TextField/TextField';
import { ButtonCont, CreateGroupCont, FormCont, ModalHeader } from './CreateGroupModal.styles';
import Select from '../../../../../shared/components/Select/Select';
import Button from '../../../../../shared/components/Button/Button';
import { groupsServices } from '../../../../../shared/services/groupsServices';
import { ls } from '../../../../../shared/utils/ls';
import { QUERY } from '../../../../../shared/constants/QUERYNAMES';

interface Props {
  close: VoidFunction;
}
const { createGroup } = groupsServices();

const CreateGroupModal: React.FC<Props> = ({ close }) => {
  const { getLS } = ls();
  const { account_id: ACCOUNT_ID } = JSON.parse(getLS('user'));
  const { mutateAsync: createGroupMutate } = createGroup();
  const [groupDescription, setGroupDescription] = useState('');
  const [groupName, setGroupName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const queryClient = useQueryClient();

  const handleCreate = async () => {
    setIsCreating(true);
    await createGroupMutate(
      {
        payload: {
          group_account: ACCOUNT_ID,
          group_name: groupName,
          group_users: [],
          group_handheld_access: false,
          group_management_access: false,
          group_module_access: 'Standard',
          group_description: groupDescription,
        },
      },
      {
        onSuccess: async () => {
          close();
        },
      },
    );
    await queryClient.invalidateQueries(QUERY.GROUP_LIST);
    setIsCreating(false);
  };

  return (
    <CreateGroupCont>
      <FormCont>
        <TextField
          onChange={(e) => setGroupName(e.target.value)}
          value={groupName}
          InputProps={{ sx: { borderRadius: '6px', backgroundColor: 'white' } }}
          label="Group Name"
        />
        <TextField
          onChange={(e) => setGroupDescription(e.target.value)}
          value={groupDescription}
          InputProps={{ sx: { borderRadius: '6px', backgroundColor: 'white' } }}
          label="Group Description"
        />
      </FormCont>

      <ButtonCont>
        <Button loading={isCreating} variant={'solid'} text={'Create Group'} color={'success'} onClick={handleCreate} />
      </ButtonCont>
    </CreateGroupCont>
  );
};

export default CreateGroupModal;
