import React, { Component } from 'react';
import axios from 'axios';

const Course = props => (
    <tr>
      <td>{props.course.courseId}</td>
      <td>{props.course.courseName}</td>
    </tr>
  );


export default class SearchCourse extends Component {
  constructor(props) {
    super(props);

    this.onChangeCourseName = this.onChangeCourseName.bind(this);
    
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      courseName:'',
      Coursedata:[]
    }
  }

  
  onChangeCourseName(e) {
    this.setState({
      courseName: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const course = {
      courseName: this.state.courseName
    }

    console.log(course);

    axios.post('http://localhost:5000/courses/SearchCourse', course)
      .then(response => {
        this.setState({ Coursedata: response.data })
        console.log(response.data,typeof(response.data));
       console.log(this.state,typeof(this.setState));
      })
      .catch((error) => {
        console.log(error);
      });

    this.setState({
      courseName: '',
      Coursedata:[]
    }) 
}

  courseList() {

    console.log('courselistFun',this.state);
    
    return this.state.Coursedata.map(currentcourses => {
      return <Course course={currentcourses} key={currentcourses._id}/>;
    })
}


  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>CourseName: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.courseName}
                onChange={this.onChangeCourseName}
                />
                <br></br>
          </div>
          <div className="form-group">
            <input type="submit" value="Search Course" className="btn btn-primary" />
          </div>
        </form>
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
      </div>
    )
  }
}
