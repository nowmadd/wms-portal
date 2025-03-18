import SidebarIconButton from '../SideBarIconButton/SidebarIconButton';
import { SidebarButtonPreIcon } from './Sidebar.styles';

export const sidebarNavItemsTop = [
  {
    id: 0,
    display: 'Mercury Home',
    preicon: (
      <SidebarButtonPreIcon>
        <i className="bx bx-home-alt-2"></i>
      </SidebarButtonPreIcon>
    ),
    to: '/dashboard',
    section: '',
    access: ['Standard', 'Supervisor', 'Administrator', 'Owner'],
  },
];
export const sidebarNavItemsMid = [
  {
    id: 1,
    display: 'Jobs',
    preicon: (
      <SidebarButtonPreIcon>
        <i className="bx bx-briefcase-alt"></i>
      </SidebarButtonPreIcon>
    ),
    to: '/jobs',
    section: 'jobs',
    access: ['Standard', 'Supervisor', 'Administrator', 'Owner'],
  },
  {
    id: 2,
    display: 'Orders',
    preicon: (
      <SidebarButtonPreIcon>
        <i className="bx bx-shopping-bag"></i>
      </SidebarButtonPreIcon>
    ),
    to: '/orders',
    section: 'orders',
    access: ['Standard', 'Supervisor', 'Administrator', 'Owner'],
  },
  {
    id: 3,
    display: 'Inventory',
    preicon: (
      <SidebarButtonPreIcon>
        <i className="bx bx-task"></i>
      </SidebarButtonPreIcon>
    ),
    to: '/inventory/items',
    section: 'inventory',
    access: ['Standard', 'Supervisor', 'Administrator', 'Owner'],
  },
  {
    id: 4,
    display: 'Locations',
    preicon: (
      <SidebarButtonPreIcon>
        <i className="bx bx-location-plus"></i>
      </SidebarButtonPreIcon>
    ),
    to: '/locations/locations',
    section: 'locations',
    access: ['Standard', 'Supervisor', 'Administrator', 'Owner'],
  },
];
export const sidebarNavItemsBottom = [
  {
    id: 5,
    display: 'Profile',
    preicon: (
      <SidebarButtonPreIcon>
        <i className="bx bx-user"></i>
      </SidebarButtonPreIcon>
    ),
    to: '/profile/general',
    section: 'profile',
    access: ['Standard', 'Supervisor', 'Administrator', 'Owner'],
    posticon: <SidebarIconButton color="failure" action="logout" icon="bx bx-log-out"></SidebarIconButton>,
    postaction: 'logout',
  },
  {
    id: 6,
    display: 'Administration',
    preicon: (
      <SidebarButtonPreIcon>
        <i className="bx bx-cog"></i>
      </SidebarButtonPreIcon>
    ),
    to: '/admin/users',
    section: 'admin',
    access: ['Administrator', 'Owner'],
  },
];
