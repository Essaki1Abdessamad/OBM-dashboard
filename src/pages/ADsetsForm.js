import React, { Component } from 'react'
import axios from 'axios'
import { Form, Button, Row, Col } from "react-bootstrap";
import '../App.css';
import SelectInterestsTargeting from '../components/SelectInterestsTargeting';
import SelectCampaignDB from '../components/SelectCampaignDB';
import SelectAudienceTargeting from '../components/SelectAudienceTargeting';
import { Alert } from 'reactstrap';
import AuthService from "../services/auth.service";

class ADsetsForm extends Component {

    constructor(props) {
        super(props)


        this.state = {
            currentUser: undefined,
            campaignId: '',
            nameCampaign : '',
            name: '',
            optimizationGoal: '',
            billingEvent: '',
            bidAmount: '',
            dailyBudget: '',
            audiencesKey: [],
            audiencesName: [],
            audiencesType: '',
            interestsId: null,
            interestsName: '',
            startTime: '',
            status: '',
            interests: [],
            locationType: '',
            adSetID: '',
            visible : false,
            color : '',
            text : ''
        }
    }

    changeHundler = e => {
        this.setState({
            [e.target.name]: e.target.value,
            [e.target.optimizationGoal]: e.target.value,
            [e.target.billingEvent]: e.target.value,
            [e.target.bidAmount]: e.target.value,
            [e.target.dailyBudget]: e.target.value,
            [e.target.startTime]: e.target.value,
            /* [e.target.status]: e.target.value, */

        })
    }


    handleSelectChange = (selectedValue) => {
        console.log("see selected value",selectedValue)
        this.setState({
            campaignId: selectedValue.value,
            nameCampaign: selectedValue.name,
        });
    }

    handleSelectChange1 = (option) => {
        const iterator = option.values();
        console.log("Name of countrey", iterator.label)
        let keys = [];
        let Names = [];
        let locationTypeVal = ''
        for (const ite of iterator) {
            keys.push(ite.value)
            Names.push(ite.label)

            switch (ite.type) {
                case "country":
                    locationTypeVal = "countries"
                    break;
                case "city":
                    locationTypeVal = "cities"
                    break;
                case "region":
                    locationTypeVal = "regions"
                    break;
            }

        }
        var res = JSON.stringify(keys)
        var res1 = JSON.stringify(Names)
        this.setState({
            audiencesKey: res,
            audiencesName: res1,
            locationType: locationTypeVal
        });
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
        console.log(res)
        this.setState({
            interests: res,
            interestsId: res1,
            interestsName: res2
        });
    }


    submitHundler = e => {
        window.setTimeout(()=>{
            this.setState({visible:false})
          },3000)

        e.preventDefault()
        console.log(this.state)
        
        if(!this.state.adSetID){
            axios.post('http://localhost:8080/app/createAdsetsAPI?idAcc=act_315855645244834', this.state)
            .then(Response => {
                const res = JSON.parse(Response.data.body)
                this.state.adSetID = res.id
                console.log("Id of the adsets xxx", Response.data)
                console.log("the id of adsets", res.id)
                saveData()
                this.setState({
                    color : 'success',
                    text : 'The Adset Created Successfully',
                    visible:true
                })
            })
            .catch(error => {
                console.log("this is error msg",error)
                this.setState({
                    color : 'danger',
                    text : 'Error !! verify the input data',
                    visible:true
                })
                
            });

        const saveData = () => {

            this.state.audiencesName = this.state.audiencesName.replace(/[\[\]"]+/g,'')
            this.state.interestsName = this.state.interestsName.replace(/[\[\]"]+/g,'')

            axios.post('http://localhost:8080/app/saveAdsets', this.state)
                .then(Response => {
                    
                    console.log("Data sent to DB ", Response.data)
                })
                .catch(error => console.log(error))
        }
        }else{
            axios.post('http://localhost:8080/app/updateAdsetsAPI/'+this.state.adSetID, this.state)
                .then(Response => {
                    console.log("Updtae Succ ", Response.data)
                    updateAdsets()
                    this.setState({
                        color : 'success',
                        text : 'The Adset updated Successfully',
                        visible:true
                    })
                   
                })
                .catch(error => {
                    console.log(error)
                    this.setState({
                        color : 'danger',
                        text : 'Error !! verify the input data',
                        visible:true
                    })
                   
                });

                const updateAdsets = () => {
                    axios.put('http://localhost:8080/app/updateAdsetsDB', this.state)
                        .then(Response => {
                            console.log("Ads updated", Response.data)
                        })
                        .catch(error => console.log(error))
                }
        }

        


    }


    handleSubmit = (event) => {
        alert('Create AdSet : ' + this.state.name);



    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

            if (user) {
            this.setState({
                currentUser: user,
                showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
            });
            }
        

        console.log(this.props.location.state)
        const valEdit = this.props.location.state
        if (typeof valEdit !== 'undefined' && valEdit !== null) {

            this.setState({
                adSetID : valEdit.adSetID,
                name: valEdit.name,
                bidAmount: valEdit.bid_Amount,
                billingEvent: valEdit.billing_Event,
                dailyBudget: valEdit.daily_Budget,
                optimizationGoal: valEdit.optimization_Goal,
                status: valEdit.status,
            });
        }
    }

    render() {


        const {
            name,
            optimizationGoal,
            billingEvent,
            bidAmount,
            dailyBudget,
            status
        } = this.state


        return (

            <div className="main">
                <p className="h4 mb-5 text-center">Créer des Adsets</p>
                <form onSubmit={this.submitHundler}>
                     <Alert color={this.state.color} isOpen={this.state.visible} >
                            {this.state.text}
                    </Alert>
                <br></br>
                    <Form.Group as={Row} >
                        <Form.Label column sm={2}>Select Campaign *</Form.Label>
                        <Col sm={10}>
                            <SelectCampaignDB values={this.props.location.state} onSelectChange={this.handleSelectChange} />
                        </Col>
                    </Form.Group>
                    <br></br>

                    <Form.Group as={Row} >
                        <Form.Label column sm={2}>Name *</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text"/*  required */
                                name="name"
                                value={name}
                                onChange={this.changeHundler}
                            />
                        </Col>
                    </Form.Group>
                    <br></br>

                    <Form.Group as={Row} >
                        <Form.Label column sm={2}>Optimization Goal *</Form.Label>
                        <Col sm={10}>
                        <Form.Control 
                               
                                as="select"
                                value={optimizationGoal}
                                onChange={e => {
                                  console.log("e.target.value", e.target.value);
                                  this.setState({
                                    optimizationGoal: e.target.value,
                                }); 
                    
                                }}>
                                    <option value="">SELECT</option>
                                    <option value="REACH">REACH</option>
                                    <option value="IMPRESSIONS">IMPRESSIONS</option>
                                </Form.Control> 
                        </Col>
                    </Form.Group>
                    <br></br>

                    <Form.Group as={Row} >
                        <Form.Label column sm={2}>Billing Event *</Form.Label>
                        <Col sm={10}>
                        <Form.Control 
                        
                                as="select"
                                value={billingEvent}
                                onChange={e => {
                                  console.log("e.target.value", e.target.value);
                                  this.setState({
                                    billingEvent: e.target.value,
                                }); 
                    
                                }}>
                                    <option value="">SELECT</option>
                                    {/* <option value="POST_ENGAGEMENT">POST_ENGAGEMENT</option> */}
                                    <option value="IMPRESSIONS">IMPRESSIONS</option>
                                    {/* <option value="LINK_CLICKS">LINK_CLICKS</option>
                                    <option value="CLICKS">CLICKS</option>
                                    <option value="PAGE_LIKES">PAGE_LIKES</option>
                                    <option value="VIDEO_VIEWS">VIDEO_VIEWS</option>
                                    <option value="OFFER_CLAIMS">OFFER_CLAIMS</option>
                                    <option value="THRUPLAY">THRUPLAY</option> */}
                                </Form.Control>
                        </Col>
                    </Form.Group>
                    <br></br>

                    <Form.Group as={Row} >
                        <Form.Label column sm={2}>Bid Amount *</Form.Label>
                        <Col sm={10}>
                            <Form.Control type='number' 
                                name="bidAmount"
                                value={bidAmount}
                                onChange={this.changeHundler}
                            />
                        </Col>
                    </Form.Group>
                    <br></br>

                    <Form.Group as={Row} >
                        <Form.Label column sm={2}>Daily Budget *</Form.Label>
                        <Col sm={10}>
                            <Form.Control type="nummber" 
                                name="dailyBudget"
                                value={dailyBudget}
                                onChange={this.changeHundler}
                            />
                        </Col>
                    </Form.Group>
                    <br></br>

                    <Form.Group as={Row} >
                        <Form.Label column sm={2}>Targeting *</Form.Label>
                        <Col sm={10}>
                            <SelectAudienceTargeting  onSelectChange={this.handleSelectChange1} />
                        </Col>
                    </Form.Group>
                    <br></br>

                    <Form.Group as={Row} >
                        <Form.Label column sm={2}>Interests *</Form.Label>
                        <Col sm={10}>
                            <SelectInterestsTargeting onSelectChange={this.handleSelectChange2} />
                        </Col>
                    </Form.Group>
                    <br></br>

                    <Form.Group as={Row} >
                        <Form.Label column sm={2}>Status *</Form.Label>
                        <Col sm={10}>
                            <Form.Control 
                                
                                as="select"
                                value={status}
                                onChange={e => {
                                  console.log("e.target.value", e.target.value);
                                  this.setState({
                                    status: e.target.value,
                                }); 
                    
                                }}>
                                    <option value="">SELECT</option>
                                    <option value="PAUSED">PAUSED</option>
                                    <option value="ACTIVE">ACTIVE</option>
                                </Form.Control> 
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
