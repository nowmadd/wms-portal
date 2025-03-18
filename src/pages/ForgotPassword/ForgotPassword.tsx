import { useLocation, useParams } from 'react-router-dom';
import Code from './components/Code';
import CreatePassword from './components/CreatePassword';
import Success from './components/Success';
import Email from './components/Email';
import { useForgotPasswordForm } from './useForgotPasswordForm';

type Step = 'code_verification' | 'new_password' | 'success';

const ForgotPassword = () => {
  const { step } = useParams<{ step: Step }>();
  const location = useLocation();
  const { email } = location.state || {};

  const { form } = useForgotPasswordForm({
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const renderBody = () => {
    switch (step) {
      case 'code_verification':
        return <Code form={form} />;
      case 'new_password':
        return <CreatePassword form={form} />;
      case 'success':
        return <Success />;
      default:
        return <Email form={form} email={email} />;
    }
  };

  return renderBody();
};

export default ForgotPassword;
