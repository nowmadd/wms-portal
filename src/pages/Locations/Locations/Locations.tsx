import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Header,
  HeaderButtonCont,
  LocationName,
  LocationNameContainer,
  LocationsMainCont,
  Stats,
  StatsContainer,
} from './Locations.styles';
import Typography from '@mui/material/Typography/Typography';
import Button from '../../../shared/components/Button/Button';
import Link from '@mui/material/Link/Link';
import Table from '../../../shared/components/Table/Table';
import InfoPanel from '../../../shared/components/InfoPanel/InfoPanel';
import ErrorMessagePanel from '../../../shared/components/ErrorMessagePanel/ErrorMessagePanel';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import BasicModal from '../../../shared/components/Modals/BasicModal/BasicModal';
import { FilterFn, createColumnHelper } from '@tanstack/react-table';
import { locationsServices } from '../../../shared/services/locationsServices';
import { ILocationDetails } from '../../../shared/types/locations.types';
import Skeleton from '@mui/material/Skeleton/Skeleton';
import CreateLocationModal from './components/CreateLocationModal/CreateLocationModal';
import { useFilters } from './useFilters';
import Pill from '../../../shared/components/Pill/Pill';
import { LINKS } from '../../../shared/constants/LINKS';
import { usePermissionCheck } from '../../../shared/hooks/usePermissionCheck';
import { useQueryClient } from 'react-query';
import { QUERY } from '../../../shared/constants/QUERYNAMES';
import ImportLocationsModal from './components/ImportLocationsModal/ImportLocationsModal';

declare module '@tanstack/table-core' {
  interface FilterFns {
    array: FilterFn<unknown>;
    checkBoolean: FilterFn<unknown>;
    checkIfEmpty: FilterFn<unknown>;
  }
}
const { getLocationsList } = locationsServices();
const Locations = () => {
  const { adminSupervisorOwner } = usePermissionCheck();
  const { tab, breadcrumbs } = useParams() as { tab: string; breadcrumbs: string };
  const [showCreateLocations, setShowCreateLocations] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const { data, isLoading, error } = getLocationsList(true);
  const { warehouseFilterOptions } = useFilters();
  const navigate = useNavigate();
  const [tableLoading, setTableLoading] = useState(false);
  const queryClient = useQueryClient();

  const locationsData = useMemo(() => {
    if (isLoading) {
      return;
    } else {
      return data ? data.data : undefined;
    }
  }, [data, isLoading]);

  const refreshTable = async () => {
    setTableLoading(true);
    await queryClient.invalidateQueries(QUERY.LOCATION_LIST, { refetchInactive: true });
    await queryClient.removeQueries(QUERY.LOCATION_DETAILS);
    setTableLoading(false);
  };

  const filterEmptyChildren = [
    { term: 'location_contents', value: '', label: 'All Contents' },
    { term: 'location_contents', value: 'empty', label: 'Empty Locations' },
  ];

  const columnHelper = createColumnHelper<ILocationDetails>();
  const locationsColumns = [
    columnHelper.accessor('location_name', {
      meta: 'slim',
      header: 'Location Ref',
      cell: (props: any) => {
        return (
          <Link
            sx={{ textDecoration: 'none', cursor: 'pointer' }}
            onClick={() => navigate(`/locations/locations/location?id=${props.row.original.location_id}`)}
          >
            <LocationNameContainer>
              <LocationName>{props.row.original.location_name}</LocationName>
              {!props.row.original.location_enabled && <Pill variant={'round'} color={'grey'} text={'Disabled'} />}
            </LocationNameContainer>
          </Link>
        );
      },
      footer: (props) => props.column.id,
      enableGlobalFilter: true,
    }), //
    columnHelper.accessor('location_contents', {
      header: 'Contents',
      footer: (props) => props.column.id,
      enableGlobalFilter: true,
      filterFn: 'checkIfEmpty',
    }),
    // columnHelper.accessor('location_parent.warehouse', {
    //   id: 'location_parent',
    //   header: 'Warehouse',
    //   meta: 'slim',
    //   footer: (props) => props.column.id,
    //   enableGlobalFilter: true,
    //   enableColumnFilter: true,
    //   filterFn: 'equals',
    // }),
    columnHelper.accessor('location_id', {
      meta: 'action',
      header: '',
      footer: (props) => props.column.id,
      enableGlobalFilter: false,
    }),
  ];

  return breadcrumbs ? (
    <React.Fragment />
  ) : (
    <LocationsMainCont>
      <Header>
        <Typography fontSize={24} fontWeight={900}>
          Managed Locations
        </Typography>
        <HeaderButtonCont>
          {adminSupervisorOwner ? (
            <>
              <Button
                onClick={() => setShowImport(true)}
                startIcon="bx bx-plus"
                variant={'outlined-thin'}
                text={'Import Locations'}
                color={'primary'}
              />
              <Button
                onClick={() => setShowCreateLocations(true)}
                startIcon="bx bx-plus"
                variant={'solid-thin'}
                text={'Create Location'}
                color={'primary'}
              />
            </>
          ) : (
            <React.Fragment />
          )}
          {/* <Button startIcon="bx bx-download" variant={'outlined-thin'} text={'Export Location CSV'} color={'primary'} /> */}
        </HeaderButtonCont>
      </Header>
      <Typography fontSize={14} fontWeight={500}>
        {`Manage locations across all warehouses. `}
        <Link href={LINKS.LEARN_MORE.LOCATIONS} style={{ cursor: 'pointer' }} color={'#0D6EFD'} target="_blank">
          Learn more
        </Link>
      </Typography>
      {locationsData ? (
        locationsData.length > 0 ? (
          <>
            <StatsContainer>
              <Stats>
                <Typography fontSize={10} fontWeight={700} color={'#767676'}>
                  All Locations
                </Typography>
                <Typography fontSize={36} fontWeight={900}>
                  {(locationsData && !tableLoading && locationsData?.length) || <Skeleton width={40} />}
                </Typography>
              </Stats>
              <Stats>
                <Typography fontSize={10} fontWeight={700} color={'#767676'}>
                  Empty Locations
                </Typography>
                <Typography fontSize={36} fontWeight={900}>
                  {locationsData && !tableLoading ? (
                    locationsData.filter(
                      (location) => location.location_contents && location.location_contents.length === 0,
                    ).length
                  ) : (
                    <Skeleton width={40} />
                  )}
                </Typography>
              </Stats>
            </StatsContainer>
            <Table
              loading={isLoading}
              data={locationsData ? locationsData : []}
              columns={locationsColumns}
              detailPage="/locations/locations/location"
              refreshTable={refreshTable}
              tableLoading={tableLoading}
              search={{ term: 'location_name', placeholder: 'Search for a user, by name or email address...' }}
              filters={[
                {
                  term: 'location_parent',
                  placeholder: 'All Warehouse',
                  options: warehouseFilterOptions || [],
                },
                {
                  term: 'location_children',
                  placeholder: 'All Location',
                  options: filterEmptyChildren || [],
                },
              ]}
            />
          </>
        ) : (
          <InfoPanel noIcon={true} color={'grey'} info={'No Data Found'}></InfoPanel>
        )
      ) : error ? (
        <ErrorMessagePanel errorCode={error.response?.status}></ErrorMessagePanel>
      ) : (
        <CircularProgress size={25} />
      )}
      {showCreateLocations && (
        <BasicModal
          headerMarginBottom={15}
          breadCrumbs={['Locations', 'Create']}
          open={showCreateLocations}
          onClose={() => setShowCreateLocations(false)}
        >
          <CreateLocationModal onClose={() => setShowCreateLocations(false)} />
        </BasicModal>
      )}
      {showImport && (
        <BasicModal
          breadCrumbs={['Locations', 'Import Locations']}
          onClose={() => setShowImport(false)}
          open={showImport}
        >
          <ImportLocationsModal onClose={() => setShowImport(false)} />
        </BasicModal>
      )}
    </LocationsMainCont>
  );
};

export default Locations;
