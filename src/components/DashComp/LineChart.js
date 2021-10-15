import { useRef, useState, useEffect } from "react";
import  Chart  from "chart.js/auto";
import React from 'react';
import ReactApexChart from "react-apexcharts";

class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    
      series: [{
          name: "Session Duration",
          data: [45, 52, 38, 24, 33, 26, 21, 20, 22, 26, 30, 45]
        },
        {
          name: "Page Views",
          data: [35, 41, 62, 42, 13, 18, 29, 50, 55, 60, 70, 80]
        },
        {
          name: 'Total Visits',
          data: [87, 57, 74, 99, 75, 38, 62, 67, 82, 86, 95, 140]
        }
      ],
      options: {
        chart: {
          height: 600,
          type: 'line',
          zoom: {
            enabled: false
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: [5, 7, 5],
          curve: 'straight',
          dashArray: [0, 8, 5]
        },
        title: {
          text: 'Page Statistics',
          align: 'left'
        },
        legend: {
          tooltipHoverFormatter: function(val, opts) {
            return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
          }
        },
        markers: {
          size: 0,
          hover: {
            sizeOffset: 6
          }
        },
        xaxis: {
          categories: ['01 Juin', '02 Juin', '03 Juin', '04 Juin', '05 Juin', '06 Juin', '07 Juin', '08 Juin', '09 Juin',
            '10 Juin', '11 Juin', '12 Juin'
          ],
        },
        tooltip: {
          y: [
            {
              title: {
                formatter: function (val) {
                  return val + " (mins)"
                }
              }
            },
            {
              title: {
                formatter: function (val) {
                  return val + " per session"
                }
              }
            },
            {
              title: {
                formatter: function (val) {
                  return val;
                }
              }
            }
          ]
        },
        grid: {
          borderColor: '#f1f1f1',
        }
      },
    
    
    };
  }



  render() {
    return (
      

<div className="col-lg-8">
      <div className="card shadow">
      <div className="card-body">
      <br></br>
<ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />
</div>
</div>
</div>

);
}
}

export default LineChart;
