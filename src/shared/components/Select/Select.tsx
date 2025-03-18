import React, { useMemo } from 'react';
import ReactSelect, { GroupBase, Props } from 'react-select';
import { COLORS } from '../../constants/COLORS';
import Typography from '@mui/material/Typography/Typography';
import { usersServices } from '../../services/usersServices';
import { groupsServices } from '../../services/groupsServices';
import { ls } from '../../utils/ls';
import { locationsServices } from '../../services/locationsServices';
import { warehousesServices } from '../../services/warehousesServices';
import { isArray } from 'lodash';

interface ISelectCustomProps {
  color?: string;
  label?: string;
  isUsersList?: boolean;
  isGroupsList?: boolean;
  isWarehouses?: boolean;
  isLocations?: boolean;
  removeFromSelection?: string[]; //removeExisting user
  onError?: boolean;
  helperText?: string;
  selectedWarehouseId?: string | null;
  disabledOptions?: string[];
}

const { getUsersList } = usersServices();
const { getGroupsList } = groupsServices();
const { getWarehousesList } = warehousesServices();
const { getLocationsList } = locationsServices();
function Select<
  OptionType,
  IsMulti extends boolean = false,
  GroupType extends GroupBase<OptionType> = GroupBase<OptionType>,
>({
  color = COLORS.PRIMARY,
  label = '',
  isUsersList,
  isGroupsList,
  isWarehouses,
  isLocations,
  removeFromSelection,
  onError,
  helperText,
  selectedWarehouseId,
  disabledOptions: disableOptions,
  ...props
}: Props<OptionType, IsMulti, GroupType> & ISelectCustomProps) {
  const { getLS } = ls();

  const { data: usersData, isLoading: isUserLoading } = isUsersList ? getUsersList() : { data: null, isLoading: false };
  const { data: groupsData, isLoading: isGroupsLoading } = isGroupsList
    ? getGroupsList()
    : { data: null, isLoading: false };
  const { data: warehouseData, isLoading: isWarehousesLoading } =
    isWarehouses || selectedWarehouseId ? getWarehousesList() : { data: null, isLoading: false };
  const { data: locationsData, isLoading: isLocationsLoading } = isLocations
    ? getLocationsList(false)
    : { data: null, isLoading: false };
  // useMemo to generate users list
  const users = useMemo(() => {
    if (usersData) {
      const userOption = usersData.data.map((user) => ({
        value: user.user_email,
        label:
          user.user_firstname || user.user_lastname
            ? user.user_firstname + ' ' + user.user_lastname
            : user.user_email || 'No Name',
      }));
      return userOption.filter((item) => !removeFromSelection?.includes(item.value));
    } else {
      return [];
    }
  }, [usersData]);

  // useMemo to generate groups list
  const groups = useMemo(() => {
    if (groupsData) {
      return groupsData.data.map((group) => ({
        value: group.group_id,
        label: group.group_name,
        isDisabled: disableOptions?.includes(group.group_id),
      }));
    } else {
      return [];
    }
  }, [groupsData]);

  // useMemo to generate warehouses list
  const warehouses = useMemo(() => {
    if (warehouseData) {
      return warehouseData.data.map((location) => ({
        value: location.location_id,
        label: location.location_name,
        isDisabled: disableOptions?.includes(location.location_id),
      }));
    } else {
      return [];
    }
  }, [warehouseData]);

  // useMemo to generate locations list
  const locations = useMemo(() => {
    if (locationsData) {
      return locationsData.data.map((location) => ({
        value: location.location_id,
        label: location.location_name,
        isDisabled: disableOptions?.includes(location.location_id),
      }));
    } else {
      return [];
    }
  }, [locationsData, disableOptions]);

  const warehouseLocations = useMemo(() => {
    if (warehouseData && selectedWarehouseId) {
      return warehouseData.data
        .find((item) => item.location_id === selectedWarehouseId)
        ?.location_children?.map((location) => ({
          value: location.location_id,
          label: location.location_name,
          isDisabled: disableOptions?.includes(location.location_id),
        }));
    } else return [];
  }, [warehouseData, selectedWarehouseId, disableOptions]);

  return (
    <div style={{ flex: 1 }}>
      {label ? (
        <Typography fontSize={13} fontWeight={600} color={COLORS.TEXT_GRAY} sx={{ margin: '0 0 5px 10px' }}>
          {label}
          {props.required && <span style={{ color: '#BE4B4A', marginLeft: 3 }}>*</span>}
        </Typography>
      ) : (
        <React.Fragment />
      )}
      <ReactSelect
        placeholder="Select..."
        isLoading={isUserLoading || isGroupsLoading || isWarehousesLoading || isLocationsLoading}
        isDisabled={isUserLoading || isGroupsLoading || isWarehousesLoading || isLocationsLoading}
        {...props}
        options={
          isUsersList
            ? (users as any)
            : isGroupsList
            ? groups
            : isLocations
            ? locations
            : selectedWarehouseId
            ? warehouseLocations
            : isWarehouses
            ? warehouses
            : props.options
        }
        value={
          isUsersList
            ? (users.find((option) => option.value === props.value) as any)
            : isGroupsList
            ? groups.filter((option) => ((props.value as any) || []).some((v: any) => v.value === option.value))
            : isWarehouses
            ? isLocations
              ? locations.filter((option) => ((props.value as any) || []).some((v: any) => v.value === option.value))
              : !props.value
              ? null
              : warehouseLocations?.find((option) => option.value === props.value)
            : props.value
        }
        styles={{
          control: (styles: any) => ({
            ...styles,
            ...(onError && { borderColor: COLORS.FAILURE }),
            backgroundColor: 'white',
            borderRadius: 6,
          }),
          option: (styles: any, { isDisabled, isFocused, isSelected }: any) => {
            return {
              ...styles,
              backgroundColor: isDisabled
                ? undefined
                : isSelected
                ? color
                : isFocused
                ? COLORS.PRIMARY_INACTIVE
                : undefined,
              color: isDisabled ? '#ccc' : isSelected ? 'white' : undefined,
              cursor: isDisabled ? 'not-allowed' : 'default',
              ':active': {
                ...styles[':active'],
                backgroundColor: !isDisabled ? (isSelected ? color : undefined) : undefined,
              },
              ':hover': {
                ...styles[':hover'],
                color: isDisabled ? '' : !isSelected ? 'black' : undefined,
                backgroundColor: isDisabled ? 'unset' : !isSelected ? COLORS.PRIMARY_INACTIVE : undefined,
              },
            };
          },
          input: (styles) => ({ ...styles }),
          multiValue: (styles: any) => {
            return {
              ...styles,
              borderRadius: 4,
              paddingLeft: 4,
              paddingRight: 4,
              color: 'white',
              backgroundColor: color,
            };
          },
          multiValueLabel: (styles: any) => ({
            ...styles,
            color: 'white',
            fontWeight: 500,
          }),
          multiValueRemove: (styles: any) => ({
            ...styles,
            paddingRight: 0,
            color: 'white',
            ':hover': {
              backgroundColor: 'transparent',
              color: 'white',
            },
          }),
        }}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: color,
          },
        })}
      />
      {helperText ? (
        <Typography fontSize={12} color={COLORS.MUI_HELPER_TEXT} sx={{ margin: '3px 14px 0px' }}>
          {helperText}
        </Typography>
      ) : (
        <React.Fragment />
      )}
    </div>
  );
}

export default Select;
