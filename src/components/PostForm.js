import React, { Component } from 'react'
import axios from 'axios'
import { Form, Button, Row, Col } from "react-bootstrap";

class PostForm extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             id : '',
             name : '',
             objective : '',
             status : ''
        }
    }

    changeHundler = e => {
        this.setState({ [e.target.name] : e.target.value})
    }

    submitHundler = e => {
        e.preventDefault()
        console.log(this.state)

        
        axios.post('http://localhost:8080/app/createCampaign', this.state)
        .then(Response => {
            this.state.id = Response.data.id
            console.log(Response.data)
            saveData()
        })
        .catch(error => console.log(error));


        const saveData = () => {
            axios.post('http://localhost:8080/app/saveCampaign', this.state)
            .then(Response => console.log("Data sent to DB ",Response.data))
            .catch(error => console.log(error))
        }
        
    }


    handleSubmit = (event) => {
        alert('A form was submitted: ' + this.state); }
    
    render() {
        var Obj = [
            'APP_INSTALLS',
            'BRAND_AWARENESS',
            'CONVERSIONS',
            'EVENT_RESPONSES',
            'LEAD_GENERATION',
            'LINK_CLICKS',
            'MESSAGES',
            'POST_ENGAGEMENT',
            'PRODUCT_CATALOG_SALES',
            'REACH',
            'STORE_VISITS',
            'VIDEO_VIEWS'
        ];
        const{name, objective, status} = this.state
        return (
            <div>
                <p className="h4 mb-4">Create Campaing</p>
                <form onSubmit={this.submitHundler}>
                    <Form.Group as={Row} >
                            <Form.Label column sm={2}>Name :</Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" 
                                name="name" 
                                value={name}
                                onChange={this.changeHundler}
                                />
                            </Col>
                    </Form.Group>
                            

                    <Form.Group as={Row} >
                            <Form.Label column sm={2}>Objectives :</Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" 
                                name="objective" 
                                value={objective}
                                onChange={this.changeHundler}
                                />
                            </Col>
                    </Form.Group>


                    <Form.Group as={Row} >
                            <Form.Label column sm={2}>Status :</Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" 
                                    name="status" 
                                    value={status} 
                                    onChange={this.changeHundler}
                                />
                        </Col>
                        </Form.Group>

                    <Form.Group as={Row}>
                        <Col>
                         <Button type="submit" onClick={this.handleSubmit}>Submit</Button>
                        </Col>
                    </Form.Group>
                </form>
            </div>
        )
    }
}

export default PostForm
