import React, {Component} from 'react';


function SideBar(){
    return (
        <div className="bg-light border-right" id="sidebar-wrapper">
            <div className="sidebar-heading">Start Bootstrap</div>
            <div className="list-group list-group-flush">
                <a href="/dashboard" className="list-group-item list-group-item-action bg-light">Dashboard</a>
                <a href="/students" className="list-group-item list-group-item-action bg-light">Students</a>
                <a href="/courses" className="list-group-item list-group-item-action bg-light">Courses</a>
                <a href="/enrollments" className="list-group-item list-group-item-action bg-light">Enrollments</a>
            </div>
        </div>
    );
}

export default SideBar;