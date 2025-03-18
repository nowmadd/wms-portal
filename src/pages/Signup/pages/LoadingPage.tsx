import React from 'react';
import { ImageCont, LoadingCont, Image } from '../Signup.styles';
import { LinearProgress } from '@mui/material';
import { ASSETS } from '../../../shared/constants/ASSETS';

const LoadingPage = () => {
  return (
    <LoadingCont>
      <LinearProgress
        variant="indeterminate"
        style={{ minHeight: 10, borderRadius: 5, width: '60%', marginTop: '250px' }}
      />
      <div style={{ width: 200, height: 100, position: 'relative', marginTop: '30px' }}>
        <Image src={ASSETS.PURPLE_LOGO} />
      </div>
    </LoadingCont>
  );
};

export default LoadingPage;
