import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { SidebarBot, SidebarButton, SidebarCont, SidebarMid, SidebarTop, SidebarButtonText } from './Sidebar.styles';
import { sidebarNavItemsBottom, sidebarNavItemsMid, sidebarNavItemsTop } from './sideBarItems';
import { useEffect, useState } from 'react';
import { ls } from '../../utils/ls';
import AdminWizard from './AdminWizard/AdminWizard';
import UserWizard from './UserWizard/UserWizard';
import React from 'react';
import { ROUTES } from '../../constants/ROUTES';

const Sidebar = () => {
  const { getLS } = ls();
  const { role } = JSON.parse(getLS('user'));
  const [curLocation, setcurLocation] = useState('dashboard');
  const location = useLocation();
  const navigate = useNavigate();
  const adminOrOwnerAccess = ['Administrator', 'Owner'];

  useEffect(() => {
    const curPath = window.location.pathname.split('/')[1];
    setcurLocation(curPath);
  }, [location]);

  //NOTE: to solve Warning: Received "true" for a non-boolean attribute
  //se need to convert 'Active' props of SidebarButton from Boolean to number
  //ref: https://maximeblanc.fr/blog/how-to-fix-the-received-true-for-a-non-boolean-attribute-error/

  return (
    <SidebarCont>
      <SidebarTop>
        {sidebarNavItemsTop.map((m, k) => (
          <>
            {m.access.indexOf(role) !== -1 ? (
              <SidebarButton
                //see Note at line 16
                active={m.to.includes(curLocation) ? 1 : 0}
                key={k}
                startIcon={m.preicon}
                onClick={() => navigate(m.to)}
                fullWidth
                disableRipple
              >
                <SidebarButtonText>{m.display}</SidebarButtonText>
              </SidebarButton>
            ) : (
              <></>
            )}
          </>
        ))}
        {adminOrOwnerAccess.indexOf(role) !== -1 ? (
          <AdminWizard onClick={() => navigate(ROUTES.ADMINWIZARD)} />
        ) : (
          <UserWizard onClick={() => navigate(ROUTES.USERWIZARD)} />
        )}
      </SidebarTop>
      <SidebarMid>
        {sidebarNavItemsMid.map((m, k) => (
          <>
            {m.access.indexOf(role) !== -1 ? (
              <SidebarButton
                //see Note at line 16
                active={m.to.includes(curLocation) ? 1 : 0}
                key={k}
                startIcon={m.preicon}
                onClick={() => navigate(m.to)}
                fullWidth
                disableRipple
              >
                <SidebarButtonText>{m.display}</SidebarButtonText>
              </SidebarButton>
            ) : (
              <></>
            )}
          </>
        ))}
      </SidebarMid>
      <SidebarBot>
        {sidebarNavItemsBottom.map((m, k) => (
          <>
            {m.access.indexOf(role) !== -1 ? (
              <SidebarButton
                //see Note at line 16
                active={m.to.includes(curLocation) ? 1 : 0}
                key={k}
                startIcon={m.preicon}
                endIcon={m.posticon || ''}
                onClick={() => navigate(m.to)}
                fullWidth
                disableRipple
              >
                <SidebarButtonText>{m.display}</SidebarButtonText>
              </SidebarButton>
            ) : (
              <></>
            )}
          </>
        ))}
      </SidebarBot>
    </SidebarCont>
  );
};

export default Sidebar;
