import React from 'react'
import Select from 'react-select'
import axios from 'axios'


export default class SelectPageAPI extends React.Component {


  constructor(props){
    super(props)
    this.state = {
      selectOptions : [],
      idPage: "",
      name: ''
    }
  }

 async getOptions(text){
    const res = await axios.get(`https://graph.facebook.com/me/accounts?access_token=EAAD8z7jmY8wBAEPvZCQCqmE2xN85K5EZAm037eL2OP6iVlg3qMLnh1f1oqtLDSAZAnvZB2rkpl26B4dnLJCRpS9CZBJ3UzJjQ3n1hExYtzDEGa79AXN9uUx78Rd3kYxnsFJcZBJ4OEh7gK9JTc4ZC2EaEN5y28HBcO7XmBULNYC3atqPg3hMcP1`)
    const data = res.data

    const options = data.data.map(d => ({
      "value" : d.id,
      "label" : d.name

    }))

    this.setState({selectOptions: options})

  }



 handleChange(e){
   this.setState({
       idPage:e.value, 
       name:e.label,
    })
    let selectedValue = e.value;
    this.props.onSelectChange(selectedValue);
    console.log(e.text);
  } 

  componentDidMount(){
      this.getOptions()
  }

  render() {
/* 
    const handleInputChange = characterEntered => {
      console.log(characterEntered);
      this.getOptions(characterEntered)
    }
 */
    console.table(this.state.selectOptions)
    return (
      <div>
        <Select options={this.state.selectOptions} placeholder= 'Select Page' /* onInputChange={handleInputChange} */ onChange={this.handleChange.bind(this)}/>
      </div>
    )
  }
}