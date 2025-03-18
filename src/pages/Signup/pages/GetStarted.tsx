import { InputAdornment, IconButton, Hidden, FormControlLabel, Typography, Box } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
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
import Select from '../../../shared/components/Select/Select';
import industry from '../../../shared/data/industry.json';
import countries from '../../../shared/data/countries.json';
import { FormikProps } from 'formik';
import { ICreateUserPayload } from '../../../shared/types/user.types';
import { ls } from '../../../shared/utils/ls';
import { usersServices } from '../../../shared/services/usersServices';
import LoadingPage from './LoadingPage';
import { AuthContext } from '../../../shared/contexts/AuthContext';

interface Props {
  form: FormikProps<ICreateUserPayload>;
}

const { userSignUp } = usersServices();
const GetStarted: React.FC<Props> = ({ form }) => {
  const { removeLS } = ls();
  const { mutateAsync, isLoading } = userSignUp();
  const { signIn, authenticating } = useContext(AuthContext);
  const {
    account_addr_city,
    account_addr_country,
    account_addr_line1,
    account_addr_line2,
    account_addr_postcode,
    account_company_name,
    account_industry,
  } = form.values;

  const navigation = useNavigate();
  const next = async () => {
    await mutateAsync(
      {
        payload: form.values,
      },
      {
        onSuccess: async (data) => {
          const { user_email, user_password } = form.values;
          signIn({ email: user_email, password: user_password, action: 'generateToken' });
        },
      },
    );

    // navigation(ROUTES.SIGNUP_OTP_VERIFICATION);
  };

  const buttonValidation =
    !account_company_name ||
    !account_industry ||
    !account_addr_line1 ||
    !account_addr_city ||
    !account_addr_country ||
    !account_addr_postcode;

  return isLoading || authenticating ? (
    <LoadingPage />
  ) : (
    <SignupCont>
      <Form>
        <Box
          display={'flex'}
          alignItems={'center'}
          sx={{ cursor: 'pointer' }}
          onClick={() => navigation(ROUTES.SIGNUP)}
        >
          <i className="bx bx-chevron-left" style={{ fontSize: 30 }} />
          <Typography fontWeight={500}> Back</Typography>
        </Box>
        <Header>Let's get started..</Header>
        <FieldWrapper>
          <Typography fontWeight={500}>Business Information</Typography>

          <TextField
            asterisk
            fullWidth
            value={account_company_name}
            onChange={form.handleChange}
            name="account_company_name"
            label="Company Name"
            error={Boolean(form.errors.account_company_name) && form.touched.account_company_name}
            helperText={Boolean(form.touched.account_company_name) && form.errors.account_company_name}
            onBlur={form.handleBlur}
            placeholder="Company Name"
          />
          <Select
            label="Industry"
            required
            options={industry}
            value={industry.find((item) => item.value === account_industry)}
            onChange={(value) => form.setFieldValue('account_industry', value?.value)}
            onError={Boolean(form.touched.account_industry) && Boolean(form.errors.account_industry)}
            helperText={Boolean(form.touched.account_industry) ? form.errors.account_industry : ''}
            onBlur={form.handleBlur}
          />
          <Typography fontWeight={500} sx={{ marginTop: 2 }}>
            Business Address
          </Typography>
          <TextField
            fullWidth
            placeholder="Business Address Line 1"
            value={account_addr_line1}
            onChange={form.handleChange}
            name="account_addr_line1"
            error={Boolean(form.errors.account_addr_line1) && form.touched.account_addr_line1}
            helperText={Boolean(form.touched.account_addr_line1) && form.errors.account_addr_line1}
            onBlur={form.handleBlur}
          />
          <TextField
            fullWidth
            placeholder="Business Address Line 2"
            value={account_addr_line2}
            onChange={form.handleChange}
            name="account_addr_line2"
            error={Boolean(form.errors.account_addr_line2) && form.touched.account_addr_line2}
            helperText={Boolean(form.touched.account_addr_line2) && form.errors.account_addr_line2}
            onBlur={form.handleBlur}
          />
          <TextField
            fullWidth
            placeholder="Town/City"
            value={account_addr_city}
            onChange={form.handleChange}
            name="account_addr_city"
            error={Boolean(form.errors.account_addr_city) && form.touched.account_addr_city}
            helperText={Boolean(form.touched.account_addr_city) && form.errors.account_addr_city}
            onBlur={form.handleBlur}
          />
          <div style={{ marginTop: 5 }}>
            <Select
              required
              options={countries}
              placeholder="Country"
              value={countries.find((item) => item.value === account_addr_country)}
              onChange={(value) => form.setFieldValue('account_addr_country', value?.value)}
              onError={Boolean(form.touched.account_addr_country) && Boolean(form.errors.account_addr_country)}
              helperText={Boolean(form.touched.account_addr_country) ? form.errors.account_addr_country : ''}
              onBlur={form.handleBlur}
            />
          </div>
          <TextField
            fullWidth
            placeholder="Postcode"
            value={account_addr_postcode}
            onChange={form.handleChange}
            name="account_addr_postcode"
            error={Boolean(form.errors.account_addr_postcode) && form.touched.account_addr_postcode}
            helperText={Boolean(form.touched.account_addr_postcode) && form.errors.account_addr_postcode}
            onBlur={form.handleBlur}
          />
        </FieldWrapper>

        <Button
          // loading={authenticating}
          disabled={buttonValidation || isLoading}
          onClick={next}
          variant="solid"
          text={'Continue'}
          color="primary"
          style={{ width: '100%' }}
          loading={isLoading}
        />
      </Form>
      <Hidden mdDown>
        <ImageCont>
          <Image src={ASSETS.GET_STARTED_BG} />
        </ImageCont>
      </Hidden>
    </SignupCont>
  );
};

export default GetStarted;
