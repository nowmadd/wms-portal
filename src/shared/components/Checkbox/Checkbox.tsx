import React from 'react';
import { CircularProgress, FormControlLabel } from '@mui/material';
import MUICheckBox, { CheckboxProps } from '@mui/material/Checkbox';

interface ICheckBoxProps extends CheckboxProps {
  label: string;
}

const Checkbox = ({ label, ...props }: ICheckBoxProps) => {
  return (
    <FormControlLabel
      label={label}
      control={
        <MUICheckBox value={props.value} checked={props.checked} onChange={props.onChange} color={props.color} />
      }
    />
  );
};

export default Checkbox;
