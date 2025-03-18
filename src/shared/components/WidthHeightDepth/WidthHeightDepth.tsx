import { FormikErrors } from 'formik';
import React from 'react';
import { WidthHeightDepthCont } from './WidthHeightDepth.styles';
import TextField from '../TextField/TextField';
import { InputAdornment } from '@mui/material';

interface Props {
  disable?: boolean;
  name?: {
    width: string | undefined;
    height: string | undefined;
    depth: string | undefined;
  };
  values: {
    width: number | undefined;
    height: number | undefined;
    depth: number | undefined;
  };
  handleChange: {
    /** Classic React change handler, keyed by input name */
    (e: React.ChangeEvent<any>): void;
    /** Preact-like linkState. Will return a handleChange function.  */
    <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  onError: (width: string | undefined, height: string | undefined, depth: string | undefined) => void;
}

const WidthHeightDepth: React.FC<Props> = ({ values, handleChange, onError, name, disable }) => {
  //error checker for width, height, depth if one of them is supplied then all of them must be supplied
  const errors = () => {
    const errors: FormikErrors<{ width: number; height: number; depth: number }> = {};
    if (values.width || values.height || values.depth) {
      if (!values.width) {
        errors.width = 'Width is required';
      }
      if (!values.height) {
        errors.height = 'Height is required';
      }
      if (!values.depth) {
        errors.depth = 'Depth is required';
      }
    }
    onError(errors.width || '', errors.height || '', errors.depth || '');
    return errors;
  };
  return (
    <WidthHeightDepthCont>
      <TextField
        disabled={disable}
        onChange={handleChange}
        name={name?.width || 'width'}
        value={values.width}
        InputProps={{
          sx: { borderRadius: '6px', backgroundColor: 'white' },
          endAdornment: <InputAdornment position="end">mm</InputAdornment>,
        }}
        label="Width"
        helperText={errors().width ? errors().width : 'This field is optional.'}
        // onBlur={handleBlur}
        error={Boolean(errors().width)}
      />

      <TextField
        disabled={disable}
        onChange={handleChange}
        name={name?.height || 'height'}
        value={values.height}
        InputProps={{
          sx: {
            borderRadius: '6px',
            backgroundColor: 'white',
          },
          endAdornment: <InputAdornment position="end">mm</InputAdornment>,
        }}
        label="Height"
        helperText={errors().height ? errors().height : 'This field is optional.'}
        // onBlur={handleBlur}
        error={Boolean(errors().height)}
      />

      <TextField
        disabled={disable}
        onChange={handleChange}
        name={name?.depth || 'depth'}
        value={values.depth}
        InputProps={{
          sx: { borderRadius: '6px', backgroundColor: 'white' },
          endAdornment: <InputAdornment position="end">mm</InputAdornment>,
        }}
        label="Depth"
        helperText={errors().depth ? errors().depth : 'This field is optional.'}
        // onBlur={handleBlur}
        error={Boolean(errors().depth)}
      />
    </WidthHeightDepthCont>
  );
};

export default WidthHeightDepth;
