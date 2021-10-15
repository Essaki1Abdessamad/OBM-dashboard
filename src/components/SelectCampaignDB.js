import React from 'react'
import Select from 'react-select'
import axios from 'axios'


export default class SelectCampaignDB extends React.Component {


  constructor(props){
    super(props)
    this.state = {
      isDisabled: false,
      selectOptions : [],
      idCompaign: "",
      name: ''
    }
  }

 async getOptions(text){
    const res = await axios.get(`http://localhost:8080/app/getCampaign`)
    const data = res.data

    const options = data.map(d => ({
      "value" : d.idCompaign,
      "label" : d.name

    }))

    this.setState({selectOptions: options})

  }



 handleChange(e){
   this.setState({
       idCompaign:e.value, 
       name:e.label,
    })
    let selectedValue ={
      name : e.label,
      value : e.value,
    } 
    this.props.onSelectChange(selectedValue);
    console.log(e.text);
  } 

  componentDidMount(){
    console.log(this.props.values)
    if(this.props.values){
      
      this.setState({
        isDisabled : true
     })
    }
  }

  render() {

    const handleInputChange = characterEntered => {
      console.log(characterEntered);
      this.getOptions(characterEntered)
    }

    console.table(this.state.selectOptions)
    return (
      <div>
        <Select options={this.state.selectOptions} isDisabled={this.state.isDisabled} placeholder= 'Select Campaign' onInputChange={handleInputChange} onChange={this.handleChange.bind(this)}/>
    {/* <p>You have selected <strong>{this.state.name}</strong> whose id is <strong>{this.state.idCompaign}</strong></p> */}
      </div>
    )
  }
}