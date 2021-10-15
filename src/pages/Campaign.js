import "bootstrap/dist/css/bootstrap.min.css"
import React, { useState, useEffect, forwardRef } from 'react';
import axios from 'axios'
import MaterialTable from "material-table";
import '../App.css';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { FaEdit , FaTrashAlt , FaPlusSquare , FaThumbsUp  } from 'react-icons/fa';



export default function CampaignTable() {
const Obj_Objectives = { POST_ENGAGEMENT : "POST_ENGAGEMENT", REACH : "REACH" }

const Obj_Status = {ACTIVE : "ACTIVE",PAUSED : "PAUSED"}
  var columns = [
    { title: "id", field: "idCompaign", hidden: true },
    { title: "Name", field: "name",  validate: rowData => Boolean(rowData.name) },
    { title: "OBJECTIVES", field: "objective", lookup : Obj_Objectives, validate: rowData => Boolean(rowData.objective)},
    { title: "STATUS", field: "status", lookup : Obj_Status , validate: rowData => Boolean(rowData.status) },
    { title: "DATE", field: "date", editable: "never", type: 'date' }

  ]
  

  const [data, setData] = useState([]); //table data

  useEffect(() => {
    axios.get("http://localhost:8080/app/getCampaign")
      .then(res => {
        setData(res.data)
      })
      .catch(error => {
        console.log("Error")
      })
  }, [])

  const handleRowUpdate = (newData, oldData, resolve) => {

    axios.post("http://localhost:8080/app/updateCampaignAPI/" + newData.idCompaign, newData)
      .then(res => {
        console.log(oldData)
        console.log(newData)
        resolve()
      })
      .catch(error => {
        console.log(error)
        resolve()

      })
    console.log(newData)
    axios.put('http://localhost:8080/app/updateCampaign/', newData)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })


  }




  const handleRowAdd = (newData, resolve) => {

    axios.post("http://localhost:8080/app/createCampaign", newData)
      .then(res => {
        console.log(newData)
        console.log(res.data)
        newData.idCompaign = res.data.id
        saveData()
        resolve()
      })
      .catch(error => console.log("Couldnt Post"))

    const saveData = () => {
      axios.post('http://localhost:8080/app/saveCampaign', newData)
        .then(Response => {
          //console.log("THE SAVED ID ",idCompaign)
          console.log("Data sent to DB ", Response.data)
        })
        .catch(error => console.log(error))
    }

  }
  

  const handleRowDelete = (oldData, resolve) => {

    const deleteDATA = () => {
     axios.delete('http://localhost:4000/app/deleteCampaignFBdb/' + oldData._id)
      .then(res => {
        console.log("Deleted DATA DB", oldData)
        resolve()
      })
      .catch(error => {
        console.log('Error, Delete DATA DB')
        resolve()
      })

      axios.delete('http://localhost:4000/app/manyDeleteAdsetsDB/' + oldData.idCompaign)
      .then(res => {
        console.log("Deleted Adsets DATA DB", oldData.idCompaign)
        resolve()
      })
      .catch(error => {
        console.log('Error, Delete DATA DB')
        resolve()
      }) 
      axios.delete('http://localhost:8080/app/DeleteCampagne/' + oldData.idCompaign)
      .then(res => {
        console.log("Deleted Adsets DATA DB", oldData.idCompaign)
        resolve()
      })
      .catch(error => {
        console.log('Error, Delete DATA DB')
        resolve()
      })
      

    }
    axios.delete('http://localhost:8080/app/deleteCampaignFBapi/' + oldData.idCompaign)
      .then(res => {
        console.log("Deleted DATA API", oldData)
        deleteDATA()
        resolve()
      })
      .catch(error => {
        console.log('Error, Delete DATA API')
        resolve()
      })
  }


  return (
    <div >
      <MaterialTable
        title="Campaigns"
        columns={
          columns
        }

        data={data}

        options={{
          actionsColumnIndex: -1,
          headerStyle: {
            backgroundColor: "#900C3F",
            color: "#FFF",
            fontWeight: "bold"
          },
          cellStyle: {
            borderButtom: "1px solid #dddddd"
          },
          rowStyle: x => {
            if (x.tableData.id % 2) {
              return { backgroundColor: "#f2f2f2" }
            }
          }

        }}


        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              handleRowUpdate(newData, oldData, resolve);
              setTimeout(()=> {window.location.reload()}, 1700)

            }),
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              handleRowAdd(newData, resolve)
             setTimeout(()=> {window.location.reload()}, 1700) 
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              handleRowDelete(oldData, resolve)
              setTimeout(()=> {window.location.reload()}, 1700)
            })



        }}
/>

    </div>
  )
}
