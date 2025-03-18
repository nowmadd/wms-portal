import { Typography, Hidden } from '@mui/material';
import { ASSETS } from '../../../shared/constants/ASSETS';

import { ForgotCont, Header, ImageCont, Logo, Image, Form } from '../../ForgotPassword/ForgotPassword.styles';

const Expired = () => {
  return (
    <ForgotCont>
      <Form>
        <Header>The invite link has expired.. </Header>
        <Typography>
          This invite link has expired, please contact your account administrators to request a new link be sent.{' '}
        </Typography>

        <Typography> This page can now be closed.</Typography>
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

export default Expired;
