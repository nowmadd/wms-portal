import styled from '@emotion/styled';
import { COLORS } from '../../../shared/constants/COLORS';
import { css, keyframes } from '@emotion/react';
import Box from '@mui/material/Box/Box';

const dash = keyframes`
    62.5% {
        opacity: 1;
    }
    to {
        stroke-dashoffset: 0;
    }
`;

export const LoaderContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  height: '100%',
  alignContent: 'center',
  alignItems: 'center',
}));

export const Loading = styled.div`
height: 100%
width: 100%
transform: translate(-50%, -50%) scale(8);`;

export const PolylineBack = styled.polyline`
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke: #dfd8f3;
`;

export const PolylineFront = styled.polyline`
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke: #865cbd;
  stroke-dasharray: 12, 36;
  stroke-dashoffset: 48;
  animation: ${dash} 1s linear infinite;
`;
