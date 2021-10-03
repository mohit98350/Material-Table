import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import MaterialTable from 'material-table'


const App=()=> {

  const [users, setUsers] = useState([]);
  const columns = [
    { title: "ID", field: "id",cellStyle:{color:"black",fontSize:"17px"}, editable: false },       // proper Validation to each input field//
    { title: "Name", field: "name",cellStyle:{color:"black",fontSize:"17px"},
    validate: rowData => {
      if(rowData.name === undefined || rowData.name === ""){
        return "Required"
      }
      else if(rowData.name.length<4){
        return "Name must contains atleast 4 chars"
      }
      return true
    }},
    {title:"UserName",field:"username",
    cellStyle:{color:"black",fontSize:"17px"},
    validate: rowData => {
      if(rowData.username === undefined || rowData.username === ""){
        return "Required"
      }
      else if(rowData.username.length<5){
        return "UserName must contains atleast 5 chars"
      }
      return true
  
  }},
    { title: "Email", field: "email",cellStyle:{color:"blue",fontSize:"17px"},
    validate: rowData => {
      if(rowData.email === undefined || rowData.email === ""){
        return "Required"
      }
      else if(!rowData.email.includes('@'&&'.')){
        return "Enter Valied Email"
      }
      return true
  }},
    { title: "Phone Number", field: 'phone',cellStyle:{color:"black",fontSize:"17px"},
    validate: rowData => {
      if(rowData.phone === undefined || rowData.phone === ""){
        return "Required"
      }
      else if(rowData.phone.length<10){
        return "Enter Valied Phone Number"
      }
      return true
  }},
    { title: "Website", field: "website",cellStyle:{color:"blue",fontSize:"17px"},
    validate: rowData => {
      if(rowData.website === undefined || rowData.website === ""){
        return "Required"
      }
      else if(!rowData.website.includes('.')){
        return "Enter Valied website name"
      }
      return true
    }}
  ]

  useEffect(async()=>{
    const {data}= await axios.get("https://jsonplaceholder.typicode.com/users");
    console.log(data);
    setUsers(data)
  },[])


  return (
    <div className="App">
      <h1 align="center">React Internship</h1>
      <MaterialTable
      style={{ backgroundColor:'#D7DBDD' }}
        title="Users Data"
        data={users}
        columns={columns}
        editable={{
          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            const updatedRows = [...users, { id: users.length+1, ...newRow }]
            setTimeout(() => {
              setUsers(updatedRows)
              resolve()
            }, 2000)
          }),
          onRowDelete: selectedRow => new Promise((resolve, reject) => {
            const index = selectedRow.tableData.id;
            const updatedRows = [...users]
            updatedRows.splice(index, 1)
            setTimeout(() => {
              setUsers(updatedRows)
              resolve()
            }, 2000)
          }),
          onRowUpdate:(updatedRow,oldRow)=>new Promise((resolve,reject)=>{
            const index=oldRow.tableData.id;
            const updatedRows=[...users]
            updatedRows[index]=updatedRow
            setTimeout(() => {
              setUsers(updatedRows)
              resolve()
            }, 2000)
          })

        }}
        options={{
          actionsColumnIndex: -1, 
          addRowPosition: "first",
          exportButton: true,
          filtering: true,
          search: true,
          headerStyle: {
            backgroundColor: '#01579b',         
            color: '#fff'       
          },
          rowStyle: {
            backgroundColor: '#EEE',
            fontStyle:'inherit',
         
          }
        }}
      />
    </div>
  );
}

export default App;
