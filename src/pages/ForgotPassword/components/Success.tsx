import { useNavigate } from 'react-router-dom';
import { ForgotCont, Form, Header, ImageCont, Logo, Image } from '../ForgotPassword.styles';
import { Typography, Hidden } from '@mui/material';
import { ASSETS } from '../../../shared/constants/ASSETS';
import { ROUTES } from '../../../shared/constants/ROUTES';
import Button from '../../../shared/components/Button/Button';

interface Props {
  create?: boolean;
}

const Email: React.FC<Props> = ({ create }) => {
  const navigation = useNavigate();

  const next = () => {
    navigation(ROUTES.LOGIN);
  };

  return (
    <ForgotCont>
      <Form>
        <Header>Password {create ? 'created' : 'reset'} successfully! </Header>
        <Typography>
          {' '}
          Your new password has been {create ? 'created' : 'reset'}. You can now continue to login.
        </Typography>

        <Button
          // loading={authenticating}
          onClick={next}
          variant="solid"
          text={'LOGIN'}
          color="primary"
          style={{ width: '100%' }}
        />
      </Form>
      <Hidden mdDown>
        <ImageCont>
          <Image src={ASSETS.LOGO_BG} />
          <Logo src={ASSETS.INDIGO_LOGO} />
        </ImageCont>
      </Hidden>
    </ForgotCont>
  );
};

export default Email;
