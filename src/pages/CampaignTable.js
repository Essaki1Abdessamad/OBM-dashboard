import "bootstrap/dist/css/bootstrap.min.css"
import React, { useState, useEffect, forwardRef } from 'react';
import axios from 'axios'
import MaterialTable from "material-table";
import '../App.css';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { FaEdit , FaTrashAlt , FaPlusSquare , FaThumbsUp  } from 'react-icons/fa';
import AuthService from "../services/auth.service";



export default function CampaignTable() {
  var columns = [
    { title: "id", field: "idCompaign", hidden: true },
    { title: "Name", field: "name" },
    { title: "OBJECTIVES", field: "objective" },
    { title: "STATUS", field: "status" },
    { title: "DATE", field: "date", editable: "never", type: 'date' }

  ]
  var columnsDetials = [
    { title: "Name", field: "name" },
    { title: "Optimization Goal", field: "optimization_Goal" },
    { title: "Billing Event", field: "billing_Event" },
    { title: "Targeting", field: "audiences_Name" },
    { title: "Interests", field: "interests_Name" },
    { title: "Status", field: "status" },

  ]

  var columnsDetials1 = [
    { title: "Name", field: "name" },
    { title: "Adset ID", field: "adset_id" },
    { title: "Creative ID", field: "creative_id" },
    { title: "Status", field: "status" },

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
  }, []
  
 
  
  )

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

    axios.delete('http://localhost:8080/app/deleteCampaignFBdb/' + oldData._id)
      .then(res => {
        console.log("Deleted DATA", oldData)
        resolve()
      })
      .catch(error => {
        console.log('kkkkkkkkk')
        resolve()
      })

    axios.delete('http://localhost:8080/app/deleteCampaignFBapi/' + oldData.idCompaign)
      .then(res => {
        console.log("Deleted DATA", oldData)
        resolve()
      })
      .catch(error => {
        console.log('kkkkkkkkk')
        resolve()
      })
  }


  return (
    <div className='main'>
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

            }),
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              handleRowAdd(newData, resolve)
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              handleRowDelete(oldData, resolve)
            })



        }}

        detailPanel={rowData => {
          return (
            <div>
              <MaterialTable
                title="Adsets"
                columns={columnsDetials}
                data={
                  async (query) => {
                    var idCompaign = rowData.idCompaign
                    var result = await axios.get('http://localhost:8080/app/getAdsetsID', { params: { idCompaign } })
                    return ({ data: result.data, page: query.page, totalCount: result.length })
                  }
                }
                options={{
                  /* toolbar: false, */
                  tooltip: 'Expand',
                  actionsColumnIndex: -1,
                  paging: false,
                  thirdSortClick: false,
                  headerStyle: {
                    top: "0",
                    backgroundColor: "#C70039",
                    color: "#FFF",
                    fontWeight: "bold"
                  },

                  maxBodyHeight: "400px",
                  sorting: false,
                  search: false,
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
                    icon: () => <Link to={{ }}><FaTrashAlt /></Link>,
                    tooltip: 'Delete Adsets',
                    onClick: () => window.confirm('You want to Delete ' + rowData.name)
                  }),
                ]}
                
                detailPanel={rowData => {
                  return (
                      <MaterialTable
                        title="Adsets"
                        columns={columnsDetials1}
                        data={
                          async (query) => {
                            var adSetID = rowData.adSetID
                            var result = await axios.get('http://localhost:8080/app/getAdID', { params: { adSetID } })
                            return ({ data: result.data, page: query.page, totalCount: result.length })
                          }
                        }
                        options={{
                          /* toolbar: false, */
                          tooltip: 'Expand',
                          actionsColumnIndex: -1,
                          paging: false,
                          thirdSortClick: false,
                          headerStyle: {
                            top: "0",
                            backgroundColor: "#FF5733",
                            color: "#FFF",
                            fontWeight: "bold"
                          },
        
                          maxBodyHeight: "200px",
                          sorting: false,
                          search: false,
                          rowStyle: x => {
                            if (x.tableData.id % 2) {
                              return { backgroundColor: "#f2f2f2" }
                            }
                          }}}

                          actions={[
                            {
                              icon: () => <Link to={{ pathname: "/CreateAds" }}><FaPlusSquare/></Link>,
                              tooltip: 'Add Adsets',
                              isFreeAction : true,
                              onClick: () => window.confirm('You want to Add ' + rowData.name)
                            },
          
                            rowData => ({
                              icon: () => <Link to={{ pathname: "/CreateAds", state: rowData }}><FaEdit /></Link>,
                              tooltip: 'Edit Adsets',
                              onClick: () => window.confirm('You want to delete ' + rowData.name)
                            }),
                            rowData => ({
                              icon: () => <Link to={{ }}><FaTrashAlt /></Link>,
                              tooltip: 'Delete Adsets',
                              onClick: () => window.confirm('You want to Delete ' + rowData.name)
                            }),
                          ]}
                        />
                  )}}





              />
            </div>
          )
        }}
      />

    </div>
  )
}
