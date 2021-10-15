import React from 'react'
import Select from 'react-select'
import axios from 'axios'


export default class SelectAudienceTargeting extends React.Component {


  constructor(props){
    super(props)
    this.state = {
      selectOptions : [],
      multiValue: [],
      val : '',
      label : ''
    }
  }

 async getOptions(text){
    const res = await axios.get(`http://localhost:8080/app/searchAudianceAPI?q=${text}`)
    const data = res.data

    const options = data.data.map(d => ({
      "value" : d.key,
      "label" : d.name,
      type : d.type

    }))

    this.setState({selectOptions: options})

  }

  handleChange(e){
   this.setState({
       key : e.value, 
       name : e.name,
       type : e.type,
    })
    
  }

  handleMultiChange(option) {
    this.setState((state) => {
      return {
        multiValue: option
      };
    });
    this.props.onSelectChange(option);
    console.log("object selected value",option);
  }

  componentDidMount(){
  }

  render() {

    const handleInputChange = characterEntered => {
      console.log(characterEntered);
      this.getOptions(characterEntered)
    }

    return (
      <div>
        <Select options={this.state.selectOptions}  isMulti placeholder= 'Select Audiences' onInputChange={handleInputChange} onChange={this.handleMultiChange.bind(this)} />
    {/* <p>You have selected  <strong>{this.state.name}</strong> whose key is <strong>{this.state.key}</strong></p> */}
      </div>
    )
  }
}