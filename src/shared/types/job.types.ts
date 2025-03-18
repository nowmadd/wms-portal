export interface ICreateMoveJobPayload {
  job_account: string;
  job_meta: [
    {
      meta_variable_label: 'From Location';
      meta_variable_name: 'from_location';
      meta_variable_value: string;
      meta_variable_id: string;
    },
    {
      meta_variable_label: 'To Location';
      meta_variable_name: 'to_location';
      meta_variable_value: string;
      meta_variable_id: string;
    },
    {
      meta_variable_label: 'Warehouse';
      meta_variable_name: 'warehouse';
      meta_variable_value: string;
      meta_variable_id: string;
    },
  ];
  job_priority: string;
  job_type: string;
}

export interface IMoveJobForm {
  warehouse_id?: string;
  equipment: string;
  priority?: string;
  from_location: string;
  to_location: string;
  warehouse_label?: string;
  notes?: string;
  to_value?: string;
  from_value?: string;
}

export interface IPickPackForm {
  job_warehouse?: string;
  job_priority: string;
  job_equipment: string;
  job_notes?: string;
}
