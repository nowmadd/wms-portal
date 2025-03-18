import React, { useEffect, useMemo } from 'react';
import { InfoCont, WizardCont } from './UserWizard.styles';
import { Box, LinearProgress, Skeleton, Typography } from '@mui/material';
import { COLORS } from '../../../constants/COLORS';
import { accountsServices } from '../../../services/accountsServices';
import { useGenContext } from '../../../hooks/useGenContext';
import { LINKS } from '../../../constants/LINKS';
import { usersServices } from '../../../services/usersServices';
import { authToken } from '../../../utils/authToken';
import WizardCompleted from '../components/WizardCompleted';

interface Props {
  onClick: VoidFunction;
}
const { getUser } = authToken();
const { getUserProfileSetupStatus } = usersServices();
const UserWizard: React.FC<Props> = ({ onClick }) => {
  const email = getUser()?.email || '';
  const { setAccountSetupStatus, account_setup_status } = useGenContext();
  const { data, isLoading } = getUserProfileSetupStatus(email);

  const {
    complete,
    progress: { step_completed, step_count },
  } = account_setup_status || {
    complete: false,
    progress: { step_completed: 0, step_count: 0 },
  };

  useEffect(() => {
    if (!isLoading && data) {
      setAccountSetupStatus(data.data.user_setup_status);
    }
  }, [data, isLoading]);

  const percent = useMemo(() => {
    switch (step_completed) {
      case 1:
        return '33%';
      case 2:
        return '66%';
      case 3:
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
        default:
          return 'Get your profile ready for use';
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
    <WizardCont
      onClick={handleClick}
      sx={{ background: step_completed === step_count ? COLORS.SUCCESS : COLORS.PRIMARY }}
    >
      <i className={`bx bx-${step_completed === step_count ? 'award' : 'flag'}`} style={{ fontSize: 22 }}></i>
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

export default UserWizard;
