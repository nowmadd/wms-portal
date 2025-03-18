import { useState, useEffect } from 'react';

const useCapsLockStatus = () => {
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);

  useEffect(() => {
    const handleKeyUp = (event: any) => {
      if (event.getModifierState) {
        setIsCapsLockOn(event.getModifierState('CapsLock'));
      }
    };

    const handleKeyDown = (event: any) => {
      if (event.getModifierState) {
        setIsCapsLockOn(event.getModifierState('CapsLock'));
      }
    };

    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return isCapsLockOn;
};

export default useCapsLockStatus;
