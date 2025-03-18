import React, { useEffect, useState } from 'react';

import userPermissions from '../../../shared/data/userPermissions.json';
import { Box, Typography } from '@mui/material';
import { COLORS } from '../../constants/COLORS';
interface IPermission {
  role: string;
  handheldAccess: {
    display: string;
    allow: boolean;
    description: string;
  };
  portalAccess: {
    display: string;
    allow: boolean;
    description: string;
  };
  managementAccess: {
    display: string;
    allow: boolean;
    description: string;
  };
  administratorAccess: {
    display: string;
    allow: boolean;
    description: string;
  };
  ownerAccess: {
    display: string;
    allow: boolean;
    description: string;
  };
}

interface Props {
  role: string;
}

const UserRoleDescription: React.FC<Props> = ({ role }) => {
  const [permissions, setPermissions] = useState<IPermission[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>('Standard');

  // Fetch permissions from JSON file
  useEffect(() => {
    const fetchPermissions = async () => {
      setPermissions(userPermissions);
    };
    fetchPermissions();
  }, []);

  const renderPermissions = () => {
    const permission = permissions.find((p) => p.role === role);
    if (!permission) return <Box>Permission not found</Box>;
    //remove role key from permission object
    const { role: _, ...rest } = permission;
    return Object.entries(rest).map(([key, value]) => {
      return (
        <Box
          key={key}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '15px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            {value.allow ? (
              <i className="bx bx-check" style={{ color: COLORS.PRIMARY, fontSize: '30px' }}></i>
            ) : (
              <i
                className="bx bx-x"
                style={{
                  color: COLORS.FAILURE,
                  fontSize: '30px',
                }}
              ></i>
            )}
            <Typography fontSize={16}>{value.display}</Typography>
          </Box>
          <Typography fontSize={14} style={{ color: COLORS.TEXT_GRAY }}>
            {value.description}
          </Typography>
        </Box>
      );
    });
  };

  return <Box sx={{ margin: '10px 0 0 10px' }}>{renderPermissions()}</Box>;
};

export default UserRoleDescription;
