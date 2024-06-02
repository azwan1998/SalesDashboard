import React from 'react';
import DataTable from 'react-data-table-component';
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomDataTable = ({ columns, data }) => {
  return (
    <div className="container">
      <DataTable
        columns={columns}
        data={data}
        pagination
        persistTableHead
      />
    </div>
  );
};

export default CustomDataTable;
