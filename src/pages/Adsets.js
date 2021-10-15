import "bootstrap/dist/css/bootstrap.min.css"
import React, { useState, useEffect, forwardRef } from 'react';
import axios from 'axios'
import MaterialTable from "material-table";
import '../App.css';
import { Link } from "react-router-dom";
import SelectCampaignDB from '../components/SelectCampaignDB';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { FaEdit, FaTrashAlt, FaPlusSquare, FaThumbsUp } from 'react-icons/fa';



export default function Adsets() {

  const [data, setData] = useState([]); //table data



  var dynamicLookupObject = []
  data.map(function (e) {
    var object = {
      [e.nameCampaign]: e.nameCampaign
    }
    dynamicLookupObject.push(object)
  })
  dynamicLookupObject.filter(function (e, i, a) {
    return a.indexOf(e) === i;
  });



  var zz = Object.assign({}, ...dynamicLookupObject)
  console.log(zz)



  /* var dynamicLookupObject = { 6232323449099: "6232323449099", 6232323483499: "6232323483499" } */

  var columns = [
    { title: "Campaign Name", field: "nameCampaign" , lookup : zz  },
    { title: "adSetID", field: "adSetID", hidden: true },
    { title: "Name", field: "name", filtering: false },
    { title: "Optimization Goal", field: "optimization_Goal", filtering: false },
    { title: "Billing Event", field: "billing_Event", filtering: false },
    { title: "Targeting", field: "audiences_Name", filtering: false },
    { title: "Interests", field: "interests_Name", filtering: false },
    { title: "Status", field: "status", filtering: false },
  ]




  useEffect(() => {
    axios.get("http://localhost:8080/app/getAdsets")
      .then(res => {
        setData(res.data)
      })
      .catch(error => {
        console.log("Error")
      })
  }, [])
  

  const handleRowDelete = (rowData, resolve) => {

    axios.delete('http://localhost:8080/app/deleteAdsetsAPI/'+ rowData.adSetID)
    .then(res => {
      console.log("Delete from api", rowData)
      deleteDATA()
    })
    .catch(error => {
      console.log('Error, Delete from api')
    })


    const deleteDATA = () => {

      axios.delete('http://localhost:8080/app/deleteAdsetsDB/', rowData)
      .then(res => {
        console.log("Delete from DB", rowData)
      })
      .catch(error => {
        console.log('Error, Delete from DB')
      }) 


      axios.delete('http://localhost:8080/app/manyDeleteAdsDB/'+ rowData.adSetID)
      .then(res => {
        console.log("Delete Adsets from DB", rowData)
      })
      .catch(error => {
        console.log('Error, Delete Adsets from DB')
      }) 

    }

    
  }

 

  return (
    <MaterialTable
      title="Adsets"
      columns={columns}
      data={data}
      options={{
        /* toolbar: false, */
        tooltip: 'Expand',
        filtering: true,
        actionsColumnIndex: -1,
        paging: true,
        thirdSortClick: false,
        headerStyle: {
          top: "0",
          backgroundColor: "#C70039",
          color: "#FFF",
          fontWeight: "bold"
        },

        maxBodyHeight: "400px",
        sorting: false,
        search: true,

        rowStyle: x => {
          if (x.tableData.id % 2) {
            return { backgroundColor: "#f2f2f2" }
          }
        }

      }}
      actions={[
        {
          icon: 'add',
          tooltip: 'Add Adsets',
          isFreeAction: true,
          onClick: () => {
            window.location.replace("/ADsetsForm")

          }
        },

        rowData => ({
          icon: () => <Link to={{ pathname: "/ADsetsForm", state: rowData }}><FaEdit /></Link>,
          tooltip: 'Edit Adsets',
          onClick: () => window.confirm('You want to edit ' + rowData.name)
        }),

        rowData => ({
          icon: () => <Link to={{}}><FaTrashAlt /></Link>,
          tooltip: 'Delete Adsets',
          onClick: (event, rowData) => {
          
           if(window.confirm("You want to delete " + rowData.name)) {
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
