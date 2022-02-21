import React, { Component } from 'react';
import axios from 'axios';

const User = props => (
    <tr>
      <td>{props.user.FirstName}</td>
      <td>{props.user.LastName}</td>
      <td>{props.user.UserName}</td>
      <td>{props.user.email}</td>
      <td>{props.user.Phone}</td>
    </tr>
  );
 
export default class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users:[]

        };
      }
    
    componentDidMount() {
        axios.get('http://localhost:5000/users/getAllUsers')
          .then(response => {
            this.setState({ users: response.data })
            console.log(response.data,typeof(response.data));
           console.log(this.state,typeof(this.setState));
          })
          .catch((error) => {
            console.log(error);
          })
      }

      UserList() {

          console.log('courselistFun',this.state);
          
          return this.state.users.map(currentuser => {
            return <User user={currentuser} key={currentuser._id}/>;
         })
      }
      render() {
        return (
          <div>
            <h3>All user</h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                    <td>FirstName</td>
                    <td>LastName</td>
                    <td>UserName</td>
                    <td>email</td>
                    <td>Phone</td>
                </tr>
              </thead>
              <tbody>
                { this.UserList() }
              </tbody>
            </table>
          </div>
        )
      }
}
