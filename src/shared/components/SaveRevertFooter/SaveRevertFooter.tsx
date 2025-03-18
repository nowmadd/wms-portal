import React from 'react';
import { FooterButtonCont, FooterMainCont } from './SaveRevertFooter.styles';
import Button from '../Button/Button';
import { Typography } from '@mui/material';
import { COLORS } from '../../constants/COLORS';

interface Props {
  show: boolean;
  onSave: () => void;
  onRevert?: () => void;
  isSaving?: boolean;
  saveDisabled?: boolean;
}

const SaveRevertFooter: React.FC<Props> = ({ isSaving, show, onSave, onRevert, saveDisabled }) => {
  return (
    <FooterMainCont sx={{ bottom: show ? 0 : -1000 }}>
      <Typography sx={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: 13, color: COLORS.TEXT_GRAY }}>
        Changes are not saved automatically <i className="bx bx-save" />
      </Typography>
      <FooterButtonCont>
        {/* <Button text="Revert" variant="outlined" color="failure" /> */}
        {onRevert ? <Button onClick={onRevert} text="Revert" variant="solid" color="failure" /> : <React.Fragment />}
        <Button
          type="button"
          loading={isSaving}
          onClick={onSave}
          text="Save"
          variant="solid"
          color="success"
          disabled={saveDisabled || isSaving}
        />
      </FooterButtonCont>
    </FooterMainCont>
  );
};

export default SaveRevertFooter;
