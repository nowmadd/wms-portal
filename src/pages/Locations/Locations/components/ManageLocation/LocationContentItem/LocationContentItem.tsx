import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ILocationDetails } from '../../../../../../shared/types/locations.types';
import { ItemCont, ItemContent, ItemContentInfo, ItemHeader, Pills, StockPills } from './LocaitonContentItem.styles';
import { Typography, Link } from '@mui/material';
import { COLORS } from '../../../../../../shared/constants/COLORS';
import Pill from '../../../../../../shared/components/Pill/Pill';
import Tooltip from '@mui/material/Tooltip/Tooltip';

interface Props {
  contentData: ILocationDetails['location_inventory'][0]; // Update the type of contentData
}

const LocationContentItem: React.FC<Props> = ({ contentData }) => {
  const navigate = useNavigate();
  // Destructuring contentData
  const { inventory_barcode_primary, inventory_description, inventory_id, inventory_sku_primary, inventory_stock } =
    contentData;

  const dataConstructors = [
    { field: 'Item Description', data: inventory_description },
    { field: 'Barcode', data: inventory_barcode_primary },
    { field: 'SKU', data: inventory_sku_primary },
    {
      field: 'Item Count',
      data: inventory_stock,
    },
  ];
  return (
    <ItemCont>
      <ItemHeader>
        <Typography fontSize={16} fontWeight={700}>
          Item ID:
        </Typography>
        <Typography fontSize={16} fontWeight={400}>
          <Link
            sx={{ textDecoration: 'none', cursor: 'pointer' }}
            onClick={() => navigate(`/inventory/items/inventory?id=${inventory_id}`)}
          >
            {inventory_id}
          </Link>
        </Typography>
      </ItemHeader>
      <ItemContent>
        {dataConstructors.map((data, key) => (
          <ItemContentInfo key={key}>
            <Typography color={COLORS.GREY} fontSize={12} fontWeight={800} sx={{ padding: '0 10px' }}>
              {data.field}
            </Typography>

            {data.field === 'Item Count' && typeof data.data === 'object' ? (
              <StockPills>
                <Tooltip
                  placement="bottom-start"
                  title={
                    <React.Fragment>
                      <Typography color="inherit" fontWeight={800}>
                        {`${data.data.unallocated} Available `}
                      </Typography>
                      {data.data.allocated > 0 && (
                        <Typography color="inherit" fontWeight={800}>
                          {`${data.data.allocated} Reserved `}
                        </Typography>
                      )}
                      {data.data.damaged > 0 && (
                        <Typography color="inherit" fontWeight={800}>
                          {`${data.data.damaged} Damaged `}
                        </Typography>
                      )}
                    </React.Fragment>
                  }
                >
                  <Pills>
                    <Pill variant={'round'} color={'success'} text={`${data.data.unallocated}`} slim />
                    {data.data.allocated > 0 && (
                      <Pill variant={'round'} color={'pending'} text={`${data.data.allocated}`} slim />
                    )}
                    {data.data.damaged > 0 && (
                      <Pill variant={'round'} color={'failure'} text={`${data.data.damaged}`} slim />
                    )}
                  </Pills>
                </Tooltip>
              </StockPills>
            ) : (
              // Otherwise, render data as string or number
              <Typography fontSize={16} fontWeight={400} sx={{ padding: '8px 12px' }}>
                {typeof data.data === 'string' && data.data}
              </Typography>
            )}
          </ItemContentInfo>
        ))}
      </ItemContent>
    </ItemCont>
  );
};

export default LocationContentItem;
