import React from 'react';
import { JobTypeCardStyle, Content, Image } from './JobTypeCard.styles';
import Typography from '@mui/material/Typography/Typography';
import { COLORS } from '../../../../shared/constants/COLORS';

interface Props {
  setJobType: (type: string) => void;
  type: string;
  picked?: string;
  imageSource?: string;
  sx?: {};
}

const getStyles = (type: string, pickedCard?: string) => {
  const picked = type === pickedCard;

  if (picked)
    return {
      borderRadius: 4,
      borderWidth: '3px',
      borderStyle: 'solid',
      backgroundColor: COLORS.WHITE,
      borderColor: COLORS.PRIMARY,
    };

  return {
    borderRadius: 4,
    borderWidth: '3px',
    borderStyle: 'solid',
    backgroundColor: COLORS.WHITE,
    borderColor: 'white',
  };
};

const JobTypeCard: React.FC<Props> = ({ type, setJobType, imageSource, picked }) => {
  const styles = getStyles(type, picked);

  return (
    <JobTypeCardStyle sx={styles} onClick={() => setJobType(type)}>
      <Typography lineHeight={'29px'} fontSize={24} fontWeight={'bold'} color={COLORS.BLACK} sx={{ textAlign: 'left' }}>
        {type}
      </Typography>
      <Image src={imageSource} draggable="false" />
    </JobTypeCardStyle>
  );
};

export default JobTypeCard;
