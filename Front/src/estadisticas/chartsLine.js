import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Grid, Row, Col,Button,InputGroup } from 'react-bootstrap';
import moment, { relativeTimeThreshold } from 'moment';
import Chart from './charts'
import axios from 'axios';



export default class ChartLine extends Component {

    constructor (props) {
        super(props)
        this.state = {
          startDate:  moment(),
          userID : 0,
          dateList: [],
          listItems:[],
          listDate:[],
          nameDate:""
        
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return [year, month, day].join('-');
    }


      handleChange = (date)=> {

        this.setState({
          startDate: date
        });

        this.handleSubmit(this.props.userID);


      }


      handleSubmit = (id) => {
      
        var dateLimit =  new Date(this.state.startDate); 
        const date2 = dateLimit.toDateString();
        var post = {dateLimit:this.formatDate(date2)};
        this.state.nameDate = this.formatDate(date2);
       
        axios.post(`http://35.226.163.50:8080/Backend/stats/student/` + id + '/problemsSolved' ,post)
          .then(res => {
            console.log(res);
            console.log(res.data);
            const dateList=res.data.result;
            this.setState({ dateList });
            const listItems = dateList.map(date => date.date);
            this.setState({listItems});
            const listDate = dateList.map(date => date.numberSolved);
            this.setState({listDate});


          })
      }  

      
      render() {

          <Chart userID={this.state.userID}/>
            
             const data = {
              labels: this.state.listItems,
              datasets: [
                {
                  label: "Problemas resueltos por fecha",
                  fill: false,
                  lineTension: 0.1,
                  backgroundColor: 'rgba(75,192,192,0.4)',
                  borderColor: 'rgba(75,192,192,1)',
                  borderCapStyle: 'butt',
                  borderDash: [],
                  borderDashOffset: 0.0,
                  borderJoinStyle: 'miter',
                  pointBorderColor: 'rgba(75,192,192,1)',
                  pointBackgroundColor: '#fff',
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                  pointHoverBorderColor: 'rgba(220,220,220,1)',
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                  data: this.state.listDate
                }
              ]
            };
  
          return (
              <div>
                  <Row > 
                      <Col md={10}  smOffset={2} xs={10}>
                          <DatePicker
                              selected={this.state.startDate}
                              onChange={this.handleChange}
                              dateFormat="YYYY-MM-DD"
                              todayButton={"today"}
                              maxDate={moment()}
                              onYearChange = {this.handleChange}
                              
                          />
                          

                      </Col>    
                      <Col md={6} smOffset={2} xs={6}>
                          <h2>Cantidad problemas resueltos desde: {this.state.nameDate}</h2>
                          <Line data={data}
                          width = {600}
                          height = {400}  
                          />
                      </Col>
                      
  
                  
                  </Row> 
                </div>
  
              );
            }





    }      