import { Box, Breadcrumbs, Typography } from '@mui/material';
import { locationsButtons } from './buttons';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState } from 'react';
import Locations from './Locations/Locations';
import Location from './Locations/components/ManageLocation/ManageLocation';
import { Body, ButtonCont, Header, LocationsButtons, LocationsCont, TextCont } from './LocationsMain.styles';
import { COLORS } from '../../shared/constants/COLORS';
import Zones from './Zones/Zones';

const LocationsMain = () => {
  const [updatedTime, setUpdatedTime] = useState('Just Now');
  const { tab, breadcrumbs } = useParams() as { tab: string; breadcrumbs: string };
  const navigate = useNavigate();

  const renderBody = () => {
    console.log(tab);
    switch (tab) {
      case 'locations':
        return <Locations />;
      case 'zones':
        return <Zones />;
      default:
        <React.Fragment />;
    }
  };

  return (
    <LocationsCont>
      {breadcrumbs ? (
        <Location />
      ) : (
        <Header>
          <TextCont>
            <Typography fontSize={36} fontWeight={900} sx={{ marginLeft: '10px' }}>
              Warehouse Locations
            </Typography>
          </TextCont>

          <ButtonCont>
            {locationsButtons.map((b, k) => (
              <LocationsButtons
                disableRipple
                active={b.route.split('/')[2].includes(tab) ? 1 : 0}
                key={k}
                onClick={() => navigate(b.route)}
              >
                {b.title}
              </LocationsButtons>
            ))}
          </ButtonCont>
        </Header>
      )}
      <Body>{renderBody()}</Body>
    </LocationsCont>
  );
};

export default LocationsMain;
