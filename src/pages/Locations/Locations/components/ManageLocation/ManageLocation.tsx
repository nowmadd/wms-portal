import React, { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { locationsServices } from '../../../../../shared/services/locationsServices';
import {
  ButtonCont,
  FieldCont,
  FormChild,
  FormCont,
  Header,
  LocationCont,
  LocationContentsList,
  LocationDimensions,
} from './ManageLocation.styles';
import { CircularProgress, FormControlLabel, Typography } from '@mui/material';
import Breadcrumbs from '../../../../../shared/components/Breadcrumbs/Breadcrumbs';
import Button from '../../../../../shared/components/Button/Button';
import TextField from '../../../../../shared/components/TextField/TextField';
import { useLocationForm } from './useLocationForm';
import SaveRevertFooter from '../../../../../shared/components/SaveRevertFooter/SaveRevertFooter';
import { ILocationDetails, IUpdateLocationDetails } from '../../../../../shared/types/locations.types';
import { useQueryClient } from 'react-query';
import BasicModal from '../../../../../shared/components/Modals/BasicModal/BasicModal';
import DeleteLocationConfirmationModal from './DeleteLocationConfirmationModal';
import PrintBarcodeModal from '../../../../../shared/components/Modals/PrintBarcodeModal/PrintBarcodeModal';
import WidthHeightDepth from '../../../../../shared/components/WidthHeightDepth/WidthHeightDepth';
import Switch from '../../../../../shared/components/Switch/Switch';
import LocationContentItem from './LocationContentItem/LocationContentItem';
import { usePermissionCheck } from '../../../../../shared/hooks/usePermissionCheck';
import { QUERY } from '../../../../../shared/constants/QUERYNAMES';
const { getLocationDetails, deleteLocation, updateLocationDetails } = locationsServices();

const Location = () => {
  const { adminSupervisorOwner } = usePermissionCheck();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchId = searchParams.get('id') || '';
  const { data, isLoading } = getLocationDetails(searchId, false);
  const { mutateAsync, isLoading: isDeleting } = deleteLocation();
  const { mutateAsync: updateLocation, isLoading: isUpdating } = updateLocationDetails();
  const [isSaving, setisSaving] = useState(false);
  const [showDeleteConfirm, setshowDeleteConfirm] = useState(false);
  const [showPrintDetailsModal, setShowPrintDetailsModal] = useState(false);
  const queryClient = useQueryClient();

  const locationDetails = useMemo(() => {
    if (isLoading) return;
    if (data?.data) return data.data;
  }, [data, isLoading]);

  const { location_name, location_size, location_enabled, location_parent, location_inventory } = locationDetails || {};

  const onSubmit = async (values: IUpdateLocationDetails) => {
    const { location_size, location_enabled } = values;
    //convert location_size to number
    if (location_size) {
      location_size.width = Number(location_size.width);
      location_size.height = Number(location_size.height);
      location_size.depth = Number(location_size.depth);
    }

    setisSaving(true);
    await updateLocation({ location_id: searchId, payload: { location_size, location_enabled } });
    await queryClient.invalidateQueries([QUERY.LOCATION_DETAILS, searchId]);
    await queryClient.invalidateQueries(QUERY.LOCATION_LIST, { refetchInactive: true });
    setisSaving(false);
  };
  const { form, hasChanges } = useLocationForm({ onSubmit, location: locationDetails ? locationDetails : undefined });

  const handleDelete = async () => {
    setisSaving(true);
    await mutateAsync({ location_id: searchId });
    await queryClient.invalidateQueries(QUERY.LOCATION_LIST, { refetchInactive: true });
    setisSaving(false);
    setshowDeleteConfirm(false);
    navigate(-1);
  };

  return isLoading ? (
    <CircularProgress size={25} />
  ) : (
    <LocationCont>
      <Header>
        <Typography fontSize={36} fontWeight={900} sx={{ lineHeight: 1.2 }}>
          {location_name}
        </Typography>
        <Breadcrumbs page={location_name || ''} />
      </Header>
      <ButtonCont>
        {adminSupervisorOwner ? (
          <Button
            text="Print Barcode"
            variant="outlined-thin"
            color="primary"
            onClick={() => {
              setShowPrintDetailsModal(true);
            }}
          />
        ) : (
          <React.Fragment />
        )}
        {adminSupervisorOwner ? (
          <Button
            disabled={location_enabled}
            text="Delete Location"
            variant="outlined-thin"
            color="failure"
            onClick={() => setshowDeleteConfirm(true)}
          />
        ) : (
          <React.Fragment />
        )}
      </ButtonCont>
      <FormCont>
        <FormChild>
          <FormControlLabel
            style={{ pointerEvents: 'none' }}
            control={
              <Switch
                sx={{ m: 1, pointerEvents: 'auto' }}
                onChange={form.handleChange}
                checked={form.values.location_enabled}
                name="location_enabled"
                disabled={location_inventory && location_inventory.length > 0}
              />
            }
            label={`Location is ${form.values.location_enabled ? 'enabled' : 'disabled'}`}
          />
          <LocationDimensions>
            <Typography fontSize={18} fontWeight={700}>
              Location Dimensions
            </Typography>
            <FieldCont>
              <WidthHeightDepth
                disable={!adminSupervisorOwner}
                name={{
                  width: 'location_size.width',
                  height: 'location_size.height',
                  depth: 'location_size.depth',
                }}
                values={{
                  width: form.values.location_size?.width,
                  height: form.values.location_size?.height,
                  depth: form.values.location_size?.depth,
                }}
                handleChange={form.handleChange}
                onError={(width, height, depth) => {
                  if (width || height || depth) {
                    form.setErrors({
                      ...form.errors,
                      location_size: {
                        width,
                        height,
                        depth,
                      } as any,
                    });
                  }
                }}
              />
            </FieldCont>
          </LocationDimensions>
        </FormChild>
        {/* <FormChild>
          <Typography fontSize={12} fontWeight={800}>
            Warehouse
          </Typography>
          <Typography fontSize={16} fontWeight={400}>
            {location_parent?.warehouse as string}
          </Typography>
        </FormChild> */}
      </FormCont>
      <Typography fontSize={24} fontWeight={800}>
        Location Contents
      </Typography>

      <LocationContentsList>
        {(location_inventory || []).map((content) => (
          <LocationContentItem key={content.inventory_id} contentData={content} />
        ))}
      </LocationContentsList>

      <SaveRevertFooter
        isSaving={isSaving}
        onSave={form.handleSubmit}
        onRevert={form.resetForm}
        show={hasChanges}
        saveDisabled={Boolean(Object.keys(form.errors).length)}
      />

      {showPrintDetailsModal && (
        <BasicModal open={showPrintDetailsModal}>
          <PrintBarcodeModal
            close={() => setShowPrintDetailsModal(false)}
            location={locationDetails}
          ></PrintBarcodeModal>
        </BasicModal>
      )}
      {showDeleteConfirm ? (
        <BasicModal open={showDeleteConfirm}>
          <DeleteLocationConfirmationModal
            deleteLoading={isDeleting}
            confirmDelete={handleDelete}
            locationName={location_name as string}
            closeModal={() => setshowDeleteConfirm(false)}
          />
        </BasicModal>
      ) : (
        <React.Fragment />
      )}
    </LocationCont>
  );
};

export default Location;
