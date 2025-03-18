import { Box, CircularProgress, Link, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { OrderCont, Header, TextCont, ButtonCont, OrderContainer, OrderName } from './Orders.styles';
import ManageOrders from './components/ManageOrders/ManageOrders';
import Button from '../../shared/components/Button/Button';
import BasicModal from '../../shared/components/Modals/BasicModal/BasicModal';
import ImportOrdersModal from './components/ImportOrdersModal/ImportOrdersModal';
import { createColumnHelper } from '@tanstack/react-table';
import Pill from '../../shared/components/Pill/Pill';
import Table from '../../shared/components/Table/Table';
import InfoPanel from '../../shared/components/InfoPanel/InfoPanel';
import ErrorMessagePanel from '../../shared/components/ErrorMessagePanel/ErrorMessagePanel';
import { initialCase } from '../../shared/utils/helpers';
import { ordersServices } from '../../shared/services/ordersServices';
import { IOrderDetailsList } from '../../shared/types/order.types';
import { LINKS } from '../../shared/constants/LINKS';
import { usePermissionCheck } from '../../shared/hooks/usePermissionCheck';
import React from 'react';
import { useQueryClient } from 'react-query';
import { QUERY } from '../../shared/constants/QUERYNAMES';

const { getOrdersList } = ordersServices();
const Orders = () => {
  const { adminSupervisorOwner } = usePermissionCheck();
  // const [updatedTime, setUpdatedTime] = useState('Just Now');
  const { breadcrumbs } = useParams() as { tab: string; breadcrumbs: string };
  const [showImport, setShowImport] = useState(false);
  const { data, isLoading, error } = getOrdersList();
  const navigate = useNavigate();
  const [tableLoading, setTableLoading] = useState(false);
  const queryClient = useQueryClient();

  const ordersData = useMemo(() => {
    if (isLoading) {
      return;
    } else {
      return data ? data.data : undefined;
    }
  }, [data, isLoading]);

  const refreshTable = async () => {
    setTableLoading(true);
    await queryClient.invalidateQueries(QUERY.ORDER_LIST, { refetchInactive: true });
    await queryClient.removeQueries(QUERY.ORDER_DETAILS);
    setTableLoading(false);
  };

  const orderStatusFilterOptions = [
    { term: 'order_status', value: '', label: 'All Statuses' },
    { term: 'order_status', value: 'Open', label: 'Open' },
    { term: 'order_status', value: 'Ready', label: 'Ready' },
    { term: 'order_status', value: 'In Progress', label: 'In Progress' },
    { term: 'order_status', value: 'Closed', label: 'Closed' },
    { term: 'order_status', value: 'Cancelled', label: 'Cancelled' },
  ];

  const getStatusPillColor = (status: string) => {
    let color: 'primary' | 'success' | 'info' | 'pending' | 'failure' | 'grey' | 'black' | 'white' = 'pending';
    switch (status.toUpperCase()) {
      case 'CLOSED':
        color = 'success';
        break;
      case 'IN PROGRESS':
        color = 'primary';
        break;
      case 'READY':
        color = 'info';
        break;
      case 'CANCELLED':
        color = 'failure';
        break;
      case 'OPEN':
        color = 'pending';
        break;
      default:
        color = 'white';
    }

    return color;
  };

  const columnHelper = createColumnHelper<IOrderDetailsList>();

  const ordersColumn = [
    columnHelper.accessor('order_customer_name', {
      header: 'Customer Name',
      cell: (props: any) => {
        return (
          <OrderContainer>
            <Link
              sx={{ textDecoration: 'none', cursor: 'pointer' }}
              onClick={() => navigate(`/orders/order?id=${props.row.original.order_id}`)}
            >
              <OrderName>{props.row.original.order_customer_name}</OrderName>
            </Link>
          </OrderContainer>
        );
      },
      footer: (props) => props.column.id,
      enableGlobalFilter: true,
      enableColumnFilter: true,
    }),
    columnHelper.accessor('order_ref', {
      header: 'Order Ref',
      meta: 'slim',
      footer: (props) => props.column.id,
      enableGlobalFilter: true,
      enableColumnFilter: true,
    }),
    columnHelper.accessor('order_created', {
      header: 'Order Date',
      meta: 'slim',
      footer: (props) => props.column.id,
      enableColumnFilter: true,
    }),
    columnHelper.accessor('order_status', {
      header: 'Order Status',
      meta: 'slim',
      cell: (props: any) => {
        return (
          <Box display={'flex'} justifyContent={'center'}>
            <Pill
              variant={'round'}
              color={props.row.original.order_status && getStatusPillColor(props.row.original.order_status)}
              text={props.row.original.order_status && initialCase(props.row.original.order_status)}
              slim
            ></Pill>
          </Box>
        );
      },
      footer: (props) => props.column.id,
      enableGlobalFilter: true,
      enableColumnFilter: true,
    }),
    columnHelper.accessor('order_item_count', {
      header: 'Items',
      cell: (props: any) => {
        return `${props.row.original.order_item_count} items`;
      },
      meta: 'slim',
      footer: (props) => props.column.id,
      enableGlobalFilter: false,
      enableColumnFilter: true,
    }),
    columnHelper.accessor('order_shipping_method', {
      header: 'Shipping Method',
      meta: 'slim',
      footer: (props) => props.column.id,
      enableGlobalFilter: false,
    }),
    columnHelper.accessor('order_id', {
      meta: 'action',
      header: '',
      footer: (props) => props.column.id,
      enableGlobalFilter: true,
    }),
  ];

  return breadcrumbs ? (
    <ManageOrders />
  ) : (
    <OrderCont>
      <Header>
        <TextCont>
          <Typography fontSize={36} fontWeight={900} sx={{ marginLeft: '10px', lineHeight: 'normal' }}>
            Orders
          </Typography>
        </TextCont>

        <ButtonCont>
          {adminSupervisorOwner ? (
            <Button
              onClick={() => setShowImport(true)}
              startIcon="bx bx-plus"
              variant={'solid-thin'}
              text={'Import Orders'}
              color={'primary'}
            />
          ) : (
            <React.Fragment />
          )}
        </ButtonCont>
        <Typography fontSize={14} fontWeight={500}>
          {`Orders existing in the system are shown below.  `}
          <Link href={LINKS.LEARN_MORE.ORDERS} style={{ cursor: 'pointer' }} color={'#0D6EFD'} target="_blank">
            Learn more
          </Link>
        </Typography>
      </Header>
      {ordersData ? (
        ordersData.length > 0 ? (
          <Table
            loading={false}
            data={ordersData ? ordersData : []}
            columns={ordersColumn}
            detailPage="/orders/order"
            search={{
              term: 'order_customer_name',
              placeholder: 'Search for an order, by name or id',
            }}
            filters={[
              {
                placeholder: 'All Statuses',
                options: orderStatusFilterOptions || [],
              },
            ]}
            refreshTable={refreshTable}
            tableLoading={tableLoading}
          />
        ) : (
          <InfoPanel noIcon={true} color={'grey'} info={'No Data Found'}></InfoPanel>
        )
      ) : error ? (
        <ErrorMessagePanel errorCode={error.response?.status}></ErrorMessagePanel>
      ) : (
        <CircularProgress size={25} />
      )}
      {showImport && (
        <BasicModal breadCrumbs={['Orders', 'Import Orders']} onClose={() => setShowImport(false)} open={showImport}>
          <ImportOrdersModal onClose={() => setShowImport(false)} />
        </BasicModal>
      )}
    </OrderCont>
  );
};

export default Orders;
