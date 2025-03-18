import React, { useCallback, useState } from 'react';
import { ImportCont, ModalBody, ModalCont, ModalFooter, UploadingItemsCont } from './ImportOrdersModal.styles';
import Button from '../../../../shared/components/Button/Button';
import { useDropzone } from 'react-dropzone';
import { Typography } from '@mui/material';
import { text } from 'stream/consumers';
import { COLORS } from '../../../../shared/constants/COLORS';
import UploadingItem from '../../../../shared/components/UploadingItem/UploadingItem';
import { ordersServices } from '../../../../shared/services/ordersServices';
import { log } from 'console';
import { CONFIG } from '../../../../shared/utils/config';
import { useQueryClient } from 'react-query';
import { fileToBase64 } from '../../../../shared/utils/converter';
import { IImportOrdersPayload } from '../../../../shared/types/order.types';
import ImportOrdersResult from './components/ImportOrdersResult/ImportOrdersResult';
import { finished } from 'stream';

interface Props {
  onClose: () => void;
}

interface IImportResult {
  data?: {
    successful: object[];
    errors: object[];
    conflicts: object[];
  };
}

type FileToUpload = {
  name: string;
  size: number;
  type: string;
};

type ConvertedFile = {
  file_name: string;
  file_size: number;
  file_data: any;
};

const { importOrders } = ordersServices();
const ImportOrdersModal: React.FC<Props> = ({ onClose }) => {
  const [uploading, setuploading] = useState<string[]>([]);
  const [errorFiles, seterrorFiles] = useState<string[]>([]);
  const { mutateAsync, isLoading } = importOrders();
  const [toUpload, setToUpload] = useState<File[]>([]);
  const [uploaded, setuploaded] = useState<string[]>([]);
  const [loading, setloading] = useState(false);
  const [isFinished, setisFinished] = useState(false);
  const [resultData, setResultData] = useState<IImportResult>({
    data: {
      successful: [],
      errors: [],
      conflicts: [],
    },
  });

  const queryClient = useQueryClient();
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const filteredFiles = acceptedFiles.filter((f) => !toUpload.find((t) => t.name === f.name));
      setToUpload((files) => [...files, ...filteredFiles]);
    },
    [toUpload],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    //removing this to show error to user
    // accept: {
    //   'text/csv': ['.csv'],

    // },
  });

  const validate = async () => {
    setloading(true);

    try {
      const convertedFiles: ConvertedFile[] = await Promise.all(
        toUpload
          .filter((f) => validateFile(f) === 'Looks good!')
          .map(async (m) => {
            const file_data = await fileToBase64(m);
            return {
              file_name: m.name,
              file_size: m.size,
              file_data,
            };
          }),
      );

      let err: string[] = [];
      let filesToUpload: ConvertedFile[] = [];

      for (let m of convertedFiles) {
        setuploading((prev) => [...prev, m.file_name]);
        try {
          filesToUpload.push({
            file_name: m.file_name,
            file_size: m.file_size,
            file_data: m.file_data,
          });
        } catch (error) {
          seterrorFiles((prev) => [...prev, m.file_name]);
          err.push(m.file_name);
        } finally {
          setuploading((prev) => prev.filter((name) => name !== m.file_name));
        }
      }

      if (filesToUpload.length > 0) {
        try {
          const response = await mutateAsync({
            payload: filesToUpload,
          });
          setisFinished(true);
          setResultData(response as any);
        } catch (error) {
          console.error('Upload failed:', error);
          seterrorFiles((prev) => [...prev, ...filesToUpload.map((f) => f.file_name)]);
        } finally {
          setloading(false);
        }
      } else {
        setloading(false);
      }
    } catch (globalError) {
      console.error('Global error during validation:', globalError);
      setloading(false);
    }
  };

  const close = () => {
    setisFinished(false);
    setResultData({});
    setuploaded([]);
    setToUpload([]);
    onClose();
  };

  const downloadCSV = () => {
    window.open(CONFIG.ORDERS_CSV_TEMPLATE_LINK, '_blank');
  };

  const validateFile = (file: File) => {
    const { name, size, type } = file;

    switch (true) {
      case type.toString() !== 'text/csv' &&
        type.toString() !== 'application/vnd.ms-excel' &&
        type.toString() !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        return 'Oops, this file type is not supported. Please upload a CSV';
      case size > 1000000:
        return 'Oops, file size is too large. Please ensure you upload a file size of less than 1 MB';
      case errorFiles.includes(name):
        return 'Oops, an error occurred while uploading the file. Please try again';
      default:
        return 'Looks good!';
    }
  };

  const handleDismiss = (fileName: string) => {
    setToUpload((files) => files.filter((f) => f.name !== fileName));
    seterrorFiles((files) => files.filter((f) => f !== fileName));
  };

  return isFinished && resultData ? (
    <ImportOrdersResult data={resultData} onClose={onClose} />
  ) : (
    <ModalCont>
      <ModalBody>
        <Button
          style={{ marginLeft: 'auto', cursor: 'pointer' }}
          onClick={downloadCSV}
          startIcon="bx bx-download"
          variant={'outlined-thin'}
          text={'Download CSV Template (10KB)'}
          color={'primary'}
        />

        <ImportCont {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <i className="bx bx-cloud-upload" style={{ fontSize: 24 }} />
          <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
            <Typography fontSize={15} fontWeight={500}>
              Import Orders
            </Typography>
            <Typography fontSize={13} fontWeight={400}>
              Drag & Drop or <span style={{ color: '#0D6EFD' }}> Choose file</span> to upload
            </Typography>
          </div>
          <Typography fontSize={13} fontWeight={400} color={COLORS.GREY}>
            CSV Only
          </Typography>
        </ImportCont>

        <UploadingItemsCont>
          {toUpload.map((f, i) => (
            <UploadingItem
              uploading={uploading.includes(f.name)}
              uploaded={uploaded.includes(f.name)}
              onDismiss={handleDismiss}
              key={f.name}
              file={f}
              onErrorMessage={validateFile(f)}
            />
          ))}
          <Typography fontSize={10} fontWeight={400} color={COLORS.GREY}>
            Files uploaded will not be imported until you click validate files. The above progress bars are only an
            indication of file upload and validation processes.
          </Typography>
        </UploadingItemsCont>
      </ModalBody>
      <ModalFooter>
        <Button variant={'solid'} text={'Cancel'} color={'pending'} onClick={close} />
        <Button
          loading={loading}
          variant={'solid'}
          text={'Validate Files'}
          color={'success'}
          disabled={Boolean(!toUpload.length) || loading}
          onClick={validate}
        />
      </ModalFooter>
    </ModalCont>
  );
};

export default ImportOrdersModal;
