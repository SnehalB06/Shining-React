import React, { Component } from 'react';
import axios from 'axios';

const Course = props => (
    <tr>
      <td>{props.course.courseId}</td>
      <td>{props.course.courseName}</td>
    </tr>
  );

export default class CourseList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courses:[]

        };
      }
    
    componentDidMount() {
        axios.get('http://localhost:5000/courses/getAllCourses')
          .then(response => {
            this.setState({ courses: response.data })
            console.log(response.data,typeof(response.data));
           console.log(this.state,typeof(this.setState));
          })
          .catch((error) => {
            console.log(error);
          })
      }

      courseList() {

          console.log('courselistFun',this.state);
          
          return this.state.courses.map(currentcourses => {
            return <Course course={currentcourses} key={currentcourses._id}/>;
          })
      }
      render() {
        return (
          <div>
            <h3>All Courses</h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>CourseName</th>
                  <th>CourseId</th>
                  </tr>
              </thead>
              <tbody>
                { this.courseList() }
              </tbody>
            </table>
          </div>
        )
      }
}
