import React from 'react';
import { components, GroupBase, MultiValueRemoveProps, Props, StylesConfig } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { COLORS } from '../../constants/COLORS';
import { usersServices } from '../../services/usersServices';
import { CircularProgress, Tooltip } from '@mui/material';
import { useCheckUser } from '../../../pages/Administration/Users/components/CreateUserModal/useCheckUser';

function Select<
  OptionType,
  IsMulti extends boolean = false,
  GroupType extends GroupBase<OptionType> = GroupBase<OptionType>,
>({
  checkUsers,
  color = COLORS.PRIMARY,
  error = false,
  emailsToCheck,
  invalidEmails,
  removeInvalidEmail,
  ...props
}: Props<OptionType, IsMulti, GroupType> & ISelectCustomProps) {
  const validateOption = (inputValue: string) => {
    if (checkUsers) {
      if (invalidEmails?.includes(inputValue)) {
        return COLORS.FAILURE;
      }
    } else return color;
  };

  const MultiValueRemove = (props: any) => {
    if (!checkUsers)
      return (
        <components.MultiValueRemove {...props}>
          <i className="bx bx-x" style={{ fontSize: 20, alignSelf: 'center' }} />
        </components.MultiValueRemove>
      );

    const { data } = props;
    const email = data.value;

    return (
      <components.MultiValueRemove {...props}>
        {emailsToCheck?.includes(email) ? (
          <CircularProgress style={{ color: COLORS.WHITE }} size={15} />
        ) : Boolean(invalidEmails?.includes(email)) ? (
          <Tooltip title="User already exists. Click to remove">
            <i
              className="bx bxs-info-circle"
              onClick={() => {
                removeInvalidEmail && removeInvalidEmail(email);
              }}
            />
          </Tooltip>
        ) : (
          <i className="bx bx-x" style={{ fontSize: 20, alignSelf: 'center' }} />
        )}
      </components.MultiValueRemove>
    );
  };

  return (
    <CreatableSelect
      {...props}
      components={{ MultiValueRemove }}
      styles={{
        control: (styles: any) => ({
          ...styles,
          backgroundColor: 'white',
          borderRadius: 6,
          textoverflow: 'ellipsis',
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
              color: !isSelected ? 'black' : undefined,
              backgroundColor: !isSelected ? COLORS.PRIMARY_INACTIVE : undefined,
            },
          };
        },
        input: (styles) => ({ ...styles }),
        multiValue: (styles: any, data) => {
          return {
            ...styles,
            borderRadius: 4,
            paddingLeft: 4,
            paddingRight: 4,
            color: 'white',
            backgroundColor: validateOption(data.children as string) || color,
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
          cursor: 'pointer',
          color: 'white',
          ':hover': {
            backgroundColor: 'transparent',
            color: 'white',
            fontWeight: 900,
          },
        }),
      }}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: error ? 'red' : color,
        },
      })}
    />
  );
}

interface ISelectCustomProps {
  color?: string;
  error?: boolean;
  checkUsers?: boolean;
  emailsToCheck?: string[];
  invalidEmails?: string[];
  removeInvalidEmail?: (email: string) => void;
}

export default Select;
