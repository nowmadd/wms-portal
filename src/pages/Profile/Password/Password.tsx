import { Typography } from '@mui/material';
import React, { useState } from 'react';
import SaveRevertFooter from '../../../shared/components/SaveRevertFooter/SaveRevertFooter';
import { ProfilePasswordCont, PasswordDetailsCont, PasswordDetails, Section } from './Password.styles';
import { authToken } from '../../../shared/utils/authToken';
import { usersServices } from '../../../shared/services/usersServices';
import { useQueryClient } from 'react-query';
import { IUserDetails } from '../../../shared/types/user.types';
import TextField from '../../../shared/components/TextField/TextField';
import { usePasswordForm } from './usePasswordForm';
import { COLORS } from '../../../shared/constants/COLORS';

const { getUser } = authToken();
const { resetPassword } = usersServices();

interface Props {}
const Password: React.FC<Props> = ({}) => {
  const email = getUser()?.email;
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const { mutateAsync } = resetPassword();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (val: any) => {
    setIsSaving(true);
    const { newPassword, confirmPassword } = val;
    await mutateAsync(
      {
        user_id: email || '',
        payload: {
          newPassword,
          confirmPassword,
        },
      },

      {
        onSuccess: async () => {
          setIsSaving(false);
          form.resetForm();
        },
      },
    );

    setIsSaving(false);
  };

  const { form, hasChanges } = usePasswordForm({ onSubmit: handleSave });
  const handleRevert = () => {
    form.resetForm();
  };

  const handlePasswordValidation = (isValid: boolean) => {
    setIsPasswordValid(isValid);
    form.setFieldValue('user_email', email);
  };

  return (
    <ProfilePasswordCont>
      <PasswordDetailsCont container spacing={5}>
        <PasswordDetails item xl={4} md={6} sm={12}>
          <Typography fontSize={24} fontWeight={800}>
            Set New Password
          </Typography>
          <Section>
            <TextField
              passwordValidCallback={handlePasswordValidation}
              value={form.values.newPassword}
              onChange={form.handleChange}
              autoComplete="new-password"
              passwordValidation
              sx={{ width: '100%', backgroundColor: COLORS.WHITE }}
              label="New Password"
              variant="outlined"
              name="newPassword"
            />
            <TextField
              passwordValidCallback={handlePasswordValidation}
              value={form.values.confirmPassword}
              onChange={form.handleChange}
              passwordMatch={form.values.newPassword === form.values.confirmPassword}
              name="confirmPassword"
              autoComplete="new-password"
              fullWidth
              passwordValidation
              comparePassword
              sx={{ width: '100%', backgroundColor: COLORS.WHITE }}
              label="Confirm Password"
              variant="outlined"
            />
          </Section>
        </PasswordDetails>
        <PasswordDetails item xl={4} md={6} sm={12}>
          <Typography fontSize={24} fontWeight={800}>
            Password Policy
          </Typography>

          <Typography
            fontSize={14}
            fontWeight={400}
            style={{
              whiteSpace: 'pre-wrap',
            }}
          >
            {`To comply with Mercury’s password policy, your new password must follow the below requirements: \n\n   • 8-20 characters in length; \n   • Contain both letters and numbers; \n   • Contain at least one special character; \n   • Must not contain spaces or emojis.`}
          </Typography>
        </PasswordDetails>
      </PasswordDetailsCont>
      <SaveRevertFooter
        saveDisabled={!isPasswordValid || form.values.newPassword !== form.values.confirmPassword}
        isSaving={isSaving}
        onSave={form.handleSubmit}
        onRevert={handleRevert}
        show={hasChanges}
      />
    </ProfilePasswordCont>
  );
};

export default Password;
