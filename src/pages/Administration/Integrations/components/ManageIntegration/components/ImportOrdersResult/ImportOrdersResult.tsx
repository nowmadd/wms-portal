import React, { useCallback, useState } from 'react';
import { ModalBody, ModalCont, ModalFooter, ModalHeader, PillButton, ResultTable } from './ImportOrdersResult.styles';
import { Box, Checkbox, Typography } from '@mui/material';
import { createColumnHelper } from '@tanstack/react-table';
import { useQueryClient } from 'react-query';
import { COLORS } from '../../../../../../../shared/constants/COLORS';
import Table from '../../../../../../../shared/components/Table/Table';
import Pill from '../../../../../../../shared/components/Pill/Pill';
import Button from '../../../../../../../shared/components/Button/Button';
import { QUERY } from '../../../../../../../shared/constants/QUERYNAMES';
import ErrorMessagePanel from '../../../../../../../shared/components/ErrorMessagePanel/ErrorMessagePanel';
import { ordersServices } from '../../../../../../../shared/services/ordersServices';
import InfoPanel from '../../../../../../../shared/components/InfoPanel/InfoPanel';

interface IOrderRows {
  original: {
    order_ref: string;
  };
}

interface Props {
  onClose: () => void;
  data: any;
}

const { importBulkOrders } = ordersServices();
const ImportOrdersResult: React.FC<Props> = ({ data, onClose }) => {
  const [activeTab, setActiveTab] = useState('success');
  const [selectedRows, setSelectedRows] = useState<IOrderRows[]>([]);
  const { mutateAsync, isLoading } = importBulkOrders();
  const queryClient = useQueryClient();
  const [importError, setImportError] = useState('');

  const handleSelectedRowsChange = useCallback((rows: any) => {
    setSelectedRows(rows);
  }, []);

  const submitImportOrders = async () => {
    setImportError('');
    let orderRefs: string[] = [];
    selectedRows.map((o, i) => {
      orderRefs.push(o.original.order_ref);
    });

    let payload = {
      order_references: orderRefs,
      filename: data.fileName,
    };

    try {
      await mutateAsync(
        {
          payload,
        },
        {
          onError: (error) => {
            setImportError(error.message);
          },
          onSuccess: async (data) => {
            await queryClient.invalidateQueries(QUERY.ORDER_LIST);
            onClose();
          },
        },
      );
    } catch (error) {
      // if (error instanceof Error) {
      //   setImportError(error.message);
      // } else setImportError('Something Went Wrong!');
      setImportError('Something went wrong!');
    }
  };

  const successColumnHelper = createColumnHelper<{
    order_id: string;
    order_date: string;
    order_items: number;
    order_customer: string;
  }>();

  const errorColumnHelper = createColumnHelper<{
    order_source: string;
    order_ref: string;
    reason: string;
  }>();

  const conflictColumnHelper = createColumnHelper<{
    order_source: string;
    order_ref: string;
    reason: string;
  }>();

  const successColumns = [
    successColumnHelper.accessor('order_id', {
      id: 'select-col',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          indeterminate={table.getIsSomeRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
    }),
    successColumnHelper.accessor('order_id', {
      header: 'Order',
      meta: 'slim',
      footer: (props) => props.column.id,
    }),
    successColumnHelper.accessor('order_date', {
      header: 'Date',
      meta: 'slim',
      footer: (props) => props.column.id,
    }),
    successColumnHelper.accessor('order_customer', {
      header: 'Customer',
      meta: 'slim',
      footer: (props) => props.column.id,
    }),
    successColumnHelper.accessor('order_items', {
      header: 'Items',
      meta: 'slim',
      footer: (props) => props.column.id,
    }),
  ];

  const conflictColumns = [
    conflictColumnHelper.accessor('order_source', {
      header: 'Order Source',
      meta: 'slim',
      footer: (props) => props.column.id,
    }),
    conflictColumnHelper.accessor('order_ref', {
      header: 'Order Ref',
      meta: 'slim',
      footer: (props) => props.column.id,
    }),
    conflictColumnHelper.accessor('reason', {
      header: 'Reason',
      meta: 'slim',
      cell: (props: any) => {
        return <Pill variant={'round'} color={'pending'} text={props.row.original.reason} />;
      },
      footer: (props) => props.column.id,
    }),
  ];

  const errorColumns = [
    errorColumnHelper.accessor('order_source', {
      header: 'Order Source',
      meta: 'slim',
      footer: (props) => props.column.id,
    }),
    errorColumnHelper.accessor('order_ref', {
      header: 'Order Ref',
      meta: 'slim',
      footer: (props) => props.column.id,
    }),
    errorColumnHelper.accessor('reason', {
      header: 'Reason',
      meta: 'slim',
      cell: (props: any) => {
        return <Pill variant={'round'} color={'failure'} text={props.row.original.reason} />;
      },
      footer: (props) => props.column.id,
    }),
  ];

  return (
    <ModalCont>
      <ModalBody>
        {/* <ModalHeader>
          <PillButton
            active={activeTab === 'success' ? 1 : 0}
            tabcolor={COLORS.SUCCESS}
            disableRipple
            onClick={() => setActiveTab('success')}
          >
            Successful
            {data.data.successful.length > 0 && (
              <Pill variant={'square'} color={'success'} text={data.data.successful.length} />
            )}
          </PillButton>
          <PillButton
            active={activeTab === 'error' ? 1 : 0}
            tabcolor={COLORS.FAILURE}
            disableRipple
            onClick={() => setActiveTab('error')}
          >
            FAILURE
            {data.data.errors.length > 0 && (
              <Pill variant={'square'} color={'failure'} text={data.data.errors.length} />
            )}
          </PillButton>
          <PillButton
            active={activeTab === 'conflict' ? 1 : 0}
            tabcolor={COLORS.PENDING_DARK}
            disableRipple
            onClick={() => setActiveTab('conflict')}
          >
            CONFLICT
            {data.data.conflicts.length > 0 && (
              <Pill variant={'square'} color={'pending'} text={data.data.conflicts.length} />
            )}
          </PillButton>
        </ModalHeader> */}
        <Box>
          {activeTab === 'success' && (
            <Table
              loading={false}
              data={data.data.successful ? data.data.successful : []}
              columns={successColumns}
              onSelectedRowsChange={handleSelectedRowsChange}
            />
          )}
          {/* {activeTab === 'conflict' && (
            <Table loading={false} data={data.data.conflicts ? data.data.conflicts : []} columns={conflictColumns} />
          )}
          {activeTab === 'error' && (
            <Table loading={false} data={data.data.errors ? data.data.errors : []} columns={errorColumns} />
          )} */}
        </Box>
        <ResultTable>
          <InfoPanel
            color={'primary'}
            info={'Activate Sync Orders to automatically import your orders. Learn more.'}
          ></InfoPanel>
          {activeTab === 'success' && (
            <Box style={{ flexDirection: 'row', display: 'flex', gap: 10 }}>
              <Box flexGrow={1}>
                <Typography fontSize={12} fontWeight={400} color={COLORS.GREY}>
                  Select unfulfilled Orders and Click import.
                </Typography>
              </Box>
              <Box>
                <Typography fontSize={12} fontWeight={400} color={COLORS.GREY} textAlign="right">
                  {`${selectedRows.length} of ${data.data.successful.length} rows selected for import.`}
                </Typography>
              </Box>
            </Box>
          )}
          {importError && activeTab === 'success' && <ErrorMessagePanel errorMessage={importError} />}
        </ResultTable>
      </ModalBody>
      <ModalFooter>
        <Button variant={'solid'} text={'Cancel'} color={'pending'} onClick={onClose} />
        <Button
          loading={isLoading}
          variant={'solid'}
          text={'Import'}
          color={'success'}
          disabled={activeTab !== 'success' || (data.data.successful.length >= 0 && selectedRows.length <= 0)}
          onClick={() => submitImportOrders()}
        />
      </ModalFooter>
    </ModalCont>
  );
};

export default ImportOrdersResult;
