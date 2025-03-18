import React from 'react';
import './Pill.scss';
import 'boxicons';

const Pill = ({ text, color, variant, removable = false, slim = false, ...props }: IPill) => {
  return (
    <div className={`pill__${variant} pill__${variant}__${color} ` + (slim ? `pill__${variant}__slim` : '')}>
      <div className={`pill__${variant}__text`} style={{ color: color == 'white' ? '#404040' : 'white' }}>
        {text}
        {removable ? <i {...props} className={`bx bx-x`}></i> : <React.Fragment />}
      </div>
    </div>
  );
};

interface IPill {
  variant: 'square' | 'round';
  color: 'primary' | 'success' | 'info' | 'pending' | 'failure' | 'grey' | 'black' | 'white';
  removable?: boolean;
  text: string;
  onClick?: () => void;
  slim?: boolean;
}

export default Pill;
