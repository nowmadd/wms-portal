import React from 'react';

import { Icon, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import {
  ImageCont,
  IntegrationItemMain,
  IntegrationLogo,
  IntegrationRow,
  ItemLeft,
  ItemRight,
} from './IntegrationCard.styles';
import { IntegrationAvatarRow } from '../../Integrations.styles';
import { COLORS } from '../../../../../shared/constants/COLORS';
import Button from '../../../../../shared/components/Button/Button';
import { IIntegrationDetails } from '../../../../../shared/types/integrations.types';

interface Props {
  integrationDetails: IIntegrationDetails;
  onClick: (name: 'Shopify' | 'other', isEnabled: boolean, id: string) => void;
}

const IntegrationCard: React.FC<Props> = ({ integrationDetails, onClick }) => {
  return (
    <IntegrationItemMain>
      <IntegrationAvatarRow>
        <IntegrationLogo>
          <ImageCont>
            <img
              src={integrationDetails.integration_data_image}
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: integrationDetails.integration_data_color,
                padding: 10,
                objectFit: 'contain',
                borderRadius: 10,
              }}
            />
          </ImageCont>
        </IntegrationLogo>
      </IntegrationAvatarRow>
      <IntegrationRow>
        <Typography fontSize={18} fontWeight={700}>
          {integrationDetails.integration_data_name}
        </Typography>
      </IntegrationRow>
      <IntegrationRow>
        <Typography fontSize={14} fontWeight={400} color="#000000">
          {integrationDetails.integration_data_description}
        </Typography>
      </IntegrationRow>
      <IntegrationRow>
        <Typography
          fontSize={10}
          fontWeight={700}
          color="#767676"
          sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 1,
          }}
        >
          {integrationDetails.integration_data_tags.map((d, i) => {
            return `${d}${i < integrationDetails.integration_data_tags.length - 1 ? ', ' : ''}`;
          })}
        </Typography>
      </IntegrationRow>
      <IntegrationRow>
        <ItemLeft></ItemLeft>
        <ItemRight>
          <Button
            variant={'solid-thin'}
            text={integrationDetails.integration_data_enabled ? 'View' : 'Setup'}
            color={integrationDetails.integration_data_enabled ? 'success' : 'primary'}
            endIcon="bx bx-chevron-right"
            onClick={() =>
              onClick(
                integrationDetails.integration_data_name as 'Shopify' | 'other',
                integrationDetails.integration_data_enabled,
                integrationDetails.integration_data_id,
              )
            }
          />
        </ItemRight>
      </IntegrationRow>
    </IntegrationItemMain>
  );
};

export default IntegrationCard;
