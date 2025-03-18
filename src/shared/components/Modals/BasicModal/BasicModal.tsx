import { Modal, Box, Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import { Header, ModalCont, IconButton, BreadCrumbsCont, ModalContScroll, ModalButtonCont } from './BasicModal.styles';
import { COLORS } from '../../../constants/COLORS';
import Button from '../../Button/Button';

interface Props {
  open: boolean;
  onClose?: VoidFunction;
  headerText?: string;
  headerMarginBottom?: number;
  breadCrumbs?: string[];
  bottomButton?: {
    text: string;
    onClick: VoidFunction;
    color: 'primary' | 'success' | 'info' | 'pending' | 'failure' | 'grey' | 'black' | 'primary_pale' | 'white';
    isLoading?: boolean;
    disabled?: boolean;
  };
}

const BasicModal: React.FC<React.PropsWithChildren<Props>> = ({
  headerMarginBottom,
  headerText,
  open,
  onClose,
  children,
  breadCrumbs,
  bottomButton,
}) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <ModalCont>
        <ModalContScroll>
          <Header sx={{ marginBottom: `${headerMarginBottom}px` }}>
            {headerText && (
              <Typography fontSize={16} fontWeight={700} sx={{ color: COLORS.TEXT_GRAY, borderRadius: 4 }}>
                {headerText || ''}
              </Typography>
            )}
            {breadCrumbs ? (
              <BreadCrumbsCont>
                {breadCrumbs.map((breadCrumb, index) => (
                  <React.Fragment key={index}>
                    {/* check if last index */}
                    {index === breadCrumbs.length - 1 ? (
                      <Typography fontSize={14} fontWeight={500}>
                        {breadCrumb}
                      </Typography>
                    ) : (
                      <>
                        <Typography color="#767676" fontSize={14} fontWeight={400} sx={{ textDecoration: 'underline' }}>
                          {breadCrumb}
                        </Typography>
                        <i className="bx bx-chevron-right" style={{ fontSize: 22, color: '#767676' }}></i>
                      </>
                    )}
                  </React.Fragment>
                ))}
              </BreadCrumbsCont>
            ) : (
              <React.Fragment />
            )}

            {onClose ? (
              <IconButton>
                <i
                  className="bx bx-x"
                  style={{ fontSize: 32, color: COLORS.BLACK, marginLeft: 'auto' }}
                  onClick={onClose}
                />
              </IconButton>
            ) : (
              <React.Fragment />
            )}
          </Header>
          {children}
          {bottomButton ? (
            <ModalButtonCont>
              <Button
                loading={bottomButton?.isLoading}
                onClick={bottomButton?.onClick}
                variant={'solid'}
                color={bottomButton?.color}
                text={bottomButton?.text}
                disabled={bottomButton?.disabled || bottomButton?.isLoading}
              />
              {/* <Button onClick={closeModal} variant={'solid'} color={'grey'} text="CANCEL" /> */}
            </ModalButtonCont>
          ) : (
            <React.Fragment />
          )}
        </ModalContScroll>
      </ModalCont>
    </Modal>
  );
};

export default BasicModal;
