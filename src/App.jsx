import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GenericTable13 from './GenericTable13';

const App = () => {
  return (
    <Router>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">User Directory</h1>
        <Routes>
          <Route path="/" element={<UsersTable />} />
        </Routes>
      </div>
    </Router>
  );
};

const UsersTable = () => {
  const columnDefs = [
    { field: "id", headerName: "ID", filter: false },
    { field: "name", headerName: "Name", filter: false },
  ];
  const tableRef = useRef();
  return (
    <>
      <GenericTable13
        ref={tableRef}
        columnDefs={columnDefs}
        serverSide={true}
        apiUrl="http://localhost:3000/api/items"
        paginationPageSize={20}
        autoRefreshInterval={30000}
      />
    </>
  );
};


export default App;
export { UsersTable};

