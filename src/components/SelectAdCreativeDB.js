import React from 'react'
import Select from 'react-select'
import axios from 'axios'


export default class SelectAdsetsIdDB extends React.Component {


  constructor(props){
    super(props)
    this.state = {
      selectOptions : [],
 idAdCreative : "",
 creative_name: '' 
    }
  }

 async getOptions(text){
    const res = await axios.get(`http://localhost:8080/app/getAdCreative`)
    const data = res.data

    const options = data.map(d => ({
      "value" : d.idAdCreative,
      "label" : d.name

    }))

    this.setState({selectOptions: options})

  }

  handleMultiChange(option) {
    this.props.onSelectChange(option);
    console.log("option value :",option);
  }

 handleChange(e){
   this.setState({
       idAdCreative : e.value, 
       creative_name : e.label,
    })
    let selectedValue = {
        idAdCreative : e.value, 
       creative_name : e.label,
    };
    this.props.onSelectChange(selectedValue);
    console.log(e.text);
  } 

  componentDidMount(){
      //this.getOptions()
  }

  render() {

    const handleInputChange = characterEntered => {
      console.log(characterEntered);
      this.getOptions(characterEntered)
    }

    return (
      <div>
        <Select options={this.state.selectOptions} required placeholder= 'Select Ad Creative' onInputChange={handleInputChange} onChange={this.handleChange.bind(this)}/>
     {/* <p>You have selected <strong>{this.state.creative_name}</strong> whose id is <strong>{this.state.idAdCreative}</strong></p>  */}
      </div>
    )
  }
}