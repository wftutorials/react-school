
import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import MenuBars from "./MenuBars";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import {NotificationContainer, NotificationManager} from "react-notifications";

class Enrollments extends Component {

  constructor(props) {
    super(props);
    this.currentCourse = null;
    this.state = {students:[], courses : [], enrollments: [] };
    this.getStudents();
    this.getCourses();
    this.getEnrollments();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.saveEnrollment = this.saveEnrollment.bind(this);
    this.removeEnrollment = this.removeEnrollment.bind(this);
  }

  getStudents(){
    fetch('http://dev.samples.com/getStudents.php')
      .then(rsp=>rsp.json())
      .then(response =>{
        this.setState({students:response.data});
      })
  }

  getCourses(){
    fetch('http://dev.samples.com/getCourses.php')
      .then(rsp=>rsp.json())
      .then(response =>{
        this.setState({courses:response.data});
      })
  }

  getEnrollments(){
    fetch('http://dev.samples.com/getEnrollments.php')
      .then(rsp=>rsp.json())
      .then(response =>{
        this.setState({enrollments:response.data});
      })
  }

  handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    if (!event.target.checkValidity()) {
      return;
    }
    this.saveEnrollment(formData);
    event.target.reset();
  }


  saveEnrollment(data){
    fetch("http://dev.samples.com/addEnrollment.php",
      {
        body: data,
        method: "post"
      }).then(()=>{
      NotificationManager.success('Enrollment added');
      this.getEnrollments();
    });
  }

  removeEnrollment(row){
    let formData = new FormData();
    formData.append("id", row.id);
    fetch("http://dev.samples.com/removeEnrollment.php",
      {
        body: formData,
        method: "post"
      }).then(()=>{
      NotificationManager.success('Removed enrollment');
      this.getEnrollments();
    });
  }


    render() {
        return (
            <div className="d-flex" id="wrapper">
                <SideBar />
                    <div id="page-content-wrapper">
                        <NavBar/>

                        <div className="container-fluid">
                            <h1>Enrollments</h1>
                          <form onSubmit={this.handleSubmit}>
                            <p>Enroll student</p>
                            <div className="form-row align-items-center">

                              <div className="col">
                              <select className="form-control" name='student'>
                                <option selected value> -- select an option -- </option>
                                {this.state.students.map( ( row )=>
                                  <option value={row.id}>{row.firstname + ' ' +  row.lastname}</option>
                                )}
                              </select>
                              </div>

                              <div className="col">
                              <select className="form-control" name='course'>
                                <option selected value> -- select an option -- </option>
                                {this.state.courses.map( ( row )=>
                                  <option value={row.id}>{row.name}</option>
                                )}
                              </select>
                              </div>
                              <div className="ml-3">
                                <button type="submit" className="btn btn-primary">Enroll student to course</button>
                              </div>
                            </div>
                          </form>

                          <br/><br/>
                          <h3>Enrollments Listing</h3>
                          <table className="table">
                            <thead>
                            <tr>
                              <th scope="col">Name</th>
                              <th scope="col">Course</th>
                              <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.enrollments.map( ( row )=>
                              <tr>
                                <td>{row.firstname + ' ' + row.lastname}</td>
                                <td>{row.course}</td>
                                <td> <a onClick={()=>{this.removeEnrollment(row)}}><i className="fa fa-trash"></i></a></td>
                              </tr>
                            )}
                            </tbody>
                          </table>

                        </div>
                      <NotificationContainer/>
                    </div>
            </div>
        );
    }
}

export default Enrollments;
