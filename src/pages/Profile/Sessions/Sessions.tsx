import React from 'react';
import { ls } from '../../../shared/utils/ls';
import Button from '../../../shared/components/Button/Button';

const Sessions = () => {
  const { clearLS } = ls();

  const handleLogout = () => {
    clearLS();
    window.location.href = '/';
  };
  return (
    <div style={{ padding: 20, display: 'flex', height: '100%', justifyContent: 'center' }}>
      <Button style={{}} onClick={handleLogout} variant={'solid'} text={'Logout'} color={'failure'} />
    </div>
  );
};

export default Sessions;
