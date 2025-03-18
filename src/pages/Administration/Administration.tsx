import { Box, Breadcrumbs, Typography } from '@mui/material';
import { AdminButton, AdminCont, Body, ButtonCont, Header, TextCont } from './Admin.styles';
import { adminButton } from './buttons';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState } from 'react';
import Users from './Users/Users';
// import Groups from './Groups/Groups';
import Warehouses from './Warehouses/Warehouses';
import Account from './Account/Account';
import { COLORS } from '../../shared/constants/COLORS';
import Activity from './Activity/Activity';
import Integrations from './Integrations/Integrations';
import Configuration from './Configuration/Configuration';

const Administration = () => {
  const [updatedTime, setUpdatedTime] = useState('Just Now');
  const { tab, breadcrumbs } = useParams() as { tab: string; breadcrumbs: string };
  const navigate = useNavigate();

  const renderBody = () => {
    switch (tab) {
      case 'users':
        return <Users />;
      // case 'groups':
      //   return <Groups />;
      case 'configuration':
        return <Configuration />;
      case 'warehouses':
        return <Warehouses />;
      case 'account':
        return <Account />;
      case 'activities':
        return <Activity />;
      case 'integrations':
        return <Integrations />;
      default:
        return <Users />;
    }
  };

  return (
    <AdminCont>
      {breadcrumbs ? (
        <React.Fragment />
      ) : (
        <Header>
          <TextCont>
            <Typography fontSize={36} fontWeight={900} sx={{ marginLeft: '10px' }}>
              Administration
            </Typography>
            <Typography color={COLORS.TEXT_GRAY} fontSize={13} fontWeight={700}>
              Last updated: <span style={{ fontWeight: 400 }}> {updatedTime}</span> <i className="bx bx-time"></i>
            </Typography>
          </TextCont>

          <ButtonCont>
            {adminButton.map((b, k) => (
              <AdminButton
                disableRipple
                active={tab ? (b.route.includes(tab) ? 1 : 0) : b.title === 'Users' ? 1 : 0}
                key={k}
                onClick={() => navigate(b.route)}
              >
                {b.title}
              </AdminButton>
            ))}
          </ButtonCont>
        </Header>
      )}
      <Body>{renderBody()}</Body>
    </AdminCont>
  );
};

export default Administration;
