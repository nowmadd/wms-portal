import React, { useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import TextField from '../../../../../../shared/components/TextField/TextField';
import Button from '../../../../../../shared/components/Button/Button';
import { warehousesServices } from '../../../../../../shared/services/warehousesServices';
import Box from '@mui/material/Box/Box';
import { AddClosureCont, ButtonCont, FormCont, TimeClosure } from './AddClosureModal.styles';
import { IWarehouseDetails } from '../../../../../../shared/types/warehouse.types';
import dayjs, { Dayjs } from 'dayjs';
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import Switch from '../../../../../../shared/components/Switch/Switch';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker/DesktopTimePicker';
import Typography from '@mui/material/Typography/Typography';
import { DatePicker } from '@mui/x-date-pickers';
import { COLORS } from '../../../../../../shared/constants/COLORS';
import { QUERY } from '../../../../../../shared/constants/QUERYNAMES';

interface Props {
  close: VoidFunction;
  locationId: string | undefined;
}

const { addWarehouseClosure } = warehousesServices();

const AddClosureModal: React.FC<Props> = ({ close, locationId }) => {
  const { mutateAsync: addWarehouseClosureDaoMutate } = addWarehouseClosure();
  const [isAdding, setIsAdding] = useState(false);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [warehouseClosed, setWarehouseClosed] = useState(false);
  const [closingDescription, setClosingDescription] = useState('');
  const [closureStartTime, setClosureStartTime] = useState<Dayjs | null>(null);
  const [closureEndTime, setClosureEndTime] = useState<Dayjs | null>(null);

  const queryClient = useQueryClient();

  const handleSave = async () => {
    setIsAdding(true);
    await addWarehouseClosureDaoMutate(
      {
        location_id: locationId || '',
        payload: {
          closure_description: closingDescription,
          closure_date: date?.valueOf(),
          closure_closed: warehouseClosed,
          closure_start: warehouseClosed ? '' : closureStartTime?.format('HH:mm'),
          closure_end: warehouseClosed ? '' : closureEndTime?.format('HH:mm'),
        },
      },
      {
        onSuccess(data, variables, context) {
          queryClient.invalidateQueries(QUERY.WAREHOUSE_DETAILS);
          close();
        },
      },
    );

    setIsAdding(false);
  };

  return (
    <AddClosureCont>
      <FormCont>
        <Box sx={{ flexDirection: 'column', display: 'flex' }}>
          <Typography fontSize={12} fontWeight={800} color={'#767676'} sx={{ margin: '0 0 5px 10px' }}>
            Date <span style={{ marginLeft: 2, color: COLORS.FAILURE }}>*</span>
          </Typography>
          <DatePicker
            disablePast
            value={date}
            defaultValue={null}
            sx={{ backgroundColor: 'white' }}
            onChange={(value: Dayjs | null) => setDate(value)}
            reduceAnimations
            slotProps={{ textField: { size: 'small' } }}
          />
        </Box>
        <FormControlLabel
          style={{ pointerEvents: 'none' }}
          sx={{ fontSize: 12 }}
          control={
            <Switch
              disabled={isAdding}
              sx={{ m: 1, pointerEvents: 'auto' }}
              onChange={() => setWarehouseClosed(!warehouseClosed)}
              checked={warehouseClosed}
              name="user_enabled"
            />
          }
          label={
            <Typography fontSize={12} color={'#767676'} fontWeight={500}>
              Warehouse is closed
            </Typography>
          }
        />
        <Box sx={{ flexDirection: 'column', display: 'flex' }}>
          <Typography fontSize={12} fontWeight={800} color={'#767676'} sx={{ margin: '0 0 5px 10px' }}>
            New Warehouse Open Hours
            {!warehouseClosed && <span style={{ marginLeft: 2, color: COLORS.FAILURE }}>*</span>}
          </Typography>
          <TimeClosure>
            <DesktopTimePicker
              disabled={isAdding || warehouseClosed}
              sx={{ width: '100%', backgroundColor: 'white' }}
              reduceAnimations
              slotProps={{ textField: { size: 'small' } }}
              onChange={(value: Dayjs | null) => setClosureStartTime(value)}
              value={closureStartTime ? dayjs(closureStartTime) : null}
            />
            <DesktopTimePicker
              disabled={isAdding || warehouseClosed}
              sx={{ width: '100%', backgroundColor: 'white' }}
              reduceAnimations
              slotProps={{ textField: { size: 'small' } }}
              onChange={(value: Dayjs | null) => setClosureEndTime(value)}
              value={closureEndTime ? dayjs(closureEndTime) : null}
            />
          </TimeClosure>
        </Box>
        <TextField
          required
          disabled={isAdding}
          label={'Reason for Closure'}
          onChange={(e) => setClosingDescription(e.target.value)}
          value={closingDescription}
        />
      </FormCont>

      <ButtonCont>
        <Button
          type="button"
          loading={isAdding}
          variant={'solid'}
          text={'Add Date'}
          color={'success'}
          onClick={() => handleSave()}
          disabled={
            !date ||
            !closingDescription ||
            (warehouseClosed ? false : !closureStartTime || !closureEndTime ? true : false)
          }
        />
      </ButtonCont>
    </AddClosureCont>
  );
};

export default AddClosureModal;
