import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box/Box';
import Skeleton from '@mui/material/Skeleton/Skeleton';

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  PaginationState,
  flexRender,
  ColumnFiltersState,
  FilterFn,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getSortedRowModel,
  SortingState,
  SortingFn,
  RowSelectionState,
} from '@tanstack/react-table';
import {
  PageNumberButton,
  PaginationCont,
  TableActions,
  PaginationButtons,
  PaginationDetails,
  ControlCont,
  FilterControls,
  MUITextField,
  TableCell,
  TableContent,
  TableRow,
  TableContainer,
  TableHead,
  TableBody,
  TableRowHeader,
  TableCellHeader,
  PageNavigationButton,
  TableIconCell,
  TableSlimCell,
  TableFitCell,
  RefreshButtonCont,
  ActionButtonsCont,
} from './Table.styles';
import Select from '../../components/Select/Select';
import { COLORS } from '../../../shared/constants/COLORS';
import Typography from '@mui/material/Typography/Typography';
import { RankingInfo, rankItem } from '@tanstack/match-sorter-utils';
import Link from '@mui/material/Link/Link';
import React from 'react';
import Button from '../Button/Button';
import MUITable from '@mui/material/Table';
import MUITableHead from '@mui/material/TableHead';
import MUITableRow from '@mui/material/TableRow';
import MUITableCell from '@mui/material/TableCell';
import MUITableBody from '@mui/material/TableBody';

export interface ITable {
  data: any;
  columns: any;
  detailPage?: string;
  refreshTable?: () => void;
  onSelectedRowsChange?: (selectedRows: any[]) => void;
  search?: {
    term?: string;
    placeholder: string;
  };
  filters?: {
    term?: string;
    placeholder: string;
    options: {
      term: string;
      value: string;
      label: string;
    }[];
  }[];
  loading: boolean;
  showPagination?: boolean;
  defaultSorting?: {
    id: string;
    desc: false;
  }[];
  tableLoading?: boolean;
}

declare module '@tanstack/table-core' {
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

const arrayFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  let values: string[];
  values = row.getValue(columnId);
  const filter = values?.includes(value);
  return filter;
};

//filter if enabled/true or disabled/false
const checkBooleanFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  let columnValue: string;
  columnValue = row.getValue(columnId);
  const filter = columnValue.toString() == value;
  return filter;
};

const containsStringFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  let columnValue: string;
  columnValue = row.getValue(columnId);
  const filter = columnValue.includes(value);
  console.log(columnValue, value);
  return filter;
};

const checkIfEmpty: FilterFn<any> = (row, columnId, value, addMeta) => {
  let values: string[];
  values = row.getValue(columnId);
  const filter = value === 'empty' ? (values === undefined ? true : values.length === 0) : false;
  return filter;
};

const statusSort: SortingFn<any> = (rowA: any, rowB: any, columnId: any) => {
  const ranking = (value: string): number => {
    if (value.toUpperCase() === 'READY') {
      return 1;
    } else if (value.toUpperCase() === 'In Progress') {
      return 2;
    } else if (value.toUpperCase() === 'Cancelled') {
      return 3;
    } else return 4;
  };

  if (ranking(rowA.getValue(columnId)) < ranking(rowB.getValue(columnId))) {
    return -1;
  } else if (ranking(rowA.getValue(columnId)) < ranking(rowB.getValue(columnId))) {
    return 0;
  } else {
    return 1;
  }
};

const prioritySort: SortingFn<any> = (rowA: any, rowB: any, columnId: any) => {
  const ranking = (value: string): number => {
    switch (value.toUpperCase()) {
      case 'URGENT':
        return 1;
      case 'HIGH':
        return 2;
      case 'NORMAL':
        return 3;
      case 'LOW':
        return 4;
      default:
        return 5;
    }
  };

  if (ranking(rowA.getValue(columnId)) < ranking(rowB.getValue(columnId))) {
    return -1;
  } else if (ranking(rowA.getValue(columnId)) == ranking(rowB.getValue(columnId))) {
    return 0;
  } else {
    return 1;
  }
};

const Table = ({
  data,
  columns,
  detailPage,
  filters,
  search,
  loading,
  onSelectedRowsChange,
  showPagination = true,
  defaultSorting = [],
  refreshTable,
  tableLoading,
}: ITable) => {
  useEffect(() => {}, []);

  const navigate = useNavigate();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [searchInput, setSearchInput] = useState('');
  const [sorting, setSorting] = useState<SortingState>(defaultSorting);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const fData = useMemo(() => data, [data]);
  const fSearch = useMemo(() => search, [search]);
  const fFilters = useMemo(() => filters, [filters]);
  const fDetailPage = useMemo(() => detailPage, [detailPage]);

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  const paginationOptions = [
    { value: 10, label: 'Show 10' },
    { value: 20, label: 'Show 20' },
    { value: 30, label: 'Show 30' },
    { value: 40, label: 'Show 40' },
  ];

  const table = useReactTable({
    data: fData,
    columns,
    state: {
      pagination,
      columnFilters,
      globalFilter,
      sorting: sorting,
      rowSelection,
    },
    sortingFns: {
      statusSort: statusSort,
      prioritySort: prioritySort,
    },
    filterFns: {
      array: arrayFilter,
      checkBoolean: checkBooleanFilter,
      checkIfEmpty: checkIfEmpty,
      containsStringFilter: containsStringFilter,
    },
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    enableRowSelection: true,
    getRowId: (row: any, index: any) => row.id || index.toString(),
    // debugTable: true,
    // debugHeaders: true,
    // debugColumns: false,
  });

  const handleSearch = (e: any) => {
    const value = e.target.value || undefined;
    setGlobalFilter(value);
    setSearchInput(value);
  };

  const handleFilterChange = (e: any) => {
    const value = e.value;
    const column = table.getColumn(e.term);
    column?.setFilterValue(value);
  };

  const handleDetailsClick = (dataId: any) => {
    navigate(`${fDetailPage}?id=${dataId}`);
  };

  useEffect(() => {
    const allRowIds = data.map((row: any, index: any) => row.id || index.toString());
    const initialRowSelection = Object.fromEntries(allRowIds.map((id: number) => [id, true]));
    setRowSelection(initialRowSelection);
  }, [table]);

  useEffect(() => {
    const selectedFlatRows = Object.keys(rowSelection)
      .filter((key) => rowSelection[key])
      .map((key) => table.getRowModel().rowsById[key])
      .filter(Boolean);
    if (onSelectedRowsChange) {
      onSelectedRowsChange(selectedFlatRows);
    }
  }, [rowSelection, onSelectedRowsChange, table]);

  return (
    <Box sx={{ width: '100%' }}>
      {fSearch && (
        <ControlCont>
          <ActionButtonsCont>
            {fSearch && (
              <MUITextField
                disabled={tableLoading}
                sx={{ width: 400 }}
                value={searchInput}
                onChange={handleSearch}
                placeholder={fSearch.placeholder}
              />
            )}
            {fFilters &&
              fFilters.map((filter, index) => (
                <FilterControls key={`${filter}-${index}`}>
                  <Select
                    isDisabled={tableLoading}
                    menuPlacement="auto"
                    menuPosition="fixed"
                    defaultValue={filter.options[0]}
                    onChange={handleFilterChange}
                    options={filter.options}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 6,
                      colors: {
                        ...theme.colors,
                        primary: '#380982',
                      },
                    })}
                    placeholder={filter.placeholder}
                  />
                </FilterControls>
              ))}
          </ActionButtonsCont>
          {refreshTable && (
            <RefreshButtonCont>
              <Button
                startIcon="bx bx-refresh"
                variant={'refresh'}
                text={'Refresh'}
                color={'white'}
                loading={tableLoading}
                disabled={tableLoading}
                onClick={refreshTable}
              />
            </RefreshButtonCont>
          )}
        </ControlCont>
      )}
      {tableLoading ? (
        <TableContainer>
          <MUITable>
            <MUITableHead>
              <MUITableRow>
                {Array.from(new Array(4)).map((_, index) => (
                  <MUITableCell key={index}>
                    <Skeleton variant="text" />
                  </MUITableCell>
                ))}
              </MUITableRow>
            </MUITableHead>
            <MUITableBody>
              {Array.from(new Array(4)).map((_, rowIndex) => (
                <MUITableRow key={rowIndex}>
                  {Array.from(new Array(4)).map((_, colIndex) => (
                    <MUITableCell key={colIndex}>
                      <Skeleton variant="rectangular" height={20} />
                    </MUITableCell>
                  ))}
                </MUITableRow>
              ))}
            </MUITableBody>
          </MUITable>
        </TableContainer>
      ) : (
        <TableContainer>
          <TableContent>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRowHeader key={headerGroup.id}>
                  {headerGroup.headers.map((header, i) => {
                    return (
                      <TableCellHeader key={`${header.id}-${i}`}>
                        {header.isPlaceholder ? null : (
                          <div>{flexRender(header.column.columnDef.header, header.getContext())}</div>
                        )}
                      </TableCellHeader>
                    );
                  })}
                </TableRowHeader>
              ))}
            </TableHead>
            {loading ? (
              <TableBody>
                {table.getHeaderGroups().map((headerGroup, i) => (
                  <TableRow key={'skeleton-' + i}>
                    {headerGroup.headers.map((header, i) => {
                      return (
                        <TableCell key={'skeleton-cell-' + i}>
                          <Skeleton />
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody>
                {table.getRowModel().rows.map((row: any, i: number) => {
                  return (
                    <TableRow key={`${row.id}-${i}`}>
                      {row.getVisibleCells().map((cell: any) => {
                        return cell.column.columnDef.meta == 'icon' ? (
                          <TableIconCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableIconCell>
                        ) : cell.column.columnDef.meta == 'fit' ? (
                          <TableFitCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableFitCell>
                        ) : cell.column.columnDef.meta == 'slim' ? (
                          <TableSlimCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableSlimCell>
                        ) : (
                          <TableCell key={cell.column.columnDef.meta == 'action' ? `action-${cell.id}` : cell.id}>
                            {cell.column.columnDef.meta == 'action' ? (
                              <>
                                <a
                                  onClick={() => handleDetailsClick(cell.getValue())}
                                  // href={`${fDetailPage}?id=${cell.getValue()}`}
                                  style={{
                                    width: 35,
                                    textDecoration: 'none',
                                    height: 35,
                                    borderRadius: 35,
                                    color: COLORS.GREY,
                                    fontSize: 24,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                  }}
                                >
                                  <i className="bx bx-show"></i>
                                </a>
                              </>
                            ) : (
                              flexRender(cell.column.columnDef.cell, cell.getContext())
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            )}
          </TableContent>
        </TableContainer>
      )}
      {showPagination && !tableLoading && (
        <TableActions>
          <PaginationDetails>
            <Typography fontSize={12} fontWeight={400} sx={{ color: COLORS.TEXT_GRAY }}>
              {table.getFilteredRowModel().rows.length > 0
                ? `Showing ${pageIndex == 0 ? 1 : pageIndex * pageSize + 1} - ${
                    table.getCanNextPage() ? pageSize * (pageIndex + 1) : table.getFilteredRowModel().rows.length
                  } of ${table.getFilteredRowModel().rows.length} items`
                : `Showing 0 items`}
            </Typography>
          </PaginationDetails>
          <PaginationCont>
            <PageNavigationButton
              disableRipple
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <i className="bx bx-chevrons-left" style={{ fontSize: 18 }} />
            </PageNavigationButton>
            <PageNavigationButton
              disableRipple
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <i className="bx bx-chevron-left" style={{ fontSize: 18 }} />
            </PageNavigationButton>
            <PaginationButtons>
              {pageIndex - 1 < 1 ? (
                <></>
              ) : (
                <PageNumberButton disableRipple onClick={() => table.setPageIndex(0)}>
                  1
                </PageNumberButton>
              )}
              {pageIndex + 1 <= 3 ? (
                <></>
              ) : (
                <span style={{ alignSelf: 'flex-end', justifySelf: 'flex-end', paddingLeft: 4, paddingRight: 4 }}>
                  <i className="bx bx-dots-horizontal-rounded"></i>
                </span>
              )}
              {pageIndex < 1 ? (
                <></>
              ) : (
                <PageNumberButton disableRipple onClick={() => table.setPageIndex(pageIndex - 1)}>
                  {pageIndex}
                </PageNumberButton>
              )}
              {/* fix warning: received true for a non-boolean attribute active. */}
              <PageNumberButton id={'pagination-active-button'} disableRipple active={'true'}>
                {pageIndex + 1}
              </PageNumberButton>
              {pageIndex + 1 < table.getPageOptions().length ? (
                <PageNumberButton
                  disableRipple
                  onClick={() => {
                    table.setPageIndex(pageIndex + 1);
                  }}
                >
                  {pageIndex + 2}
                </PageNumberButton>
              ) : (
                <></>
              )}

              {table.getPageOptions().length - 1 - (pageIndex + 1) < 2 ? (
                <></>
              ) : (
                <span style={{ alignSelf: 'flex-end', justifySelf: 'flex-end', paddingLeft: 4, paddingRight: 4 }}>
                  <i className="bx bx-dots-horizontal-rounded"></i>
                </span>
              )}
              {pageIndex + 2 < table.getPageOptions().length ? (
                <PageNumberButton disableRipple onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
                  {table.getPageOptions().length}
                </PageNumberButton>
              ) : (
                <></>
              )}
            </PaginationButtons>
            <PageNavigationButton disableRipple onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              <i className="bx bx-chevron-right" style={{ fontSize: 18 }} />
            </PageNavigationButton>
            <PageNavigationButton
              disableRipple
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <i className="bx bx-chevrons-right" style={{ fontSize: 18 }} />
            </PageNavigationButton>
            <Select
              defaultValue={paginationOptions[0]}
              onChange={(e: any) => {
                table.setPageSize(Number(e.value));
              }}
              options={paginationOptions}
              menuPlacement="top"
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: state.isFocused ? '#380982' : '#FFFFFF',
                }),
              }}
              theme={(theme) => ({
                ...theme,
                borderRadius: 6,
                colors: {
                  ...theme.colors,
                  primary: '#380982',
                },
              })}
              placeholder={pageSize}
            />
          </PaginationCont>
        </TableActions>
      )}
    </Box>
  );
};

// function Filter({ column, table }: { column: Column<any, unknown>; table: Table<any> }) {
//   const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

//   const columnFilterValue = column.getFilterValue();

//   const sortedUniqueValues = React.useMemo(
//     () => (typeof firstValue === 'number' ? [] : Array.from(column.getFacetedUniqueValues().keys()).sort()),
//     [column.getFacetedUniqueValues()],
//   );

//   return typeof firstValue === 'number' ? (
//     <div>
//       <div className="flex space-x-2">
//         <DebouncedInput
//           type="number"
//           min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
//           max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
//           value={(columnFilterValue as [number, number])?.[0] ?? ''}
//           onChange={(value) => column.setFilterValue((old: [number, number]) => [value, old?.[1]])}
//           // placeholder={`Min ${column.getFacetedMinMaxValues()?.[0] ? `(${column.getFacetedMinMaxValues()?.[0]})` : ''}`}
//           className="w-24 border shadow rounded"
//         />
//         <DebouncedInput
//           type="number"
//           min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
//           max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
//           value={(columnFilterValue as [number, number])?.[1] ?? ''}
//           onChange={(value) => column.setFilterValue((old: [number, number]) => [old?.[0], value])}
//           // placeholder={`Max ${column.getFacetedMinMaxValues()?.[1] ? `(${column.getFacetedMinMaxValues()?.[1]})` : ''}`}
//           className="w-24 border shadow rounded"
//         />
//       </div>
//       <div className="h-1" />
//     </div>
//   ) : (
//     <>
//       <datalist id={column.id + 'list'}>
//         {sortedUniqueValues.slice(0, 5000).map((value: any) => (
//           <option value={value} key={value} />
//         ))}
//       </datalist>
//       <DebouncedInput
//         type="text"
//         value={(columnFilterValue ?? '') as string}
//         onChange={(value) => column.setFilterValue(value)}
//         placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
//         className="w-36 border shadow rounded"
//         list={column.id + 'list'}
//       />
//       <div className="h-1" />
//     </>
//   );
// }

// function FilterFuzzy({ column, table }: { column: Column<any, any>; table: ReactTable<any> }) {
//   console.log(column);
//   const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

//   const columnFilterValue = column.getFilterValue();

//   const sortedUniqueValues = React.useMemo(
//     () => (typeof firstValue === 'number' ? [] : Array.from(column.getFacetedUniqueValues().keys()).sort()),
//     [column.getFacetedUniqueValues()],
//   );

//   const arr: string[] = [];

//   sortedUniqueValues.slice(0, 5000).map((value: any) => arr.push(value));
//   console.log(arr);

//   return typeof firstValue === 'number' ? (
//     <div className="flex space-x-2">
//       <InputBase
//         type="number"
//         value={(columnFilterValue as [number, number])?.[0] ?? ''}
//         onChange={(e) => column.setFilterValue((old: [number, number]) => [e.target.value, old?.[1]])}
//         placeholder={`Min`}
//         className="w-24 border shadow rounded"
//       />
//       <InputBase
//         type="number"
//         value={(columnFilterValue as [number, number])?.[1] ?? ''}
//         onChange={(e) => column.setFilterValue((old: [number, number]) => [old?.[0], e.target.value])}
//         placeholder={`Max`}
//         className="w-24 border shadow rounded"
//         inputProps={{ 'aria-label': 'search' }}
//       />
//     </div>
//   ) : (
//     <>
//       <datalist id={column.id + 'list'}>
//         {sortedUniqueValues.slice(0, 5000).map((value: any) => (
//           <option value={value} key={value} />
//         ))}
//       </datalist>
//       <InputBase
//         value={(columnFilterValue ?? '') as string}
//         onChange={(e) => column.setFilterValue(e.target.value)}
//         placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
//         className="w-36 border shadow rounded"
//         inputProps={{ 'aria-label': 'search' }}
//       />
//     </>
//   );
// }

// function DebouncedInput({
//   value: initialValue,
//   onChange,
//   debounce = 300,
//   ...props
// }: {
//   value: string | number;
//   onChange: (value: string | number) => void;
//   debounce?: number;
// } & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
//   const [value, setValue] = useState(initialValue);

//   useEffect(() => {
//     setValue(initialValue);
//   }, [initialValue]);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       onChange(value);
//     }, debounce);

//     return () => clearTimeout(timeout);
//   }, [value]);

//   return <input {...props} value={value} onChange={(e) => setValue(e.target.value)} />;
// }

export default Table;
