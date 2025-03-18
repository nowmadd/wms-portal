import React, { useEffect, useRef, useState } from 'react';
import {
  MUITextField,
  TextFiledWrapper,
  FieldWrapper,
  Underlines,
  Underline,
  PasswordTextFieldWrapper,
  PasswordInput,
} from './TextField.styles';
import Typography from '@mui/material/Typography/Typography';
import { COLORS } from '../../constants/COLORS';
import { Icon, IconButton, InputAdornment, TextFieldProps } from '@mui/material';
import useCapsLockStatus from './useCapsLockStatus';
import { ASSETS } from '../../constants/ASSETS';
import { getBrowserName } from '../../utils/helpers';

type Props = {
  label?: string;
  asterisk?: boolean;
  tip?: string;
  endAdorment?: React.ReactNode;
  passwordValidation?: boolean;
  passwordValidCallback?: (isValid: boolean) => void;
  comparePassword?: boolean;
  passwordMatch?: boolean;
} & TextFieldProps;

const TextField: React.FC<Props> = ({
  asterisk,
  label = '',
  endAdorment,
  tip,
  passwordValidation = false,
  passwordValidCallback,
  comparePassword,
  passwordMatch = false,
  ...props
}) => {
  const [passwordStrength, setPasswordStrength] = useState({
    strength: 0,
    message: '',
    color: 'PRIMARY' as 'FAILURE' | 'PENDING' | 'SUCCESS',
  });
  const isCapsLockOn = useCapsLockStatus();
  const [showPassword, setShowPassword] = useState(false);

  const validatePassword = (password: string) => {
    const minLength = 12;
    const maxLength = 225;
    const numberRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*]/;
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;

    let strength = 0;
    let message = '';
    let color = 'FAILURE' as 'FAILURE' | 'PENDING' | 'SUCCESS';

    if (password.length <= minLength) {
      passwordValidCallback && passwordValidCallback(false);

      strength = 1;
      message = `Weak - passwords must be at least ${minLength} characters long, contain upper and lower case characters, and contain at least 1 number and a special character.`;
    } else if (
      !numberRegex.test(password) ||
      !specialCharRegex.test(password) ||
      !lowercaseRegex.test(password) ||
      !uppercaseRegex.test(password)
    ) {
      passwordValidCallback && passwordValidCallback(false);

      strength = 2;
      message = `Not Strong Enough - passwords must be at least ${minLength} characters long, contain upper and lower case characters, and contain at least 1 number and a special character.`;
      color = 'PENDING';
    } else {
      strength = 3;
      message = `Strong enough`;
      color = 'SUCCESS';
      passwordValidCallback && passwordValidCallback(true);
    }

    setPasswordStrength({ strength, message, color });
  };

  const handlePasswordValidation = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (passwordValidation) {
      const password = event.target.value;
      validatePassword(password);
      props.onChange && props.onChange(event);
    } else return;
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const renderPasswordStrengthUnderlines = (strength: number) => {
    const getUnderlineColor = (index: number) => {
      if (strength >= index) {
        if (strength === 1) return COLORS['FAILURE'];
        if (strength === 2) return COLORS['PENDING'];
        if (strength === 3) return COLORS['SUCCESS'];
      }
      return COLORS['BORDER_LIGHT'];
    };

    useEffect(() => {
      if (passwordValidation && props.value !== '') validatePassword(props.value as string);
    }, []);

    return (
      <Underlines>
        <Underline
          key={'underline-1'}
          style={{
            backgroundColor: props.value !== '' ? getUnderlineColor(1) : COLORS['BORDER_LIGHT'],
            borderBottomLeftRadius: 4,
          }}
        />
        <Underline
          key={'underline-2'}
          style={{ backgroundColor: props.value !== '' ? getUnderlineColor(2) : COLORS['BORDER_LIGHT'] }}
        />
        <Underline
          key={'underline-3'}
          style={{
            backgroundColor: props.value !== '' ? getUnderlineColor(3) : COLORS['BORDER_LIGHT'],
            borderBottomRightRadius: 4,
          }}
        />
      </Underlines>
    );
  };

  return (
    <TextFiledWrapper>
      <Typography fontSize={12} fontWeight={600} color={COLORS.TEXT_GRAY} sx={{ margin: '0 0 5px 10px' }}>
        {label}
        {asterisk || props.required ? (
          <span style={{ marginLeft: 2, color: COLORS.FAILURE }}>*</span>
        ) : (
          <React.Fragment />
        )}
      </Typography>

      {passwordValidation ? (
        <PasswordTextFieldWrapper>
          <PasswordInput
            type={showPassword ? 'text' : 'password'}
            currentColor={
              props.value !== ''
                ? comparePassword
                  ? passwordMatch
                    ? COLORS['SUCCESS']
                    : COLORS['FAILURE']
                  : COLORS[passwordStrength.color]
                : COLORS['BORDER_LIGHT']
            }
            {...props}
            fullWidth
            inputProps={{ maxLength: passwordValidation ? 30 : 'unset' }}
            InputProps={{
              ...props.InputProps,
              disableUnderline: true,
              endAdornment: (
                <InputAdornment position="end">
                  {isCapsLockOn && getBrowserName() !== 'Safari' ? (
                    <Icon>
                      <img src={ASSETS.CAPSLOCK} style={{ width: 15, height: 15 }} />
                    </Icon>
                  ) : (
                    <React.Fragment />
                  )}
                  <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <i className="bx bx-hide" /> : <i className="bx bx-show" />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onInput={handlePasswordValidation}
          />

          {endAdorment && endAdorment}
          {comparePassword ? (
            <Underlines>
              <Underline
                key={'underline-1'}
                style={{
                  backgroundColor:
                    props.value !== ''
                      ? passwordMatch
                        ? COLORS['SUCCESS']
                        : COLORS['FAILURE']
                      : COLORS['BORDER_LIGHT'],
                  borderBottomLeftRadius: 4,
                  borderBottomRightRadius: 4,
                }}
              />
            </Underlines>
          ) : (
            renderPasswordStrengthUnderlines(passwordStrength.strength)
          )}
        </PasswordTextFieldWrapper>
      ) : (
        <FieldWrapper>
          <MUITextField {...props} fullWidth />
          {endAdorment && endAdorment}
        </FieldWrapper>
      )}
      {passwordValidation &&
        props.value !== '' &&
        (comparePassword ? (
          <Typography
            fontSize={12}
            color={passwordMatch ? COLORS['SUCCESS'] : COLORS['FAILURE']}
            fontWeight={800}
            sx={{ marginRight: '10px', marginLeft: '10px', paddingTop: '10px' }}
          >
            {passwordMatch ? 'Good' : 'Password do not match'}
          </Typography>
        ) : (
          <Typography
            fontSize={12}
            color={COLORS[passwordStrength.color]}
            fontWeight={800}
            sx={{ marginRight: '10px', marginLeft: '10px', paddingTop: '10px' }}
          >
            {passwordStrength.message}
          </Typography>
        ))}
    </TextFiledWrapper>
  );
};

export default TextField;
