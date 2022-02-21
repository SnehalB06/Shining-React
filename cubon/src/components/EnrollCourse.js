import React, { Component } from 'react';
import axios from 'axios';

export default class EnrollCourse extends Component {
    constructor(props) {
        super(props);

        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangecourseId = this.onChangecourseId.bind(this);
        this.onChangeRollNo = this.onChangeRollNo.bind(this);
        this.onChangeenrollmentDate = this.onChangeenrollmentDate.bind(this);


        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            UserName: '',
            RollNo: '',
            courseId: '',
            enrollmentDate: ''
        }
    }

    onChangeUserName(e) {
        this.setState({
            UserName: e.target.value
        })
    }
    onChangeRollNo(e) {
        this.setState({
            RollNo: e.target.value
        })
    }
    onChangecourseId(e) {
        this.setState({
            courseId: e.target.value
        })
    }
    onChangeenrollmentDate(e) {
        this.setState({
            enrollmentDate: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const student = {
            UserName: this.state.UserName,
            courseId: this.state.courseId,
            RollNo: this.state.RollNo,
            enrollmentDate: this.state.enrollmentDate
        }

        console.log(student);

        axios.post('http://localhost:5000/enrollment/enrollCourse', student)
            .then(res => console.log(res.data));
            
        this.setState({
            UserName: '',
            courseId: '',
            RollNo: '',
            enrollmentDate: ''
        })
    }

    render() {
        return (
            <div>
                <h3>Create New student</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>UserName: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.UserName}
                            onChange={this.onChangeUserName}
                        />
                        <br>
                        </br>
                        <label>RollNo: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.RollNo}
                            onChange={this.onChangeRollNo}
                        />
                        <br></br>
                        <label>CourseId: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.courseId}
                            onChange={this.onChangecourseId}
                        />
                        <br>
                        </br>
                        <label>enrollmentDate: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.enrollmentDate}
                            onChange={this.onChangeenrollmentDate}
                        />
                        <br>
                        </br>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
