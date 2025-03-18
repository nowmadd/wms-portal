import React, { useMemo } from 'react';
import { ButtonCont, Header, JobDetailsCont, ManageJobCont } from './ManageJob.styles';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import Typography from '@mui/material/Typography/Typography';
import Breadcrumbs from '../../../../shared/components/Breadcrumbs/Breadcrumbs';
import Button from '../../../../shared/components/Button/Button';
import PlannedJob from './JobTypes/Planned/JobDetails';
import { jobsServices } from '../../../../shared/services/jobsServices';
import { useSearchParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import InfoPanel from '../../../../shared/components/InfoPanel/InfoPanel';
import { usePermissionCheck } from '../../../../shared/hooks/usePermissionCheck';
const { getJobDetails, updateJob } = jobsServices();

const ManageJob = ({}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchId = searchParams.get('id') || '';
  const { data, isLoading, error } = getJobDetails(searchId);
  const { adminSupervisorOwner } = usePermissionCheck();

  const jobDetails = useMemo(() => {
    if (isLoading) return;
    if (data?.data) return data.data;
  }, [data, isLoading]);

  const renderJobType = () => {
    switch (jobDetails?.job_type.split('_')[0]) {
      case 'planned':
        return <PlannedJob jobDetails={jobDetails} />;
      case 'unplanned':
        return <PlannedJob jobDetails={jobDetails} />;
    }
  };

  return isLoading ? (
    <ManageJobCont>
      <CircularProgress size={25} />
    </ManageJobCont>
  ) : (
    <ManageJobCont>
      {jobDetails ? (
        <>
          <Header>
            <Typography fontSize={36} fontWeight={900} sx={{ lineHeight: 1.2 }}>
              {jobDetails?.job_id}
            </Typography>
            <Breadcrumbs page={jobDetails?.job_id || ''} />
          </Header>
          <ButtonCont>
            {adminSupervisorOwner ? (
              <Button
                text="Cancel Job"
                variant="outlined-thin"
                color="failure"
                onClick={() => {}}
                disabled={jobDetails?.job_status.toUpperCase() !== 'READY'}
              />
            ) : (
              <React.Fragment />
            )}
          </ButtonCont>
          <JobDetailsCont>{renderJobType()}</JobDetailsCont>
        </>
      ) : (
        <InfoPanel color={'failure'} info={'Something went wrong'} />
      )}
    </ManageJobCont>
  );
};

export default ManageJob;
