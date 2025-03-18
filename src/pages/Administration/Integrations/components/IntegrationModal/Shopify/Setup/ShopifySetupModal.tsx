import React from 'react';
import Location from './Location';

interface Props {
  type?: 'location'; //add more body here
}

const ShopifySetupModal: React.FC<Props> = ({ type }) => {
  const renderSetupBody = () => {
    switch (type) {
      case 'location':
        return <Location />;

      default:
        return <div>Setup Type undefined</div>;
    }
  };

  return renderSetupBody();
};

export default ShopifySetupModal;
