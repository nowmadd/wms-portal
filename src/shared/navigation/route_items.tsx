import MercuryDashboard from '../../pages/MercuryDashboard/MercuryDashboard';
import Login from '../../pages/Login/Login';
import { ROUTES } from '../constants/ROUTES';
import { ADMIN_OWNER, ALL_ROLES, IRoutes } from '../types/routes.types';
import Inventory from '../../pages/Inventory/InventoryMain';
import Jobs from '../../pages/Jobs/Jobs';
import Orders from '../../pages/Orders/Orders';
import Shipments from '../../pages/Shipments/Shipments';
import Workflows from '../../pages/Workflows/Workflows';
import Locations from '../../pages/Locations/LocationsMain';
import Profile from '../../pages/Profile/Profile';
import Administration from '../../pages/Administration/Administration';
import Activity from '../../pages/Administration/Activity/Activity';
import Signup from '../../pages/Signup/Signup';
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword';
import Activate from '../../pages/Activate/Activate';
import AdminSetupWizard from '../../pages/SetupWizard/AdminSetupWizard/AdminSetupWizard';
import UserSetupWizard from '../../pages/SetupWizard/UserSetupWizard/UserSetupWizard';

export const public_routes: IRoutes[] = [
  {
    path: ROUTES.LOGIN,
    element: <Login />,
    acceptedRoles: ALL_ROLES,
  },
  {
    path: ROUTES.SIGNUP,
    element: <Signup />,
    acceptedRoles: ALL_ROLES,
  },
  {
    path: ROUTES.FORGOT_PASSWORD,
    element: <ForgotPassword />,
    acceptedRoles: ALL_ROLES,
  },
  {
    path: ROUTES.ACTIVATE,
    element: <Activate />,
    acceptedRoles: ALL_ROLES,
  },
];

export const private_routes: IRoutes[] = [
  {
    path: ROUTES.DASHBOARD,
    element: <MercuryDashboard />,
    acceptedRoles: ALL_ROLES,
  },
  {
    path: ROUTES.INVENTORY,
    element: <Inventory />,
    acceptedRoles: ALL_ROLES,
  },
  {
    path: ROUTES.JOBS,
    element: <Jobs />,
    acceptedRoles: ALL_ROLES,
  },
  {
    path: ROUTES.ORDERS,
    element: <Orders />,
    acceptedRoles: ALL_ROLES,
  },
  {
    path: ROUTES.SHIPMENTS,
    element: <Shipments />,
    acceptedRoles: ALL_ROLES,
  },
  {
    path: ROUTES.WORKFLOWS,
    element: <Workflows />,
    acceptedRoles: ALL_ROLES,
  },
  {
    path: ROUTES.LOCATIONS,
    element: <Locations />,
    acceptedRoles: ALL_ROLES,
  },
  {
    path: ROUTES.PROFILE,
    element: <Profile />,
    acceptedRoles: ALL_ROLES,
  },
  {
    path: ROUTES.ADMINISTRATION,
    element: <Administration />,
    acceptedRoles: ADMIN_OWNER,
  },
  {
    path: ROUTES.ACTIVITY,
    element: <Activity />,
    acceptedRoles: ALL_ROLES,
  },
  {
    path: ROUTES.ADMINWIZARD,
    element: <AdminSetupWizard />,
    acceptedRoles: ADMIN_OWNER,
  },
  {
    path: ROUTES.USERWIZARD,
    element: <UserSetupWizard />,
    acceptedRoles: ALL_ROLES,
  },
];
