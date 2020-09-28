
import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import MenuBars from "./MenuBars";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import EditStudent from "./EditStudent";
import ListStudents from "./ListStudents";

class Students extends Component {

    constructor(props) {
        super(props);
        this.getStudents();
        this.state = {students:[], showStudents:true, studentModel : {} };
        this.viewStudent = this.viewStudent.bind(this);
        this.viewAllStudents = this.viewAllStudents.bind(this);
        this.saveStudent = this.saveStudent.bind(this);

    }

    viewStudent(model){
        this.setState({ showStudents:false, studentModel: model});
    }

    viewAllStudents(){
        this.setState({ showStudents:true});
    }

    saveStudent(data){
        console.log(data);
        /*
        fetch("http://dev.samples.com/insertStudents.php",
            {
                body: data,
                method: "post"
            }).then(()=>{

        });*/
    }

    getStudents(){
        fetch('http://dev.samples.com/getStudents.php')
            .then(rsp=>rsp.json())
            .then(response =>{
                this.setState({items:response.data});
                this.setState({students:response.data});
                console.log(response.data,"home.js")
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
                                <ListStudents viewStudent={this.viewStudent}/>
                                :
                                <EditStudent
                                    viewAllStudents={this.viewAllStudents}
                                    studentModel={this.state.studentModel}
                                    saveStudent={this.saveStudent}
                                />
                            }
                        </div>

                    </div>
            </div>
        );
    }
}

export default Students;