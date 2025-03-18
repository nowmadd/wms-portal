export interface IRoutes {
  path: string;
  element: any;
  acceptedRoles: string[];
}

export const ADMIN_SUPERVISOR_OWNER = ['Administrator', 'Owner', 'Supervisor'];
export const ADMIN_OWNER = ['Administrator', 'Owner'];
export const ALL_ROLES = ['Administrator', 'Owner', 'Supervisor', 'Standard'];
