import React, { useEffect, useState } from 'react';
import { usersServices } from '../../shared/services/usersServices';
import { ActivateCont } from './Activate.styles';
import { useForgotPasswordForm } from '../ForgotPassword/useForgotPasswordForm';
import CreatePassword from '../ForgotPassword/components/CreatePassword';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../shared/constants/ROUTES';
import Success from '../ForgotPassword/components/Success';
import Expired from './components/Expired';
import LoadingScreen from '../../shared/components/LoadingScreen/LoadingScreen';
import SomethingWentWrong from './components/SomethingWentWrong';

const { verifyOTP } = usersServices();

const enum EPages {
  SUCCESS = 'success',
  CREATE_PASSWORD = 'create_password',
  EXPIRED = 'expired',
}

const Activate = () => {
  const { step } = useParams() as { step: EPages };
  //get query params
  const email = new URLSearchParams(window.location.search).get('email');
  const code = new URLSearchParams(window.location.search).get('code');

  const navigation = useNavigate();
  const { mutateAsync, isLoading: isVerifying } = verifyOTP();

  const { form } = useForgotPasswordForm({
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    if (!email || !code) return;
    form.setFieldValue('user_email', email);
    mutateAsync(
      { payload: { user_email: email, verification_code: code, user_type: 'new' } },
      {
        onSuccess: () => {
          navigation(`${EPages.CREATE_PASSWORD}`);
        },
        onError: () => {
          navigation(`${EPages.EXPIRED}`);
        },
      },
    );
    //call api to activate account
  }, [code, email]);

  const renderPage = () => {
    switch (step) {
      case EPages.CREATE_PASSWORD:
        return <CreatePassword form={form} create />;
      case EPages.EXPIRED:
        return <Expired />;
      case EPages.SUCCESS:
        return <Success create />;
      default:
        if (!email || !code) return <SomethingWentWrong />;
        return <LoadingScreen />;
    }
  };

  return <ActivateCont>{renderPage()}</ActivateCont>;
};

export default Activate;
