import React, { Component } from 'react'
import axios from 'axios'
import { Form, Button, Row, Col } from "react-bootstrap";
import '../App.css';
import SelectAdsetsIdDB from '../components/SelectAdsetsIdDB';
import SelectAdCreativeDB from '../components/SelectAdCreativeDB';
import { Alert } from 'reactstrap';



class CreateAds extends Component {

    constructor(props) {
        super(props)

        this.state = {
            idAds: '',
            name: '',
            adset_Name: '',
            adset_id: '',
            creative_id: '',
            status: '',
            visible: false,
            color: '',
            text: '',
            adCopies: '',
            idAdCreative: '',
            creative_name: ''
        }
    }

    changeHundler = e => {
        this.setState({
            [e.target.name]: e.target.value,
            [e.target.status]: e.target.status,
        })
    }

    handleSelectChange = (selectedValue) => {
        this.setState({
            adset_id: selectedValue.id,
            adset_Name: selectedValue.name
        });
    }

    handleSelectChange1 = (selectedValue) => {
        this.setState({
            creative_id: selectedValue.idAdCreative,
            creative_name : selectedValue.creative_name
        });
        console.log("zzbbb",selectedValue)
    }

    handleSelectChange2 = (option) => {
        const iterator = option.values();
        let keys = [];
        let Names = [];
        for (const ite of iterator) {
            keys.push(ite.value)
            Names.push(ite.label)
        }

        var result = option.map(itr => ({ id: parseInt(itr.value), name: itr.label }));
        var res = JSON.stringify(result)
        var res1 = JSON.stringify(keys)
        var res2 = JSON.stringify(Names)
        this.setState({
            adCopies: res,
            creative_id: res1.replace(/[[\]]/g,''),
            creative_name: res2
        });
        console.log(res2)
    }



    submitHundler = e => {
        e.preventDefault()
        console.log(this.state)
        window.setTimeout(()=>{
            this.setState({visible:false})
          },3000)

        if (!this.state.idAds) {
            axios.post('http://localhost:8080/app/createAdAPI', this.state)
                    .then(Response => {
                    console.log(Response.data.id)
                    this.state.idAds = Response.data.id
                    saveData()
                    this.setState({
                        color: 'success',
                        text: 'The Adset Created Successfully',
                        visible: true
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
                axios.post('http://localhost:8080/app/saveAds', this.state)
                    .then(Response => {
                        console.log("Data sent to DB ", Response.data)
                    })
                    .catch(error => console.log(error))
            }
        } else {

            axios.post('http://localhost:8080/app/updateAdsAPI/' + this.state.idAds, this.state)
                .then(Response => {
                    console.log("Updtae Succ ", Response.data)
                    updateADS()
                    this.setState({
                        color: 'success',
                        text: 'The Adset updated Successfully',
                        visible: true
                    })
                })
                .catch(error => {
                    console.log("This is the error 111111",error)
                    this.setState({
                        color: 'danger',
                        text: 'Error !! verify the input data',
                        visible: true
                    })

                });

            const updateADS = () => {
                axios.put('http://localhost:8080/app/updateAdsDB', this.state)
                    .then(Response => {
                        console.log("Ads updated", Response.data)
                    })
                    .catch(error => console.log(error))
            }
        }
    }

    handleSubmit = (event) => {
        alert('Create AD : ' + this.state.name);

    }

    componentDidMount() {
        console.log(this.props.location.state)
        const valEdit = this.props.location.state
        if (typeof valEdit !== 'undefined' && valEdit !== null) {

            this.setState({
                idAds: valEdit.idAds,
                name: valEdit.name,
                adset_id: valEdit.adset_id,
                creative_id: valEdit.creative_id,
                status: valEdit.status,
            });
        }
    }

    render() {

        const {
            name,
            status
        } = this.state

        return (
            <div className="main">
                <p className="h4 mb-5 text-center">Créer des Ads</p>
                <Alert color={this.state.color} isOpen={this.state.visible} >
                    {this.state.text}
                </Alert>
                <form onSubmit={this.submitHundler}>

                    <Form.Group as={Row} >
                        <Form.Label column sm={2}>Adset ID *</Form.Label>
                        <Col sm={10}>
                            <SelectAdsetsIdDB values={this.props.location.state} onSelectChange={this.handleSelectChange} />
                        </Col>
                    </Form.Group>
                    <br></br>

                    <Form.Group as={Row} >
                        <Form.Label column sm={2}>Name *</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text"
                                name="name"
                                value={name}
                                onChange={this.changeHundler}
                            />
                        </Col>
                    </Form.Group>
                    <br></br>

                    <Form.Group as={Row} >
                        <Form.Label column sm={2}>Adcopie ID *</Form.Label>
                        <Col sm={10}>
                            <SelectAdCreativeDB onSelectChange={this.handleSelectChange1} />
                        </Col>
                    </Form.Group>
                    <br></br>

                    <Form.Group as={Row} >
                        <Form.Label column sm={2}>Status *</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text"
                                name="status"
                                value={status}
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

export default CreateAds
