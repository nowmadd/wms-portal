import {
  ManageIntegrationCont,
  Header,
  Body,
  HeaderBody,
  DetailsCont,
  DetailsSection,
  LabelDesc,
  Labels,
  ButtonCont,
  HeaderContent,
} from './ManageIntegrations.styles';
import Breadcrumbs from '../../../../../shared/components/Breadcrumbs/Breadcrumbs';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { ASSETS } from '../../../../../shared/constants/ASSETS';
import { IIntegrationAccountDetails, IIntegrationDetails } from '../../../../../shared/types/integrations.types';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { integrationsServices } from '../../../../../shared/services/integrationsServices';
import { useSearchParams } from 'react-router-dom';
import { ls } from '../../../../../shared/utils/ls';
import IntegrationModal from '../IntegrationModal/IntegrationModal';
import { usePermissionCheck } from '../../../../../shared/hooks/usePermissionCheck';
import Button from '../../../../../shared/components/Button/Button';
import BasicModal from '../../../../../shared/components/Modals/BasicModal/BasicModal';
import ImportOrdersResult from './components/Shopify/ImportOrdersResult/ImportOrdersResult';

export type Props = {
  integrationData?: Array<IIntegrationDetails>;
};

const { getIntegrationDetails } = integrationsServices();

const ManageIntegration = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchId = searchParams.get('id') || '';
  const { data, isLoading } = getIntegrationDetails(searchId);
  const [integration, setIntegration] = useState<IIntegrationAccountDetails | null>(null);
  const [showShopifySetupModal, setShowShopifySetupModal] = useState(false);
  const { getLS, setLS } = ls();
  const { adminSupervisorOwner } = usePermissionCheck();
  const [showImport, setShowImport] = useState(false);

  useEffect(() => {
    if (isLoading) {
      return;
    } else {
      setLS('shopify_integration_id', data?.data.integration_id);
      setIntegration(data ? data.data : null);
    }
  }, [data, isLoading]);

  useEffect(() => {
    const location = getLS('shopify_location');
    if (location) {
      setShowShopifySetupModal(true);
    }
  }, []);

  const handleNext = () => {
    console.log('Next');
  };

  return !isLoading ? (
    <ManageIntegrationCont>
      <Header>
        <Typography fontSize={36} fontWeight={900} sx={{ lineHeight: 1.2 }}>
          {integration?.integration_source?.integration_data_name} Integration
        </Typography>
        <Breadcrumbs page={integration?.integration_source.integration_data_name || ''} />
      </Header>

      <Body>
        <HeaderBody>
          <img
            src={
              integration?.integration_source.integration_data_image
                ? integration?.integration_source.integration_data_image
                : ASSETS.SHOPIFY_LOGO
            }
            alt={integration?.integration_source.integration_data_name || ''}
            style={{ width: 70, height: 70 }}
          />
          <HeaderContent>
            <DetailsCont>
              <Typography fontSize={18} fontWeight={700}>
                {integration?.integration_source.integration_data_name}
              </Typography>
              <Typography fontSize={14} fontWeight={400}>
                {integration?.integration_source.integration_data_description}
              </Typography>
              <Typography fontSize={12} fontWeight={400} sx={{ opacity: 0.6 }}>
                {integration?.integration_source.integration_data_tags.join(', ')}
              </Typography>
            </DetailsCont>
            <ButtonCont>
              {adminSupervisorOwner ? (
                <Button
                  onClick={() => setShowImport(true)}
                  startIcon="bx bx-plus"
                  variant={'solid-thin'}
                  text={'Import Orders'}
                  color={'primary'}
                />
              ) : (
                <React.Fragment />
              )}
            </ButtonCont>
          </HeaderContent>
        </HeaderBody>
        <Typography fontSize={24} fontWeight={800}>
          Integration Details
        </Typography>
        <Grid container spacing={'20px'} sx={{ display: 'flex' }}>
          <DetailsSection lg={6} item>
            <Box>
              <Labels>{integration?.integration_source.integration_data_name} Shop Name</Labels>
              <LabelDesc>{integration?.integration_details.shop_name}</LabelDesc>
            </Box>
            <Box>
              <Labels>{integration?.integration_source.integration_data_name} Domain</Labels>
              <LabelDesc>{integration?.integration_details.shop_domain}</LabelDesc>
            </Box>
          </DetailsSection>
          <DetailsSection lg={6} item>
            <Box>
              <Labels>{integration?.integration_source.integration_data_name} Shop Created</Labels>
              <LabelDesc>{moment(integration?.integration_details.shop_created).format('DD/MM/YYYY HH:mm')}</LabelDesc>
            </Box>
            <Box>
              <Labels>Integration Created</Labels>
              <LabelDesc> {moment(integration?.integration_created).format('DD/MM/YYYY HH:mm')}</LabelDesc>
            </Box>
          </DetailsSection>
        </Grid>
      </Body>
      {showShopifySetupModal && (
        <IntegrationModal
          buttonProps={{
            text: 'Next',
            onClick: handleNext,

            disabled: false,
          }}
          type={'shopify_setup'}
          onClose={() => setShowShopifySetupModal(false)}
          setupType="location"
        />
      )}
      {showImport && (
        <BasicModal
          breadCrumbs={['Administration', 'Integration', 'Shopify', 'Import Orders']}
          onClose={() => setShowImport(false)}
          open={showImport}
        >
          <ImportOrdersResult
            data={{ data: { successful: [], conflicts: [], errors: [] } }}
            onClose={() => setShowImport(false)}
          />
        </BasicModal>
      )}
    </ManageIntegrationCont>
  ) : (
    <CircularProgress size={25} />
  );
};

export default ManageIntegration;
