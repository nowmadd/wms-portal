import { ENDPOINTS } from '../constants/ENDPOINTS';
import { useAxios } from '../hooks/useAxios';
import {
  ICreateJobPayload,
  ICreateJobResponse,
  IAddCommentPayload,
  IAddCommentResponse,
  IJobDetailsResponse,
  IJobs,
  IUpdateJobDetails,
} from '../types/jobs.types';

export const jobsDao = () => {
  const { GET, PATCH, DELETE, PUT, POST } = useAxios();

  const createJob = async (payload: ICreateJobPayload) => {
    const response = await POST<ICreateJobResponse>({
      url: `${ENDPOINTS.JOBS}`,
      data: {
        ...payload,
      },
    });
    return response.data;
  };

  const getJobs = async () => {
    const response = await GET<IJobs>({
      url: `${ENDPOINTS.JOBS}`,
    });
    return response.data;
  };

  const getJobDetails = async (job_id: string) => {
    const response = await GET<IJobDetailsResponse>({
      url: `${ENDPOINTS.JOBS}/${job_id}`,
    });
    return response.data;
  };

  const updateJob = async (job_id: string, payload: IUpdateJobDetails) => {
    const response = await PATCH<IUpdateJobDetails>({
      url: `${ENDPOINTS.JOBS}/${job_id}`,
      data: payload,
    });
    return response.data;
  };

  const addCommentJob = async (job_id: string, payload: IAddCommentPayload) => {
    const response = await POST<IAddCommentResponse>({
      url: `${ENDPOINTS.JOBS}/${job_id}/comments`,
      data: {
        ...payload,
      },
    });
    return response.data;
  };

  return {
    getJobs,
    createJob,
    getJobDetails,
    updateJob,
    addCommentJob,
  };
};
