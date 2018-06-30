import React, { Component } from 'react';
import ShowChart from './ShowChart';
import ShowData from './showdata';

function getQueryVariable(variable) {
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] === variable){return pair[1];}
       }
       return(false);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentShow: Object.keys(ShowData)[0]
    };
    if (getQueryVariable('title')) {
      this.state.currentShow = getQueryVariable('title');
      this.state.hrefMode = true;
    } else {
      this.state.hrefMode = false;
    }
  }
  handleChange = (event) => {
    console.log(event.target.value)
    this.setState({
      currentShow: event.target.value
    })
  }
  render() {
    return (
      <div>
      {!this.state.hrefMode ? 
      <div>
        <select value={this.state.currentShow} onChange={this.handleChange}>
          {Object.entries(ShowData).map(e => (
            <option value={e[0]} key={e[0]}>{e[1]}</option>
          ))}
        </select>
        <br/>
        <br/>
      </div>
      : <h1>
        {ShowData[this.state.currentShow]}
      </h1>}
      <ShowChart show={this.state.currentShow}></ShowChart>
      </div>
    );
  }
}

export default App;
