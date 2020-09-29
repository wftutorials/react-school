import React, {Component} from 'react';


class ListStudents extends Component {

    constructor(props) {
        super(props);
        this.state = {students:this.props.students, editStudent:false};

    }

    componentWillReceiveProps(nextProps) {
        if(this.props != nextProps) {
            this.setState({
                students: nextProps.students
            });
        }
    }


    getStudents(){
        fetch('http://dev.samples.com/getStudents.php')
            .then(rsp=>rsp.json())
            .then(response =>{
                this.setState({items:response.data});
                this.setState({students:response.data});
            })
    }

    render() {
        return (
            <div>
                <h1>All Students

                    <button onClick={()=>{this.props.createStudent()}} type="button" className="btn btn-primary float-right">Add new student</button>
                </h1>

                <table className="table">
                    <thead>
                    <tr>
                        <th>Student Id #</th>
                        <th scope="col">Firstname</th>
                        <th scope="col">Lastname</th>
                        <th scope="col">Classroom</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.students.map( ( row )=>
                        <tr>
                            <td>{row.studentId}</td>
                            <td>{row.firstname}</td>
                            <td>{row.lastname}</td>
                            <td>{row.classroom}</td>
                            <td>
                                <a onClick={()=>{this.props.viewStudent(row)}}><i className="fa fa-edit"></i></a>&nbsp;&nbsp;
                                <a onClick={()=>{this.props.deleteStudent(row)}}><i className="fa fa-trash"></i></a>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ListStudents;