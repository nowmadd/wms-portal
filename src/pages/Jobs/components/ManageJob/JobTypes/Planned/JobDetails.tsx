import React, { useState } from 'react';
import { authToken } from '../../../../../../shared/utils/authToken';
import { Box, Typography, List, ListItem, ListItemText, ListItemAvatar } from '@mui/material';

import Button from '../../../../../../shared/components/Button/Button';
import TextField from '../../../../../../shared/components/TextField/TextField';
import { IUpdateJobDetails, JOBTYPES } from '../../../../../../shared/types/jobs.types';
import {
  DetailsColumn,
  FieldCont,
  JobDetails,
  NotesInput,
  Column,
  InputColumn,
  Section,
  Side,
  ListItemCont,
  ButtonCont,
  CommentTitle,
} from './JobDetails.styles';
import { COLORS } from '../../../../../../shared/constants/COLORS';
import { initialCase } from '../../../../../../shared/utils/helpers';
import Pill from '../../../../../../shared/components/Pill/Pill';
import Select from '../../../../../../shared/components/Select/Select';
import SaveRevertFooter from '../../../../../../shared/components/SaveRevertFooter/SaveRevertFooter';
import { useMoveForm } from './useJobDetailsForm';
import Table from '../../../../../../shared/components/Table/Table';
import { createColumnHelper } from '@tanstack/react-table';
import InfoPanel from '../../../../../../shared/components/InfoPanel/InfoPanel';
import { jobsServices } from '../../../../../../shared/services/jobsServices';
import { useSearchParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { usePermissionCheck } from '../../../../../../shared/hooks/usePermissionCheck';
import { QUERY } from '../../../../../../shared/constants/QUERYNAMES';
import moment from 'moment';

const { updateJob, addCommentJob } = jobsServices();
const { getUser } = authToken();

type JobTypeKey = keyof typeof JOBTYPES;

const Move = ({ jobDetails }: any) => {
  const { adminSupervisorOwner } = usePermissionCheck();
  const [editable, setEditable] = useState(jobDetails.job_status.toUpperCase() === 'READY' ? true : false);
  const [isSaving, setisSaving] = useState(false);
  const [isCommentSaving, setisCommentSaving] = useState(false);

  const { mutateAsync: updateJobDetailsAsync } = updateJob();
  const { mutateAsync: addCommentJobAsync } = addCommentJob();
  const [searchParams, setSearchParams] = useSearchParams();
  const [commentContent, setCommentContent] = useState('');
  const searchId = searchParams.get('id') || '';
  const queryClient = useQueryClient();
  const userId = getUser();

  const handleSave = async (values: IUpdateJobDetails) => {
    setisSaving(true);

    await updateJobDetailsAsync({
      job_id: searchId,
      payload: values,
    });
    await queryClient.invalidateQueries([QUERY.JOB_DETAILS, searchId]);
    await queryClient.invalidateQueries(QUERY.JOB_LIST, { refetchInactive: true });
    setisSaving(false);
  };

  const handleRevert = () => {
    form.resetForm();
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCommentContent(value);
  };

  const handleCommentSave = async () => {
    setisCommentSaving(true);
    const commentUserId = userId?.email;
    if (commentUserId) {
      await addCommentJobAsync({
        job_id: searchId,
        payload: {
          comment_content: commentContent,
          comment_author: commentUserId,
        },
      });
    }
    await queryClient.invalidateQueries([QUERY.JOB_DETAILS, searchId]);
    await queryClient.invalidateQueries(QUERY.JOB_LIST, { refetchInactive: true });
    setCommentContent('');
    setisCommentSaving(false);
  };

  const { form, hasChanges } = useMoveForm({
    onSubmit: handleSave,
    job: jobDetails ? jobDetails : undefined,
  });

  const equipment = [
    { value: 'None', label: 'None' },
    { value: 'Totebag', label: 'Totebag' },
    { value: 'Trolley', label: 'Trolley' },
    { value: 'Hand Truck', label: 'Hand Truck' },
    { value: 'Platform Truck', label: 'Platform Truck' },
    { value: 'Pallet Jack', label: 'Pallet Jack' },
    { value: 'Forklift', label: 'Forklift' },
  ];

  const equipmentData = {
    value: jobDetails?.job_equipment,
    label: jobDetails?.job_equipment,
  };

  const priority = [
    { value: 'urgent', label: 'Urgent' },
    { value: 'high', label: 'High' },
    { value: 'normal', label: 'Normal' },
    { value: 'low', label: 'Low' },
  ];

  const jobPriorityData = {
    value: jobDetails?.job_priority,
    label: initialCase(jobDetails?.job_priority),
  };

  const columnHelper = createColumnHelper<{
    meta_variable_label: string;
    meta_variable_name: string;
    meta_variable_value: string;
    meta_variable_id: string;
  }>();

  const jobMetaColumns = [
    columnHelper.accessor('meta_variable_label', {
      header: 'Label',
      meta: 'slim',
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor('meta_variable_value', {
      header: 'Value',
      meta: 'slim',
      cell: (props: any) => {
        if (
          Array.isArray(props.row.original.meta_variable_value) &&
          props.row.original.meta_variable_name === 'inventory'
        ) {
          return (
            <Box sx={{ flexDirection: 'row', display: 'flex', gap: 1 }}>
              {props.row.original.meta_variable_value.map((item: any) => (
                <Pill variant={'square'} color={'primary'} text={`${item.quantity}x - ${item.description}`} />
              ))}
            </Box>
          );
        } else return props.row.original.meta_variable_value;
      },
      footer: (props) => props.column.id,
    }),
    columnHelper.accessor('meta_variable_id', {
      header: 'ID',
      meta: 'slim',
      footer: (props) => props.column.id,
    }),
  ];

  const getStatusPillColor = (status: string) => {
    let color: 'primary' | 'success' | 'info' | 'pending' | 'failure' | 'grey' | 'black' | 'white';
    switch (status.toUpperCase()) {
      case 'CLOSED':
        color = 'success';
        break;
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
      default:
        color = 'white';
    }

    return color;
  };

  const { job_notes } = form.values;
  return (
    <>
      <JobDetails>
        <Section>
          <Typography fontSize={24} fontWeight={800}>
            Job Details
          </Typography>
          {jobDetails.job_status.toUpperCase() === 'STALLED' && (
            <InfoPanel
              dismissable={false}
              color={'failure'}
              info={`This Job has Stalled. A Warehouse Operator has requested support.`}
            />
          )}
          <DetailsColumn>
            <FieldCont>
              <Typography fontSize={12} fontWeight={800} color={COLORS.GREY}>
                Job Type
              </Typography>
              <Typography fontSize={16} fontWeight={400} lineHeight={2}>
                {JOBTYPES[jobDetails?.job_type as JobTypeKey]}
              </Typography>
            </FieldCont>
            <FieldCont>
              <Typography fontSize={12} fontWeight={800} color={COLORS.GREY}>
                Status
              </Typography>
              <Box style={{ display: 'flex', padding: '8px 12px 8px 0px' }}>
                <Pill
                  variant={'round'}
                  color={getStatusPillColor(jobDetails?.job_status)}
                  text={initialCase(jobDetails?.job_status)}
                />
              </Box>
            </FieldCont>
          </DetailsColumn>
          <DetailsColumn>
            <FieldCont>
              <Typography fontSize={12} fontWeight={800} color={COLORS.GREY}>
                Assignment
              </Typography>
              <Box style={{ display: 'flex', padding: '8px 12px 8px 0px' }}>
                {jobDetails.job_assignment ? (
                  <Pill variant={'square'} color={'primary'} text={jobDetails.job_assignment} />
                ) : (
                  <Typography fontSize={16} fontWeight={400} lineHeight={2}>
                    N/A
                  </Typography>
                )}
              </Box>
            </FieldCont>
            <FieldCont>
              <Typography fontSize={12} fontWeight={800} color={COLORS.GREY}>
                Equipment
              </Typography>
              {editable ? (
                <Box style={{ display: 'flex', padding: '8px 12px 8px 0px' }}>
                  <Select
                    isDisabled={!adminSupervisorOwner}
                    name="job_equipment"
                    options={equipment}
                    defaultValue={equipmentData ? equipmentData : equipment[0]}
                    onChange={(moduleOption: any) => form.setFieldValue('job_equipment', moduleOption.value)}
                  />
                </Box>
              ) : (
                <Typography fontSize={16} fontWeight={400} lineHeight={2}>
                  {initialCase(jobDetails?.job_equipment)}
                </Typography>
              )}
            </FieldCont>
          </DetailsColumn>
          <DetailsColumn>
            <FieldCont>
              <Typography fontSize={12} fontWeight={800} color={COLORS.GREY}>
                Priority
              </Typography>
              {editable ? (
                <Box style={{ display: 'flex', padding: '8px 12px 8px 0px' }}>
                  <Select
                    isDisabled={!adminSupervisorOwner}
                    name="job_priorty"
                    options={priority}
                    defaultValue={jobPriorityData ? jobPriorityData : priority[0]}
                    onChange={(moduleOption: any) => form.setFieldValue('job_priority', moduleOption.value)}
                  />
                </Box>
              ) : (
                <Typography fontSize={16} fontWeight={400} lineHeight={2}>
                  {initialCase(jobDetails?.job_priority)}
                </Typography>
              )}
            </FieldCont>
            <FieldCont></FieldCont>
          </DetailsColumn>
          <DetailsColumn>
            <FieldCont>
              <Typography fontSize={12} fontWeight={800} color={COLORS.GREY}>
                Job Created
              </Typography>
              <Typography fontSize={16} fontWeight={400} lineHeight={2}>
                {moment(jobDetails?.job_created).format('DD/MM/YYYY HH:mm')}
              </Typography>
            </FieldCont>
            <FieldCont></FieldCont>
          </DetailsColumn>
          <DetailsColumn>
            <FieldCont>
              <Typography fontSize={12} fontWeight={800} color={COLORS.GREY}>
                Notes
              </Typography>
              <NotesInput
                disabled={!editable || !adminSupervisorOwner}
                fullWidth
                multiline
                rows={2}
                onChange={form.handleChange}
                value={job_notes}
                InputProps={{ sx: { backgroundColor: !editable ? '#FFFFFF80' : 'white' } }}
                name="job_notes"
              />
            </FieldCont>
          </DetailsColumn>
          <Typography fontSize={24} fontWeight={800}>
            Job Meta Data
          </Typography>
          <Table data={jobDetails.job_meta} columns={jobMetaColumns} loading={false} showPagination={false} />
          <Typography fontSize={24} fontWeight={800}>
            Comments
          </Typography>
          <List>
            <Column>
              <Section>
                <InputColumn>
                  <TextField
                    fullWidth
                    multiline
                    maxRows={4}
                    onChange={handleCommentChange}
                    value={commentContent}
                    disabled={isCommentSaving}
                    InputProps={{ sx: { backgroundColor: 'white', padding: '8px 12px' } }}
                    name="job_comment"
                    placeholder="Add a comment..."
                  />
                </InputColumn>

                {commentContent != '' ? (
                  <ButtonCont>
                    <Button
                      text="Save"
                      variant="solid-thin"
                      color="info"
                      disabled={isCommentSaving}
                      loading={isCommentSaving}
                      onClick={handleCommentSave}
                      style={{ minWidth: 52 }}
                    />
                    <Button
                      text="Cancel"
                      variant="outlined-thin"
                      disabled={isCommentSaving}
                      loading={isCommentSaving}
                      color="failure"
                      onClick={() => setCommentContent('')}
                    />
                  </ButtonCont>
                ) : (
                  <></>
                )}
              </Section>
            </Column>
            {jobDetails.job_comments && jobDetails.job_comments.length > 0 ? (
              jobDetails.job_comments
                .sort(function (a: any, b: any) {
                  return b.comment_created - a.comment_created;
                })
                .map((t: any) => (
                  <ListItemCont
                    style={{ backgroundColor: t.comment_type == 'help' ? COLORS.FAILURE_LIGHT : 'transparent' }}
                  >
                    <ListItem style={{ padding: '2px 16px' }}>
                      <ListItemAvatar>
                        <div
                          style={{
                            backgroundColor: t.comment_type == 'support' ? '#5E2FA9' : t.comment_author_color,
                            width: 35,
                            height: 35,
                            borderRadius: t.comment_type == 'support' ? 5 : 35,
                            color: 'white',
                            fontSize: 24,
                            display: 'flex',
                            justifyContent: 'center',
                            alignContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <i className="bx bxs-user"></i>
                        </div>
                      </ListItemAvatar>
                      <ListItemText
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body1"
                              color="text.primary"
                            >
                              {t.comment_content}
                            </Typography>
                          </React.Fragment>
                        }
                        primary={
                          <React.Fragment>
                            <CommentTitle>
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body1"
                                color="text.primary"
                                fontWeight={600}
                              >
                                {t.comment_author}
                              </Typography>
                              {t.comment_type == 'help' && (
                                <Pill variant={'round'} color={'failure'} text="Help Requested" />
                              )}
                              {t.comment_type == 'support' && (
                                <Pill variant={'round'} color={'primary'} text="Indigo Support" />
                              )}
                              {`${new Intl.DateTimeFormat('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: true,
                              }).format(new Date(Number(t.comment_created)))}`}
                            </CommentTitle>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  </ListItemCont>
                ))
            ) : (
              <></>
            )}
          </List>
        </Section>
      </JobDetails>
      <Side>
        <Typography fontSize={24} fontWeight={800} color={COLORS.GREY_LIGHT}>
          Job Relationships
        </Typography>
      </Side>
      <SaveRevertFooter
        isSaving={isSaving}
        onSave={form.handleSubmit}
        onRevert={handleRevert}
        saveDisabled={Object.keys(form.errors).length > 0}
        show={hasChanges}
      />
    </>
  );
};

export default Move;
