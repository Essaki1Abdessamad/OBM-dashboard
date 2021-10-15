import React, { Component } from 'react'
import axios from 'axios'
import { Form, Button, Row, Col } from "react-bootstrap";
import '../App.css';
import SelectPageAPI from '../components/SelectPageAPI';
import SelectImageHashAPI from '../components/SelectImageHashAPI';
import { Alert } from 'reactstrap';

class ADsetsForm extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            name : '',
            image_hash : '',
            message: '',
            idPage: '',
            idAdCreative : '',
            visible : false,
            color : '',
            text : ''
          
        }
    }

    changeHundler = e => {
        this.setState({ 
            [e.target.name] : e.target.value,
            [e.target.message] : e.target.value,
        })
    }

    handleSelectChange = (selectedValue) =>{
        this.setState({
            idPage : selectedValue,
        });
      }

    handleSelectChange1 = (selectedValue) =>{
        this.setState({
            image_hash : selectedValue,
        });
    }


    submitHundler = e => {
        window.setTimeout(()=>{
            this.setState({visible:false})
          },3000)

        e.preventDefault()
        console.log(this.state)
       
        if(!this.state.idAdCreative){

        axios.post('http://localhost:8080/app/adCreativeAPI', this.state)
        .then(Response => {
            this.state.idAdCreative = Response.data.id
            saveData()
            
            this.setState({
                color : 'success',
                text : 'The Adcopie Created Successfully',
                visible:true
            })
        })
        .catch(error => {
            console.log("This is the error 00000",error)
             this.setState({
                color: 'danger',
                text: 'Error !! verify the input data',
                visible: true
            }) })


        const saveData = () => {
            axios.post('http://localhost:8080/app/saveAdCreative',this.state)
            .then(Response => {
              console.log("Data sent to DB ",Response.data)})
            .catch(error => console.log(error))
        }
    }else{

        console.log("update data")
        
        axios.post('http://localhost:8080/app/updateAdCreativeAPI', this.state)
        .then(Response => {
            this.state.idAdCreative = Response.data.id
            updateAdcopie()
            
            this.setState({
                color : 'success',
                text : 'The Adcreative updated Successfully',
                visible:true
            })
        })
        .catch(error => {
            console.log("This is the error 00000",error)
             this.setState({
                color: 'danger',
                text: 'Error !! verify the input data',
                visible: true
            }) })


        const updateAdcopie = () => {
            axios.put('http://localhost:8080/app/updateAdCreative',this.state)
            .then(Response => {
              console.log("Data sent to DB ",Response.data)})
            .catch(error => console.log(error))
        }
    }
    }

    handleSubmit = (event) => {
        alert('Create AdCreative : ' + this.state.name);   
    
    }

    componentDidMount() {
        console.log(this.props.location.state)
        const valEdit = this.props.location.state
        if (typeof valEdit !== 'undefined' && valEdit !== null) {

            this.setState({
                name : valEdit.name,
                image_hash : valEdit.image_hash,
                message: valEdit.message,
                idPage: valEdit.idPage,
                idAdCreative : valEdit.idAdCreative,
            });
        }
    }
    render() {
      
        const   {
            name,
            image_hash,
            message
        } = this.state

        return (
            <div className="main">
                <p className="h4 mb-5 text-center">Créer des Adcreatives</p>

                <Alert color={this.state.color} isOpen={this.state.visible} >
                        {this.state.text}
                </Alert>

                <form onSubmit={this.submitHundler}>

                <Form.Group as={Row} >
                            <Form.Label column sm={2}>Name *</Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" required
                                name="name" 
                                value={name}
                                onChange={this.changeHundler}
                                />
                            </Col>
                    </Form.Group>
                    <br></br>

                    <Form.Group as={Row} >
                            <Form.Label column sm={2}>Page ID select *</Form.Label>
                            <Col sm={10}>
                                <SelectPageAPI onSelectChange={this.handleSelectChange } />
                            </Col>
                    </Form.Group>
                    <br></br>

                    <Form.Group as={Row} >
                            <Form.Label column sm={2}>Image Hash *</Form.Label>
                            <Col sm={10}>
                                <SelectImageHashAPI onSelectChange={this.handleSelectChange1 } />
                            </Col>
                    </Form.Group>
                    <br></br>

                    <Form.Group as={Row} >
                            <Form.Label column sm={2}>Message </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" 
                                name="message" 
                                value={message}
                                onChange={this.changeHundler}
                                />
                            </Col>
                    </Form.Group>
                    <br></br>     

                    <Form.Group as={Row}>
                        <div className="col text-center">
                         <Button type="submit" onClick={this.handleSubmit}>Submit</Button>
                        </div>
                    </Form.Group>
                </form>
            </div>
        )
    }
}

export default ADsetsForm
