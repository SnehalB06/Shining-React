import React, { Component } from 'react';
import axios from 'axios';

const Student = props => (
    <tr>
      <td>{props.student.RollNo}</td>
      <td>{props.student.UserName}</td>
      <td>{props.student.CourseId}</td>
      <td>{props.student.enrollmentDate}</td>
    </tr>
) 
export default class EnrollmentList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            students:[]

        };
      }
    
    componentDidMount() {
        axios.get('http://localhost:5000/enrollment/getAllstudents')
          .then(response => {
            this.setState({ students: response.data })
            console.log(response.data,typeof(response.data));
           console.log(this.state,typeof(this.setState));
          })
          .catch((error) => {
            console.log(error);
          })
      }

      EnrollmentList() {

          console.log('courselistFun',this.state);
          
          return this.state.students.map(currentuser => {
            return <Student student={currentuser} key={currentuser._id}/>;
         })
      }
      render() {
        return (
          <div>
            <h3>All Students</h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                    <td>RollNo</td>
                    <td>UserName</td>
                    <td>CourseId</td>
                    <td>enrollmentDate</td>
                </tr>
              </thead>
              <tbody>
                { this.EnrollmentList() }
              </tbody>
            </table>
          </div>
        )
      }
}
