import React from 'react';
import { IWarehouseDetails } from '../../../../shared/types/warehouse.types';
import {
  ItemLeft,
  ItemRight,
  NameIDCont,
  WarehouseAvatar,
  WarehouseItemMain,
  WarehouseRow,
  WarehouseAvatarRow,
} from '../Warehouses.styles';
import Button from '../../../../shared/components/Button/Button';
import { Icon, Typography } from '@mui/material';
import Pill from '../../../../shared/components/Pill/Pill';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../shared/constants/ROUTES';
import { COLORS } from '../../../../shared/constants/COLORS';

interface Props {
  warehouseDetails: IWarehouseDetails;
}

const WarehouseItem: React.FC<Props> = ({ warehouseDetails }) => {
  const navigate = useNavigate();
  const { location_name, location_id, location_address, location_size, location_deleted, location_enabled } =
    warehouseDetails;
  return (
    <WarehouseItemMain>
      <WarehouseAvatarRow>
        <WarehouseAvatar color={COLORS.PRIMARY_LIGHT}>
          <i className="bx bx-home" />
        </WarehouseAvatar>
      </WarehouseAvatarRow>
      <WarehouseRow>
        <Typography fontSize={13} fontWeight={700}>
          {location_name}
        </Typography>
      </WarehouseRow>
      <WarehouseRow>
        <Typography
          fontSize={10}
          fontWeight={700}
          color="#767676"
          sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 1,
          }}
        >
          {location_address?.addr_line1}, {location_address?.addr_city}, {location_address?.addr_country},{' '}
          {location_address?.addr_country}, {location_address?.addr_country} {location_address?.addr_country}
        </Typography>
      </WarehouseRow>
      <WarehouseRow>
        <ItemLeft>
          {location_deleted ? (
            <Pill text={'Pending Deletion'} variant={'square'} color={'pending'} />
          ) : (
            <React.Fragment />
          )}
          {location_enabled ? <React.Fragment /> : <Pill text={'Disabled'} variant={'square'} color={'failure'} />}
        </ItemLeft>
        <ItemRight>
          <Typography fontSize={10} fontWeight={600}>
            <i className="bx bx-expand"></i> {location_size.gross} sq. m
          </Typography>
        </ItemRight>
      </WarehouseRow>
    </WarehouseItemMain>
  );
};

export default WarehouseItem;
