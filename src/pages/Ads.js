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

  const [data, setData] = useState([]); //table data


  var dynamicLookupObject = []
  data.map(function (e) {
    var object = {
      [e.adset_Name]: e.adset_Name
    }
    dynamicLookupObject.push(object)
  })
  dynamicLookupObject.filter(function (e, i, a) {
    return a.indexOf(e) === i;
  });



  var zz = Object.assign({}, ...dynamicLookupObject)
  console.log(zz)



  var columns = [
    { title: "Adset Name", field: "adset_Name", lookup : zz },
    { title: "Name", field: "name", filtering: false },
    { title: "Creative", field: "creative_Name", filtering: false },
    { title: "Status", field: "status", filtering: false },

  ]


  useEffect(() => {
    axios.get("http://localhost:8080/app/getAd")
      .then(res => {
        setData(res.data)
      })
      .catch(error => {
        console.log("Error")
      })
  }, [])

  
  const handleRowDelete = (rowData, resolve) => {

      axios.delete('http://localhost:8080/app/deleteAdsAPI/'+ rowData.idAds)
    .then(res => {
      console.log("Delete from api", rowData)
      deleteData()
    })
    .catch(error => {
      console.log('Error, Delete from api')
    })

    const deleteData = () => {
    axios.delete('http://localhost:8080/app/deleteAdsDB/', rowData)
    .then(res => {
      console.log("Delete from DB", rowData)
    })
    .catch(error => {
      console.log('Error, Delete from DB')
    })} 
    
  }

  return (
    <MaterialTable
    title="Ads"
    columns={columns}
    data={data}
    options={{
      /* toolbar: false, */
      /* tooltip: 'Expand', */
      filtering: true,
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
          tooltip: 'Add Adsets',
          isFreeAction: true,
          onClick: () => {
            window.location.replace("/CreateAds")

          }
        },

        rowData => ({
          icon: () => <Link to={{ pathname: "/CreateAds", state: rowData }}><FaEdit /></Link>,
          tooltip: 'Edit Adsets',
          onClick: () => window.confirm('You want to edit ' + rowData.name)
        }),
        rowData => ({
          icon: () => <Link to={{ }}><FaTrashAlt /></Link>,
          tooltip: 'Delete Adsets',
          onClick: (event, rowData) => {
          
            if(window.confirm("You want to delete " + rowData.name)) {
              console.log(rowData)
             new Promise((resolve) => {
               handleRowDelete(rowData, resolve)
             })
            
           } 
            }
        }),
      ]}
    />

  )
}
