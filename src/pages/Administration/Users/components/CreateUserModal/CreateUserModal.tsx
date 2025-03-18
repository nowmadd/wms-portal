import React, { KeyboardEventHandler, useState } from 'react';
import { ButtonCont, CreateUserCont, FormCont, UserNotesText } from './CreateUserModal.styles';
// import Select from 'react-select';
import { InputActionMeta } from 'react-select';
import Select from '../../../../../shared/components/Select/Select';
import SelectCreatable from '../../../../../shared/components/Select/SelectCreatable';
import { COLORS } from '../../../../../shared/constants/COLORS';
import { Alert, Box, Typography } from '@mui/material';
import Button from '../../../../../shared/components/Button/Button';
import { usersServices } from '../../../../../shared/services/usersServices';
import colors from '../../../../../shared/utils/colors';
import { useQueryClient } from 'react-query';
import { QUERY } from '../../../../../shared/constants/QUERYNAMES';
import ErrorMessagePanel from '../../../../../shared/components/ErrorMessagePanel/ErrorMessagePanel';
import { useCheckUser } from './useCheckUser';
import UserRoleDescription from '../../../../../shared/components/UserRoleDescription/UserRoleDescription';

interface Props {
  close: VoidFunction;
}
interface Option {
  readonly label: string;
  readonly value: string;
}

const components = {
  DropdownIndicator: null,
};

const createOption = (label: string) => ({
  label,
  value: label,
});

const { createUser, sendInviteToUser } = usersServices();
const CreateUserModal: React.FC<Props> = ({ close }) => {
  const [emailInputValue, setEmailInputValue] = useState('');
  const [emails, setEmails] = useState<readonly Option[]>([]);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [group, setGroup] = useState<Option[]>();
  const [role, setRole] = useState('Standard');
  const [userNotes, setUserNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync: createUserMutateAsync } = createUser();
  const { mutateAsync: sendInviteToUserAsync } = sendInviteToUser();
  const [userExist, setUserExist] = useState<string[]>([]);

  const [invitesToSend, setInvitesToSend] = useState([]);
  const queryClient = useQueryClient();

  const { addEmail, validEmails, invalidEmails, emailsToCheck, setinvalidEmails } = useCheckUser();

  const roleAccess = [
    { value: 'Standard', label: 'Standard' },
    { value: 'Supervisor', label: 'Supervisor' },
    { value: 'Administrator', label: 'Administrator' },
    { value: 'Owner', label: 'Owner' },
  ];

  const onInputChange = (inputValue: string, { action, prevInputValue }: InputActionMeta) => {
    if (action === 'input-change') setEmailInputValue(inputValue);
    if (action === 'input-blur') {
      if (checkValidEmail(prevInputValue)) {
        setEmails((prev) => [...prev, createOption(prevInputValue)]);
        addEmail(prevInputValue);
        setEmailInputValue('');
      }
    }
    return prevInputValue;
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    let invitePayload: {}[] = [];
    emails.map(async (email) => {
      const userColor = await colors.createRandomSafeColorHSL(3.1, 4.5, '#FFFFFF');
      const user = {
        userEmail: email.value,
        userColour: colors.hslToHex(userColor.h, userColor.s, userColor.l),
        // userGroups: group ? group.map((g) => ({ group_id: g.value, group_name: g.label })) : [],
        userRole: role,
        userNotes: userNotes,
      };
      invitePayload.push(user);
    });
    const userArray: string[] = [];
    await sendInviteToUserAsync(
      {
        payload: {
          invitesToSend: invitePayload,
        },
      },
      {
        onSuccess(data, variables, context) {
          data.data.map((d) => {
            if (d.message === 'User already exists.') {
              userArray.push(d.userId);
            }
          });
        },
        onSettled(data, variables, context) {
          console.log(userArray);
          queryClient.invalidateQueries(QUERY.USER_LIST);
          if (userArray.length > 0) return setUserExist(userArray);
          close();
        },
        // onSuccess() {
        //   queryClient.invalidateQueries(QUERY.USER_LIST);
        //   close();
        // },
      },
    );

    setIsLoading(false);
  };

  const resetErrorMessage = () => {
    setInvalidEmail(false);
    setErrorMessage('');
  };

  const handleGroupChange = (e: any) => {
    setGroup(e);
  };

  const handleRoleChange = (e: any) => {
    setRole(e);
  };

  const checkValidEmail = (email: string) => {
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const checkValidEmail: boolean = expression.test(email);
    let existingEmail: boolean = false;
    emails.map((d) => {
      if (d.label == emailInputValue) {
        existingEmail = true;
      } else {
        return;
      }
    });
    return checkValidEmail && !existingEmail;
  };

  const handleEmailKeyDown: KeyboardEventHandler = (event) => {
    if (!emailInputValue) {
      return;
    } else {
      if (invalidEmail) {
        if (checkValidEmail(emailInputValue)) {
          resetErrorMessage();
        }
      }
    }

    switch (event.key) {
      case 'Enter':
      case 'Tab':
      case ',':
        addEmail(emailInputValue);
        if (checkValidEmail(emailInputValue)) {
          resetErrorMessage();
          setEmails((prev) => [...prev, createOption(emailInputValue)]);
          setEmailInputValue('');
          event.preventDefault();
        } else {
          setErrorMessage('You have entered an invalid email address.');
          setInvalidEmail(true);
          event.preventDefault();
        }
        break;
      case 'Backspace':
        if (emailInputValue.length <= 1) {
          resetErrorMessage();
        }
        break;
    }
  };
  console.log(emails);

  return (
    <CreateUserCont>
      <FormCont>
        <Typography fontSize={13} fontWeight={600} color={COLORS.TEXT_GRAY} sx={{ margin: '0 0 5px 10px' }}>
          Email Addresses
        </Typography>
        <SelectCreatable
          isLoading={isLoading}
          isDisabled={isLoading}
          components={components}
          inputValue={emailInputValue}
          error={invalidEmail}
          isClearable={true}
          isMulti={true}
          onKeyDown={handleEmailKeyDown}
          onChange={(newValue) => {
            console.log('new value', newValue);

            setEmails(newValue);
          }}
          onInputChange={onInputChange}
          value={emails}
          menuIsOpen={false}
          placeholder="Press enter after each email address..."
          checkUsers
          invalidEmails={invalidEmails}
          emailsToCheck={emailsToCheck}
          removeInvalidEmail={(email: string) => {
            console.log('removing email', email);
            setinvalidEmails((prev) => prev.filter((e) => e !== email));
          }}
        />
        <Typography fontSize={10} fontWeight={400} color={COLORS.TEXT_GRAY} sx={{ margin: '5px 0 0 10px' }}>
          Enter email addresses, separated by a comma. We can't send invitations to distribution lists.
        </Typography>

        <Typography fontSize={13} fontWeight={600} color={COLORS.TEXT_GRAY} sx={{ margin: '20px 0 5px 10px' }}>
          Role Access
        </Typography>

        <Select
          options={roleAccess}
          defaultValue={roleAccess[0]}
          value={{ value: role, label: role }}
          name={'user_role'}
          onChange={(moduleOption: any) => handleRoleChange(moduleOption.value)}
        />
        {/* <Select
          // options={groupsOptions}
          isMulti
          isGroupsList
          isClearable={true}
          value={group}
          onChange={(e) => handleGroupChange(e)}
          isDisabled={isLoading}
        /> */}
        <Typography fontSize={10} fontWeight={400} color={COLORS.TEXT_GRAY} sx={{ margin: '5px 0 0 10px' }}>
          Roles give users access to specific modules or areas.
        </Typography>

        {/* <Typography fontSize={13} fontWeight={600} color={COLORS.TEXT_GRAY} sx={{ margin: '20px 0 5px 10px' }}>
          Notes
        </Typography>
        <UserNotesText
          disabled={isLoading}
          InputProps={{ multiline: true, rows: 4, sx: { borderRadius: '6px', backgroundColor: 'white' } }}
          value={userNotes}
          onChange={(e) => setUserNotes(e.target.value)}
        /> */}
        {errorMessage && (
          <Alert sx={{ marginTop: 2 }} severity="error">
            {errorMessage}
          </Alert>
        )}
        <Box sx={{ marginTop: 2 }}>
          {userExist.length > 0 && (
            <ErrorMessagePanel
              errorMessage={`Oops, the following user${
                userExist.length > 1 ? 's' : ''
              } already exists: \n ${userExist.join('\n ')}`}
            />
          )}
        </Box>
        <Typography fontSize={16}>This will grant the following permissions for the users:</Typography>
        <UserRoleDescription role={role} />
      </FormCont>

      <ButtonCont>
        <Button
          loading={isLoading}
          variant={'solid'}
          text={'Invite Users'}
          color={'success'}
          onClick={handleSubmit}
          disabled={emails.length == 0 || isLoading || Boolean(invalidEmails.length || emailsToCheck.length)}
        />
      </ButtonCont>
    </CreateUserCont>
  );
};

export default CreateUserModal;
