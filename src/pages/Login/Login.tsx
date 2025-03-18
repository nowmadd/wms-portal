import { Divider, Hidden, Icon, IconButton, InputAdornment, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../shared/contexts/AuthContext';
import { Form, LoginMainCont, Header, FieldWrapper, Image, ImageCont, Logo } from './Login.styles';
import Button from '../../shared/components/Button/Button';
import { IUserSignInPayload } from '../../shared/types/user.types';
import TextField from '../../shared/components/TextField/TextField';
import { ASSETS } from '../../shared/constants/ASSETS';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../shared/constants/ROUTES';
import useCapsLockStatus from '../../shared/components/TextField/useCapsLockStatus';
import { getBrowserName } from '../../shared/utils/helpers';

const Login = () => {
  const { signIn, authenticating } = useContext(AuthContext);
  const [userDetails, setuserDetails] = useState<IUserSignInPayload>({
    email: '',
    password: '',
    action: 'generateToken',
  });
  const [showPassword, setShowPassword] = useState(false);
  const isCapsLockOn = useCapsLockStatus();
  const navigate = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setuserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignIn = () => {
    signIn(userDetails);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSignup = () => {
    navigate(ROUTES.SIGNUP_ROOT);
  };

  return (
    <LoginMainCont>
      <Form>
        <Header>Welcome back to Mercury WMS</Header>
        <FieldWrapper>
          <TextField
            asterisk
            fullWidth
            value={userDetails.email}
            onChange={handleChange}
            name="email"
            label="Work Email"
          />
          <TextField
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {isCapsLockOn && getBrowserName() !== 'Safari' ? (
                    <Icon>
                      <img src={ASSETS.CAPSLOCK} style={{ width: 15, height: 15 }} />
                    </Icon>
                  ) : (
                    <React.Fragment />
                  )}
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <i className="bx bx-hide" /> : <i className="bx bx-show" />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            asterisk
            value={userDetails.password}
            sx={{ width: '100%', backgroundColor: 'white' }}
            onChange={handleChange}
            name="password"
            label="Password"
            variant="outlined"
          />
          <Typography
            sx={{
              textAlign: 'right',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500,
              textDecoration: 'underline',
              width: '100%',
            }}
            onClick={() => navigate(ROUTES.FORGOT_PASSWORD_ROOT, { state: { email: userDetails.email } })}
          >
            Forgot Password?
          </Typography>
        </FieldWrapper>

        <Button
          loading={authenticating}
          disabled={!userDetails.email || !userDetails.password || authenticating}
          onClick={handleSignIn}
          variant="solid"
          text={'Log in'}
          color="primary"
          style={{ width: '100%', marginTop: -15 }}
        />

        <Divider sx={{ width: '70%' }} />

        <Button
          loading={authenticating}
          onClick={handleSignup}
          variant="solid"
          text={'Sign up free'}
          color="primary_pale"
          style={{ width: '100%' }}
        />
      </Form>
      <Hidden mdDown>
        <ImageCont>
          <Image src={ASSETS.LOGO_BG} />
          <Logo src={ASSETS.INDIGO_LOGO} />
        </ImageCont>
      </Hidden>
    </LoginMainCont>
  );
};

export default Login;
