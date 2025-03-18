import React, { useCallback, useState } from 'react';
import {
  Bottom,
  DetailsWrapper,
  ImportCont,
  ImportOption,
  ImportOptionCont,
  SummaryWrapper,
  Top,
  UploadingItemsCont,
} from './Import.styles';
import Accordion from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import styled from '@emotion/styled';
import { COLORS } from '../../../../../shared/constants/COLORS';
import Button from '../../../../../shared/components/Button/Button';
import MUIButton from '@mui/material/Button/Button';
import { useDropzone } from 'react-dropzone';
import UploadingItem from '../../../../../shared/components/UploadingItem/UploadingItem';

const Import = () => {
  const [toUpload, setToUpload] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setToUpload((files) => [...files, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'text/xls': ['.xls'],
    },
  });

  const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary expandIcon={<i className="bx bx-chevron-down" style={{ fontSize: 24 }} />} {...props} />
  ))(() => {
    return {
      flexDirection: 'row-reverse',
      padding: '12px 30px',
      borderBottom: `${COLORS.BORDER_LIGHT} solid 1px`,
      '& .MuiAccordionSummary-content': {
        margin: 0,
      },
    };
  });

  const importOption = (text: string) => (
    <ImportOption {...getRootProps()} key={text}>
      <i className="bx bx-cloud-upload" style={{ fontSize: 24 }} />
      <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
        <Typography fontSize={14} fontWeight={700}>
          {text}
        </Typography>
        <Typography fontSize={13} fontWeight={500}>
          Drag & Drop or <span style={{ color: '#0D6EFD' }}> Choose file</span> to upload
        </Typography>
      </div>
      <Typography fontSize={13} fontWeight={500} color={COLORS.GREY}>
        CSV or XLS
      </Typography>
    </ImportOption>
  );

  return (
    <ImportCont>
      <Accordion
        disableGutters
        sx={{
          width: '100%',
          boxShadow: 'none',
          border: `solid 1px ${COLORS.BORDER_LIGHT}`,
          borderRadius: '10px !important',
          overflow: 'hidden',
        }}
      >
        <AccordionSummary aria-label="Expand" aria-controls="-content" id="-header">
          <SummaryWrapper>
            <Typography style={{ marginLeft: 10, fontSize: 16, fontWeight: 700 }}>Import</Typography>
            <MUIButton
              disableRipple
              startIcon={<i className="bx bx-download" />}
              style={{ textTransform: 'none', color: COLORS.BLACK }}
              onClick={(e) => e.stopPropagation()}
            >
              <Typography style={{ marginLeft: 10, fontSize: 16, fontWeight: 700 }}>Download CSV Template</Typography>
            </MUIButton>
          </SummaryWrapper>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: COLORS.BG_LIGHT, padding: 0 }}>
          <DetailsWrapper>
            <Top>
              <input {...getInputProps()} />
              <ImportOptionCont>{['Import Location', 'Import Stock'].map((m) => importOption(m))}</ImportOptionCont>
              {toUpload.length ? (
                <UploadingItemsCont>
                  {toUpload.map((m, i) => (
                    <UploadingItem key={i} file={m} />
                  ))}
                  <Typography fontSize={10} fontWeight={600} color={COLORS.GREY}>
                    Files uploaded will not be imported until you click Process Upload, the above progress bars are only
                    an indication of file upload and validation processes.{' '}
                  </Typography>
                </UploadingItemsCont>
              ) : (
                <React.Fragment />
              )}
            </Top>
            <Bottom>
              <Button variant={'solid'} text={'Process Uploads'} color={'pending'} />
            </Bottom>
          </DetailsWrapper>
        </AccordionDetails>
      </Accordion>
    </ImportCont>
  );
};

export default Import;
