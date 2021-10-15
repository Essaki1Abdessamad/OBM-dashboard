import React, { Component } from 'react'
import { Table } from "react-bootstrap";
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import '../App.css'

export default class ListCompaing extends Component {

    constructor(props) {
        super(props)
        this.state = {
            offset: 0,
            tableData: [],
            orgtableData: [],
            perPage: 5,
            currentPage: 0
        };
    this.handlePageClick = this.handlePageClick.bind(this);
}

handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
        currentPage: selectedPage,
        offset: offset
    }, () => {
        this.loadMoreData()
    });

};

loadMoreData() {
    const data = this.state.orgtableData;
    
    const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
    this.setState({
        pageCount: Math.ceil(data.length / this.state.perPage),
        tableData:slice
    })

}

componentDidMount(){
    this.getData();
}
getData() {
    axios
        .get('http://localhost:8080/app/getCampaign')
        .then(res => {
            var tdata = res.data;
            console.log('data-->'+JSON.stringify(tdata))
             var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                pageCount: Math.ceil(tdata.length / this.state.perPage),
                orgtableData : tdata,
                tableData:slice
            })
        });
}



  

    
    
    render() {
        return (
            <div>   
                <p className="h4 mb-4">List Campaing</p>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Objectives</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
          
                        </tr>
                    </thead>
                
                    <tbody>
                    {
                          this.state.tableData.map((tdata, i) => (
                                <tr key={i}>
                                    <td>{tdata.idCompaign}</td>
                                    <td>{tdata.name}</td>
                                    <td>{tdata.objectives}</td>
                                    <td>{tdata.status}</td>
                                    <td>{tdata.date}</td>
                                    <td>
                                        <a > <i class="fas fa-trash"></i> </a>

                                    </td>
                                     </tr>
                            
                          ))
                        }
                    </tbody>
                </Table>

                {this.state.postData}
                 <ReactPaginate 
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={6}
                    pageRangeDisplayed={6}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
                </div>
        )     
    }
}
 

