import { Typography, Hidden } from '@mui/material';
import { ASSETS } from '../../../shared/constants/ASSETS';

import { ForgotCont, Header, ImageCont, Logo, Image, Form } from '../../ForgotPassword/ForgotPassword.styles';

const SomethingWentWrong = () => {
  return (
    <ForgotCont>
      <Form>
        <Header>Oops, something went wrong </Header>
        <Typography>Please contact your account administrators to request a new link be sent.</Typography>

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

export default SomethingWentWrong;
