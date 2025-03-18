import { Typography, LinearProgress, IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { COLORS } from '../../constants/COLORS';
import { sizeConverter } from '../../utils/math';
import { UploadingItemCont, HeaderCont, SectionCont } from './UploadingItem.styles';

interface Props {
  file: File;
  onErrorMessage?: string;
  onDismiss?: (fileName: string) => void;
  uploading?: boolean;
  uploaded?: boolean;
}

const UploadingItem: React.FC<Props> = ({ file, onErrorMessage, onDismiss, uploading, uploaded }) => {
  const isError = Boolean(onErrorMessage);
  const [progress, setprogress] = useState(isError ? 100 : 0);
  const [timeRemain, settimeRemain] = useState(5);
  const [dismissing, setDismissing] = useState(false);

  useEffect(() => {
    if (timeRemain === 0 || isError) return;
    const intervalId = setInterval(() => {
      settimeRemain(timeRemain - 1);
      setprogress(progress + 20);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeRemain]);

  const handleDismiss = () => {
    if (onDismiss) {
      setDismissing(true);
      setTimeout(() => {
        setDismissing(false);
        onDismiss(file.name);
      }, 200);
    }
  };

  return (
    <UploadingItemCont dismissing={dismissing}>
      <HeaderCont>
        <i className="bx bx-file-blank" style={{ fontSize: 50, color: COLORS.GREY }} />

        <SectionCont>
          <Typography fontSize={16} fontWeight={900} color={COLORS.GREY}>
            {file.name}
          </Typography>
          {isError && onErrorMessage !== 'Looks good!' ? (
            <div style={{ display: 'flex', gap: 5 }}>
              <Typography fontSize={10} fontWeight={500} color={COLORS.GREY}>
                {onErrorMessage}
              </Typography>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 5 }}>
              <Typography fontSize={10} fontWeight={500} color={COLORS.GREY}>
                {sizeConverter(file.size)}
              </Typography>
              {(uploaded || uploading) && (
                <React.Fragment>
                  <Typography fontSize={10} fontWeight={500} color={COLORS.GREY}>
                    -
                  </Typography>
                  <Typography fontSize={10} fontWeight={500} color={COLORS.GREY}>
                    {progress === 100 ? (uploading ? 'Uploading' : 'Uploaded') : `${timeRemain} seconds left`}
                  </Typography>
                </React.Fragment>
              )}
            </div>
          )}
        </SectionCont>
        <SectionCont sx={{ marginLeft: 'auto', justifyContent: 'end', alignItems: 'center' }}>
          <IconButton onClick={handleDismiss}>
            <i className="bx bx-x" style={{ fontSize: 32, color: COLORS.GREY, textAlign: 'right' }} />
          </IconButton>
          {!onErrorMessage ? (
            <Typography fontSize={10} fontWeight={700} color={COLORS.GREY}>
              {progress}%
            </Typography>
          ) : (
            <React.Fragment />
          )}
        </SectionCont>
      </HeaderCont>
      <LinearProgress
        sx={{
          height: 5,
          backgroundColor: 'white',
          '& .MuiLinearProgress-bar': {
            backgroundColor:
              !uploaded && uploading
                ? COLORS.PRIMARY
                : onErrorMessage === 'Looks good!'
                ? COLORS.SUCCESS
                : isError
                ? COLORS.FAILURE
                : COLORS.PRIMARY,
          },
        }}
        variant={`${uploading ? 'indeterminate' : 'determinate'}`}
        value={progress}
      />
    </UploadingItemCont>
  );
};

export default UploadingItem;
