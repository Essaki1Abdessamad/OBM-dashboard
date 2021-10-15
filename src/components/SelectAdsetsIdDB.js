import React from 'react'
import Select from 'react-select'
import axios from 'axios'


export default class SelectAdsetsIdDB extends React.Component {


  constructor(props){
    super(props)
    this.state = {
      selectOptions : [],
      adSetID : "",
      name: '',
      isDisabled : false
    }
  }

 async getOptions(text){
    const res = await axios.get(`http://localhost:8080/app/getAdsets`)
    const data = res.data

    const options = data.map(d => ({
      "value" : d.adSetID,
      "label" : d.name

    }))

    this.setState({selectOptions: options})

  }



 handleChange(e){
   this.setState({
       adSetID : e.value, 
       name : e.label,
    })
    let selectedValue = {
      id : e.value,
      name : e.label
    }
    this.props.onSelectChange(selectedValue);
    console.log(e.text);
  } 

  componentDidMount(){
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
        <Select options={this.state.selectOptions} isDisabled={this.state.isDisabled} placeholder= 'Select Adsets' onInputChange={handleInputChange} onChange={this.handleChange.bind(this)}/>
    {/* <p>You have selected <strong>{this.state.name}</strong> whose id is <strong>{this.state.idCompaign}</strong></p> */}
      </div>
    )
  }
}