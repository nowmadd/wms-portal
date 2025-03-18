import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SidebarIconButtonCont } from './SidebarIconButton.styles';
import BasicModal from '../../../shared/components/Modals/BasicModal/BasicModal';
import LogoutModal from './components/LogoutModal/LogoutModal';
import { ls } from '../../utils/ls';

const { clearLS } = ls();

const handleAction = (action: string) => {
  switch (action) {
    case 'logout':
      clearLS();
      window.location.href = '/';
      break;

    default:
      break;
  }
};

const SidebarIconButton = ({ icon, color, action }: IIconButton) => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  return (
    <>
      <SidebarIconButtonCont>
        <i className={icon} onClick={() => setShowDeleteModal(true)}></i>
      </SidebarIconButtonCont>
      {showDeleteModal && (
        <BasicModal open={showDeleteModal}>
          <LogoutModal logout={() => handleAction(action)} close={() => setShowDeleteModal(false)} />
        </BasicModal>
      )}
    </>
  );
};

interface IIconButton {
  icon: string;
  color: 'primary' | 'success' | 'info' | 'pending' | 'failure';
  action: string;
}

export default SidebarIconButton;
