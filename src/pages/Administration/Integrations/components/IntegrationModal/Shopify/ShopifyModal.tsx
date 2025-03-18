import React, { useEffect, useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '../../../../../../shared/components/TextField/TextField';
import { ASSETS } from '../../../../../../shared/constants/ASSETS';
import { Box, LinearProgress, Typography } from '@mui/material';
import Checkbox from '../../../../../../shared/components/Checkbox/Checkbox';
import { ls } from '../../../../../../shared/utils/ls';
import { ShopifyCont, ShopifyTop } from './shopify.styles';

interface Props {
  integrating: boolean;
  shopUrl: string;
  setShopUrl: (url: string) => void;
}

const ShopifyModal: React.FC<Props> = ({ integrating, shopUrl, setShopUrl }) => {
  const { setLS } = ls();
  const [importOrder, setImportOrder] = useState(true);
  const [syncStore, setSyncStore] = useState(true);
  const [importInventory, setImportInventory] = useState(true);

  useEffect(() => {
    setLS('shopify_import_orders', importOrder);
    setLS('shopify_sync_store', syncStore);
    setLS('shopify_import_inventory', importInventory);
  }, [importOrder, syncStore, importInventory]);

  return (
    <ShopifyCont>
      <ShopifyTop>
        <img
          src={ASSETS.SHOPIFY_LOGO}
          style={{
            width: 60,
            height: 60,
            background: '#eaf8d1',
            padding: 5,
            borderRadius: 5,
          }}
        />
        <Box>
          <Typography fontWeight={700} fontSize={18}>
            Shopify
          </Typography>
          <Typography fontWeight={400} fontSize={14}>
            Manage sync and fulfil orders placed on a shopify eCommerce platform.
          </Typography>
          <Typography fontWeight={400} fontSize={12} sx={{ opacity: 0.6 }}>
            eCommerce, Inventory Management
          </Typography>
        </Box>
      </ShopifyTop>
      <TextField
        label="Shop URL"
        endAdorment=".myshopify.com"
        value={shopUrl}
        onChange={(e) => {
          const url = e.target.value;
          if (url.includes('myshopify.com')) {
            const shopName = url.split('.')[url.split('.').length - 3];
            //remove https:// from shopname if there is any
            if (shopName.includes('https://')) {
              const newShopName = shopName.replace('https://', '');
              return setShopUrl(newShopName);
            }
            return setShopUrl(shopName);
          } else {
            setShopUrl(url);
          }
        }}
        disabled={integrating}
        onPaste={(e) => {
          //if user pastes the full url, we extract the shop name
        }}
      />
      {/* <TextField label="Shopify Access Token" /> */}
      {integrating ? (
        <LinearProgress variant="indeterminate" sx={{ margin: '19px 0' }} />
      ) : (
        <Box display={'flex'} flexDirection={'column'}>
          {/* <Checkbox
            checked={importOrder}
            onChange={() => setImportOrder(!importOrder)}
            color="primary"
            label={'Import my open orders on initialisation'}
          /> */}
          <Checkbox
            checked={syncStore}
            onChange={() => setSyncStore(!syncStore)}
            color="primary"
            label={'Sync Store Location'}
          />
          <Checkbox
            checked={importInventory}
            onChange={() => setImportInventory(!importInventory)}
            color="primary"
            label={'Import my inventory items'}
          />
        </Box>
      )}
    </ShopifyCont>
  );
};

export default ShopifyModal;
