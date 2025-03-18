import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import React, { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ButtonCont,
  Column,
  FormChild,
  FormCont,
  Header,
  InputColumn,
  InventoryCont,
  Locations,
  LocationsCont,
  Section,
  Stock,
  StockCont,
  StockLevelCount,
  StockLevels,
  WarehouseText,
} from './ManageInventory.styles';
import Typography from '@mui/material/Typography/Typography';
import Breadcrumbs from '../../../../shared/components/Breadcrumbs/Breadcrumbs';
import TextField from '../../../../shared/components/TextField/TextField';
import { IUpdateInventoryDetails } from '../../../../shared/types/inventory.types';
import { useInventoryForm } from './useInventoryForm';
import Box from '@mui/material/Box/Box';
import { COLORS } from '../../../../shared/constants/COLORS';
import Pill from '../../../../shared/components/Pill/Pill';
import SaveRevertFooter from '../../../../shared/components/SaveRevertFooter/SaveRevertFooter';
import { inventoryServices } from '../../../../shared/services/inventoryServices';
import { useQueryClient } from 'react-query';
import ErrorMessagePanel from '../../../../shared/components/ErrorMessagePanel/ErrorMessagePanel';
import { usePermissionCheck } from '../../../../shared/hooks/usePermissionCheck';
import { QUERY } from '../../../../shared/constants/QUERYNAMES';

const { getInventoryDetails, updateInventoryDetails } = inventoryServices();

const ManageInventory = () => {
  const { adminSupervisorOwner } = usePermissionCheck();

  const [searchParams, setSearchParams] = useSearchParams();
  const { mutateAsync: updateInventoryDetailsAsync } = updateInventoryDetails();
  const [isSaving, setisSaving] = useState(false);
  const queryClient = useQueryClient();

  const searchId = searchParams.get('id') || '';

  const { data, isLoading, error } = getInventoryDetails(searchId);

  const inventory = useMemo(() => {
    if (isLoading) {
      return;
    } else {
      return data ? data.data : undefined;
    }
  }, [data, isLoading]);

  const handleSave = async (values: IUpdateInventoryDetails) => {
    setisSaving(true);
    const { inventory_net_weight, inventory_unit_size } = values;

    await updateInventoryDetailsAsync({
      inventory_id: searchId,
      payload: {
        inventory_net_weight: Number(inventory_net_weight),
        inventory_unit_size: Number(inventory_unit_size),
        ...values,
      },
    });
    await queryClient.invalidateQueries([QUERY.INVENTORY_DETAILS, searchId]);
    await queryClient.invalidateQueries(QUERY.INVENTORY_LIST, { refetchInactive: true });
    setisSaving(false);
  };

  const { form, hasChanges } = useInventoryForm({
    onSubmit: handleSave,
    inventory: inventory ? inventory : undefined,
  });
  const handleRevert = () => {
    form.resetForm();
  };

  const {
    inventory_description,
    inventory_barcode_primary,
    inventory_sku_primary,
    inventory_barcode_alt,
    inventory_net_weight,
    inventory_unit_size,
  } = form.values;

  return isLoading ? (
    <CircularProgress size={25} />
  ) : inventory?.inventory_description ? (
    <InventoryCont>
      <Header>
        <Typography fontSize={36} fontWeight={900}>
          {inventory?.inventory_description}
        </Typography>
        <Breadcrumbs page={inventory?.inventory_description || ''} />
      </Header>
      <ButtonCont>
        {/*to remove */}
        <Box style={{ marginTop: 50 }} />
        {/* <Button
          //   disabled={location_enabled}
          text="Delete Item"
          variant="outlined-thin"
          color="failure"
          //   onClick={() => setshowDeleteConfirm(true)}
        /> */}
      </ButtonCont>
      <FormCont>
        <Column>
          <Section>
            <InputColumn>
              <TextField
                disabled={!adminSupervisorOwner}
                label={'Description'}
                value={inventory_description}
                fullWidth
                name="inventory_description"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                helperText={form.touched.inventory_description && form.errors.inventory_description}
                required
                error={Boolean(form.touched.inventory_description && form.errors.inventory_description)}
              />
            </InputColumn>
            <InputColumn>
              <TextField
                disabled={!adminSupervisorOwner}
                label={'Barcode Reference'}
                value={inventory_barcode_primary}
                fullWidth
                name="inventory_barcode_primary"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                helperText={form.touched.inventory_barcode_primary && form.errors.inventory_barcode_primary}
                error={Boolean(form.touched.inventory_barcode_primary && form.errors.inventory_barcode_primary)}
                required
              />
              {/* <LocationsCont>
                <Typography marginLeft={1} fontSize={12} fontWeight={800} color={'#767676'}>
                  Warehouse
                </Typography>
                <WarehouseText>
                  <Typography marginLeft={1} fontSize={16} fontWeight={400}>
                    {inventory?.inventory_warehouse}
                  </Typography>
                </WarehouseText>
              </LocationsCont> */}
              <TextField
                required
                label={'SKU'}
                value={inventory_sku_primary}
                fullWidth
                disabled={!adminSupervisorOwner}
                name="inventory_sku_primary"
                onChange={form.handleChange}
                helperText={form.touched.inventory_sku_primary && form.errors.inventory_sku_primary}
                onBlur={form.handleBlur}
                error={Boolean(form.touched.inventory_sku_primary && form.errors.inventory_sku_primary)}
              />
            </InputColumn>
            {/* <InputColumn>
              <LocationsCont>
                <Typography marginLeft={1} fontSize={12} fontWeight={800} color={'#767676'}>
                  Preferred Locations
                </Typography>
                <Locations>
                  {inventory?.inventory_locations_preferred && (
                    <Pill
                      variant={'square'}
                      color={'success'}
                      text={inventory?.inventory_locations_preferred || ''}
                    ></Pill>
                  )}
                </Locations>
              </LocationsCont> */}

            {/* <LocationsCont>
                <Typography marginLeft={1} fontSize={12} fontWeight={800} color={'#767676'}>
                  Overflow Locations
                </Typography>
                <Locations>
                  {inventory?.inventory_locations_overflow?.map((loc, index) => (
                    <Pill variant={'square'} color={'pending'} text={loc}></Pill>
                  ))}
                </Locations>
              </LocationsCont>
            </InputColumn> */}
            <InputColumn>
              <TextField
                disabled={!adminSupervisorOwner}
                label={'Alternative Barcode/SKU'}
                value={inventory_barcode_alt}
                fullWidth
                name="inventory_barcode_alt"
                onChange={form.handleChange}
                helperText={
                  Boolean(form.touched.inventory_barcode_alt && form.errors.inventory_barcode_alt)
                    ? form.touched.inventory_barcode_alt && form.errors.inventory_barcode_alt
                    : `This field is optional`
                }
                onBlur={form.handleBlur}
                error={Boolean(form.touched.inventory_barcode_alt && form.errors.inventory_barcode_alt)}
              />
              <Box sx={{ flex: 1 }} />
              {/* <TextField
                required
                label={'SKU'}
                value={inventory_sku_primary}
                fullWidth
                disabled={!adminSupervisorOwner}
                name="inventory_sku_primary"
                onChange={form.handleChange}
                helperText={form.touched.inventory_sku_primary && form.errors.inventory_sku_primary}
                onBlur={form.handleBlur}
                error={Boolean(form.touched.inventory_sku_primary && form.errors.inventory_sku_primary)}
              /> */}

              {/* <TextField
                required
                disabled={!adminSupervisorOwner}
                endAdorment={
                  <Typography fontSize={14} fontWeight={400} color={COLORS.GREY}>
                    Kg
                  </Typography>
                }
                name="inventory_net_weight"
                label="SKU Net Weight"
                onChange={form.handleChange}
                value={inventory_net_weight}
                InputProps={{ sx: { borderRadius: '6px', backgroundColor: 'white' } }}
                helperText={form.touched.inventory_net_weight && form.errors.inventory_net_weight}
                onBlur={form.handleBlur}
                error={Boolean(form.touched.inventory_net_weight && form.errors.inventory_net_weight)}
              /> */}
            </InputColumn>
            {/* <InputColumn>
              <TextField
                disabled={!adminSupervisorOwner}
                label={'Unit Size'}
                value={inventory_unit_size}
                fullWidth
                name="inventory_unit_size"
                onChange={form.handleChange}
                helperText={
                  Boolean(form.touched.inventory_unit_size && form.errors.inventory_unit_size)
                    ? form.touched.inventory_unit_size && form.errors.inventory_unit_size
                    : `This field is optional`
                }
                onBlur={form.handleBlur}
                error={Boolean(form.touched.inventory_unit_size && form.errors.inventory_unit_size)}
              /> */}

            {/* <TextField
                disabled={!adminSupervisorOwner}
                label={'Alternative Barcode/SKU'}
                value={inventory_barcode_alt}
                fullWidth
                name="inventory_barcode_alt"
                onChange={form.handleChange}
                helperText={
                  Boolean(form.touched.inventory_barcode_alt && form.errors.inventory_barcode_alt)
                    ? form.touched.inventory_barcode_alt && form.errors.inventory_barcode_alt
                    : `This field is optional`
                }
                onBlur={form.handleBlur}
                error={Boolean(form.touched.inventory_barcode_alt && form.errors.inventory_barcode_alt)}
              />
            </InputColumn> */}
            <Typography fontSize={12} fontWeight={800} color={'#767676'}>
              Created
            </Typography>
            {inventory?.inventory_created && (
              <Typography fontSize={16} fontWeight={400}>
                {`${new Intl.DateTimeFormat('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                }).format(new Date(Number(inventory?.inventory_created)))}`}
              </Typography>
            )}
          </Section>
        </Column>
        <StockLevels>
          <Section>
            <FormChild>
              <Typography fontSize={18} fontWeight={800}>
                Stock Levels
              </Typography>
              {inventory?.inventory_stock ? (
                inventory?.inventory_stock.map((loc, index) => (
                  <StockCont key={'location-stock-' + index}>
                    {loc.stock.stock_unallocated > 0 || loc.stock.stock_allocated > 0 || loc.stock.stock_damaged > 0 ? (
                      <Typography fontSize={14} fontWeight={700} color={COLORS.GREY}>
                        {loc.location_id}
                      </Typography>
                    ) : (
                      <React.Fragment />
                    )}
                    <Box>
                      {loc.stock.stock_unallocated > 0 && (
                        <Stock>
                          <i className="bx bxs-checkbox" style={{ fontSize: 32, color: COLORS.SUCCESS }} />
                          <StockLevelCount>
                            <Typography fontSize={13} fontWeight={600} color={COLORS.GREY}>
                              Available
                            </Typography>
                            <Typography fontSize={13} fontWeight={600} color={COLORS.GREY}>
                              {loc.stock.stock_unallocated}
                            </Typography>
                          </StockLevelCount>
                        </Stock>
                      )}
                      {loc.stock.stock_allocated > 0 && (
                        <Stock>
                          <i className="bx bxs-checkbox" style={{ fontSize: 32, color: COLORS.PENDING }} />
                          <StockLevelCount>
                            <Typography fontSize={13} fontWeight={600} color={COLORS.GREY}>
                              Reserved
                            </Typography>
                            <Typography fontSize={13} fontWeight={600} color={COLORS.GREY}>
                              {loc.stock.stock_allocated}
                            </Typography>
                          </StockLevelCount>
                        </Stock>
                      )}
                      {loc.stock.stock_damaged > 0 && (
                        <Stock>
                          <i className="bx bxs-checkbox" style={{ fontSize: 32, color: COLORS.FAILURE }} />
                          <StockLevelCount>
                            <Typography fontSize={13} fontWeight={600} color={COLORS.GREY}>
                              Damaged
                            </Typography>
                            <Typography fontSize={13} fontWeight={600} color={COLORS.GREY}>
                              {loc.stock.stock_damaged}
                            </Typography>
                          </StockLevelCount>
                        </Stock>
                      )}
                    </Box>
                  </StockCont>
                ))
              ) : (
                <React.Fragment />
              )}
            </FormChild>
          </Section>
        </StockLevels>
      </FormCont>
      <SaveRevertFooter
        isSaving={isSaving}
        onSave={form.handleSubmit}
        onRevert={handleRevert}
        saveDisabled={Object.keys(form.errors).length > 0}
        show={hasChanges}
      />
    </InventoryCont>
  ) : (
    <ErrorMessagePanel errorMessage="Something went wrong" />
  );
};

export default ManageInventory;
