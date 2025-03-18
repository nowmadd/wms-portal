import { warehousesServices } from '../../../shared/services/warehousesServices';

const { getWarehousesList } = warehousesServices();

export const useFilters = () => {
  const { data: warehouses } = getWarehousesList();

  const warehouseList = warehouses?.data;

  const warehouseFilterOptions = warehouseList?.map((warehouse) => {
    return {
      term: 'location_parent',
      label: warehouse.location_name,
      value: warehouse.location_name,
    };
  });

  warehouseFilterOptions?.unshift({ term: 'location_parent', label: 'All Warehouse', value: '' });

  return { warehouseFilterOptions };
};
