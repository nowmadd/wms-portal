import { Box, OutlinedInput } from '@mui/material';
import React, { useRef, useEffect } from 'react';

type Props = {
  onChange: (res: string) => void;
};

const OtpInput: React.FC<Props> = ({ onChange }) => {
  const inputsRef = useRef<Array<HTMLInputElement>>([]);

  useEffect(() => {
    inputsRef.current[0].focus();
  }, []);

  const sendResult = () => {
    const res = inputsRef.current.map((input) => input.value).join('');
    onChange && onChange(res);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;

    const nextElementSibling = e.target.parentElement?.nextElementSibling?.firstChild;

    if (value.length > 1) {
      e.target.value = value.charAt(0);
      nextElementSibling && (nextElementSibling as HTMLInputElement).focus();
    } else {
      if (value.match('[0-9]{1}')) {
        nextElementSibling && (nextElementSibling as HTMLInputElement).focus();
      } else {
        e.target.value = '';
      }
    }
    sendResult();
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    const target = e.target as HTMLInputElement;
    const previousElementSibling = target.parentElement?.previousElementSibling?.firstChild;
    if (key === 'Backspace') {
      if (previousElementSibling) {
        target.value = '';
        (previousElementSibling as HTMLInputElement).focus();
        e.preventDefault();
      } else {
        target.value = '';
      }
      sendResult();
    }
  };

  const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const handleOnPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedValue = e.clipboardData.getData('Text');

    let currentInput = 0;

    for (let i = 0; i < pastedValue.length; i++) {
      const pastedCharacter = pastedValue.charAt(i);
      const currentInputElement = inputsRef.current[currentInput];
      const currentValue = currentInputElement.value;
      if (pastedCharacter.match('[0-9]{1}')) {
        if (!currentValue) {
          currentInputElement.value = pastedCharacter;
          const nextElementSibling = currentInputElement.parentElement?.nextElementSibling?.firstChild;

          if (nextElementSibling !== null && nextElementSibling !== undefined) {
            (nextElementSibling as HTMLInputElement).focus();
            currentInput++;
          }
        }
      }
    }
    sendResult();

    e.preventDefault();
  };

  return (
    <Box sx={{ display: 'flex', width: '100%', flexDirection: 'row', gap: '10px' }}>
      {Array.from(Array(6).keys()).map((i) => (
        <OutlinedInput
          key={i}
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
          onFocus={handleOnFocus}
          onPaste={handleOnPaste}
          inputProps={{
            maxLength: 1,
            style: { textAlign: 'center', fontSize: 32, fontWeight: 600, borderRadius: 10 },
          }}
          type="tel"
          inputRef={(el: HTMLInputElement) => (inputsRef.current[i] = el)}
          autoComplete={i === 0 ? 'one-time-code' : 'off'}
          sx={{
            borderRadius: 2,
            backgroundColor: '#ededed',
            // height: 70,
            // width: 56,
            // mr: 0.5,
            // ml: 0.5,
          }}
        />
      ))}
    </Box>
  );
};

export default OtpInput;
