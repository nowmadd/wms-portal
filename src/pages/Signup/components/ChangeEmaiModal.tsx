import React, { Fragment, useMemo, useState } from 'react';
import BasicModal from '../../../shared/components/Modals/BasicModal/BasicModal';
import TextField from '../../../shared/components/TextField/TextField';
import Button from '../../../shared/components/Button/Button';
import { Box, CircularProgress, InputAdornment, Typography } from '@mui/material';
import { ButtonCont } from '../Signup.styles';
import { usersServices } from '../../../shared/services/usersServices';
import { useDebounce } from 'use-debounce';
import { COLORS } from '../../../shared/constants/COLORS';

interface Props {
  open: boolean;
  close: () => void;
  setCurentEmail: (email: string) => void;
  currentEmail: string;
  timer: number;
}
const { checkUserExistence } = usersServices();
const ChangeEmaiModal: React.FC<Props> = ({ open, close, setCurentEmail, currentEmail, timer }) => {
  const [email, setEmail] = useState(currentEmail);

  const [debouncedEmail] = useDebounce(email, 500);

  const { data: userExistsData, isLoading: isChecking } = checkUserExistence(debouncedEmail, Boolean(email));

  const userExists = useMemo(() => Boolean(userExistsData), [userExistsData]);

  const handleClick = () => {
    setCurentEmail(email);
  };
  return (
    <BasicModal open={open} onClose={close} headerText="Change Email Address">
      <Box sx={{ padding: 5, display: 'flex', flexDirection: 'column', gap: 5 }}>
        <TextField
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          label="Email address"
          placeholder="Enter your new email address"
          InputProps={{
            endAdornment: !email ? (
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
          error={userExists}
          helperText={userExists && 'Email already exists'}
        />
      </Box>
      <ButtonCont>
        <Typography sx={{ alignSelf: 'center', opacity: timer > 0 ? 1 : 0 }}>
          A new link can be sent in... <span style={{ textDecoration: 'underline' }}>{timer} seconds</span>
        </Typography>
        <Button
          disabled={timer > 0 || userExists}
          onClick={handleClick}
          variant="solid"
          text={'Send Activation Code'}
          color="success"
        />
      </ButtonCont>
    </BasicModal>
  );
};

export default ChangeEmaiModal;
