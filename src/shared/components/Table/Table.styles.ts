import styled from '@emotion/styled';
import { Button, IconButton, InputBase, TextField } from '@mui/material';
import Box from '@mui/material/Box/Box';
import { COLORS } from '../../../shared/constants/COLORS';

export const ControlCont = styled(Box)(() => ({
  display: 'flex',
  gap: 15,
  paddingBottom: 15,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
}));

export const ActionButtonsCont = styled(Box)(() => ({
  display: 'flex',
  gap: 15,
  flexDirection: 'row',
}));

export const FilterControls = styled(Box)(() => ({
  display: 'flex',
  gap: 15,
}));

export const TableActions = styled(Box)(() => ({
  display: 'flex',
  padding: '12px 20px',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingTop: 15,
  backgroundColor: 'white',
  border: '1px solid #cccccc',
  borderTop: 'none',
  borderBottomLeftRadius: 6,
  borderBottomRightRadius: 6,
}));

export const TableContainer = styled(Box)(() => ({
  borderRadius: 6,
  paddingTop: 5,
  backgroundColor: 'white',
  border: '1px solid #cccccc',
  borderBottom: 'none',
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  overflowX: 'auto',
}));

export const TableContent = styled.table`
  padding: '5px 0px';
  border-spacing: 0;
  background-color: #ffffff;
  overflow: hidden;
  width: 100%;
`;

export const TableHead = styled.thead`
  display: table-header-group;
  vertical-align: middle;
  border-color: inherit;
`;

export const TableRowHeader = styled.tr`
  text-align: left;
`;

export const TableCellHeader = styled.th`
  line-height: 15px;
  padding: 12px 24px;
  font-size: 16px;
  border-bottom: 1px solid #cccccc;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TableRow = styled.tr``;

export const TableCell = styled.td`
  border-bottom: 1px solid #cccccc;
  padding: 12px 24px;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:last-child {
    width: 35px;
    padding: 0px 24px 0px 24px;
    margin: 0px;
  }
`;

export const TableIconCell = styled.td`
  width: 32px;
  text-align: center;
  border-bottom: 1px solid #cccccc;
  font-size: 20px;
  color: ${COLORS.GREY};
`;

export const TableFitCell = styled.td`
  width: 32px;
  text-align: center;
  border-bottom: 1px solid #cccccc;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TableSlimCell = styled.td`
  border-bottom: 1px solid #cccccc;
  padding: 12px 24px;
  width: 150px;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const TableBody = styled.tbody`
  margin: 0;
  padding: 0.5rem;
  position: relative;
  text-align: left;
`;

export const PaginationCont = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',
  gap: 5,
}));

export const MUITextField = styled(TextField)(() => ({
  display: 'flex',
  input: {
    padding: '8px 12px',
    background: 'white',
  },
}));

export const PaginationDetails = styled(Box)(() => ({
  display: 'flex',
}));

// export const PageNumberButton = styled.button<{ active?: boolean }>(({ active = false }) => ({
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   backgroundColor: active ? COLORS.PRIMARY_LIGHT : 'none',
//   color: active ? COLORS.PRIMARY : 'inherit',
//   border: active ? 'solid' : 'none',
//   borderWidth: active ? 1 : 'none',
//   borderColor: active ? COLORS.PRIMARY_DARK : 'none',
//   fontSize: 14,
//   fontWeight: 400,
//   borderRadius: 32,
//   height: 32,
//   width: 32,
//   '&&:hover': {
//     backgroundColor: COLORS.PRIMARY_LIGHT,
//   },
//   //   '&&:active': {
//   //     border: 'solid',
//   //     borderWidth: 2,
//   //     backgroundColor: COLORS.PRIMARY_LIGHT,
//   //     borderColor: COLORS.PRIMARY_DARK,
//   //   },
// }));

{
  /* fix warning: received true for a non-boolean attribute active. */
}
export const PageNumberButton = styled(IconButton)<{ active?: string }>(({ active }) => ({
  width: 32,
  height: 32,
  fontSize: 14,
  color: active ? COLORS.PRIMARY_DARK : COLORS.BLACK,
  backgroundColor: active ? COLORS.PRIMARY_LIGHT : 'white',
  border: active ? `1px solid ${COLORS.PRIMARY_DARK}` : 'none',
  fontWeight: 400,
  '&&:hover': {
    backgroundColor: '#DDDDDD',
  },
  // '& .MuiTouchRipple-root .MuiTouchRipple-child': {
  //   backgroundColor: 'white',
  //   color: COLORS.BLACK,
  //   animation: 'unset',
  //   border: `1px solid ${COLORS.PRIMARY_DARK}`,
  // },
  '&:focus': {
    backgroundColor: active ? COLORS.PRIMARY_LIGHT : 'white',
    color: active ? COLORS.PRIMARY_DARK : COLORS.BLACK,
  },
  // '&:focus-visible': {
  //   backgroundColor: active ? COLORS.PRIMARY_LIGHT : 'white',
  //   color: active ? COLORS.PRIMARY_DARK : COLORS.BLACK,
  //   border: active ? 'none' : `1px solid ${COLORS.PRIMARY_DARK}`,
  // },
}));

// export const PageNumberButton = styled(IconButton)(() => ({
//   width: 32,
//   height: 32,
//   fontSize: 14,
//   color: COLORS.BLACK,
//   backgroundColor: 'white',
//   border: `1px solid ${COLORS.PRIMARY_DARK}`,
//   fontWeight: 400,
//   '&&:hover': {
//     backgroundColor: '#DDDDDD',
//   },
//   '& .MuiTouchRipple-root .MuiTouchRipple-child': {
//     backgroundColor: 'white',
//     color: COLORS.BLACK,
//     animation: 'unset',
//     border: `1px solid ${COLORS.PRIMARY_DARK}`,
//   },
//   '&:focus': {
//     backgroundColor: 'white',
//     color: COLORS.BLACK,
//     border: `1px solid ${COLORS.PRIMARY_DARK}`,
//   },
// }));

export const PageNavigationButton = styled(IconButton)(() => ({
  width: 32,
  height: 32,
  fontSize: 14,
  color: COLORS.GREY,
  backgroundColor: 'white',
  border: 'none',
  fontWeight: 400,
  '&&:hover': {
    backgroundColor: COLORS.GREY_LIGHT,
    color: COLORS.GREY,
  },
  '&&:disabled': {
    color: `${COLORS.GREY_LIGHT}`,
    backgroundColor: 'white',
  },
}));

export const PaginationButtons = styled(Box)(() => ({
  alignSelf: 'center',
  gap: 5,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const DebounceInputText2 = styled.input({
  display: 'flex',
  width: '100%',
  input: {
    padding: '8px 12px',
    background: 'white',
    color: 'red',
  },
});

export const DebounceInputText = styled.input`
  width: 100%;
  margin-top: 12px;
  padding: 8px 12px;
  color: ${COLORS.GREY};
  background: white;
  border: solid 2px;
  border-radius: 3px;
`;

export const TextFieldWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
}));

export const FilterInput = styled(InputBase)(() => ({
  alignSelf: 'center',
  gap: 5,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const ActionButton = styled(Box)(() => ({
  backgroundColor: 'white',
  justifyContent: 'center',
  alignItems: 'center',
  color: COLORS.GREY,
  fontSize: 24,
  height: 35,
  width: 35,
  borderRadius: 35,
}));

export const RefreshButtonCont = styled(Box)(() => ({}));

// export const MUITableCell = styled(TableCell)(() => ({
//   '&:nth-first-child(1)': {
//     width: 50,
//     paddingLeft: '40px',
//     flexWrap: 'wrap',
//   },
//   '&:nth-last-child(1)': {
//     margin: 0,
//     padding: 0,
//   },
// }));
