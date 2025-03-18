import React, { useMemo, useState } from 'react';
import {
  AddWarehouse,
  AddWarehouseCont,
  AddWarehouseIcon,
  Header,
  HeaderButtonCont,
  WarehouseItemCont,
  WarehousesMainCont,
} from './Warehouses.styles';
import { Box, CircularProgress, Link, Typography, Grid } from '@mui/material';
import Button from '../../../shared/components/Button/Button';
import WarehouseItem from './components/WarehouseItem';
import BasicModal from '../../../shared/components/Modals/BasicModal/BasicModal';
import { useNavigate, useParams } from 'react-router-dom';
import ManageWarehouses from './components/ManageWarehouses/ManageWarehouses';
import { warehousesServices } from '../../../shared/services/warehousesServices';
import { ls } from '../../../shared/utils/ls';
import CreateWarehouseModal from './components/modals/CreateWarehouseModal/CreateWarehouseModal';
import { COLORS } from '../../../shared/constants/COLORS';
import InfoPanel from '../../../shared/components/InfoPanel/InfoPanel';
import { LINKS } from '../../../shared/constants/LINKS';

const { getWarehousesList } = warehousesServices();
const Warehouses = () => {
  const curPath = window.location.pathname;
  const navigate = useNavigate();
  const { data, isLoading } = getWarehousesList();
  const { breadcrumbs } = useParams() as { breadcrumbs: string };
  const [showCreateWarehouse, setShowCreateWarehouse] = useState(false);

  const warehousesList = useMemo(() => {
    if (isLoading) {
      return;
    } else {
      return data ? data.data : undefined;
    }
  }, [data, isLoading]);

  const handleCreateWarehouse = () => {
    if (!(warehousesList && warehousesList.length >= 1)) {
      setShowCreateWarehouse(true);
    } else {
      setShowCreateWarehouse(false);
    }
  };

  return breadcrumbs ? (
    <ManageWarehouses />
  ) : (
    <WarehousesMainCont>
      <Header>
        <Typography fontSize={24} fontWeight={900}>
          Warehouses
        </Typography>
        <HeaderButtonCont>
          <Button
            onClick={handleCreateWarehouse}
            startIcon="bx bx-plus"
            variant={'solid-thin'}
            text={'Create Warehouse'}
            color={'primary'}
            disabled={(warehousesList && warehousesList.length >= 1) || isLoading}
          />
          {/* <Button
            startIcon="bx bx-download"
            variant={'outlined-thin'}
            text={'Export Warehouses CSV'}
            color={'primary'}
          /> */}
        </HeaderButtonCont>
      </Header>
      <Typography fontSize={14} fontWeight={500}>
        These are the managed warehouses in your account.{' '}
        <Link href={LINKS.LEARN_MORE.ADMIN.WAREHOUSE} style={{ cursor: 'pointer' }} color={'#0D6EFD'} target="_blank">
          Learn more
        </Link>
      </Typography>
      {warehousesList && warehousesList.length >= 1 ? (
        <InfoPanel
          info="Your account is limited to 1 Warehouse (Geographic location)"
          color={'info'}
          style={{
            width: 'fit-content !important',
          }}
        />
      ) : (
        <React.Fragment />
      )}
      {isLoading ? (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <CircularProgress size={25} />
        </Box>
      ) : (
        <React.Fragment />
      )}
      {warehousesList ? (
        <WarehouseItemCont>
          <Grid container spacing={2}>
            {warehousesList.map((t) => (
              <Grid item xs={3} onClick={() => navigate(`${curPath}/warehouse?location_id=${t.location_id}`)}>
                <WarehouseItem key={t.location_id} warehouseDetails={t} />
              </Grid>
            ))}
            <Grid item xs={3} onClick={handleCreateWarehouse}>
              <AddWarehouse key={'add-item'}>
                <AddWarehouseCont>
                  <AddWarehouseIcon color={COLORS.PRIMARY_LIGHT}>
                    <i className="bx bx-plus-circle " />
                  </AddWarehouseIcon>
                  <Typography
                    color={
                      warehousesList && warehousesList.length >= 1 ? COLORS.PRIMARY_INACTIVE : COLORS.PRIMARY_LIGHT
                    }
                    fontSize={18}
                    fontWeight={700}
                    sx={{ cursor: 'default' }}
                  >
                    CREATE A
                  </Typography>
                  <Typography
                    color={
                      warehousesList && warehousesList.length >= 1 ? COLORS.PRIMARY_INACTIVE : COLORS.PRIMARY_LIGHT
                    }
                    fontSize={18}
                    fontWeight={700}
                    sx={{ cursor: 'default' }}
                  >
                    NEW WAREHOUSE
                  </Typography>
                </AddWarehouseCont>
              </AddWarehouse>
            </Grid>
          </Grid>
        </WarehouseItemCont>
      ) : (
        // TODO : Add empty component placeholder
        <React.Fragment />
      )}
      {showCreateWarehouse && (
        <BasicModal
          headerText="Create new warehouse"
          open={showCreateWarehouse}
          onClose={() => setShowCreateWarehouse(false)}
        >
          <CreateWarehouseModal close={() => setShowCreateWarehouse(false)} />
        </BasicModal>
      )}
    </WarehousesMainCont>
  );
};

export default Warehouses;
