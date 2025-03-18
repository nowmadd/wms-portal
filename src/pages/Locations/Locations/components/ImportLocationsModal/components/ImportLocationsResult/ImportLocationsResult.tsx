import React, { useCallback, useState } from 'react';
import {
  ErrorCell,
  ErrorIcon,
  ErrorText,
  ModalBody,
  ModalCont,
  ModalFooter,
  ModalHeader,
  PillButton,
  ResultTable,
} from './ImportLocationsResult.styles';
import Tooltip from '@mui/material/Tooltip/Tooltip';
import { Box, Checkbox, Icon, Typography } from '@mui/material';
import { COLORS } from '../../../../../../../shared/constants/COLORS';
import { createColumnHelper } from '@tanstack/react-table';
import Table from '../../../../../../../shared/components/Table/Table';
import Pill from '../../../../../../../shared/components/Pill/Pill';
import Button from '../../../../../../../shared/components/Button/Button';
import { locationsServices } from '../../../../../../../shared/services/locationsServices';
import { useQueryClient } from 'react-query';
import ErrorMessagePanel from '../../../../../../../shared/components/ErrorMessagePanel/ErrorMessagePanel';
import { QUERY } from '../../../../../../../shared/constants/QUERYNAMES';

interface IOrderRows {
  original: {
    location_aisle: string;
    location_bay: string;
    location_level: string;
  };
}

interface Props {
  onClose: () => void;
  data: any;
}

const { importBulkLocations } = locationsServices();
const ImportLocationsResult: React.FC<Props> = ({ data, onClose }) => {
  const [activeTab, setActiveTab] = useState('success');
  const [selectedRows, setSelectedRows] = useState<IOrderRows[]>([]);
  const { mutateAsync, isLoading } = importBulkLocations();
  const queryClient = useQueryClient();
  const [importError, setImportError] = useState('');

  const handleSelectedRowsChange = useCallback((rows: any) => {
    setSelectedRows(rows);
  }, []);

  const submitImportLocations = async () => {
    setImportError('');
    let location_references: { aisle: string; bay: string; level: string }[] = [];
    selectedRows.map((o, i) => {
      location_references.push({
        aisle: o.original.location_aisle,
        bay: o.original.location_bay,
        level: o.original.location_level,
      });
    });

    let payload = {
      location_references: location_references,
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
            await queryClient.invalidateQueries(QUERY.LOCATION_LIST);
            onClose();
          },
        },
      );
    } catch (error) {
      setImportError('Something went wrong!');
    }
  };

  const alphanumericRegexWithDash = /^[a-zA-Z0-9\-]+$/;
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;

  const successColumnHelper = createColumnHelper<{
    location_id: string;
    location_aisle: string;
    location_bay: string;
    location_level: string;
    location_height: string;
    location_width: string;
    location_depth: string;
  }>();

  const errorColumnHelper = createColumnHelper<{
    location_id: string;
    location_aisle: string;
    location_bay: string;
    location_level: string;
    location_height: string;
    location_width: string;
    location_depth: string;
    reason: string;
  }>();

  const conflictColumnHelper = createColumnHelper<{
    location_id: string;
    location_aisle: string;
    location_bay: string;
    location_level: string;
    location_height: string;
    location_width: string;
    location_depth: string;
    reason: string;
  }>();

  const successColumns = [
    successColumnHelper.accessor('location_id', {
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
    successColumnHelper.accessor('location_aisle', {
      header: 'Aisle*',
      meta: 'slim',
      footer: (props) => props.column.id,
    }),
    successColumnHelper.accessor('location_bay', {
      header: 'Bay*',
      meta: 'slim',
      footer: (props) => props.column.id,
    }),
    successColumnHelper.accessor('location_level', {
      header: 'Level',
      meta: 'slim',
      footer: (props) => props.column.id,
    }),
    successColumnHelper.accessor('location_width', {
      header: 'Width',
      meta: 'slim',
      footer: (props) => props.column.id,
    }),
    successColumnHelper.accessor('location_height', {
      header: 'Height',
      meta: 'slim',
      footer: (props) => props.column.id,
    }),
    successColumnHelper.accessor('location_depth', {
      header: 'Depth',
      meta: 'slim',
      footer: (props) => props.column.id,
    }),
  ];

  const conflictColumns = [
    conflictColumnHelper.accessor('location_aisle', {
      header: 'Aisle',
      meta: 'slim',
      footer: (props) => props.column.id,
    }),
    conflictColumnHelper.accessor('location_bay', {
      header: 'Bay',
      meta: 'slim',
      footer: (props) => props.column.id,
    }),
    conflictColumnHelper.accessor('location_level', {
      header: 'Level',
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
    errorColumnHelper.accessor('location_aisle', {
      header: 'Aisle*',
      meta: 'slim',
      cell: (props: any) => {
        const aisleError = props.row.original.reason?.location_aisle;
        if (aisleError) {
          return (
            <Tooltip title={aisleError}>
              <ErrorCell>
                <ErrorText>{props.row.original.location_aisle}</ErrorText>
                <ErrorIcon>
                  <i className="bx bxs-info-circle" style={{ fontSize: 32, color: COLORS.FAILURE }} />
                </ErrorIcon>
              </ErrorCell>
            </Tooltip>
          );
        } else return props.row.original.location_aisle;
      },
      footer: (props) => props.column.id,
    }),
    errorColumnHelper.accessor('location_bay', {
      header: 'Bay*',
      meta: 'slim',
      cell: (props: any) => {
        const bayError = props.row.original.reason?.location_bay;
        if (bayError) {
          return (
            <Tooltip title={bayError}>
              <ErrorCell>
                <ErrorText>{props.row.original.location_bay}</ErrorText>
                <ErrorIcon>
                  <i className="bx bxs-info-circle" style={{ fontSize: 32, color: COLORS.FAILURE }} />
                </ErrorIcon>
              </ErrorCell>
            </Tooltip>
          );
        } else return props.row.original.location_bay;
      },
      footer: (props) => props.column.id,
    }),
    errorColumnHelper.accessor('location_level', {
      header: 'Level',
      meta: 'slim',
      cell: (props: any) => {
        const levelError = props.row.original.reason?.location_level;
        if (levelError) {
          return (
            <Tooltip title={levelError}>
              <ErrorCell>
                <ErrorText>{props.row.original.location_level}</ErrorText>
                <ErrorIcon>
                  <i className="bx bxs-info-circle" style={{ fontSize: 32, color: COLORS.FAILURE }} />
                </ErrorIcon>
              </ErrorCell>
            </Tooltip>
          );
        } else return props.row.original.location_level;
      },
      footer: (props) => props.column.id,
    }),
    errorColumnHelper.accessor('location_width', {
      header: 'Width',
      meta: 'slim',
      cell: (props: any) => {
        const widthError = props.row.original.reason?.location_width;
        if (widthError) {
          return (
            <Tooltip title={widthError}>
              <ErrorCell>
                <ErrorText>{props.row.original.location_width}</ErrorText>
                <ErrorIcon>
                  <i className="bx bxs-info-circle" style={{ fontSize: 32, color: COLORS.FAILURE }} />
                </ErrorIcon>
              </ErrorCell>
            </Tooltip>
          );
        } else return props.row.original.location_width === '' ? 0 : props.row.original.location_width;
      },
      footer: (props) => props.column.id,
    }),
    errorColumnHelper.accessor('location_height', {
      header: 'Height',
      meta: 'slim',
      cell: (props: any) => {
        const heightError = props.row.original.reason?.location_height;
        if (heightError) {
          return (
            <Tooltip title={heightError}>
              <ErrorCell>
                <ErrorText>{props.row.original.location_height}</ErrorText>
                <ErrorIcon>
                  <i className="bx bxs-info-circle" style={{ fontSize: 32, color: COLORS.FAILURE }} />
                </ErrorIcon>
              </ErrorCell>
            </Tooltip>
          );
        } else return props.row.original.location_height === '' ? 0 : props.row.original.location_height;
      },
      footer: (props) => props.column.id,
    }),
    errorColumnHelper.accessor('location_depth', {
      header: 'Depth',
      meta: 'slim',
      cell: (props: any) => {
        const depthError = props.row.original.reason?.location_depth;
        if (depthError) {
          return (
            <Tooltip title={depthError}>
              <ErrorCell>
                <ErrorText>{props.row.original.location_depth}</ErrorText>
                <ErrorIcon>
                  <i className="bx bxs-info-circle" style={{ fontSize: 32, color: COLORS.FAILURE }} />
                </ErrorIcon>
              </ErrorCell>
            </Tooltip>
          );
        } else return props.row.original.location_depth === '' ? 0 : props.row.original.location_depth;
      },
      footer: (props) => props.column.id,
    }),
  ];

  return (
    <ModalCont>
      <ModalBody>
        <ModalHeader>
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
        </ModalHeader>
        <Box>
          {activeTab === 'success' && (
            <Table
              loading={false}
              data={data.data.successful ? data.data.successful : []}
              columns={successColumns}
              onSelectedRowsChange={handleSelectedRowsChange}
            />
          )}
          {activeTab === 'conflict' && (
            <Table loading={false} data={data.data.conflicts ? data.data.conflicts : []} columns={conflictColumns} />
          )}
          {activeTab === 'error' && (
            <Table loading={false} data={data.data.errors ? data.data.errors : []} columns={errorColumns} />
          )}
        </Box>
        <ResultTable>
          {activeTab === 'success' && (
            <Box style={{ flexDirection: 'row', display: 'flex', gap: 10 }}>
              <Box flexGrow={1}>
                <Typography fontSize={12} fontWeight={400} color={COLORS.GREY}>
                  These locations have passed validation. Click import to create locations.
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
          onClick={() => submitImportLocations()}
        />
      </ModalFooter>
    </ModalCont>
  );
};

export default ImportLocationsResult;
