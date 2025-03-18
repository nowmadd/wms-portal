import { Box, Breadcrumbs, Typography } from '@mui/material';
import { ProfileButton, ProfileCont, Body, ButtonCont, Header, TextCont } from './Profile.styles';
import { profileButtons } from './profileButtons';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState } from 'react';
import { COLORS } from '../../shared/constants/COLORS';
import { ls } from '../../shared/utils/ls';
import General from './General/General';
import Sessions from './Sessions/Sessions';
import Password from './Password/Password';

const Profile = () => {
  const [updatedTime, setUpdatedTime] = useState('Just Now');
  const { tab, breadcrumbs } = useParams() as { tab: string; breadcrumbs: string };
  const navigate = useNavigate();

  const { clearLS } = ls();

  const handleLogout = () => {
    clearLS();
    window.location.href = '/';
  };

  const renderBody = () => {
    switch (tab) {
      case 'general':
        return <General />;
      case 'password':
        return <Password />;
      // case 'sessions':
      //   return <Sessions />;

      default:
        <React.Fragment />;
    }
  };

  return (
    <ProfileCont>
      {breadcrumbs ? (
        <React.Fragment />
      ) : (
        <Header>
          <TextCont>
            <Typography fontSize={36} fontWeight={900} sx={{ marginLeft: '10px' }}>
              Profile
            </Typography>
            <Typography color={COLORS.TEXT_GRAY} fontSize={13} fontWeight={700}>
              Last updated: <span style={{ fontWeight: 400 }}> {updatedTime}</span> <i className="bx bx-time"></i>
            </Typography>
          </TextCont>

          <ButtonCont>
            {profileButtons.map((b, k) => (
              <ProfileButton
                disableRipple
                active={b.route.includes(tab) ? 1 : 0}
                key={k}
                onClick={() => navigate(b.route)}
              >
                {b.title}
              </ProfileButton>
            ))}
          </ButtonCont>
        </Header>
      )}
      <Body>{renderBody()}</Body>
    </ProfileCont>
  );
};

export default Profile;
