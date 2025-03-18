import React, { KeyboardEventHandler, ReactHTMLElement, useState } from 'react';
import { ButtonCont, Content, DeleteCont } from './CancelOrderModal.styles';
import { Typography } from '@mui/material';
import { ordersServices } from '../../../../shared/services/ordersServices';
import { useQueryClient } from 'react-query';
import { QUERY } from '../../../../shared/constants/QUERYNAMES';
import Button from '../../../../shared/components/Button/Button';
import InfoPanel from '../../../../shared/components/InfoPanel/InfoPanel';
import ErrorMessagePanel from '../../../../shared/components/ErrorMessagePanel/ErrorMessagePanel';
import { error } from 'console';

interface Props {
  close: VoidFunction;
  orderRef: string;
  orderId: string;
}

const { updateOrderStatus } = ordersServices();
const CancelOrderModal: React.FC<Props> = ({ close, orderRef, orderId }) => {
  const { mutateAsync: updateOrder } = updateOrderStatus();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const cancelOrder = async () => {
    setIsLoading(true);
    setErrorMessage('');
    await updateOrder(
      {
        order_id: orderId,
        payload: {
          order_status: 'cancelled',
        },
      },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries(QUERY.ORDER_DETAILS);
          await queryClient.invalidateQueries(QUERY.ORDER_LIST, { refetchInactive: true });

          setIsLoading(false);
          close();
        },
        onError(error, variables, context) {
          setErrorMessage('Something went wrong');
          setIsLoading(false);
        },
      },
    );
  };

  return (
    <DeleteCont>
      <Content>
        <Typography fontSize={14} fontWeight={400}>
          I would like to cancel order <strong>{orderRef}</strong>.
        </Typography>

        <InfoPanel color={'pending'} info={'THIS ACTION CANNOT BE UNDONE.'} />
        {errorMessage && <ErrorMessagePanel errorMessage={errorMessage} />}
      </Content>
      <ButtonCont>
        <Button
          variant={'solid'}
          text={'CANCEL ORDER'}
          color={'pending'}
          onClick={cancelOrder}
          disabled={isLoading}
          loading={isLoading}
        />
        <Button
          variant={'solid'}
          text={'CANCEL'}
          color={'grey'}
          onClick={close}
          disabled={isLoading}
          loading={isLoading}
        />
      </ButtonCont>
    </DeleteCont>
  );
};

export default CancelOrderModal;
