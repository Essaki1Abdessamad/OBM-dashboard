import React from 'react'
import Select from 'react-select'
import axios from 'axios'


export default class InterestsTargeting extends React.Component {


  constructor(props){
    super(props)
    this.state = {
      selectOptions : []
        
    }
  }

 async getOptions(text){
    const res = await axios.get(`http://localhost:8080/app/searchInterestsAPI?q=${text}`)
    const data = res.data

    const options = data.data.map(d => ({
      "value" : d.id,
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
       id:e.value, 
       name:e.label,
    })
    let selectedValue = {
      id : e.value,
      name : e.label
    }
    this.props.onSelectChange(selectedValue);
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
        <Select options={this.state.selectOptions} isMulti placeholder= 'Select Interests' onInputChange={handleInputChange} onChange={this.handleMultiChange.bind(this)} />
    {/*  <p>You have selected <strong>{this.state.name}</strong> whose id is <strong>{this.state.id}</strong></p> */}
      </div>
    )
  }
}