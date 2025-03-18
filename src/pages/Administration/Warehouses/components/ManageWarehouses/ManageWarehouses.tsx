import React, { KeyboardEventHandler, useEffect, useState, useMemo } from 'react';
import {
  Body,
  BusinessAddressForm,
  ClosureButton,
  ClosureDates,
  Col,
  DateInput,
  DateLabel,
  Header,
  HeaderButtonCont,
  ManageWarehouseCont,
  Notes,
  NotesInput,
  Row,
  ScheduleSection,
  Section,
} from './ManageWarehouses.styles';
import dayjs, { Dayjs } from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  IWarehouseDetails,
  IUpdateWarehouseDetails,
  IWarehouseClosureDetails,
} from '../../../../../shared/types/warehouse.types';
import Breadcrumbs from '../../../../../shared/components/Breadcrumbs/Breadcrumbs';
import { Box, CircularProgress, FormControlLabel, Grid, Link, Skeleton, Typography } from '@mui/material';
import Switch from '../../../../../shared/components/Switch/Switch';
import TextField from '../../../../../shared/components/TextField/TextField';
import { COLORS } from '../../../../../shared/constants/COLORS';
import InfoPanel from '../../../../../shared/components/InfoPanel/InfoPanel';
import { warehousesServices } from '../../../../../shared/services/warehousesServices';
import SaveRevertFooter from '../../../../../shared/components/SaveRevertFooter/SaveRevertFooter';
import { useWarehouseForm } from './useWarehouseForm';
import { useQueryClient } from 'react-query';
import { ls } from '../../../../../shared/utils/ls';
import BasicModal from '../../../../../shared/components/Modals/BasicModal/BasicModal';
import DeleteWarehouseModal from '../modals/DeleteWarehouseModal/DeleteWarehouseModal';
import Button from '../../../../../shared/components/Button/Button';

import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker/DesktopTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Table from '../../../../../shared/components/Table/Table';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import AddClosureModal from '../modals/AddClosureModal/AddClosureModal';
import PrintBarcodeModal from '../../../../../shared/components/Modals/PrintBarcodeModal/PrintBarcodeModal';
import RemoveClosureModal from '../modals/RemoveClosureModal/RemoveClosureModal';
import { convertTo12HourFormat } from '../../../../../shared/utils/helpers';
import { QUERY } from '../../../../../shared/constants/QUERYNAMES';

const { getWarehouseDetails, updateWarehouseStatus, deleteWarehouse, updateWarehouseDetails, removeWarehouseClosure } =
  warehousesServices();

const ManageWarehouses = () => {
  const { getLS } = ls();
  const { email } = JSON.parse(getLS('user'));
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const { data, isLoading } = getWarehouseDetails(searchParams.get('location_id') || '');

  const { mutateAsync: updateWarehouseStatusAsync } = updateWarehouseStatus();
  const { mutateAsync } = updateWarehouseDetails();
  const { mutateAsync: deleteMutate } = deleteWarehouse();
  const { mutateAsync: removeWarehouseClosureMutate } = removeWarehouseClosure();
  const [deleteModal, setDeleteModal] = useState(false);
  const [showAddClosureModal, setShowAddClosureModal] = useState(false);
  const [showPrintDetails, setShowPrintDetails] = useState(false);
  const [warehouse, setWarehouse] = useState<IWarehouseDetails | null>(null);
  const [isDeleting, setisDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showRemoveClosureModal, setShowRemoveClosureModal] = useState(false);
  const [closureToRemove, setClosureToRemove] = useState<IWarehouseClosureDetails | null>(null);
  const [isClosureDeleting, setIsClosureDeleting] = useState(false);

  const queryClient = useQueryClient();
  //useMemo to save warehouse data
  useEffect(() => {
    if (isLoading) {
      return;
    } else {
      setWarehouse(data ? data.data : null);
    }
  }, [data, isLoading]);

  const curPath = window.location.pathname;

  const handleDelete = async () => {
    setisDeleting(true);
    const location_id = warehouse?.location_id || '';
    await deleteMutate(
      { location_id, location_owner: email },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries(QUERY.WAREHOUSE_DETAILS);
          await queryClient.invalidateQueries(QUERY.WAREHOUSE_LIST, { refetchInactive: true });
          navigate('/admin/warehouses');
        },
      },
    );
    setisDeleting(false);
  };

  const handleSave = async (val: IUpdateWarehouseDetails) => {
    setIsSaving(true);
    //get the value that is different from the warehouse object

    console.log(val);
    await mutateAsync({ location_id: warehouse?.location_id || '', payload: val });
    //check if warehouse enabled changed if it is then call mutate
    // if (warehouse?.location_enabled !== val.location_enabled) {
    //  await updateWarehouseStatusAsync({
    //    payload: { location_enabled: Boolean(val.location_enabled), location_id: warehouse?.location_id || '' },
    //  });
    //}

    await queryClient.invalidateQueries(QUERY.WAREHOUSE_DETAILS);
    await queryClient.invalidateQueries(QUERY.WAREHOUSE_LIST, { refetchInactive: true });
    setIsSaving(false);
  };

  const confirmRemoveClosure = async (closure: any) => {
    setShowRemoveClosureModal(true);
    setClosureToRemove(closure);
  };

  const removeClosure = async () => {
    setIsClosureDeleting(true);
    await removeWarehouseClosureMutate(
      {
        location_id: warehouse?.location_id || '',
        closure_id: closureToRemove?.closure_id || '',
      },
      {
        onSettled(data, error, variables, context) {
          queryClient.invalidateQueries(QUERY.WAREHOUSE_DETAILS);
          setShowRemoveClosureModal(false);
          setIsClosureDeleting(false);
          setClosureToRemove(null);
        },
      },
    );
  };

  const cancelClosure = () => {
    setShowRemoveClosureModal(false);
    setIsClosureDeleting(false);
    setClosureToRemove(null);
  };

  const { form, hasChanges } = useWarehouseForm({ onSubmit: handleSave, warehouse: warehouse ? warehouse : undefined });

  const closureColumns = useMemo<ColumnDef<[]>[]>(
    () => [
      {
        accessorKey: 'closure_date',
        header: () => 'Date',
        cell: (props: any) => {
          if (props.row.original.closure_date) {
            return new Intl.DateTimeFormat('en-UK', { year: 'numeric', month: 'long', day: 'numeric' }).format(
              new Date(Number(props.row.original.closure_date)),
            );
          } else return 'Invalid Date';
        },
        footer: (props) => props.column.id,
      },
      {
        accessorFn: 'time',
        meta: 'slim',
        cell: (props: any) => {
          return props.row.original.closure_closed
            ? 'Closed'
            : `${convertTo12HourFormat(props.row.original.closure_start)} - ${convertTo12HourFormat(
                props.row.original.closure_end,
              )}`;
        },
        header: 'Hours',
        footer: (props) => props.column.id,
      },
      {
        accessorKey: 'closure_description',
        header: () => 'Reason',
        footer: (props) => props.column.id,
        enableColumnFilter: true,
      },

      {
        accessorKey: 'closure_id',
        meta: 'action-cell',
        header: '',
        cell: (props: any) => {
          return (
            <Box sx={{ innerWidth: '20px', textAlign: 'center' }}>
              <Link
                component="button"
                style={{ textDecoration: 'none', color: '#767676', fontSize: 20 }}
                onClick={() => {
                  confirmRemoveClosure(props.row.original);
                }}
              >
                <i className="bx bx-trash"></i>
              </Link>
            </Box>
          );
        },
        footer: (props) => props.column.id,
        enableColumnFilter: false,
        enableGlobalFilter: false,
      },
    ],
    [],
  );

  const handleRevert = () => {
    form.resetForm();
  };

  const {
    location_name,
    location_size,
    location_deleted,
    location_enabled,
    location_address,
    location_notes,
    location_opening_hours,
  } = form.values;
  return !isLoading ? (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ManageWarehouseCont>
        <Box gap={'15px'} display={'flex'} flexDirection={'column'}>
          <Header>
            <Typography fontSize={36} fontWeight={900}>
              {warehouse?.location_name || ''}
            </Typography>
            <Breadcrumbs page={warehouse?.location_name || ''} />
          </Header>
          <Body flexDirection={'column'}>
            <HeaderButtonCont>
              {/* <Button
                loading={isDeleting}
                startIcon="bx bx-printer"
                variant={'solid-thin'}
                text={'Print Details'}
                color={'primary'}
                onClick={() => setShowPrintDetails(true)}
              /> */}
              <Button
                loading={isDeleting}
                startIcon="bx bx-trash"
                variant={'outlined-thin'}
                text={'Delete Warehouse'}
                color={'failure'}
                disabled={
                  warehouse?.location_deleted ||
                  warehouse?.location_enabled ||
                  (warehouse?.location_children && warehouse?.location_children?.length > 0)
                }
                onClick={() => setDeleteModal(true)}
              />
            </HeaderButtonCont>
            <Box flexDirection={'row'} display={'flex'} gap={'30px'}>
              <Section>
                <FormControlLabel
                  style={{ pointerEvents: 'none' }}
                  control={
                    <Switch
                      disabled={location_deleted}
                      sx={{ m: 1, pointerEvents: 'auto' }}
                      onChange={form.handleChange}
                      checked={location_enabled}
                      name="location_enabled"
                    />
                  }
                  label={`Warehouse is ${location_enabled ? 'enabled' : 'disabled'}`}
                />
                <Box>
                  <TextField
                    disabled={location_deleted}
                    label={'Warehouse Name'}
                    value={location_name}
                    fullWidth
                    onChange={form.handleChange}
                    name="location_name"
                  />
                </Box>
                <Box>
                  <TextField
                    disabled={location_deleted}
                    label={'Gross Square Meterage (sq. m)'}
                    value={location_size?.gross}
                    fullWidth
                    onChange={(e) =>
                      form.setFieldValue('location_size', { ...location_size, gross: Number(e.target.value) })
                    }
                    name="location_size"
                  />
                </Box>
                <BusinessAddressForm>
                  <TextField
                    disabled={location_deleted}
                    placeholder="Address Line 1"
                    onChange={(e) =>
                      form.setFieldValue('location_address', { ...location_address, addr_line1: e.target.value })
                    }
                    value={location_address?.addr_line1}
                    name={'location_address'}
                    label="Business Address"
                  />
                  <TextField
                    disabled={location_deleted}
                    placeholder="Address Line 2"
                    onChange={(e) =>
                      form.setFieldValue('location_address', { ...location_address, addr_line2: e.target.value })
                    }
                    value={location_address?.addr_line2}
                    name={'location_address'}
                  />
                  <TextField
                    disabled={location_deleted}
                    placeholder="City"
                    onChange={(e) =>
                      form.setFieldValue('location_address', { ...location_address, addr_city: e.target.value })
                    }
                    value={location_address?.addr_city}
                    name={'location_address'}
                  />
                  <TextField
                    disabled={location_deleted}
                    placeholder="Country"
                    onChange={(e) =>
                      form.setFieldValue('location_address', { ...location_address, addr_country: e.target.value })
                    }
                    value={location_address?.addr_country}
                    name={'location_address'}
                  />
                  <TextField
                    disabled={location_deleted}
                    placeholder="Post Code"
                    onChange={(e) =>
                      form.setFieldValue('location_address', { ...location_address, addr_postcode: e.target.value })
                    }
                    value={location_address?.addr_postcode}
                    name={'location_address'}
                  />
                </BusinessAddressForm>
                <Typography fontSize={12} fontWeight={800} color={'#767676'}>
                  Warehouse Created
                </Typography>
                {warehouse?.location_created && (
                  <Typography fontSize={16} fontWeight={400}>
                    {`${new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(
                      new Date(Number(warehouse?.location_created)),
                    )}`}
                  </Typography>
                )}
                <Notes>
                  <Typography fontSize={13} color={COLORS.GREY} fontWeight={600}>
                    Notes
                  </Typography>
                  <NotesInput
                    disabled={location_deleted}
                    fullWidth
                    multiline
                    rows={2}
                    InputProps={{ sx: { backgroundColor: 'white' } }}
                    value={location_notes}
                    onChange={form.handleChange}
                    name="location_notes"
                  />
                </Notes>
              </Section>
              <ScheduleSection>
                <Typography fontSize={12} fontWeight={800} color={'#767676'}>
                  Warehouse Active Hours
                </Typography>
                <Box>
                  <Col>
                    <Grid container spacing={1} alignItems="center" justifyContent={'center'}>
                      <Grid item style={{ width: '85px' }}>
                        <Typography fontSize={14} fontWeight={400} color={'#767676'}>
                          Monday
                        </Typography>
                      </Grid>
                      <Grid item md>
                        <DesktopTimePicker
                          sx={{ width: '100%', backgroundColor: 'white' }}
                          reduceAnimations
                          slotProps={{ textField: { size: 'small' } }}
                          onChange={(value: Dayjs | null) =>
                            form.setFieldValue('location_opening_hours', {
                              ...location_opening_hours,
                              monday: { start: value?.format('HH:mm'), end: location_opening_hours.monday.end },
                            })
                          }
                          value={
                            location_opening_hours.monday.start
                              ? dayjs(location_opening_hours?.monday.start, 'HH:mm')
                              : null
                          }
                        />
                      </Grid>
                      <Grid item md>
                        <DesktopTimePicker
                          sx={{ width: '100%', backgroundColor: 'white' }}
                          reduceAnimations
                          slotProps={{ textField: { size: 'small' } }}
                          onChange={(value: Dayjs | null) =>
                            form.setFieldValue('location_opening_hours', {
                              ...location_opening_hours,
                              monday: { end: value?.format('HH:mm'), start: location_opening_hours.monday.start },
                            })
                          }
                          value={
                            location_opening_hours.monday.end
                              ? dayjs(location_opening_hours?.monday.end, 'HH:mm')
                              : null
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item style={{ width: '85px' }}>
                        <Typography fontSize={14} fontWeight={400} color={'#767676'}>
                          Tuesday
                        </Typography>
                      </Grid>
                      <Grid item md>
                        <DesktopTimePicker
                          sx={{ width: '100%', backgroundColor: 'white' }}
                          reduceAnimations
                          slotProps={{ textField: { size: 'small' } }}
                          onChange={(value: Dayjs | null) =>
                            form.setFieldValue('location_opening_hours', {
                              ...location_opening_hours,
                              tuesday: { start: value?.format('HH:mm'), end: location_opening_hours.tuesday.end },
                            })
                          }
                          value={
                            location_opening_hours.tuesday.start
                              ? dayjs(location_opening_hours?.tuesday.start, 'HH:mm')
                              : null
                          }
                        />
                      </Grid>
                      <Grid item md>
                        <DesktopTimePicker
                          sx={{ width: '100%', backgroundColor: 'white' }}
                          reduceAnimations
                          slotProps={{ textField: { size: 'small' } }}
                          onChange={(value: Dayjs | null) =>
                            form.setFieldValue('location_opening_hours', {
                              ...location_opening_hours,
                              tuesday: { end: value?.format('HH:mm'), start: location_opening_hours.tuesday.start },
                            })
                          }
                          value={
                            location_opening_hours.tuesday.end
                              ? dayjs(location_opening_hours?.tuesday.end, 'HH:mm')
                              : null
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item style={{ width: '85px' }}>
                        <Typography fontSize={14} fontWeight={400} color={'#767676'}>
                          Wednesday
                        </Typography>
                      </Grid>
                      <Grid item md>
                        <DesktopTimePicker
                          sx={{ width: '100%', backgroundColor: 'white' }}
                          reduceAnimations
                          slotProps={{ textField: { size: 'small' } }}
                          onChange={(value: Dayjs | null) =>
                            form.setFieldValue('location_opening_hours', {
                              ...location_opening_hours,
                              wednesday: { start: value?.format('HH:mm'), end: location_opening_hours.wednesday.end },
                            })
                          }
                          value={
                            location_opening_hours.wednesday.start
                              ? dayjs(location_opening_hours?.wednesday.start, 'HH:mm')
                              : null
                          }
                        />
                      </Grid>
                      <Grid item md>
                        <DesktopTimePicker
                          sx={{ width: '100%', backgroundColor: 'white' }}
                          reduceAnimations
                          slotProps={{ textField: { size: 'small' } }}
                          onChange={(value: Dayjs | null) =>
                            form.setFieldValue('location_opening_hours', {
                              ...location_opening_hours,
                              wednesday: { end: value?.format('HH:mm'), start: location_opening_hours.wednesday.start },
                            })
                          }
                          value={
                            location_opening_hours.wednesday.end
                              ? dayjs(location_opening_hours?.wednesday.end, 'HH:mm')
                              : null
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item style={{ width: '85px' }}>
                        <Typography fontSize={14} fontWeight={400} color={'#767676'}>
                          Thursday
                        </Typography>
                      </Grid>
                      <Grid item md>
                        <DesktopTimePicker
                          sx={{ width: '100%', backgroundColor: 'white' }}
                          reduceAnimations
                          slotProps={{ textField: { size: 'small' } }}
                          onChange={(value: Dayjs | null) =>
                            form.setFieldValue('location_opening_hours', {
                              ...location_opening_hours,
                              thursday: { start: value?.format('HH:mm'), end: location_opening_hours.thursday.end },
                            })
                          }
                          value={
                            location_opening_hours.thursday.start
                              ? dayjs(location_opening_hours?.thursday.start, 'HH:mm')
                              : null
                          }
                        />
                      </Grid>
                      <Grid item md>
                        <DesktopTimePicker
                          sx={{ width: '100%', backgroundColor: 'white' }}
                          reduceAnimations
                          slotProps={{ textField: { size: 'small' } }}
                          onChange={(value: Dayjs | null) =>
                            form.setFieldValue('location_opening_hours', {
                              ...location_opening_hours,
                              thursday: { end: value?.format('HH:mm'), start: location_opening_hours.thursday.start },
                            })
                          }
                          value={
                            location_opening_hours.thursday.end
                              ? dayjs(location_opening_hours?.thursday.end, 'HH:mm')
                              : null
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item style={{ width: '85px' }}>
                        <Typography fontSize={14} fontWeight={400} color={'#767676'}>
                          Friday
                        </Typography>
                      </Grid>
                      <Grid item md>
                        <DesktopTimePicker
                          sx={{ width: '100%', backgroundColor: 'white' }}
                          reduceAnimations
                          slotProps={{ textField: { size: 'small' } }}
                          onChange={(value: Dayjs | null) =>
                            form.setFieldValue('location_opening_hours', {
                              ...location_opening_hours,
                              friday: { start: value?.format('HH:mm'), end: location_opening_hours.friday.end },
                            })
                          }
                          value={
                            location_opening_hours.friday.start
                              ? dayjs(location_opening_hours?.friday.start, 'HH:mm')
                              : null
                          }
                        />
                      </Grid>
                      <Grid item md>
                        <DesktopTimePicker
                          sx={{ width: '100%', backgroundColor: 'white' }}
                          reduceAnimations
                          slotProps={{ textField: { size: 'small' } }}
                          onChange={(value: Dayjs | null) =>
                            form.setFieldValue('location_opening_hours', {
                              ...location_opening_hours,
                              friday: { end: value?.format('HH:mm'), start: location_opening_hours.friday.start },
                            })
                          }
                          value={
                            location_opening_hours.friday.end
                              ? dayjs(location_opening_hours?.friday.end, 'HH:mm')
                              : null
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item style={{ width: '85px' }}>
                        <Typography fontSize={14} fontWeight={400} color={'#767676'}>
                          Saturday
                        </Typography>
                      </Grid>
                      <Grid item md>
                        <DesktopTimePicker
                          sx={{ width: '100%', backgroundColor: 'white' }}
                          reduceAnimations
                          slotProps={{ textField: { size: 'small' } }}
                          onChange={(value: Dayjs | null) =>
                            form.setFieldValue('location_opening_hours', {
                              ...location_opening_hours,
                              saturday: { start: value?.format('HH:mm'), end: location_opening_hours.saturday.end },
                            })
                          }
                          value={
                            location_opening_hours.saturday.start
                              ? dayjs(location_opening_hours?.saturday.start, 'HH:mm')
                              : null
                          }
                        />
                      </Grid>
                      <Grid item md>
                        <DesktopTimePicker
                          sx={{ width: '100%', backgroundColor: 'white' }}
                          reduceAnimations
                          slotProps={{ textField: { size: 'small' } }}
                          onChange={(value: Dayjs | null) =>
                            form.setFieldValue('location_opening_hours', {
                              ...location_opening_hours,
                              saturday: { end: value?.format('HH:mm'), start: location_opening_hours.saturday.start },
                            })
                          }
                          value={
                            location_opening_hours.saturday.end
                              ? dayjs(location_opening_hours?.saturday.end, 'HH:mm')
                              : null
                          }
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item style={{ width: '85px' }}>
                        <Typography fontSize={14} fontWeight={400} color={'#767676'}>
                          Sunday
                        </Typography>
                      </Grid>
                      <Grid item md>
                        <DesktopTimePicker
                          sx={{ width: '100%', backgroundColor: 'white' }}
                          reduceAnimations
                          slotProps={{ textField: { size: 'small' } }}
                          onChange={(value: Dayjs | null) =>
                            form.setFieldValue('location_opening_hours', {
                              ...location_opening_hours,
                              sunday: { start: value?.format('HH:mm'), end: location_opening_hours.sunday.end },
                            })
                          }
                          value={
                            location_opening_hours.sunday.start
                              ? dayjs(location_opening_hours?.sunday.start, 'HH:mm')
                              : null
                          }
                        />
                      </Grid>
                      <Grid item md>
                        <DesktopTimePicker
                          sx={{ width: '100%', backgroundColor: 'white' }}
                          reduceAnimations
                          slotProps={{ textField: { size: 'small' } }}
                          onChange={(value: Dayjs | null) =>
                            form.setFieldValue('location_opening_hours', {
                              ...location_opening_hours,
                              sunday: { end: value?.format('HH:mm'), start: location_opening_hours.sunday.start },
                            })
                          }
                          value={
                            location_opening_hours.sunday.end
                              ? dayjs(location_opening_hours?.sunday.end, 'HH:mm')
                              : null
                          }
                        />
                      </Grid>
                    </Grid>
                  </Col>
                </Box>
                <ClosureDates>
                  <Typography fontSize={12} fontWeight={800} color={'#767676'}>
                    Warehouse Closures
                  </Typography>
                  {warehouse?.location_closures &&
                    (warehouse.location_closures.length > 0 ? (
                      <Table
                        data={warehouse.location_closures}
                        columns={closureColumns}
                        loading={false}
                        showPagination={false}
                      />
                    ) : (
                      <React.Fragment />
                    ))}
                  <ClosureButton>
                    <Button
                      loading={isDeleting}
                      variant={'solid-thin'}
                      text={'Add New Closure'}
                      color={'info'}
                      onClick={() => setShowAddClosureModal(true)}
                    />
                  </ClosureButton>
                </ClosureDates>
              </ScheduleSection>
            </Box>
          </Body>
        </Box>

        <SaveRevertFooter isSaving={isSaving} onSave={form.handleSubmit} onRevert={handleRevert} show={hasChanges} />
        {showAddClosureModal && (
          <BasicModal
            open={showAddClosureModal}
            headerText="Add New Closure"
            onClose={() => setShowAddClosureModal(false)}
          >
            <AddClosureModal locationId={warehouse?.location_id} close={() => setShowAddClosureModal(false)} />
          </BasicModal>
        )}

        {showRemoveClosureModal && (
          <BasicModal
            open={showRemoveClosureModal}
            headerText="Remove Closure Day"
            onClose={() => setShowRemoveClosureModal(false)}
          >
            <RemoveClosureModal
              closure={closureToRemove?.closure_description || undefined}
              close={cancelClosure}
              isClosureDeleting={isClosureDeleting}
              deleteClosure={removeClosure}
            />
          </BasicModal>
        )}
        {/* {showPrintDetails && (
          <BasicModal open={showPrintDetails}>
            <PrintBarcodeModal close={() => setShowPrintDetails(false)} location={warehouse}></PrintBarcodeModal>
          </BasicModal>
        )} */}
        {deleteModal && (
          <BasicModal open={deleteModal}>
            <DeleteWarehouseModal
              deleteWarehouse={handleDelete}
              warehouse={warehouse?.location_name || ''}
              close={() => setDeleteModal(false)}
            />
          </BasicModal>
        )}
      </ManageWarehouseCont>
    </LocalizationProvider>
  ) : (
    <CircularProgress size={25} />
  );
};

export default ManageWarehouses;
