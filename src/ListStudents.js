import React, {Component} from 'react';


class ListStudents extends Component {

    constructor(props) {
        super(props);
        this.getStudents();
        this.state = {students:[], editStudent:false};

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
            <div>
                <h1>Students</h1>


                <table className="table">
                    <thead>
                    <tr>
                        <th>ID #</th>
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
                                <a><i className="fa fa-trash"></i></a>
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