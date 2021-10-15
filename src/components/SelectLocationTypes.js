import React, { Component } from 'react'
import Select from 'react-select'


export default class SelectLocationTypes extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectOptions: [
        {
          "name": "country",
          "label": "Country"
        },
        {
          "name": "country_group",
          "label": "Country Group"
        },
        {
          "name": "region",
          "label": "Region"
        },
        {
          "name": "city",
          "label": "City"
        },
        {
          "name": "zip",
          "label": "Zip"
        },
        {
          "name": "geo_market",
          "label": "Geo Market"
        },
        {
          "name": "lectoral_district",
          "label": "Electoral District"
        },
      ],

    }
  }

 

  handleChange(e){

    console.log(e)

  }

  componentDidMount(){

  }

  render() {
    return (
      <div>
        <Select options={this.state.selectOptions} onChange={this.handleChange.bind(this)}/>
      </div>
    )
  }
}

