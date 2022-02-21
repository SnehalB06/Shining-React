import React, { Component } from 'react';
import axios from 'axios';

export default class addCourse extends Component {
  constructor(props) {
    super(props);

    this.onChangeCourseName = this.onChangeCourseName.bind(this);
    this.onChangecourseId = this.onChangecourseId.bind(this);
    
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      courseId: '',
      courseName:''
    }
  }

  onChangecourseId(e) {
    this.setState({
      courseId: e.target.value
    })
  }
  onChangeCourseName(e) {
    this.setState({
      courseName: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const course = {
      courseName: this.state.courseName,
      courseId: this.state.courseId
    }

    console.log(course);

    axios.post('http://localhost:5000/courses/addCourse', course)
      .then(res => console.log(res.data));

    this.setState({
      courseName: '',
      courseId:''
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
<br>
</br>
            <label>CourseId: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.courseId}
                onChange={this.onChangecourseId}
                />
                <br></br>
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}
