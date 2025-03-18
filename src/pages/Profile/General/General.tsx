import React, { useEffect, useMemo, useState } from 'react';
import { ls } from '../../../shared/utils/ls';
import Button from '../../../shared/components/Button/Button';
import {
  Firstname,
  FirstnameInput,
  Lastname,
  LastnameInput,
  FieldCont,
  GeneralDetails,
  GeneralDetailsCont,
  InputColumn,
  PillsCont,
  ProfileGeneralCont,
  Section,
  StaticForm,
  StaticValueText,
} from './General.styles';
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import Typography from '@mui/material/Typography/Typography';
import Switch from '../../../shared/components/Switch/Switch';
import { COLORS } from '../../../shared/constants/COLORS';
import TextField from '../../../shared/components/TextField/TextField';
import { Input } from '@mui/material';
import Pill from '../../../shared/components/Pill/Pill';
import { usersServices } from '../../../shared/services/usersServices';
import { IUserDetails, IUpdateProfileDetails } from '../../../shared/types/user.types';
import { authToken } from '../../../shared/utils/authToken';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import { useQueryClient } from 'react-query';
import { useGeneralForm } from './useGeneralForm';
import SaveRevertFooter from '../../../shared/components/SaveRevertFooter/SaveRevertFooter';
import { QUERY } from '../../../shared/constants/QUERYNAMES';

const { getUser } = authToken();
const { getUserDetails, updateUser } = usersServices();

const General = () => {
  const email = getUser()?.email;

  const [user, setUser] = useState<IUserDetails | null>(null);
  const { mutateAsync: updateUserMutate } = updateUser();
  const [isSaving, setIsSaving] = useState(false);
  const { data, isLoading } = getUserDetails(email || '');
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isLoading) {
      return;
    } else {
      setUser(data ? data.data : null);
    }
  }, [data, isLoading]);

  const handleSave = async (val: IUpdateProfileDetails) => {
    setIsSaving(true);

    await updateUserMutate({
      user_id: user?.user_email || '',
      payload: { ...val, user_firstname, user_lastname, user_marketing_optin },
    });
    await queryClient.invalidateQueries(QUERY.USER_DETAILS);
    setIsSaving(false);
  };

  const { form, hasChanges } = useGeneralForm({ onSubmit: handleSave, user: user ? user : undefined });
  const handleRevert = () => {
    form.resetForm();
  };

  const { user_firstname, user_lastname, user_marketing_optin } = form.values;

  return !isLoading ? (
    <ProfileGeneralCont>
      <GeneralDetailsCont>
        <GeneralDetails>
          <Typography fontSize={24} fontWeight={800}>
            General Details
          </Typography>
          <Section>
            <Firstname>
              {' '}
              <Typography
                fontSize={13}
                color={COLORS.GREY}
                fontWeight={600}
                sx={{ marginLeft: '10px', marginBottom: '5px' }}
              >
                First Names
              </Typography>
              <FirstnameInput
                fullWidth
                InputProps={{ sx: { backgroundColor: 'white' } }}
                value={user_firstname}
                placeholder="Not Set"
                name="user_firstname"
                onChange={form.handleChange}
              />
            </Firstname>
            <Lastname>
              {' '}
              <Typography
                fontSize={13}
                color={COLORS.GREY}
                fontWeight={600}
                sx={{ marginLeft: '10px', marginBottom: '5px' }}
              >
                Last Name
              </Typography>
              <LastnameInput
                fullWidth
                InputProps={{ sx: { backgroundColor: 'white' } }}
                value={user_lastname}
                placeholder="Not Set"
                name="user_lastname"
                onChange={form.handleChange}
              />
            </Lastname>
            <StaticForm>
              <Typography marginLeft={1} fontSize={12} fontWeight={800} color={'#767676'}>
                Email Address
              </Typography>
              <StaticValueText>
                <Typography fontSize={16} fontWeight={400}>
                  {/** TO DO: CHANGE TO REAL DATA */}
                  {user?.user_email}
                </Typography>
              </StaticValueText>
            </StaticForm>{' '}
            <StaticForm>
              <Typography marginLeft={1} fontSize={12} fontWeight={800} color={'#767676'}>
                Marketing
              </Typography>
              <FormControlLabel
                style={{ pointerEvents: 'none', padding: '12px 8px' }}
                control={
                  <Switch
                    sx={{ m: 1, pointerEvents: 'auto' }}
                    onChange={undefined}
                    checked={user_marketing_optin || false}
                    name="user_marketing_optin"
                  />
                }
                label={
                  'I would like to receive promotional emails including product news, events and more from Indigo Software.'
                }
                onChange={form.handleChange}
              />
            </StaticForm>
            <StaticForm>
              <Typography marginLeft={1} fontSize={12} fontWeight={800} color={'#767676'}>
                Date Joined
              </Typography>
              <StaticValueText>
                <Typography fontSize={16} fontWeight={400}>
                  {/** TO DO: CHANGE TO REAL DATA */}
                  {`${new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(
                    new Date(Number(user?.user_created || 0)),
                  )}`}
                </Typography>
              </StaticValueText>
            </StaticForm>
          </Section>
        </GeneralDetails>
        <GeneralDetails>
          <Typography fontSize={24} fontWeight={800}>
            Permission & Roles
          </Typography>
          <Section>
            {/* <StaticForm>
              <Typography marginLeft={1} fontSize={12} fontWeight={800} color={'#767676'}>
                Groups
              </Typography>
              <FieldCont>
                <PillsCont>
                  {user?.user_groups?.map((item, index) => (
                    <Pill variant={'square'} color={'primary'} text={item?.group_name || ''} />
                  ))}
                </PillsCont>
              </FieldCont>
            </StaticForm> */}
            <StaticForm>
              <Typography marginLeft={1} fontSize={12} fontWeight={800} color={'#767676'}>
                Role
              </Typography>
              <StaticValueText>
                {/** TO DO: CHANGE TO REAL DATA */}
                <Typography fontSize={16} fontWeight={400}>
                  {user?.user_role}
                </Typography>
              </StaticValueText>
            </StaticForm>
          </Section>
        </GeneralDetails>
      </GeneralDetailsCont>
      <SaveRevertFooter isSaving={isSaving} onSave={form.handleSubmit} onRevert={handleRevert} show={hasChanges} />
    </ProfileGeneralCont>
  ) : (
    <CircularProgress size={25} />
  );
};

export default General;
