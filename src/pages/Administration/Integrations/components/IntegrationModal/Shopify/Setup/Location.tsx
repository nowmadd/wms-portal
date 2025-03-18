import { Box, Typography, TextField, CircularProgress } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import InfoPanel from '../../../../../../../shared/components/InfoPanel/InfoPanel';
import { ASSETS } from '../../../../../../../shared/constants/ASSETS';
import { COLORS } from '../../../../../../../shared/constants/COLORS';
import { TableMain, ShopifyTop, Row, Cell } from '../shopify.styles';
import Select from '../../../../../../../shared/components/Select/Select';
import { ls } from '../../../../../../../shared/utils/ls';
import { ModalButtonCont } from '../../../../../../../shared/components/Modals/BasicModal/BasicModal.styles';
import Button from '../../../../../../../shared/components/Button/Button';
import { warehousesServices } from '../../../../../../../shared/services/warehousesServices';
import { integrationsServices } from '../../../../../../../shared/services/integrationsServices';

interface Props {}
const { getWarehousesList } = warehousesServices();
const { updateIntegration } = integrationsServices();
const Location: React.FC<Props> = ({}) => {
  const { mutateAsync, isLoading: mutating } = updateIntegration();
  const { data, isLoading } = getWarehousesList();
  const [showWarning, setShowWarning] = useState(false);
  const [locationId, setLocationId] = useState('');
  const [locationName, setLocationName] = useState('');
  const [syncLocationName, setSyncLocationName] = useState('');
  const { getLS } = ls();
  const [locationOptions, setLocationOptions] = useState<
    Array<{
      value: string;
      label: string;
    }>
  >([]);

  const warehousesList = useMemo(() => {
    if (isLoading) {
      return;
    } else {
      return data ? data.data : undefined;
    }
  }, [data, isLoading]);

  useEffect(() => {
    const location = getLS('shopify_location');
    if (location) {
      setLocationOptions([]);
      const parsedLocation = JSON.parse(location);
      parsedLocation.map((loc: any) => {
        setLocationOptions((prev) => [...prev, { value: loc.id, label: loc.name }]);
      });
      if (parsedLocation.length === 1) {
        setLocationId(parsedLocation[0].id);
        setLocationName(parsedLocation[0].name);
      }
    }
  }, []);

  const next = () => {
    if (showWarning && warehousesList) {
      const integartion_id = getLS('shopify_integration_id');
      // Call API to sync locations
      console.log('Syncing locations', locationId, warehousesList[0].location_id, integartion_id);
      const shop_linked_warehouse = warehousesList[0].location_id;
      const shop_linked_location = locationId;
      mutateAsync({
        integration_id: integartion_id,
        data: {
          shop_linked_warehouse,
          shop_linked_location,
        },
      });
    }
    setShowWarning(true);
  };

  const cancel = () => {
    setShowWarning(false);
  };

  if (locationOptions.length === 0) return null;

  return (
    <Box>
      {showWarning ? (
        <Box
          sx={{
            padding: '50px',
            gap: '20px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography>
            I would like to permanently sync{' '}
            <span
              style={{
                fontWeight: 700,
              }}
            >
              {locationName}
            </span>
          </Typography>
          <InfoPanel info={'THIS ACTION CANNOT BE UNDONE.'} color={'failure'} />
          <Typography>Data for orders, inventory and stock levels will sync across chosen location.</Typography>
        </Box>
      ) : (
        <TableMain>
          <InfoPanel
            info={
              locationOptions.length > 1
                ? 'Multiple locations found. Select desired location to sync warehouse activities'
                : 'Warehouse activities will sync to shop location. Select next to confirm and import inventory.'
            }
            color={locationOptions.length > 1 ? 'pending' : 'success'}
          />

          <ShopifyTop>
            <img
              src={ASSETS.SHOPIFY_LOGO}
              style={{
                width: 60,
                height: 60,
                background: '#eaf8d1',
                padding: 5,
                borderRadius: 5,
              }}
            />
            <Box>
              <Typography fontWeight={700} fontSize={18}>
                Shopify
              </Typography>
              <Typography fontWeight={400} fontSize={14}>
                Manage sync and fulfil orders placed on a shopify eCommerce platform.
              </Typography>
              <Typography fontWeight={400} fontSize={12} sx={{ opacity: 0.6 }}>
                eCommerce, Inventory Management
              </Typography>
            </Box>
          </ShopifyTop>
          {/* Table Header */}
          <Box
            sx={{
              background: 'white',
              borderRadius: '8px !important',
              border: `solid 2px ${COLORS.BORDER_LIGHT}`,
            }}
          >
            <Row sx={{ borderBottom: `2px solid ${COLORS.BORDER_LIGHT} ` }}>
              <Cell>
                <Typography fontWeight={600} fontSize={14}>
                  Shopify
                </Typography>
              </Cell>
              <Cell sx={{ flex: 0.5, justifyContent: 'center' }}>
                <Typography fontWeight={600} fontSize={14}>
                  Sync
                </Typography>
              </Cell>
              <Cell>
                <Typography fontWeight={600} fontSize={14}>
                  Mercury
                </Typography>
              </Cell>
            </Row>

            {/* Content Row */}
            <Row>
              {/* Shopify Column */}
              <Cell>
                <Select
                  options={locationOptions}
                  defaultValue={locationOptions[0]}
                  onChange={(e: any) => {
                    setLocationId(e.value);
                    setLocationName(e.label);
                  }}
                />
              </Cell>

              {/* Sync Column */}
              <Cell sx={{ flex: 0.5, justifyContent: 'center' }}>
                <i className="bx bx-link" style={{ fontSize: 25 }} />
              </Cell>

              {/* Mercury Column */}
              <Cell sx={{ justifyContent: 'center' }}>
                {isLoading ? (
                  <CircularProgress size={20} sx={{ alignSelf: 'center' }} />
                ) : (
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    placeholder="Stock Room"
                    sx={{ pointerEvents: 'none' }}
                    value={warehousesList ? warehousesList[0]?.location_name || '' : ''}
                    onChange={(e) => setSyncLocationName(e.target.value)}
                  />
                )}
              </Cell>
            </Row>
          </Box>
          {!isLoading && (!warehousesList || !warehousesList[0]) ? (
            <InfoPanel info={'Create a warehouse to continue Shopify integration'} color={'failure'} />
          ) : null}
        </TableMain>
      )}
      <ModalButtonCont>
        <Button
          onClick={next}
          variant={'solid'}
          color={'success'}
          text={showWarning ? 'Confirm Sync' : 'Next'}
          disabled={!warehousesList || !warehousesList[0] || !locationId || isLoading}
        />
        {showWarning ? <Button onClick={cancel} variant={'solid'} color={'grey'} text={'Cancel'} /> : null}
        {/* <Button onClick={closeModal} variant={'solid'} color={'grey'} text="CANCEL" /> */}
      </ModalButtonCont>
    </Box>
  );
};

export default Location;
