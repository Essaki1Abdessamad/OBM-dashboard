import "bootstrap/dist/css/bootstrap.min.css"
import React, { useState, useEffect, forwardRef } from 'react';
import axios from 'axios'
import MaterialTable from "material-table";
import '../App.css';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { FaEdit , FaTrashAlt , FaPlusSquare , FaThumbsUp  } from 'react-icons/fa';



export default function Ads() {

    var columns = [
        { title: "Name", field: "name" },
        { title: "Page ID", field: "idPage" },
        { title: "Image Hash", field: "image_hash" },
        { title: "Message", field: "message" },
    
      ]

  const [data, setData] = useState([]); //table data


  useEffect(() => {
    axios.get("http://localhost:8080/app/getAdCreative")
      .then(res => {
        setData(res.data)
      })
      .catch(error => {
        console.log("Error")
      })
  }, [])


  const handleRowDelete = (rowData, resolve) => {
    console.log(rowData)
    axios.delete('http://localhost:8080/app/deleteAdCreativeAPI/'+ rowData.idAdCreative)
    .then(res => {
      console.log("Delete from api", rowData)
      deleteDATA()
    })
    .catch(error => {
      console.log('Error, Delete from api')
    })


    const deleteDATA = () => {

      axios.delete('http://localhost:8080/app/deleteAdCreative/', rowData)
      .then(res => {
        console.log("Delete from DB", rowData)
      })
      .catch(error => {
        console.log('Error, Delete from DB')
      }) 


    }}


  return (
    <MaterialTable
    title="Ads"
    columns={columns}
    data={data}
    options={{
      /* toolbar: false, */
      /* tooltip: 'Expand', */
      actionsColumnIndex: -1,
      thirdSortClick: false,
      headerStyle: {
        top: "0",
        backgroundColor: "#FF5733",
        color: "#FFF",
        fontWeight: "bold"
      },

      sorting: false,
      search: true,
      rowStyle: x => {
        if (x.tableData.id % 2) {
          return { backgroundColor: "#f2f2f2" }
        }
      }}}

      actions={[
        {
          icon: 'add',
          tooltip: 'Add AdCreative',
          isFreeAction: true,
          onClick: () => {
            window.location.replace("/ADcopie")

          }
        },

        rowData => ({
          icon: () => <Link to={{ pathname: "/ADcopie", state: rowData }}><FaEdit /></Link>,
          tooltip: 'Edit ADcopie',
          onClick: () => window.confirm('You want to edit ' + rowData.name)
        }),
        rowData => ({
          icon: () => <Link to={{ }}><FaTrashAlt /></Link>,
          tooltip: 'Delete ADcopie',
          onClick: (event, rowData) => {
          
            if(window.confirm("You want to delete " + rowData.name)) {
             new Promise((resolve) => {
               handleRowDelete(rowData, resolve)
               setTimeout(()=> {window.location.reload()}, 1700)
             })
            }
           } 
        })
      ]}
    />

  )
}
