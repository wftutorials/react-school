
import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';
import MenuBars from "./MenuBars";
import SideBar from "./SideBar";
import NavBar from "./NavBar";

class Home extends Component {

    render() {
        return (
            <div className="d-flex" id="wrapper">
                <SideBar />
                    <div id="page-content-wrapper">
                        <NavBar/>

                        <div className="container-fluid">
                            <h1>Hello World</h1>

                        </div>

                    </div>
            </div>
        );
    }
}

export default Home;