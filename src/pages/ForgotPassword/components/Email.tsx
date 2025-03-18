import { useLocation, useNavigate } from 'react-router-dom';
import { FieldWrapper, ForgotCont, Form, Header, ImageCont, Logo, Image } from '../ForgotPassword.styles';
import { Typography, Hidden, Box } from '@mui/material';
import { ASSETS } from '../../../shared/constants/ASSETS';
import { ROUTES } from '../../../shared/constants/ROUTES';
import TextField from '../../../shared/components/TextField/TextField';
import Button from '../../../shared/components/Button/Button';
import { useEffect, useState } from 'react';
import { FormikProps } from 'formik';
import { IResetPasswordPayload } from '../../../shared/types/user.types';
import { usersServices } from '../../../shared/services/usersServices';

interface Props {
  form: FormikProps<IResetPasswordPayload>;
  email?: string;
}

const { requestOTP } = usersServices();
const Email: React.FC<Props> = ({ form, email }) => {
  const navigation = useNavigate();
  const { mutateAsync, isLoading: isRequesting } = requestOTP();
  const { user_email } = form.values;

  useEffect(() => {
    form.setFieldValue('user_email', email);
  }, []);

  const next = () => {
    mutateAsync(
      { payload: { user_email: user_email || '', user_type: 'new' } },
      {
        onSuccess: () => navigation(ROUTES.FORGOT_PASSWORD_CODE),
      },
    );
  };

  return (
    <ForgotCont>
      <Form>
        <Box display={'flex'} alignItems={'center'} sx={{ cursor: 'pointer' }} onClick={() => navigation(ROUTES.LOGIN)}>
          <i className="bx bx-chevron-left" style={{ fontSize: 30 }} />
          <Typography fontWeight={500}> Back</Typography>
        </Box>
        <Header>Enter your work email address.. </Header>
        <FieldWrapper>
          <TextField
            asterisk
            fullWidth
            value={user_email}
            onChange={form.handleChange}
            name="user_email"
            label="Work Email"
            autoComplete="off"
          />
        </FieldWrapper>

        <Button
          loading={isRequesting}
          disabled={user_email === '' || isRequesting}
          onClick={next}
          variant="solid"
          text={'Send Code to Email'}
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

export default Email;
