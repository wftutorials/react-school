import React, {Component} from 'react';

class EditStudent extends Component {

    constructor(props) {
        super(props);
        this.studentModel = this.props.studentModel;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.pageTitle = this.pageTitle.bind(this);
        this.state = {studentModel: this.studentModel};
    }

    handleSubmit(event) {
        event.preventDefault();
        let formData = new FormData(event.target);
        if (!event.target.checkValidity()) {
            return;
        }
        this.props.saveStudent(formData,'create');
        event.target.reset();
    }

    pageTitle(){
        var model = this.studentModel;
        if(model.id){
            return "Edit Student [" + model.firstname + " " + model.lastname + "]";
        }else{
            return "Create Student";
        }
    }

    handleChange(e){
        if(e.target.name == 'firstname'){
           this.setState({studentModel : { firstname: e.target.value}})
        }

        if(e.target.name == 'lastname'){
            this.setState({studentModel : { lastname: e.target.value}})
        }

        if(e.target.name == 'studentId'){
            this.setState({studentModel : { studentId: e.target.value}})
        }

        if(e.target.name == 'classroom'){
            this.setState({studentModel : { classroom: e.target.value}})
        }
        console.log(this.state.studentModel);

    }


    render() {
        return (
            <div>
                <h1><a onClick={()=>{this.props.viewAllStudents()}}><i className="fa fa-arrow-left"></i></a>
                    &nbsp;&nbsp;{this.pageTitle()}</h1>

                <form onSubmit={this.handleSubmit}>
                    <input name="id" type="hidden" className="form-control" value={this.studentModel.id}/>
                    <div className="form-group">
                        <label>Student Id</label>
                        <input onChange={this.handleChange}
                               name="studentId" type="text"
                               className="form-control" id=""
                               value={this.state.studentModel.studentId}
                        />
                    </div>
                    <div className="form-group">
                        <label>Firstname</label>
                        <input onChange={this.handleChange}
                               placeholder="First name"
                               name="firstname"
                               type="text"
                               className="form-control" id=""
                               value={this.state.studentModel.firstname}
                               required="required"
                        />
                    </div>
                    <div className="form-group">
                        <label>Lastname</label>
                        <input onChange={this.handleChange}
                               name="lastname" type="text" placeholder="Lastname"
                               className="form-control" id=""
                               value={this.state.studentModel.lastname}
                               required="required"
                        />
                    </div>
                    <div className="form-group">
                        <label>Classroom</label>
                        <input onChange={this.handleChange}
                               name="classroom"
                               type="text"
                               className="form-control" id=""
                               value={this.state.studentModel.classroom}/>
                    </div>
                    <br/>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default EditStudent;