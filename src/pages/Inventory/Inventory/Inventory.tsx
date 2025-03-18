import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header, InventoryMainCont, InventoryName, InventoryNameContainer, StockLevelPills } from './Inventory.styles';
import Typography from '@mui/material/Typography/Typography';
import Link from '@mui/material/Link/Link';
import Button from '../../../shared/components/Button/Button';
import CreateInventoryItemModal from '../components /CreateInventoryItemModal/CreateInventoryItemModal';
import BasicModal from '../../../shared/components/Modals/BasicModal/BasicModal';
import { createColumnHelper } from '@tanstack/react-table';
import { IInventoryColumnDetails } from '../../../shared/types/inventory.types';
import Table from '../../../shared/components/Table/Table';
import InfoPanel from '../../../shared/components/InfoPanel/InfoPanel';
import ErrorMessagePanel from '../../../shared/components/ErrorMessagePanel/ErrorMessagePanel';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import { inventoryServices } from '../../../shared/services/inventoryServices';
import { LINKS } from '../../../shared/constants/LINKS';
import { usePermissionCheck } from '../../../shared/hooks/usePermissionCheck';
import Pill from '../../../shared/components/Pill/Pill';
import Tooltip from '@mui/material/Tooltip/Tooltip';
import { useQueryClient } from 'react-query';
import { QUERY } from '../../../shared/constants/QUERYNAMES';

const { getInventoryList } = inventoryServices();
const Inventory = () => {
  const { adminSupervisorOwner } = usePermissionCheck();
  const { tab, breadcrumbs } = useParams() as { tab: string; breadcrumbs: string };
  const [showCreateInventory, setShowCreateInventory] = useState(false);
  const { data, isLoading, error } = getInventoryList();
  const [tableLoading, setTableLoading] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const inventoryData = useMemo(() => {
    if (isLoading) {
      return;
    } else {
      return data ? data.data : undefined;
    }
  }, [data, isLoading]);

  const refreshTable = async () => {
    setTableLoading(true);
    await queryClient.invalidateQueries(QUERY.INVENTORY_LIST, { refetchInactive: true });
    await queryClient.removeQueries(QUERY.INVENTORY_DETAILS);
    setTableLoading(false);
  };

  const columnHelper = createColumnHelper<IInventoryColumnDetails>();
  const inventoryColumns = [
    columnHelper.accessor('inventory_description', {
      header: 'Description',
      cell: (props: any) => {
        return (
          <Link
            sx={{ textDecoration: 'none', cursor: 'pointer' }}
            onClick={() => navigate(`/inventory/items/inventory?id=${props.row.original.inventory_id}`)}
          >
            <InventoryNameContainer>
              <InventoryName>{props.row.original.inventory_description}</InventoryName>
            </InventoryNameContainer>
          </Link>
        );
      },
      footer: (props) => props.column.id,
      enableGlobalFilter: true,
      enableColumnFilter: true,
    }),
    columnHelper.accessor('inventory_barcode_primary', {
      header: 'Barcode',
      footer: (props) => props.column.id,
      enableGlobalFilter: true,
      enableColumnFilter: true,
    }),
    columnHelper.accessor('inventory_sku_primary', {
      header: 'SKU',
      footer: (props) => props.column.id,
      enableGlobalFilter: true,
      enableColumnFilter: true,
    }),
    columnHelper.accessor('inventory_locations', {
      header: 'Location',
      meta: 'slim',
      footer: (props) => props.column.id,
      enableGlobalFilter: false,
      enableColumnFilter: true,
    }),
    columnHelper.accessor('inventory_stock', {
      header: 'Stock',
      cell: (props: any) => {
        return (
          <Tooltip
            placement="bottom-start"
            title={
              <React.Fragment>
                <Typography color="inherit" fontWeight={800}>
                  {`${props.row.original.inventory_stock.unallocated} Available `}
                </Typography>
                {props.row.original.inventory_stock.allocated > 0 && (
                  <Typography color="inherit" fontWeight={800}>
                    {`${props.row.original.inventory_stock.allocated} Reserved `}
                  </Typography>
                )}
                {props.row.original.inventory_stock.damaged > 0 && (
                  <Typography color="inherit" fontWeight={800}>
                    {`${props.row.original.inventory_stock.damaged} Damaged `}
                  </Typography>
                )}
              </React.Fragment>
            }
          >
            <StockLevelPills>
              <Pill variant={'round'} color={'success'} text={props.row.original.inventory_stock.unallocated} slim />
              {props.row.original.inventory_stock.allocated > 0 && (
                <Pill variant={'round'} color={'pending'} text={props.row.original.inventory_stock.allocated} slim />
              )}
              {props.row.original.inventory_stock.damaged > 0 && (
                <Pill variant={'round'} color={'failure'} text={props.row.original.inventory_stock.damaged} slim />
              )}
            </StockLevelPills>
          </Tooltip>
        );
      },
      meta: 'slim',
      footer: (props) => props.column.id,
      enableGlobalFilter: false,
    }),
    columnHelper.accessor('inventory_id', {
      meta: 'action',
      header: '',
      footer: (props) => props.column.id,
      enableGlobalFilter: false,
    }),
  ];

  return breadcrumbs ? (
    <React.Fragment />
  ) : (
    <InventoryMainCont>
      <Header>
        <Typography fontSize={24} fontWeight={900}>
          Inventory Items
        </Typography>
        {adminSupervisorOwner ? (
          <Button
            onClick={() => setShowCreateInventory(true)}
            startIcon="bx bx-plus"
            variant={'solid-thin'}
            text={'Create Item'}
            color={'primary'}
          />
        ) : (
          <React.Fragment />
        )}
      </Header>
      <Typography fontSize={14} fontWeight={500}>
        {`The inventory currently within the warehouses is displayed here. `}
        <Link href={LINKS.LEARN_MORE.INVENTORY} style={{ cursor: 'pointer' }} color={'#0D6EFD'} target="_blank">
          Learn more
        </Link>
      </Typography>
      {inventoryData ? (
        inventoryData.length > 0 ? (
          <Table
            loading={false}
            data={inventoryData ? inventoryData : []}
            columns={inventoryColumns}
            detailPage="/inventory/items/inventory"
            refreshTable={refreshTable}
            tableLoading={tableLoading}
            search={{
              term: 'inventory_description',
              placeholder: 'Search for an inventory item, by description, barcode or SKU...',
            }}
            // filters={[
            //   {
            //     term: 'location_parent.warehouse',
            //     placeholder: 'All Warehouse',
            //     options: warehouseFilterOptions || [],
            //   },
            //   {
            //     term: 'location_children',
            //     placeholder: 'All Location',
            //     options: filterEmptyChildren || [],
            //   },
            // ]}
          />
        ) : (
          <InfoPanel noIcon={true} color={'grey'} info={'No Data Found'}></InfoPanel>
        )
      ) : error ? (
        <ErrorMessagePanel errorCode={error.response?.status}></ErrorMessagePanel>
      ) : (
        <CircularProgress size={25} />
      )}
      {showCreateInventory ? (
        <BasicModal
          breadCrumbs={['Inventory', 'Create']}
          onClose={() => setShowCreateInventory(false)}
          open={showCreateInventory}
        >
          <CreateInventoryItemModal onClose={() => setShowCreateInventory(false)} />
        </BasicModal>
      ) : (
        <React.Fragment />
      )}
    </InventoryMainCont>
  );
};

export default Inventory;
