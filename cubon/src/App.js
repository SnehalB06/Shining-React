import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Navbar from "./components/Navbar"
import CourseList from './components/CourseList'
import EnrollmentList from './components/EnrollmentList'
import UserList from './components/UserList'
import AddCourse from './components/AddCourse'
import SearchCourse from './components/SearchCourse'
import EnrollCourse from './components/EnrollCourse';


function App() {
  return (
    <div className="App">
      <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Routes>
      <Route path="/courses/getAllCourses" element={<CourseList/>} exact/>
      <Route path="/enrollment/getAllstudents" element={<EnrollmentList/>} exact/>
      <Route path="/users/getAllUsers" element={<UserList/>} exact/>
      <Route path="/courses/addCourse" element={<AddCourse/>} exact/>
      <Route path="/courses/searchCourse" element={<SearchCourse/>} exact/>
      <Route path="/enrollment/enrollCourse" element={<EnrollCourse/>} exact/>
      
      
      </Routes>
      </div>
      
    </Router>
    </div>
  );
}

export default App;
