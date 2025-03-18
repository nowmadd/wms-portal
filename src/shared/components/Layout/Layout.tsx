import React from 'react';
import { ChildrenCont, MainCont } from './Layout.styles';
import Sidebar from '../SideBar/Sidebar';

interface Props {}

const Layout: React.FC<React.PropsWithChildren<Props>> = ({ children }) => {
  return (
    <MainCont>
      <Sidebar />
      <ChildrenCont>{children}</ChildrenCont>
    </MainCont>
  );
};

export default Layout;
