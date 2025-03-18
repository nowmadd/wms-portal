import React, { useEffect, useMemo, useState } from 'react';
import { Box, CircularProgress, Link, Typography, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Header, IntegrationItemCont, IntegrationsMainCont } from './Integrations.styles';
import IntegrationCard from './components/IntegrationCard/IntegrationCard';
import { integrationsServices } from '../../../shared/services/integrationsServices';
import ErrorMessagePanel from '../../../shared/components/ErrorMessagePanel/ErrorMessagePanel';
import InfoPanel from '../../../shared/components/InfoPanel/InfoPanel';
import IntegrationModal from './components/IntegrationModal/IntegrationModal';
import ManageIntegration from './components/ManageIntegration/ManageIntegration';
import { useDebounce } from 'use-debounce';
import { ls } from '../../../shared/utils/ls';
import { CONFIG } from '../../../shared/utils/config';

const { getIntegrations, exchangeCodeForToken, importOrders } = integrationsServices();

const Integrations = () => {
  const { mutate, isLoading: isExchanging } = exchangeCodeForToken();
  const { mutateAsync } = importOrders();

  const curPath = window.location.pathname;
  const navigate = useNavigate();
  const { breadcrumbs } = useParams() as { breadcrumbs: string };
  const { data, isLoading, error } = getIntegrations();
  const [modalType, setModalType] = useState<'Shopify' | 'other' | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const { getLS, setLS } = ls();

  const queryParams = new URLSearchParams(window.location.search);

  const integration_data_id = queryParams.get('integration_data_id');
  const codeParam = queryParams.get('code');
  const shop = queryParams.get('shop');
  const timestamp = queryParams.get('timestamp');

  const integrationsData = useMemo(() => {
    if (isLoading) {
      return;
    } else {
      return data ? data.data : undefined;
    }
  }, [data, isLoading]);

  const handleIntegrationClick = (name: 'Shopify' | 'other', isEnabled: boolean, integration_data_id: string) => {
    // if (isEnabled) {
    if (isEnabled) {
      // replace with isActive
      navigate(`${curPath}/integration?id=${integration_data_id}`);
    } else {
      setModalType(name);
    }
  };

  const getFeedbackMessage = (statusCode: number): string => {
    switch (statusCode) {
      case 400:
      case 401:
        return 'Hmmm, shop failed to connect. Please re-enter Shop URL and try again.';
      case 402:
        return 'Oops, the shop does not have access to integrations. A payment is required in Shopify.';
      case 403:
        return 'Oh no, access to your shop is denied.';
      case 404:
        return 'Oh no, shop not found.';
      case 423:
        return 'Hmmm, the shop is unavailable.';
      default:
        if (statusCode >= 500 && statusCode < 600) {
          return 'An unexpected error occurred. Please try again later.';
        }
        return 'Something went wrong. Please try again.';
    }
  };

  useEffect(() => {
    if (codeParam && shop && !breadcrumbs) {
      setModalType('Shopify');
      const importOrders = getLS('shopify_import_orders');
      mutate(
        { code: codeParam, shop },
        {
          onSuccess: async (res: any) => {
            // if (importOrders) {
            //   mutateAsync({
            //     clientId: CONFIG.SHOPIFY_CLIENT_ID,
            //     clientSecret: CONFIG.SHOPIFY_CLIENT_SECRET,
            //     shopName: shop,
            //     sessiontoken: CONFIG.SHOPIFY_CLIENT_ID,
            //   });
            // }
            setLS('shopify_location', JSON.stringify(res.data.data.locations));

            navigate(
              `integration?integration_data_id=shopify&code=${codeParam}&shop=${shop}&timestamp=${res.data.data.updatedAt}&id=INT-7F92L6-J0T`,
            );
          },
          onError: (err: any) => {
            console.log('ERRROR', err);
            //TODO: match the error code with the feedback message
            const errCode = err.data.data.statusCode;
            setErrorMessage(getFeedbackMessage(errCode));
          },
        },
      );
    }
  }, [codeParam, shop, breadcrumbs]);

  return breadcrumbs ? (
    <ManageIntegration />
  ) : (
    <IntegrationsMainCont>
      <Header>
        <Typography fontSize={24} fontWeight={900}>
          Integrations
        </Typography>
      </Header>
      <Typography fontSize={14} fontWeight={500}>
        You can setup, update, enable, and disable integrations here.
        <Link
          href={
            'https://indigowms.atlassian.net/servicedesk/customer/portal/1/topic/1076aa50-425a-4157-9642-93f8e376d67a'
          }
          style={{ cursor: 'pointer' }}
          color={'#0D6EFD'}
          target="_blank"
        >
          Learn more
        </Link>
      </Typography>

      {integrationsData ? (
        integrationsData.length > 0 ? (
          <IntegrationItemCont>
            <Grid container spacing={2}>
              {integrationsData &&
                integrationsData.map((t) => (
                  <Grid item xs={4}>
                    {t.integration_data_active && (
                      <IntegrationCard integrationDetails={t} onClick={handleIntegrationClick} />
                    )}
                  </Grid>
                ))}
            </Grid>
          </IntegrationItemCont>
        ) : (
          <InfoPanel noIcon={true} color={'grey'} info={'No Data Found'} />
        )
      ) : error ? (
        error.response ? (
          <ErrorMessagePanel errorCode={error.response?.status} />
        ) : (
          <ErrorMessagePanel errorMessage={'Something went wrong'} />
        )
      ) : (
        <CircularProgress size={25} />
      )}
      {modalType ? <IntegrationModal type={modalType} onClose={() => setModalType(null)} /> : <React.Fragment />}
    </IntegrationsMainCont>
  );
};

export default Integrations;
