//context for general data

import { useState, useContext, useEffect, createContext } from 'react';
import { IDefaultValue } from '../types/general.types';
import { ISpecificAccount } from '../types/account.types';
import { ToastContainer, toast } from 'react-toastify';
import Toast from '../components/Toast/Toast';
const GeneralContext = createContext({
  account_setup_status: {
    complete: false,
    progress: {
      step_completed: 0,
      step_count: 0,
    },
    steps: {
      create_inventory: false,
      create_jobs: false,
      create_location: false,
      create_warehouse: false,
      download_app: false,
      import_orders: false,
      print_location_barcode: false,
      update_profile: false,
      perform_jobs: false,
    },
  },
  setAccountSetupStatus: () => {},
  showToast: () => {},
} as IDefaultValue);

const GeneralConsumer = GeneralContext.Consumer;

const General = (props: any) => {
  const [account_setup_status, setAccount_setup_status] = useState<ISpecificAccount['account_setup_status']>({
    complete: false,
    progress: {
      step_completed: 0,
      step_count: 0,
    },
    steps: {
      create_inventory: false,
      create_jobs: false,
      create_location: false,
      create_warehouse: false,
      download_app: false,
      import_orders: false,
      print_location_barcode: false,
      update_profile: false,
      perform_jobs: false,
    },
  });

  const setAccountSetupStatus = (data: ISpecificAccount['account_setup_status']) => {
    setAccount_setup_status(data);
  };

  const showToast = (
    message: string,
    type: 'success' | 'error' | 'info' | 'warning',
    /**
     * Set the delay in ms to close the toast automatically.
     * Use 0 to prevent the toast from closing.
     */
    autoClose: number,
    customHeader?: string,
  ) => {
    toast((props) => <Toast {...props} message={message} type={type} customHeader={customHeader} />, {
      ...(autoClose !== 0 && { autoClose }),
    });
  };

  useEffect(() => {
    const handleApiError = (event: CustomEvent) => {
      const error = event.detail;
      showToast(error, 'error', 5000);
    };

    // Add event listener for API errors
    document.addEventListener('apiError', handleApiError as EventListener);

    return () => {
      // Cleanup event listener
      document.removeEventListener('apiError', handleApiError as EventListener);
    };
  }, []);

  return (
    <GeneralContext.Provider
      value={{
        account_setup_status,
        setAccountSetupStatus,
        showToast,
      }}
    >
      <ToastContainer hideProgressBar autoClose={false} />
      {props.children}
    </GeneralContext.Provider>
  );
};

const GeneralProvider = General;

export { GeneralProvider, GeneralConsumer, GeneralContext };
