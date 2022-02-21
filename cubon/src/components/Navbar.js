import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Home</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/users/signup" className="nav-link">SignUp</Link>
          </li>
          <li className="navbar-item">
          <Link to="/users/signup" className="nav-link">SignIn</Link>
          </li>
          <li className="navbar-item">
          <Link to="/users/getAllUsers" className="nav-link">All Users</Link>
          </li>
          <li className="navbar-item">
          <Link to="/courses/getAllCourses" className="nav-link">View Courses</Link>
          </li>
          <li className="navbar-item">
          <Link to="/courses/addCourse" className="nav-link">Add Courses</Link>
          </li>
          <li className="navbar-item">
          <Link to="/courses/searchCourse" className="nav-link">Search Courses</Link>
          </li>
          <li className="navbar-item">
          <Link to="/enrollment/getAllstudents" className="nav-link">View Enrollment</Link>
          </li>
          <li className="navbar-item">
          <Link to="/enrollment/enrollCourse" className="nav-link">Add Enrollment</Link>
          </li>
          <li className="navbar-item">
          <Link to="/enrollment/searchStudent" className="nav-link">Search Student</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}