import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import React, { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  CustomerDetails,
  DetailsColumn,
  FieldCont,
  Header,
  ItemDescriptionContainer,
  ItemName,
  ManageOrderCont,
  OrderDetails,
  OrderDetailsCont,
  Section,
  TableCont,
} from './ManageOrders.styles';
import Typography from '@mui/material/Typography/Typography';
import Breadcrumbs from '../../../../shared/components/Breadcrumbs/Breadcrumbs';
import Button from '../../../../shared/components/Button/Button';
import { ButtonCont } from '../../Orders.styles';
import { Box, Link } from '@mui/material';
import { COLORS } from '../../../../shared/constants/COLORS';
import { createColumnHelper } from '@tanstack/react-table';
import { initialCase } from '../../../../shared/utils/helpers';
import Pill from '../../../../shared/components/Pill/Pill';
import Table from '../../../../shared/components/Table/Table';
import InfoPanel from '../../../../shared/components/InfoPanel/InfoPanel';
import ErrorMessagePanel from '../../../../shared/components/ErrorMessagePanel/ErrorMessagePanel';
import { ordersServices } from '../../../../shared/services/ordersServices';
import { IOrderItems } from '../../../../shared/types/order.types';
import { usePermissionCheck } from '../../../../shared/hooks/usePermissionCheck';
import BasicModal from '../../../../shared/components/Modals/BasicModal/BasicModal';
import CancelOrderModal from '../CancelOrderModal/CancelOrderModal';

const { getOrderDetails } = ordersServices();
const ManageOrders = () => {
  const { adminSupervisorOwner } = usePermissionCheck();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showCancelOrderModal, setShowCancelOrderModal] = useState(false);
  const searchId = searchParams.get('id') || '';
  const { data, isLoading } = getOrderDetails(searchId);

  const orderDetailsData = useMemo(() => {
    if (isLoading) return;
    if (data?.data) return data.data;
  }, [data, isLoading]);

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

  const columnHelper = createColumnHelper<IOrderItems>();
  const ordersItemsColumn = [
    columnHelper.accessor('item_quantity', {
      header: 'Qty',
      meta: 'fit',
      cell: (props: any) => {
        return `${props.row.original.item_quantity}x`;
      },
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor('item_description', {
      header: 'Item Description',
      cell: (props: any) => {
        return (
          <Link
            sx={{ textDecoration: 'none', cursor: 'pointer' }}
            onClick={() => navigate(`/inventory/items/inventory?id=${props.row.original.item_id}`)}
          >
            <ItemDescriptionContainer>
              <ItemName>{props.row.original.item_description}</ItemName>
            </ItemDescriptionContainer>
          </Link>
        );
      },
      footer: (props) => props.column.id,
    }),

    columnHelper.accessor('item_barcode_primary', {
      header: 'Item Barcode',
      footer: (props) => props.column.id,
    }),
    // columnHelper.accessor('item_job_status', {
    //   header: 'Job Status',
    //   meta: 'slim',
    //   cell: (props: any) => {
    //     return (
    //       <Box display={'flex'} justifyContent={'center'}>
    //         <Pill
    //           variant={'round'}
    //           color={props.row.original.item_job_status && getStatusPillColor(props.row.original.item_job_status)}
    //           text={props.row.original.item_job_status && initialCase(props.row.original.item_job_status)}
    //           slim
    //         ></Pill>
    //       </Box>
    //     );
    //   },
    //   footer: (props) => props.column.id,
    // }),
    columnHelper.accessor('item_weight', {
      header: 'Weight',
      meta: 'fit',
      cell: (props: any) => {
        return `${props.row.original.item_weight} kg`;
      },
      footer: (props) => props.column.id,
    }),
  ];

  return isLoading ? (
    <ManageOrderCont>
      <CircularProgress size={25} />
    </ManageOrderCont>
  ) : (
    <ManageOrderCont>
      <Header>
        <Typography fontSize={36} fontWeight={900} sx={{ lineHeight: 1.2 }}>
          {orderDetailsData?.order_ref + ' ' + orderDetailsData?.order_customer.customer_name}
        </Typography>
        <Breadcrumbs page={orderDetailsData?.order_id || ''} />
      </Header>
      <ButtonCont>
        {adminSupervisorOwner ? (
          <Button
            text={orderDetailsData?.order_status === 'cancelled' ? 'Cancelled' : 'Cancel Order'}
            variant="outlined-thin"
            color="failure"
            disabled={
              orderDetailsData?.order_status === 'closed' ||
              orderDetailsData?.order_status === 'in progress' ||
              orderDetailsData?.order_status === 'cancelled'
            }
            onClick={() => {
              setShowCancelOrderModal(true);
            }}
          />
        ) : (
          <React.Fragment />
        )}
      </ButtonCont>
      <OrderDetailsCont>
        <CustomerDetails>
          <Section>
            <Typography fontSize={24} fontWeight={800}>
              Customer Details
            </Typography>
            <DetailsColumn>
              <FieldCont>
                <Typography fontSize={12} fontWeight={800} color={COLORS.GREY}>
                  Imported Order Number
                </Typography>
                <Typography fontSize={16} fontWeight={400} lineHeight={2}>
                  {orderDetailsData?.order_ref}
                </Typography>
              </FieldCont>
              <FieldCont>
                <Typography fontSize={12} fontWeight={800} color={COLORS.GREY}>
                  Imported Order Created
                </Typography>
                <Typography fontSize={16} fontWeight={400} lineHeight={2}>
                  {orderDetailsData?.order_created}
                </Typography>
              </FieldCont>
            </DetailsColumn>
            <DetailsColumn>
              <FieldCont>
                <Typography fontSize={12} fontWeight={800} color={COLORS.GREY}>
                  Customer Name
                </Typography>
                <Typography fontSize={16} fontWeight={400} lineHeight={2}>
                  {orderDetailsData?.order_customer?.customer_name}
                </Typography>
              </FieldCont>
              <FieldCont>
                <Typography fontSize={12} fontWeight={800} color={COLORS.GREY}>
                  Customer Email Address
                </Typography>
                <Typography fontSize={16} fontWeight={400} lineHeight={2}>
                  {orderDetailsData?.order_customer?.customer_email}
                </Typography>
              </FieldCont>
            </DetailsColumn>
            <DetailsColumn>
              <FieldCont>
                <Typography fontSize={12} fontWeight={800} color={COLORS.GREY}>
                  Customer Contact Phone
                </Typography>
                <Typography fontSize={16} fontWeight={400} lineHeight={2}>
                  {orderDetailsData?.order_customer?.customer_phone}
                </Typography>
              </FieldCont>
              <FieldCont>
                <Typography fontSize={12} fontWeight={800} color={COLORS.GREY}>
                  Shipping Method
                </Typography>
                <Typography fontSize={16} fontWeight={400} lineHeight={2}>
                  {orderDetailsData?.order_shipping?.shipping_method}
                </Typography>
              </FieldCont>
            </DetailsColumn>
            <DetailsColumn>
              <FieldCont>
                <Typography fontSize={12} fontWeight={800} color={COLORS.GREY}>
                  Customer Location
                </Typography>
                <Typography fontSize={16} fontWeight={400} lineHeight={1.5}>
                  {orderDetailsData?.order_shipping?.shipping_address_1}
                  <br />
                  {orderDetailsData?.order_shipping?.shipping_city}
                  <br />
                  {orderDetailsData?.order_shipping?.shipping_county}
                  <br />
                  {orderDetailsData?.order_shipping?.shipping_country}
                  <br />
                  {orderDetailsData?.order_shipping?.shipping_postcode}
                  <br />
                </Typography>
              </FieldCont>
            </DetailsColumn>
            <Typography fontSize={24} fontWeight={800}>
              Items in Order
            </Typography>
            <TableCont>
              {orderDetailsData ? (
                orderDetailsData.order_items?.length > 0 ? (
                  <Table
                    showPagination={false}
                    loading={false}
                    data={orderDetailsData.order_items ? orderDetailsData.order_items : []}
                    columns={ordersItemsColumn}
                    detailPage="/inventory/items/inventory"
                  />
                ) : (
                  <InfoPanel noIcon={true} color={'grey'} info={'No Data Found'}></InfoPanel>
                )
              ) : false ? (
                // <ErrorMessagePanel errorCode={error.response?.status}></ErrorMessagePanel>
                <></>
              ) : (
                <CircularProgress size={25} />
              )}
            </TableCont>
          </Section>
        </CustomerDetails>
        <OrderDetails>
          {/* <Typography fontSize={24} fontWeight={800}>
            Customer Details
          </Typography> */}
          {/* <Typography fontSize={24} fontWeight={800}>
            Customer Details
          </Typography> */}
        </OrderDetails>
      </OrderDetailsCont>
      {showCancelOrderModal && (
        <BasicModal open={showCancelOrderModal}>
          <CancelOrderModal
            orderRef={orderDetailsData?.order_ref + ' ' + orderDetailsData?.order_customer.customer_name || ''}
            orderId={orderDetailsData?.order_id || ''}
            close={() => setShowCancelOrderModal(false)}
          />
        </BasicModal>
      )}
    </ManageOrderCont>
  );
};

export default ManageOrders;
