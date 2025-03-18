import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ConfigurationMainCont, Header, HeaderButtonCont } from './Configuration.styles';
import Typography from '@mui/material/Typography/Typography';
import Box from '@mui/material/Box/Box';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';

const Configuration = () => {
  const curPath = window.location.pathname;
  const navigate = useNavigate();
  const { breadcrumbs } = useParams() as { breadcrumbs: string };
  const [isLoading, setIsLoading] = useState(false);

  return breadcrumbs ? (
    <React.Fragment />
  ) : (
    <ConfigurationMainCont>
      <Header>
        <Typography fontSize={24} fontWeight={900}>
          Configuration Options
        </Typography>
      </Header>
      <Typography fontSize={14} fontWeight={500}>
        You can manage the configuration of your account here.
        {/* <Link href={LINKS.LEARN_MORE.ADMIN.WAREHOUSE} style={{ cursor: 'pointer' }} color={'#0D6EFD'} target="_blank">
          Learn more
        </Link> */}
      </Typography>
      {isLoading ? (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <CircularProgress size={25} />
        </Box>
      ) : (
        <React.Fragment />
      )}
    </ConfigurationMainCont>
  );
};

export default Configuration;
