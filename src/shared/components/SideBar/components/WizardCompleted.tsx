import React from 'react';

import { CompletedStateCont } from './WizardCompleted.styles';
import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography/Typography';
interface Props {
  onClick: VoidFunction;
}

const WizardCompleted: React.FC<Props> = ({ onClick }) => {
  return (
    <CompletedStateCont onClick={onClick}>
      <Box display="flex" alignItems="center" gap={3}>
        <i className="bx bx-help-circle" style={{ fontSize: 22 }}></i>
        <Typography fontSize={16} fontWeight={900} textAlign={'start'}>
          Help & Setup
        </Typography>
      </Box>
      <i className="bx bx-link-external" style={{ fontSize: 22 }}></i>
    </CompletedStateCont>
  );
};

export default WizardCompleted;
