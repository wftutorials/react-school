import React, {Component} from 'react';

class EditStudent extends Component {

    constructor(props) {
        super(props);
        this.studentModel = this.props.studentModel;
        this.state = {studentModel: this.studentModel};
    }

    handleSubmit(event) {
        event.preventDefault();
        let formData = new FormData(event.target);
        console.log(formData);
        if (!event.target.checkValidity()) {
            return;
        }
        this.props.saveStudent(formData);
        event.target.reset();
    }

    handleChange(e){
        if(e.target.name == 'firstname'){
           // this.setState({currentContact : { name: e.target.value}})
        }
    }


    render() {
        return (
            <div>
                <h1><a onClick={()=>{this.props.viewAllStudents()}}><i className="fa fa-arrow-left"></i></a>
                    &nbsp;&nbsp;Edit Student [{this.studentModel.firstname + " " + this.studentModel.lastname}]</h1>

                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Student Id</label>
                        <input onChange={this.handleChange}
                               name="studentId" type="text"
                               className="form-control" id=""
                               value={this.state.studentModel.classroom}/>
                    </div>
                    <div className="form-group">
                        <label>Firstname</label>
                        <input name="firstname" type="text" className="form-control" id="" value={this.state.studentModel.firstname}/>
                    </div>
                    <div className="form-group">
                        <label>Lastname</label>
                        <input name="lastname" type="text" className="form-control" id="" value={this.state.studentModel.lastname}/>
                    </div>
                    <div className="form-group">
                        <label>Classroom</label>
                        <input name="classroom" type="text" className="form-control" id="" value={this.state.studentModel.classroom}/>
                    </div>
                    <br/>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default EditStudent;