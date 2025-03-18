import React from 'react';
import InfoPanel from '../InfoPanel/InfoPanel';

const ErrorMessagePanel = ({ errorCode, errorMessage = '' }: IErrorMessage) => {
  if (errorCode) {
    switch (errorCode) {
      case 404:
        return <InfoPanel noIcon={true} color={'grey'} info={'No Data Found'}></InfoPanel>;
      case 401:
        return <InfoPanel color={'failure'} info={'Something went wrong!'}></InfoPanel>;
      default:
        return <InfoPanel color={'failure'} info={'Something went wrong!'}></InfoPanel>;
    }
  } else {
    return <InfoPanel color={'failure'} info={errorMessage}></InfoPanel>;
  }
};

interface IErrorMessage {
  errorCode?: number | undefined;
  errorMessage?: string;
}

export default ErrorMessagePanel;
