import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ButtonCont, Header, JobsMainCont, JobsName, JobsNameContainer, TextCont } from './Jobs.styles';
import Typography from '@mui/material/Typography/Typography';
import Link from '@mui/material/Link/Link';
import PickJobTypeModal from './components/PickJobTypeModal/PickJobTypeModal';
import Button from '../../shared/components/Button/Button';
import BasicModal from '../../shared/components/Modals/BasicModal/BasicModal';
import { FilterFn, SortingFn, createColumnHelper } from '@tanstack/react-table';
import { IJobsListDetails, JOBTYPES } from '../../shared/types/jobs.types';
import Table from '../../shared/components/Table/Table';
import InfoPanel from '../../shared/components/InfoPanel/InfoPanel';
import ErrorMessagePanel from '../../shared/components/ErrorMessagePanel/ErrorMessagePanel';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import Box from '@mui/material/Box/Box';
import Pill from '../../shared/components/Pill/Pill';
import { initialCase, formatTimestamp } from '../../shared/utils/helpers';
import { COLORS } from '../../shared/constants/COLORS';
import ManageJob from './components/ManageJob/ManageJob';
import CreateMoveJobModal from './components/CreateJobModal/CreateMoveJobModal/CreateMoveJobModal';
import CreatePickPackModal from './components/CreateJobModal/CreatePickPackJobModal/CreatePickPackJobModal';
import { jobsServices } from '../../shared/services/jobsServices';
import { LINKS } from '../../shared/constants/LINKS';
import { usePermissionCheck } from '../../shared/hooks/usePermissionCheck';
import { useQueryClient } from 'react-query';
import { QUERY } from '../../shared/constants/QUERYNAMES';

declare module '@tanstack/table-core' {
  interface SortingFns {
    statusSort: SortingFn<unknown>;
    prioritySort: SortingFn<unknown>;
  }

  interface FilterFns {
    containsStringFilter: FilterFn<unknown>;
  }
}

const { getJobs } = jobsServices();
const Jobs = () => {
  const { data, isLoading, error } = getJobs();
  const { tab, breadcrumbs } = useParams() as { tab: string; breadcrumbs: string };
  const [showPickJobTypeModal, setShowPickJobTypeModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [jobType, setJobType] = useState('');
  const [tableLoading, setTableLoading] = useState(false);
  const queryClient = useQueryClient();

  const { adminSupervisorOwner } = usePermissionCheck();

  type JobTypeKey = keyof typeof JOBTYPES;

  const handleSetJobType = (jobType: string) => {
    setJobType(jobType);
  };

  // const { data, isLoading, error } = getJobsList();
  const navigate = useNavigate();

  const jobsData = useMemo(() => {
    if (isLoading) {
      return;
    } else {
      return data
        ? Object.keys(data.data).length > 0
          ? data.data?.sort(
              //sort by job_created
              (a: IJobsListDetails, b: IJobsListDetails) => {
                return b.job_created - a.job_created;
              },
            )
          : data.data
        : undefined;
    }
  }, [data, isLoading]);

  const refreshTable = async () => {
    setTableLoading(true);
    await queryClient.invalidateQueries(QUERY.JOB_LIST, { refetchInactive: true });
    await queryClient.removeQueries(QUERY.JOB_DETAILS);
    setTableLoading(false);
  };

  const columnHelper = createColumnHelper<IJobsListDetails>();
  const jobsColumns = [
    columnHelper.accessor('job_id', {
      header: 'Job ID',
      cell: (props: any) => {
        return (
          <Link
            sx={{ textDecoration: 'none', cursor: 'pointer' }}
            onClick={() => navigate(`/jobs/job?id=${props.row.original.job_id}`)}
          >
            <JobsNameContainer>
              <JobsName>{props.row.original.job_id}</JobsName>
            </JobsNameContainer>
          </Link>
        );
      },
      footer: (props) => props.column.id,
      enableGlobalFilter: true,
      enableColumnFilter: true,
    }),
    columnHelper.accessor('job_equipment', {
      meta: 'slim',
      header: 'Equipment',
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor('job_type', {
      header: 'Type',
      meta: 'slim',
      cell: (props: any) => {
        const jobType: JobTypeKey = props.row.original.job_type;
        return props.row.original.job_type && JOBTYPES[jobType];
      },
      footer: (props) => props.column.id,
      enableGlobalFilter: true,
      enableColumnFilter: true,
      filterFn: 'containsStringFilter',
    }),
    columnHelper.accessor('job_order', {
      header: 'Orders',
      meta: 'slim',
      footer: (props) => props.column.id,
      enableGlobalFilter: true,
    }),
    columnHelper.accessor('job_status', {
      header: 'Status',
      meta: 'fit',
      cell: (props: any) => {
        return (
          props.row.original.job_status && (
            <Box display={'flex'} justifyContent={'center'}>
              <Pill
                variant={'round'}
                color={props.row.original.job_status && getStatusPillColor(props.row.original.job_status)}
                text={props.row.original.job_status && initialCase(props.row.original.job_status)}
                slim
              ></Pill>
            </Box>
          )
        );
      },
      sortingFn: 'statusSort',
      enableSorting: true,
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor('job_priority', {
      header: 'Priority',
      meta: 'slim',
      cell: (props: any) => {
        return props.row.original.job_priority && initialCase(props.row.original.job_priority);
      },
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor('job_created', {
      header: 'Created',
      meta: 'slim',
      cell: (props: any) => {
        if (props.row.original.job_created) {
          return formatTimestamp(props.row.original.job_created);
        } else return 'Invalid Date';
      },
      footer: (props) => props.column.id,
      enableGlobalFilter: false,
    }),
    columnHelper.accessor('job_id', {
      meta: 'action',
      header: '',
      footer: (props) => props.column.id,
      enableGlobalFilter: false,
    }),
  ];

  const getStatusPillColor = (status: string) => {
    let color: 'primary' | 'success' | 'info' | 'pending' | 'failure' | 'grey' | 'black' | 'white' = 'pending';
    switch (status.toUpperCase()) {
      case 'COMPLETE':
        color = 'success';
        break;
      case 'IN PROGRESS':
        color = 'pending';
        break;
      case 'READY':
        color = 'info';
        break;
      case 'STALLED':
        color = 'failure';
        break;
      case 'CANCELLED':
        color = 'failure';
        break;
      default:
        color = 'white';
    }

    return color;
  };

  const jobTypeFilterOptions = [
    { term: 'job_type', value: '', label: 'All Jobs' },
    { term: 'job_type', value: 'pickandpack', label: 'Pick & Pack' },
    { term: 'job_type', value: 'stockcheck', label: 'Stock Check' },
    { term: 'job_type', value: 'move', label: 'Move' },
    { term: 'job_type', value: 'receipt', label: 'Receipt' },
  ];

  const statusFilterOptions = [
    { term: 'job_status', value: '', label: 'All Statuses' },
    { term: 'job_status', value: 'ready', label: 'Ready' },
    { term: 'job_status', value: 'in progress', label: 'In Progress' },
    { term: 'job_status', value: 'complete', label: 'Complete' },
    { term: 'job_status', value: 'cancelled', label: 'Cancelled' },
    { term: 'job_status', value: 'stalled', label: 'Stalled' },
  ];

  return breadcrumbs ? (
    <ManageJob />
  ) : (
    <JobsMainCont>
      <Header>
        <TextCont>
          <Typography fontSize={36} fontWeight={900} sx={{ marginLeft: '10px', lineHeight: 'normal' }}>
            Jobs
          </Typography>
        </TextCont>
        <ButtonCont>
          {adminSupervisorOwner ? (
            <Button
              onClick={() => setShowPickJobTypeModal(true)}
              startIcon="bx bx-plus"
              variant={'solid-thin'}
              text={'Create Job'}
              color={'primary'}
            />
          ) : (
            <React.Fragment />
          )}
        </ButtonCont>
        <Typography fontSize={14} fontWeight={500}>
          {`The jobs currently within the account are displayed here. `}
          <Link href={LINKS.LEARN_MORE.JOBS} style={{ cursor: 'pointer' }} color={'#0D6EFD'} target="_blank">
            Learn more
          </Link>
        </Typography>
      </Header>
      {jobsData ? (
        jobsData.length > 0 || Object.keys(jobsData).length > 0 ? (
          <Table
            loading={false}
            data={jobsData ? jobsData : []}
            columns={jobsColumns}
            detailPage="/jobs/job"
            defaultSorting={[
              { id: 'job_status', desc: false },
              // { id: 'job_priority', desc: false },
            ]}
            search={{
              term: 'job_id',
              placeholder: 'Search for an inventory item, by description, barcode or SKU...',
            }}
            filters={[
              {
                term: 'job_type',
                placeholder: 'All Job Type',
                options: jobTypeFilterOptions || [],
              },
              {
                term: 'job_status',
                placeholder: 'All Statuses',
                options: statusFilterOptions || [],
              },
            ]}
            refreshTable={refreshTable}
            tableLoading={tableLoading}
          />
        ) : (
          <InfoPanel noIcon={true} color={'grey'} info={'No Data Found'}></InfoPanel>
        )
      ) : error ? (
        <ErrorMessagePanel errorCode={error.response?.status} />
      ) : (
        <CircularProgress size={25} />
      )}
      {showPickJobTypeModal ? (
        <BasicModal
          breadCrumbs={['Jobs', 'Create']}
          onClose={() => setShowPickJobTypeModal(false)}
          open={showPickJobTypeModal}
        >
          <PickJobTypeModal
            jobTypeCallBack={handleSetJobType}
            onSubmit={() => {
              setShowCreateModal(true);
              setShowPickJobTypeModal(false);
            }}
          />
        </BasicModal>
      ) : (
        <React.Fragment />
      )}
      {showCreateModal ? (
        <BasicModal breadCrumbs={['Jobs', 'Create']} onClose={() => setShowCreateModal(false)} open={showCreateModal}>
          {jobType === 'Pick & Pack' && <CreatePickPackModal onClose={() => setShowCreateModal(false)} />}
          {jobType === 'Move' && <CreateMoveJobModal onClose={() => setShowCreateModal(false)} />}
        </BasicModal>
      ) : (
        <React.Fragment />
      )}
    </JobsMainCont>
  );
};

export default Jobs;
