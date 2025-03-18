import { useState } from 'react';

import Personal from './pages/Personal';
import { useParams } from 'react-router-dom';
import OTP from './pages/OTP';
import GetStarted from './pages/GetStarted';
import { useSignupForm } from './useSignupForm';

type Step = 'otp_verification' | 'company';

const Signup = () => {
  const { step } = useParams<{ step: Step }>();

  const { form } = useSignupForm({
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const renderBody = () => {
    switch (step) {
      case 'otp_verification':
        return <OTP form={form} />;
      case 'company':
        return <GetStarted form={form} />;
      default:
        return <Personal form={form} />;
    }
  };

  return renderBody();
};

export default Signup;
