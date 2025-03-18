import React from 'react';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ActivityMainCont,
  Header,
  PerformedActivityContainer,
  PerformedActivityDescription,
  PerformedActivityTitle,
} from './Activity.styles';
import Typography from '@mui/material/Typography/Typography';
import Link from '@mui/material/Link/Link';
import { ColumnDef } from '@tanstack/react-table';
import Table from '../../../shared/components/Table/Table';
import { GroupDescription, GroupName, GroupNameContainer } from '../Groups/Groups.styles';
import { COLORS } from '../../../shared/constants/COLORS';
import { activitiesServices } from '../../../shared/services/activitiesServices';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import InfoPanel from '../../../shared/components/InfoPanel/InfoPanel';
import ErrorMessagePanel from '../../../shared/components/ErrorMessagePanel/ErrorMessagePanel';
import { useQueryClient } from 'react-query';
import { QUERY } from '../../../shared/constants/QUERYNAMES';

const { getActivityList } = activitiesServices();
const Activity = () => {
  const { tab, breadcrumbs } = useParams() as { tab: string; breadcrumbs: string };
  const { data, isLoading, error } = getActivityList();
  const detailPage = '/admin/activities/activity';
  const navigate = useNavigate();
  const [tableLoading, setTableLoading] = useState(false);
  const queryClient = useQueryClient();

  const activitiesData = useMemo(() => {
    if (isLoading) {
      return;
    } else {
      return data ? data.data : undefined;
    }
  }, [data, isLoading]);

  const refreshTable = async () => {
    setTableLoading(true);
    await queryClient.invalidateQueries(QUERY.ACTIVITY_LIST, { refetchInactive: true });
    setTableLoading(false);
  };

  const sampleData = [
    {
      activity_id: 'A-1234',
      activity_status: 'pending',
      activity_performed_action_title: 'Delete Tenant',
      activity_performed_action_description: 'Deletes a tenant from the account, tenant operation will cease.',
      activity_performed_by: 'joe.warehouse@indigo.co.uk',
      activity_read_only: true,
      activity_timestamp: 1696473612859,
    },
  ];

  const columns = useMemo<ColumnDef<[]>[]>(
    () => [
      {
        meta: 'icon',
        accessorKey: 'activity_status',
        header: 'Status',
        cell: (props: any) => (
          <i
            className="bx bxs-circle"
            style={{
              color:
                props.row.original.activity_status.toLowerCase() === 'pending'
                  ? COLORS.PENDING
                  : props.row.original.activity_status.toLowerCase() === 'error'
                  ? COLORS.FAILURE
                  : COLORS.SUCCESS,
            }}
          ></i>
        ),
        footer: (props) => props.column.id,
        enableColumnFilter: false,
        enableGlobalFilter: false,
      },
      {
        accessorKey: 'activity_performed_action',
        cell: (props: any) => {
          return (
            <PerformedActivityContainer>
              <Link
                style={{ textDecoration: 'none', cursor: 'pointer' }}
                onClick={() => navigate(`${detailPage}?id=${props.row.original.activity_id}`)}
              >
                <PerformedActivityTitle>{props.row.original.activity_performed_action}</PerformedActivityTitle>
              </Link>
              <PerformedActivityDescription>{props.row.original.activity_description}</PerformedActivityDescription>
            </PerformedActivityContainer>
          );
        },
        header: () => 'Performed Action',
        footer: (props) => props.column.id,
        enableColumnFilter: true,
        enableGlobalFilter: true,
        filterFn: 'array',
      },
      {
        accessorKey: 'activity_performed_by',
        header: () => 'Performed by',
        footer: (props) => props.column.id,
        enableColumnFilter: true,
      },
      {
        accessorKey: 'action_read_only',
        meta: 'icon',
        cell: (props: any) => {
          return props.row.original.activity_read_only ? <i className="bx bx-check"></i> : <i className="bx bx-x"></i>;
        },
        header: () => 'Read Only',
        enableColumnFilter: true,
        enableGlobalFilter: false,
        filterFn: 'checkBoolean',
      },
      {
        accessorFn: (row: any) => `${new Date(row.activity_timestamp)}`,
        id: 'date',
        header: () => 'Timestamp',
        footer: (props) => props.column.id,
        enableColumnFilter: true,
      },
      {
        meta: 'action',
        accessorKey: 'activity_id',
        header: '',
        footer: (props) => props.column.id,
        enableColumnFilter: false,
        enableGlobalFilter: false,
      },
    ],
    [],
  );

  return breadcrumbs ? (
    <React.Fragment />
  ) : (
    <ActivityMainCont>
      <Header>
        <Typography fontSize={24} fontWeight={900}>
          Activity Monitoring
        </Typography>
      </Header>
      <Typography fontSize={14} fontWeight={500}>
        {`All activity that takes place within the account is recorded below, it allows for administrators to monitor and analyse actions performed across the platform. `}
        {/* <Link sx={{ cursor: 'pointer' }} color={'#0D6EFD'}>
          Learn more
        </Link> */}
      </Typography>
      {activitiesData ? (
        <Table
          loading={false}
          data={activitiesData ? activitiesData : {}}
          columns={columns}
          detailPage={detailPage}
          refreshTable={refreshTable}
          tableLoading={tableLoading}
          search={{
            term: 'activitiy_performed_action',
            placeholder: 'Search for an activity, by name or description..',
          }}
          filters={[]}
        />
      ) : error ? (
        <ErrorMessagePanel errorCode={error.response?.status}></ErrorMessagePanel>
      ) : (
        <CircularProgress size={25} />
      )}
    </ActivityMainCont>
  );
};

export default Activity;
