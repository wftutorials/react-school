
import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import MenuBars from "./MenuBars";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import EditStudent from "./EditStudent";
import ListStudents from "./ListStudents";
import {NotificationContainer, NotificationManager} from 'react-notifications';

class Students extends Component {

    constructor(props) {
        super(props);
        this.getStudents();
        this.state = {students:[], showStudents:true, studentModel : {}, refresh:false };
        this.viewStudent = this.viewStudent.bind(this);
        this.viewAllStudents = this.viewAllStudents.bind(this);
        this.saveStudent = this.saveStudent.bind(this);
        this.createStudent = this.createStudent.bind(this);
        this.deleteStudent = this.deleteStudent.bind(this);
        this.deleteStudentRequest = this.deleteStudentRequest.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        if(this.props != nextProps) {

        }
    }

    viewStudent(model){
        this.setState({ showStudents:false, studentModel: model});
    }

    viewAllStudents(){
        this.setState({ showStudents:true});
    }

    createStudent(){
        this.setState({ showStudents:false, studentModel: {} });
    }

    deleteStudent(model){
       if(window.confirm("Are you sure you want to delete this student?")){
           this.deleteStudentRequest(model);
       }
    }

    deleteStudentRequest(model){
        let formData = new FormData();
        formData.append("id", model.id);
        fetch("http://dev.samples.com/removeStudents.php",
            {
                body: formData,
                method: "post"
            }).then(()=>{
            NotificationManager.success('Deleted ' + model.firstname);
            this.getStudents();
        });
    }

    saveStudent(data, action){
        fetch("http://dev.samples.com/insertStudents.php",
            {
                body: data,
                method: "post"
            }).then(()=>{
            if(data.get('id')){
                NotificationManager.success('Student updated');
            }else{
                NotificationManager.success('Student Created');
            }
            this.getStudents();
            this.setState({showStudents:true})
        });
    }

    getStudents(){
        fetch('http://dev.samples.com/getStudents.php')
            .then(rsp=>rsp.json())
            .then(response =>{
                this.setState({students:response.data});
            })
    }

    render() {
        return (
            <div className="d-flex" id="wrapper">
                <SideBar />
                    <div id="page-content-wrapper">
                        <NavBar/>

                        <div className="container-fluid">
                            {this.state.showStudents ?
                                <ListStudents
                                    students = {this.state.students}
                                    viewStudent={this.viewStudent}
                                    createStudent={this.createStudent}
                                    deleteStudent={this.deleteStudent}/>
                                :
                                <EditStudent
                                    viewAllStudents={this.viewAllStudents}
                                    studentModel={this.state.studentModel}
                                    saveStudent={this.saveStudent}
                                />
                            }
                            <NotificationContainer/>
                        </div>

                    </div>
            </div>
        );
    }
}

export default Students;