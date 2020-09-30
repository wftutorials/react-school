
import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import MenuBars from "./MenuBars";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import {NotificationContainer, NotificationManager} from 'react-notifications';

class Courses extends Component {

    constructor(props) {
        super(props);
        this.currentCourse = null;
        this.state = {courses:[], displayCourses:true, courseModel : {} };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
        this.getCourses();
    }

    getCourses(){
        fetch('http://dev.samples.com/getCourses.php')
            .then(rsp=>rsp.json())
            .then(response =>{
                this.setState({courses:response.data});
            })
    }

    showCourses(){
        this.setState({displayCourses:true});
    }

    editCourse(model){
        this.currentCourse = model.id;
        this.setState({displayCourses:false, courseModel:model});
    }

    deleteCourse(){

    }

    saveCourse(data){
        fetch("http://dev.samples.com/insertCourses.php",
            {
                body: data,
                method: "post"
            }).then(()=>{
            if(data.get('id')){
                NotificationManager.success('Course updated');
            }else{
                NotificationManager.success('Course Created');
            }
            this.getCourses();
            this.setState({displayCourses:true})
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        let formData = new FormData(event.target);
        if (!event.target.checkValidity()) {
            return;
        }
        this.saveCourse(formData);
        event.target.reset();
    }

    deleteCourse(model){
        if(window.confirm("Are you sure you want to delete this course?")){
            this.deleteCourseRequest(model);
        }
    }

    deleteCourseRequest(model){
        let formData = new FormData();
        formData.append("id", model.id);
        fetch("http://dev.samples.com/removeCourse.php",
            {
                body: formData,
                method: "post"
            }).then(()=>{
            NotificationManager.success('Deleted ' + model.name);
            this.getCourses();
        });
    }

    pageTitle(){
        if(this.state.courseModel.id){
            return "Edit Course [" + this.state.courseModel.name +  "]";
        }else{
            return "Create Course";
        }
    }

    handleChange(e){
        if(e.target.name == 'name'){
            this.setState({courseModel : { name: e.target.value}})
        }

        if(e.target.name == 'description'){
            this.setState({courseModel : { description: e.target.value}})
        }

    }


    render() {
        return (
            <div className="d-flex" id="wrapper">
                <SideBar />
                    <div id="page-content-wrapper">
                        <NavBar/>

                        <div className="container-fluid">
                            {this.state.displayCourses ?
                                <div>
                                    <h1>All Courses

                                        <button onClick={()=>{this.editCourse({})}} type="button" className="btn btn-primary float-right">Add new</button>
                                    </h1>

                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th scope="col">ID #</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Description</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.courses.map( ( row )=>
                                        <tr>
                                            <td>00{row.id}</td>
                                            <td>{row.name}</td>
                                            <td>{row.description}</td>
                                            <td>
                                                <a onClick={()=>{this.editCourse(row)}}><i className="fa fa-edit"></i></a>&nbsp;&nbsp;
                                                <a onClick={()=>{this.deleteCourse(row)}}><i className="fa fa-trash"></i></a>
                                            </td>
                                        </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                                :
                                <div>
                                    <h1><a onClick={()=>{this.showCourses()}}><i className="fa fa-arrow-left"></i></a>&nbsp;
                                        {this.pageTitle()}
                                    </h1>
                                    <form onSubmit={this.handleSubmit}>
                                        <input name="id" type="hidden" className="form-control" value={this.currentCourse}/>
                                        <div className="form-group">
                                            <label>Course Name</label>
                                            <input onChange={this.handleChange}
                                                   name="name" type="text"
                                                   className="form-control" id=""
                                                   value={this.state.courseModel.name}
                                                   autocomplete="false"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Course Description</label>
                                            <textarea onChange={this.handleChange}
                                                   placeholder="Description"
                                                   name="description"
                                                   type="text"
                                                   className="form-control" id=""
                                                   value={this.state.courseModel.description}
                                                   required="required"
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                </div>
                            }
                        </div>
                        <NotificationContainer/>
                    </div>
            </div>
        );
    }
}

export default Courses;