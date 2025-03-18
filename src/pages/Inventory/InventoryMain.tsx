import { Box, Breadcrumbs, Typography } from '@mui/material';
import { inventoryButtons } from './buttons';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useState } from 'react';
import Inventory from './Inventory/Inventory';
import { Body, ButtonCont, Header, InventoryButtons, InventoryCont, TextCont } from './InventoryMain.styles';
import { COLORS } from '../../shared/constants/COLORS';
import ManageInventory from './components /ManageInventory/ManageInventory';

const InventoryMain = () => {
  const [updatedTime, setUpdatedTime] = useState('Just Now');
  const { tab, breadcrumbs } = useParams() as { tab: string; breadcrumbs: string };
  const navigate = useNavigate();

  const renderBody = () => {
    console.log(tab);
    switch (tab) {
      case 'items':
        return <Inventory />;
      default:
        <React.Fragment />;
    }
  };

  return (
    <InventoryCont>
      {breadcrumbs ? (
        <ManageInventory />
      ) : (
        <Header>
          <TextCont>
            <Typography fontSize={36} fontWeight={900} sx={{ marginLeft: '10px' }}>
              Inventory
            </Typography>
            <Typography color={COLORS.TEXT_GRAY} fontSize={13} fontWeight={700}>
              Last updated: <span style={{ fontWeight: 400 }}> {updatedTime}</span> <i className="bx bx-time"></i>
            </Typography>
          </TextCont>

          <ButtonCont>
            {inventoryButtons.map((b, k) => (
              <InventoryButtons
                disableRipple
                active={b.route.split('/')[2].includes(tab) ? 1 : 0}
                key={k}
                onClick={() => navigate(b.route)}
              >
                {b.title}
              </InventoryButtons>
            ))}
          </ButtonCont>
        </Header>
      )}
      <Body>{renderBody()}</Body>
    </InventoryCont>
  );
};

export default InventoryMain;
