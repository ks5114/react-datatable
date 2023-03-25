import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card,Form,Button} from 'react-bootstrap';
const moment = require('moment');

 
const columns = [
  {
    id: 'first_name',
    name: 'First Name',
    selector: row => row.first_name,
    sortable: true,
  },
  {
    id: 'last_name',
    name: 'Last Name',
    selector: row => row.last_name,
    sortable: true,
  },
  {
    id: 'company',
    name: 'Company',
    selector: row => row.company,
    sortable: true,
    
  },
  {
    id: 'office',
    name: 'Address',
    selector: row => row.office,
    sortable: true,
    
  },
  {
    id: 'salary',
    name: 'Salary',
    selector: row => row.salary,
    sortable: true,
    
  },
  {
    id: 'start_date',
    name: 'Join Date',
    selector: row => row.start_date,
    format: (row) => moment(row.start_date).format('ll'),
  }
];
 
function App() {
 
  const [users, setUsers] = useState({});
  const [page, setPage] = useState(1);
  const [countPerPage, setCountPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortType, setSortType] = useState('');
 
  async function getUserList(){
    const response = await fetch(
      `api?page=${page -1}&npp=${countPerPage}&search=${search}&sorttype=${sortType}&sortby=${sortBy}&delay=1`,{
        method: "GET",
      }
    ).then((response) => response.json());
  
    // update the state
    setUsers(response);
  }
 
  useEffect(() => {
    getUserList();
  }, [page,countPerPage,search,sortBy]);
  return (
    <div className="App">
       <Card className="text-center">
      <Card.Header>Server side datatable with React,node and MySql</Card.Header>
      <Card.Body>
        <Form.Control onChange={(e)=>setSearch(e.target.value)} type="text" placeholder="Search" />
      <DataTable
        columns={columns}
        data={users.results}
        highlightOnHover
        pagination
        paginationServer
        paginationTotalRows={users.pagination ? users.pagination.numRows : ''}
        paginationPerPage={countPerPage}
        paginationRowsPerPageOptions={[10, 20, 30, 50]}
        paginationComponentOptions={{
          noRowsPerPage: false
        }}
        onChangePage={page => setPage(page)}
        onChangeRowsPerPage={number =>{setCountPerPage(number)}}
        onSort={(selectedColumn, sortDirection, sortedRows)=>{
          setSortBy(sortDirection);
          setSortType(selectedColumn.id);
        }}
        sortServer={true}
      />
      </Card.Body>
    </Card>
    
    </div>
  );
}
 
export default App;