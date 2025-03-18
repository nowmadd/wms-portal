import { ADMIN_OWNER, ADMIN_SUPERVISOR_OWNER, ALL_ROLES } from '../types/routes.types';
import { ls } from '../utils/ls';

//hooks to checl permission
export const usePermissionCheck = () => {
  const { getLS } = ls();
  const user = getLS('user');
  const role = JSON.parse(user).role;

  const adminOwnerPermissions = ADMIN_OWNER.includes(role);
  const allPermissions = ALL_ROLES.includes(role);
  const adminSupervisorOwner = ADMIN_SUPERVISOR_OWNER.includes(role);

  return { adminOwnerPermissions, allPermissions, adminSupervisorOwner };
};
