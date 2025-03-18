import { useMutation, useQuery } from 'react-query';
import { IAxiosErrorResponse } from '../types/axios.types';
import { jobsDao } from '../dao/jobsDao';
import {
  ICreateJobPayload,
  ICreateJobResponse,
  IJobDetailsResponse,
  IJobs,
  IUpdateJobDetails,
  IAddCommentDetails,
} from '../types/jobs.types';
import { QUERY } from '../constants/QUERYNAMES';

export const jobsServices = () => {
  const {
    createJob: createJobDao,
    getJobs: getJobsDao,
    getJobDetails: getJobDetailsDao,
    updateJob: updateJobDao,
    addCommentJob: addCommentJobDao,
  } = jobsDao();

  const createJob = () => {
    return useMutation<ICreateJobResponse, IAxiosErrorResponse, { payload: ICreateJobPayload }>(({ payload }) =>
      createJobDao(payload),
    );
  };

  const getJobs = () => {
    return useQuery<IJobs, IAxiosErrorResponse>([QUERY.JOB_LIST], () => getJobsDao());
  };

  const getJobDetails = (job_id: string) => {
    return useQuery<IJobDetailsResponse, IAxiosErrorResponse>([QUERY.JOB_DETAILS, job_id], () =>
      getJobDetailsDao(job_id),
    );
  };

  const updateJob = () => {
    return useMutation<IUpdateJobDetails, IAxiosErrorResponse, { job_id: string; payload: IUpdateJobDetails }>(
      ({ job_id, payload }) => updateJobDao(job_id, payload),
    );
  };

  const addCommentJob = () => {
    return useMutation<ICreateJobResponse, IAxiosErrorResponse, { job_id: string; payload: IAddCommentDetails }>(
      ({ job_id, payload }) => addCommentJobDao(job_id, payload),
    );
  };

  return {
    getJobs,
    createJob,
    getJobDetails,
    updateJob,
    addCommentJob,
  };
};
