import React from 'react';
import { DashboardMainCont, Header, TextCont } from './MercuryDashboard.styles';
import Typography from '@mui/material/Typography/Typography';
import Link from '@mui/material/Link/Link';

const Dashboard = () => {
  return (
    <DashboardMainCont>
      <Header>
        <TextCont>
          <Typography fontSize={36} fontWeight={900} sx={{ marginLeft: '10px', lineHeight: 'normal' }}>
            Welcome to Mercury WMS
          </Typography>
        </TextCont>
        <Typography fontSize={14} fontWeight={500}>
          {`The Alpha release of Mercury WMS  will allow initial testing of MVP Phase 1 functionality. `}
        </Typography>
        <Typography fontSize={14} fontWeight={400}>
          {`The available functionality to test can be found here: `}
          <Link
            href={'https://indigowms.atlassian.net/wiki/spaces/MERCURY/pages/491585539/Alpha+Testing'}
            style={{ cursor: 'pointer' }}
            color={'#0D6EFD'}
            target="_blank"
          >
            Alpha Testing
          </Link>
        </Typography>
      </Header>
    </DashboardMainCont>
  );
};

export default Dashboard;
