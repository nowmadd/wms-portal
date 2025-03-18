import { InputAdornment, IconButton, Hidden, FormControlLabel, Typography, Box, CircularProgress } from '@mui/material';
import { Fragment, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { ASSETS } from '../../../shared/constants/ASSETS';
import {
  Header,
  FieldWrapper,
  ImageCont,
  Logo,
  SignupCont,
  Image,
  Form,
  NameTextFieldWrapper,
  Terms,
} from '../Signup.styles';
import TextField from '../../../shared/components/TextField/TextField';
import Button from '../../../shared/components/Button/Button';
import Switch from '../../../shared/components/Switch/Switch';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../shared/constants/ROUTES';
import { FormikProps } from 'formik';
import { ICreateUserPayload } from '../../../shared/types/user.types';
import { usersServices } from '../../../shared/services/usersServices';
import { accountsServices } from '../../../shared/services/accountsServices';
import { LINKS } from '../../../shared/constants/LINKS';
import { useDebounce } from 'use-debounce';
import { COLORS } from '../../../shared/constants/COLORS';
interface Props {
  form: FormikProps<ICreateUserPayload>;
}

const { requestOTP, checkUserExistence } = usersServices();

const Personal: React.FC<Props> = ({ form }) => {
  const [debouncedEmail] = useDebounce(form.values.user_email, 500);
  const { data: userExistsData, isLoading: isChecking } = checkUserExistence(
    debouncedEmail,
    !Boolean(form.errors.user_email),
  );
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const { user_firstname, user_lastname, user_email, user_password } = form.values;
  const { mutateAsync, isLoading: isRequesting } = requestOTP();

  const userExists = useMemo(() => Boolean(userExistsData), [userExistsData]);

  const navigation = useNavigate();
  const next = () => {
    mutateAsync(
      { payload: { user_email: user_email.toLowerCase(), user_type: 'new' } },
      {
        onSuccess: () => navigation(ROUTES.SIGNUP_OTP_VERIFICATION),
      },
    );
  };

  const handlePasswordValidation = (isValid: boolean) => {
    setIsPasswordValid(isValid);
  };

  const buttonValidation = !isPasswordValid || !user_firstname || !user_lastname || !user_email;

  // useLayoutEffect(() => {
  //   // setLS('signup_form', JSON.stringify({ ...form.values, user_password: '' }));
  //   form.setFieldValue('user_password', '');
  // }, []);

  const handleTermsClick = () => {
    window.open(LINKS.TERMS, '_blank');
  };

  const handlePrivacyClick = () => {
    window.open(LINKS.PRIVACY, '_blank');
  };

  return (
    <SignupCont>
      <Form>
        <Box display={'flex'} alignItems={'center'} sx={{ cursor: 'pointer' }} onClick={() => navigation(ROUTES.LOGIN)}>
          <i className="bx bx-chevron-left" style={{ fontSize: 30 }} />
          <Typography fontWeight={500}> Back</Typography>
        </Box>
        <Header>Tell us about yourself..</Header>
        <FieldWrapper>
          <NameTextFieldWrapper>
            <TextField
              asterisk
              fullWidth
              value={user_firstname}
              onChange={form.handleChange}
              name="user_firstname"
              label="First Name"
              error={Boolean(form.errors.user_firstname) && form.touched.user_firstname}
              helperText={Boolean(form.touched.user_firstname) && form.errors.user_firstname}
              onBlur={form.handleBlur}
            />
            <TextField
              asterisk
              fullWidth
              value={user_lastname}
              onChange={form.handleChange}
              name="user_lastname"
              label="Last Name"
              error={Boolean(form.errors.user_lastname) && form.touched.user_lastname}
              helperText={Boolean(form.touched.user_lastname) && form.errors.user_lastname}
              onBlur={form.handleBlur}
            />
          </NameTextFieldWrapper>
          <TextField
            asterisk
            fullWidth
            value={user_email}
            onChange={form.handleChange}
            name="user_email"
            error={(Boolean(form.errors.user_email) && form.touched.user_email) || userExists}
            helperText={
              (Boolean(form.touched.user_email) && form.errors.user_email) || (userExists && 'Email already exists')
            }
            onBlur={(e) => {
              // setEmail(e.target.value);
              form.handleBlur(e);
            }}
            label="Work Email"
            autoComplete="off"
            //end adornment for checking email existence
            InputProps={{
              endAdornment:
                !form.values.user_email || form.errors.user_email ? (
                  <Fragment />
                ) : (
                  <InputAdornment position="end">
                    {isChecking ? (
                      <CircularProgress size={20} />
                    ) : !userExists ? (
                      <i className="bx bx-check" style={{ fontSize: 25, color: COLORS.PRIMARY }} />
                    ) : (
                      <i className="bx bx-x" style={{ fontSize: 25, color: COLORS.FAILURE }} />
                    )}
                  </InputAdornment>
                ),
            }}
          />
          <TextField
            asterisk
            passwordValidCallback={handlePasswordValidation}
            value={user_password}
            onChange={form.handleChange}
            autoComplete="new-password"
            passwordValidation
            sx={{ width: '100%' }}
            name="user_password"
            label="Create a new password"
            variant="outlined"
          />
        </FieldWrapper>

        <FormControlLabel
          style={{ pointerEvents: 'none' }}
          control={
            <Switch
              // disabled={isCreating}
              sx={{ m: 1, pointerEvents: 'auto' }}
              // onChange={() => setWarehouseEnabled(!warehouseEnabled)}
              checked={form.values.user_marketing_optin}
              onChange={(e) => form.setFieldValue('user_marketing_optin', e.target.checked)}
              name="user_marketing_optin"
            />
          }
          label={
            'Yes! I would like to receive promotional emails including product news, events and more from Indigo Software.'
          }
        />

        <Typography>
          By continuing, you agree to the <Terms onClick={handleTermsClick}>Indigo Cloud Terms</Terms> of Service and{' '}
          <Terms onClick={handlePrivacyClick}>Privacy Policy</Terms>.
        </Typography>

        <Button
          loading={isRequesting}
          disabled={buttonValidation || isRequesting || isChecking || userExists || Boolean(form.errors.user_email)}
          onClick={next}
          variant="solid"
          text={'Continue'}
          color="primary"
          style={{ width: '100%' }}
        />
      </Form>
      <Hidden mdDown>
        <ImageCont>
          <Image src={ASSETS.SIGNUP_BG} />
        </ImageCont>
      </Hidden>
    </SignupCont>
  );
};

export default Personal;
