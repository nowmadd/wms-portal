import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomCont, BottomText, ForgotCont, Form, Header, ImageCont, Terms, Image } from '../ForgotPassword.styles';
import { Box, Typography, Hidden, CircularProgress } from '@mui/material';
import React from 'react';
import { ASSETS } from '../../../shared/constants/ASSETS';
import { ROUTES } from '../../../shared/constants/ROUTES';
import ChangeEmaiModal from '../../Signup/components/ChangeEmaiModal';
import OtpInput from '../../Signup/components/OtpInput';
import Button from '../../../shared/components/Button/Button';
import { usersServices } from '../../../shared/services/usersServices';
import { IResetPasswordPayload } from '../../../shared/types/user.types';
import { FormikProps } from 'formik';
import InfoPanel from '../../../shared/components/InfoPanel/InfoPanel';

interface Props {
  form: FormikProps<IResetPasswordPayload>;
}

const { verifyOTP, requestOTP } = usersServices();
const Code: React.FC<Props> = ({ form }) => {
  const { mutateAsync, isLoading: isVerifying } = verifyOTP();
  const { mutateAsync: requestAsync, isLoading: isRequesting } = requestOTP();
  const [currentEmail, setCurrentEmail] = useState(form.values.user_email);
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [error, setError] = useState('');
  const [otp, setOtp] = useState('');

  const handleVerify = async () => {
    setError('');
    try {
      await mutateAsync({ payload: { user_email: currentEmail || '', verification_code: otp, user_type: 'new' } });
      navigation(ROUTES.FORGOT_PASSWORD_NEW);
    } catch (error) {
      setError('OTP is incorrect please try again or request a new one.');
    }
  };

  const navigation = useNavigate();
  const handleOTP = (otp: string) => {
    setOtp(otp);
  };

  const [timer, setTimer] = useState(15);
  useEffect(() => {
    let interval: NodeJS.Timeout;
    interval = setInterval(() => {
      if (timer === 0) return clearInterval(interval);
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const startTimer = () => {
    setTimer(15);
  };

  const requestNew = (newEmail?: string) => {
    requestAsync(
      { payload: { user_email: newEmail || currentEmail || '', user_type: 'new' } },
      {
        onSuccess: () => setTimer(15),
      },
    );
  };

  const openModal = () => {
    setOpenEmailModal(true);
  };

  const setcurrentEmail = (email: string) => {
    setCurrentEmail(email);
    requestNew(email);
    setOpenEmailModal(false);
  };

  const handleModalClose = () => {
    setOpenEmailModal(false);
  };

  return (
    <ForgotCont>
      <Form>
        {/* <Box
          display={'flex'}
          alignItems={'center'}
          sx={{ cursor: 'pointer' }}
          onClick={() => navigation(ROUTES.SIGNUP_COMPANY)}
        >
          <i className="bx bx-chevron-left" style={{ fontSize: 30 }} />
          <Typography fontWeight={500}> Back</Typography>
        </Box> */}
        <Header>Enter the code sent via email..</Header>
        <Typography>
          We’ve sent you a six digit code to the email address provided: <Terms>{currentEmail} </Terms>. Enter the code
          to verify password reset. Remember to check your junk.
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <OtpInput onChange={handleOTP} />
          <Typography sx={{ opacity: 0.5 }}>
            <i className="bx bxs-info-circle"></i> Only numerical entries are accepted.
          </Typography>
          {error !== '' && <InfoPanel color={'failure'} info={error} />}
        </Box>
        <Button
          loading={isVerifying}
          disabled={otp.length !== 6 || isVerifying}
          onClick={handleVerify}
          variant="solid"
          text={'verify'}
          color="primary"
          style={{ width: '100%' }}
        />
        <BottomCont>
          <BottomText
            sx={{
              ...((timer > 0 || isRequesting) && {
                pointerEvents: 'none',
                opacity: timer > 0 ? 0.5 : 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }),
            }}
            onClick={() => requestNew()}
          >
            {isRequesting ? <CircularProgress size={15} /> : 'Send me a new code'}
          </BottomText>
          <BottomText onClick={openModal}>Change email address</BottomText>
        </BottomCont>
        <Typography sx={{ alignSelf: 'center', opacity: timer > 0 ? 1 : 0 }}>
          A new link can be sent in... <span style={{ textDecoration: 'underline' }}>{timer} seconds</span>
        </Typography>
      </Form>
      <Hidden mdDown>
        <ImageCont>
          <Image src={ASSETS.OTP_BG} />
        </ImageCont>
      </Hidden>
      {openEmailModal ? (
        <ChangeEmaiModal
          open={openEmailModal}
          close={handleModalClose}
          timer={timer}
          setCurentEmail={setcurrentEmail}
          currentEmail={currentEmail || ''}
        />
      ) : (
        <React.Fragment />
      )}
    </ForgotCont>
  );
};

export default Code;
