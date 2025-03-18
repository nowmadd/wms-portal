import React, { useEffect, useMemo } from 'react';
import { InfoCont, WizardCont } from './AdminWizard.styles';
import { Box, LinearProgress, Skeleton, Typography } from '@mui/material';
import { COLORS } from '../../../constants/COLORS';
import { accountsServices } from '../../../services/accountsServices';
import { useGenContext } from '../../../hooks/useGenContext';
import { LINKS } from '../../../constants/LINKS';
import WizardCompleted from '../components/WizardCompleted';

interface Props {
  onClick: VoidFunction;
}

const { getAccount } = accountsServices();
const AdminWizard: React.FC<Props> = ({ onClick }) => {
  const { setAccountSetupStatus, account_setup_status } = useGenContext();
  const { data, isLoading } = getAccount();
  const {
    complete,
    progress: { step_completed, step_count },
  } = account_setup_status || {
    complete: false,
    progress: { step_completed: 0, step_count: 0 },
  };

  useEffect(() => {
    if (!isLoading && data) {
      setAccountSetupStatus(data.data.account_setup_status);
    }
  }, [data, isLoading]);

  const percent = useMemo(() => {
    switch (step_completed) {
      case 1:
        return '15%';
      case 2:
        return '30%';
      case 3:
        return '45%';
      case 4:
        return '60%';
      case 5:
        return '75%';
      case 6:
        return '90%';
      case 7:
        return '100%';
      default:
        return '0%';
    }
  }, [step_completed]);

  const phrase = useMemo(() => {
    if (complete) {
      return 'Setup Wizard Completed';
    } else {
      switch (step_completed) {
        case 1:
        case 2:
          return 'Well done for setting up those initial tasks.';
        case 3:
        case 4:
          return 'Half way there until your system is fully tuned.';
        case 5:
        case 6:
          return 'You’re almost fully set up.';
        case 7:
          return 'Congratulations, you’re ready to go!';
        default:
          return 'Get your WMS ready for use.';
      }
    }
  }, [step_completed]);

  const handleClick = () => {
    if (step_completed === step_count || complete) {
      window.open(LINKS.JIRA_HELP_SUPPORT, '_blank');
    } else {
      onClick();
    }
  };

  if (isLoading)
    return (
      <WizardCont sx={{ background: '#dedede', padding: '20px' }}>
        <Skeleton variant="rectangular" width={24} height={24} sx={{ borderRadius: '8px' }} />
        <InfoCont>
          <Box display={'flex'} sx={{ justifyContent: 'space-between' }}>
            <Skeleton variant="rectangular" width={100} height={24} sx={{ borderRadius: '8px' }} />
            <Skeleton variant="rectangular" width={50} height={24} sx={{ borderRadius: '8px' }} />
          </Box>
          {/* MUI progress bar */}
          <Skeleton variant="rectangular" width={'100%'} height={10} sx={{ borderRadius: '8px' }} />
          <Skeleton variant="rectangular" width={'100%'} height={24} sx={{ borderRadius: '8px' }} />
        </InfoCont>
        <Box sx={{ alignItems: 'center' }} display={'flex'}>
          <Skeleton variant="rectangular" width={24} height={24} sx={{ borderRadius: '8px' }} />
        </Box>
      </WizardCont>
    );

  return step_completed === step_count || complete ? (
    <WizardCompleted onClick={handleClick} />
  ) : (
    <WizardCont onClick={handleClick} sx={{ background: COLORS.PRIMARY }}>
      <i className={`bx bx-'flag`} style={{ fontSize: 22 }}></i>
      <InfoCont>
        <Box display={'flex'} sx={{ justifyContent: 'space-between' }}>
          <Typography fontSize={16} fontWeight={900}>
            Setup Wizard
          </Typography>
          <Typography fontSize={16}>{percent}</Typography>
        </Box>
        {/* MUI progress bar */}
        <LinearProgress
          variant="determinate"
          value={step_completed !== 0 ? (step_completed === step_count ? 100 : (step_completed / step_count) * 100) : 0}
          sx={{
            '& .MuiLinearProgress-bar1Determinate': {
              backgroundColor: 'white',
            },
            borderRadius: 8,
          }}
        />

        <Typography fontSize={14} fontWeight={500}>
          {phrase}
        </Typography>
      </InfoCont>
      <Box sx={{ alignItems: 'center' }} display={'flex'}>
        <i className="bx bx-chevron-right" style={{ fontSize: 30 }}></i>
      </Box>
    </WizardCont>
  );
};

export default AdminWizard;
