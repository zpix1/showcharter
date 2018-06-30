import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import Ratings from './ratings';

class ShowChart extends Component {

  getChartData(show) {
    const data = Ratings[show];
    return {
      labels: data.map((s,si) => s.map((e,ei) => `S${si+1}E${ei+1} `+e[0])).reduce((acc, val) => acc.concat(val), []),
      datasets: [
        {
          data: data.map(s => s.map(e => e[1])).reduce((acc, val) => acc.concat(val), [])
        }
      ]
    }
  }

  constructor(props) {
    super(props);
    
    this.options = {
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            max: 10,
            min: 0
          }
        }],
        xAxes: [{
          gridLines: {
            drawOnChartArea: false // only want the grid lines for one axis to show up
          },
          ticks: {
            autoSkip: false,
            callback: function (label) {
              if (label.split("E")[1].split(" ")[0] === "1")
                return "Season " + label.split("E")[0].split("S")[1]
              else
                return ""
              // return (label.split("E")[1].split(" ")[0] === "1") ? ("Season " + label.split("E")[0].split("S")[1]) : "";
            }
          }
        }]
      }
    }
    this.state = {
      chartData: this.getChartData(props.show)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      chartData: this.getChartData(nextProps.show)
    });
  }

  render() {
    return (
      <div>
        <Line data={this.state.chartData} options={this.options}></Line>
      </div>
    );
  }
}

export default ShowChart;
