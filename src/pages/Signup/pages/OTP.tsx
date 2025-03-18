import { Hidden, Typography, Box, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ASSETS } from '../../../shared/constants/ASSETS';
import { Header, ImageCont, SignupCont, Image, Form, Terms, BottomCont, BottomText } from '../Signup.styles';
import Button from '../../../shared/components/Button/Button';
import { useNavigate } from 'react-router-dom';
import OtpInput from '../components/OtpInput';
import ChangeEmaiModal from '../components/ChangeEmaiModal';
import { ROUTES } from '../../../shared/constants/ROUTES';
import { ICreateUserPayload } from '../../../shared/types/user.types';
import { FormikProps } from 'formik';
import { usersServices } from '../../../shared/services/usersServices';
import { COLORS } from '../../../shared/constants/COLORS';

interface Props {
  form: FormikProps<ICreateUserPayload>;
}

const { verifyOTP, requestOTP } = usersServices();
const OTP: React.FC<Props> = ({ form }) => {
  const { mutateAsync, isLoading: isVerifying } = verifyOTP();
  const { mutateAsync: requestAsync, isLoading: isRequesting } = requestOTP();
  const [currentEmail, setCurrentEmail] = useState(form.values.user_email.toLowerCase());
  const [openEmailModal, setOpenEmailModal] = useState(false);
  const [OTPErrorMessage, setOTPErrorMessage] = useState('');
  const [otp, setOtp] = useState('');

  const navigation = useNavigate();

  const handleVerify = async () => {
    try {
      await mutateAsync(
        { payload: { user_email: currentEmail, verification_code: otp, user_type: 'new' } },
        {
          onSuccess: () => {
            navigation(ROUTES.SIGNUP_COMPANY);
          },
          onError: (error: any) => {
            console.log({ error });

            if (error.response?.data?.message) {
              setOTPErrorMessage(error.response.data.message);
            }
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleOTP = (otp: string) => {
    setOTPErrorMessage('');
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

  const requestNew = (newEmail?: string) => {
    requestAsync(
      { payload: { user_email: newEmail || currentEmail, user_type: 'new' } },
      {
        onSuccess: () => setTimer(15),
      },
    );
  };

  const openModal = () => {
    setOpenEmailModal(true);
  };

  const handleModalClose = () => {
    setOpenEmailModal(false);
  };

  const setcurrentEmail = (email: string) => {
    const user_email = email.toLowerCase();
    setCurrentEmail(user_email);
    requestNew(user_email);
    setOpenEmailModal(false);
  };

  return (
    <SignupCont>
      <Form>
        <Header>Enter the code sent via email..</Header>
        <Typography>
          We’ve sent you a six digit code to the email address provided {'('}
          <Terms>{currentEmail}</Terms>
          {')'}. Enter the code to activate your account. Remember to check your junk.
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <OtpInput onChange={handleOTP} />
          <Typography
            sx={{
              opacity: Boolean(OTPErrorMessage) ? 1 : 0.5,
              color: Boolean(OTPErrorMessage) ? COLORS.FAILURE : 'inherit',
            }}
          >
            <i className="bx bxs-info-circle"></i>{' '}
            {Boolean(OTPErrorMessage) ? OTPErrorMessage : 'Only numerical entries are accepted.'}
          </Typography>
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
          setCurentEmail={setcurrentEmail}
          currentEmail={currentEmail}
          timer={timer}
        />
      ) : (
        <React.Fragment />
      )}
    </SignupCont>
  );
};

export default OTP;
