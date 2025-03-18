import React, { useState, useEffect } from 'react';
import BasicModal from '../../../../../shared/components/Modals/BasicModal/BasicModal';
import ShopifyModal from './Shopify/ShopifyModal';
import { CONFIG } from '../../../../../shared/utils/config';
import ShopifySetupModal from './Shopify/Setup/ShopifySetupModal';

// TODO: ADD NEW ENV
// REACT_APP_SHOPIFY_CLIENT_ID=a6c88d6a8a6a0ca488caada6087cd396
// REACT_APP_SHOPIFY_REDIRECT_URI=http://localhost:3000/admin/integrations/integration?integration_data_id=shopify

interface Props {
  type: 'Shopify' | 'other' | 'shopify_setup' | null;
  onClose: VoidFunction;
  shopUrlProps?: string;
  integratingProps?: boolean;
  buttonProps?: {
    text?: string;
    onClick?: VoidFunction;
    color?: 'primary' | 'success' | 'info' | 'pending' | 'failure' | 'grey' | 'black' | 'primary_pale' | 'white';
    disabled?: boolean;
  };
  setupType?: 'location'; //add more body here
}

const IntegrationModal: React.FC<Props> = ({
  setupType,
  type,
  onClose,
  shopUrlProps,
  integratingProps,
  buttonProps,
}) => {
  const [integrating, setIntegrating] = useState(integratingProps || false);

  const [shopUrl, setShopUrl] = useState(shopUrlProps || '');

  const queryParams = new URLSearchParams(window.location.search);

  const code = queryParams.get('code');
  const shop = queryParams.get('shop');

  const renderCont = () => {
    switch (type) {
      case 'Shopify':
        return <ShopifyModal integrating={integrating} shopUrl={shopUrl} setShopUrl={setShopUrl} />;
      case 'shopify_setup':
        return <ShopifySetupModal type={setupType} />;
      case 'other':
        return <div>Other</div>;
      default:
        return null;
    }
  };

  const handleSave = () => {
    setIntegrating(true);
    window.location.href = `https://${shopUrl}.myshopify.com/admin/oauth/authorize?client_id=${CONFIG.SHOPIFY_CLIENT_ID}&scope=read_products,read_orders&redirect_uri=${CONFIG.SHOPIFY_REDIRECT_URI}`;
  };

  useEffect(() => {
    if (code && shop) {
      setShopUrl(shop.split('.')[0]);
      setIntegrating(true);
    }
  }, [code, shop]);

  return (
    <BasicModal
      open={type !== null}
      onClose={onClose}
      breadCrumbs={['Administration', 'Integrations', type as string, 'Setup']}
      bottomButton={
        setupType
          ? undefined
          : {
              text: buttonProps?.text || 'Save',
              onClick: buttonProps?.onClick || handleSave,
              color: buttonProps?.color || 'success',
              disabled: buttonProps?.disabled || integrating || !shopUrl,
            }
      }
    >
      {renderCont()}
    </BasicModal>
  );
};

export default IntegrationModal;
