import { Body, Header, SetupWizardCont, Wrapper } from './AdminSetupWizard.styles';
import { useGenContext } from '../../../shared/hooks/useGenContext';
import { Box, Divider, LinearProgress, Skeleton, Typography } from '@mui/material';
import { COLORS } from '../../../shared/constants/COLORS';
import adminWizardSteps from '../../../shared/data/adminWizardSteps.json';
import AccordionItem from '../component/AccordionItem/AccordionItem';
import { IWizardSteps } from '../../../shared/types/account.types';
import { useEffect, useState } from 'react';
import { accountsServices } from '../../../shared/services/accountsServices';
import { useQueryClient } from 'react-query';
import InfoPanel from '../../../shared/components/InfoPanel/InfoPanel';
import { LINKS } from '../../../shared/constants/LINKS';
import { usePermissionCheck } from '../../../shared/hooks/usePermissionCheck';

const { updateSetupStatus } = accountsServices();

const SetupWizard = () => {
  const { mutateAsync } = updateSetupStatus();
  const [expanded, setExpanded] = useState<string | false>(false);

  const queryClient = useQueryClient();

  const handleChange = (panel: string) => {
    setExpanded(panel === expanded ? false : panel);
  };

  const { account_setup_status } = useGenContext();
  const {
    complete,
    progress: { step_completed, step_count },
    steps,
  } = account_setup_status || {
    complete: false,
    progress: { step_completed: 0, step_count: 0 },
    steps: {},
  };

  const markasComplete = (key: keyof IWizardSteps) => {
    mutateAsync({ [key]: true }, { onSuccess: () => queryClient.invalidateQueries('account') });
  };

  //use effect to automatically open the next step
  useEffect(() => {
    if (step_completed < step_count) {
      setExpanded(adminWizardSteps[step_completed].key);
    }
  }, [step_completed, step_count]);

  if (step_count === 0)
    return (
      <SetupWizardCont>
        <Wrapper sx={{ gap: 1, padding: '10px', borderRadius: '8px', margin: 'auto !important' }}>
          <Skeleton variant="rectangular" width={'100%'} height={80} sx={{ marginTop: '10px', borderRadius: '8px' }} />
          <Skeleton variant="rectangular" width={'100%'} height={40} sx={{ marginTop: '10px', borderRadius: '8px' }} />
          <Skeleton variant="rectangular" width={'100%'} height={40} sx={{ marginTop: '10px', borderRadius: '8px' }} />
          <Skeleton variant="rectangular" width={'100%'} height={40} sx={{ marginTop: '10px', borderRadius: '8px' }} />
          <Skeleton variant="rectangular" width={'100%'} height={40} sx={{ marginTop: '10px', borderRadius: '8px' }} />
          <Skeleton variant="rectangular" width={'100%'} height={40} sx={{ marginTop: '10px', borderRadius: '8px' }} />
          <Skeleton variant="rectangular" width={'100%'} height={40} sx={{ marginTop: '10px', borderRadius: '8px' }} />
        </Wrapper>
      </SetupWizardCont>
    );

  return (
    <SetupWizardCont>
      <Wrapper>
        <Header>
          <Box display={'flex'} gap={'5px'}>
            <i className="bx bx-flag" style={{ fontSize: 22, color: COLORS.PRIMARY }}></i>
            <Typography style={{ color: COLORS.PRIMARY, fontWeight: 500, fontSize: 16 }}>Setup Wizard</Typography>
          </Box>
          <Typography fontSize={17} fontWeight={400}>
            How to get started
          </Typography>
          <Box
            display={'flex'}
            gap={'10px'}
            sx={{
              alignItems: 'center',
            }}
          >
            <Typography style={{ opacity: 0.6, fontSize: 16 }}>
              {step_completed} of {step_count} tasks complete
            </Typography>
            <LinearProgress
              variant="determinate"
              value={complete ? 100 : (step_completed / step_count) * 100}
              sx={{
                // '& .MuiLinearProgress-bar1Determinate': {
                //   backgroundColor: 'white',
                // },
                borderRadius: 8,
                flex: 1,
              }}
            />
          </Box>
        </Header>
        <Divider orientation="horizontal" sx={{ borderBlockStartWidth: 1, marginTop: 2, width: '100%' }} />
        <Body>
          {adminWizardSteps.map((step, index) => (
            <AccordionItem
              disabled={index > step_completed}
              onClick={() => handleChange(step.key)}
              expanded={expanded === step.key}
              {...step}
              key={step.key as keyof IWizardSteps}
              complete={Boolean(steps[step.key as keyof IWizardSteps])}
              onCompletion={() => markasComplete(step.key as keyof IWizardSteps)}
            />
          ))}
        </Body>
      </Wrapper>
      <Box sx={{ marginBottom: 'auto', maxWidth: '60%' }}>
        <InfoPanel
          color={'pending'}
          info={'If you encounter any difficulties getting your Warehouse setup. Let us know.'}
          buttonText="report a bug"
          onButtonClick={
            //open new tab to report a bug
            () => window.open(LINKS.REPORT_BUG, '_blank')
          }
          buttonWidth={200}
        />
      </Box>
    </SetupWizardCont>
  );
};

export default SetupWizard;
