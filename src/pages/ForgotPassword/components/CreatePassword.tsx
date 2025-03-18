import { useNavigate } from 'react-router-dom';
import { ForgotCont, Form, Header, ImageCont, Logo, Image } from '../ForgotPassword.styles';
import { InputAdornment, IconButton, Typography, Hidden } from '@mui/material';
import { ASSETS } from '../../../shared/constants/ASSETS';
import { ROUTES } from '../../../shared/constants/ROUTES';
import TextField from '../../../shared/components/TextField/TextField';
import Button from '../../../shared/components/Button/Button';
import { useState } from 'react';
import { PasswordTextFieldWrapper } from '../../../shared/components/TextField/TextField.styles';
import { usersServices } from '../../../shared/services/usersServices';
import { useQueryClient } from 'react-query';
import { IResetPasswordPayload } from '../../../shared/types/user.types';
import { FormikProps } from 'formik';
interface Props {
  form: FormikProps<IResetPasswordPayload>;
  create?: boolean;
}

const { resetPassword } = usersServices();
const CreatePassword: React.FC<Props> = ({ form, create }) => {
  const [showPassword, setShowPassword] = useState(false);

  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync } = resetPassword();
  const { user_email, newPassword, confirmPassword } = form.values;

  const queryClient = useQueryClient();

  const handlePasswordValidation = (isValid: boolean) => {
    setIsPasswordValid(isValid);
  };
  const navigation = useNavigate();

  const next = () => {
    if (create) return navigation(`/activate/success`);
    navigation(ROUTES.FORGOT_PASSWORD_SUCCESS);
  };

  const onSubmit = async () => {
    setIsLoading(true);
    mutateAsync(
      {
        user_id: user_email || '',
        payload: {
          newPassword,
          confirmPassword,
        },
      },

      {
        onSuccess: async () => {
          setIsLoading(false);
          next();
        },
      },
    );
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const buttonValidation = !isPasswordValid || newPassword !== confirmPassword;

  return (
    <ForgotCont>
      <Form>
        {/* <Box display={'flex'} alignItems={'center'} sx={{ cursor: 'pointer' }} onClick={() => navigation(ROUTES.LOGIN)}>
          <i className="bx bx-chevron-left" style={{ fontSize: 30 }} />
          <Typography fontWeight={500}> Back</Typography>
        </Box> */}
        <Header>Create your new password..</Header>
        <Typography>
          Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces or emoji.
        </Typography>
        <PasswordTextFieldWrapper>
          <TextField
            asterisk
            passwordValidCallback={handlePasswordValidation}
            value={newPassword}
            onChange={form.handleChange}
            name="newPassword"
            autoComplete="new-password"
            passwordValidation
            sx={{ width: '100%' }}
            label="Create a new password"
            variant="outlined"
          />
        </PasswordTextFieldWrapper>
        <PasswordTextFieldWrapper>
          <TextField
            asterisk
            value={confirmPassword}
            onChange={form.handleChange}
            name="confirmPassword"
            passwordMatch={newPassword === confirmPassword}
            autoComplete="new-password"
            fullWidth
            passwordValidation
            comparePassword
            sx={{ width: '100%' }}
            label="Create a new password"
            variant="outlined"
          />
        </PasswordTextFieldWrapper>
        <Button
          loading={isLoading}
          disabled={buttonValidation}
          onClick={onSubmit}
          variant="solid"
          text={'CREATE NEW PASSWORD'}
          color="primary"
          style={{ width: '100%' }}
        />
      </Form>
      <Hidden mdDown>
        <ImageCont>
          <Image src={ASSETS.LOGO_BG} />
          <Logo src={ASSETS.INDIGO_LOGO} />
        </ImageCont>
      </Hidden>
    </ForgotCont>
  );
};

export default CreatePassword;
