import React from "react";
import './styles/navbar.css';
import './styles/footer.css'
import './styles/page.css'
import UsersList from './components/users.js'
import NotesList from "./components/notes";
import ProjectsList from "./components/projects";
import NotFound404 from "./components/NotFound404";
import axios from "axios";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'notes': [],
            'projects': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/users/api/users_custom/').then(
            response => {
                const users = response.data.results;

                this.setState(
                    {'users': users}
                )
            }
        ).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/notes/api/project_notes/').then(
            response => {
                const notes = response.data.results;

                this.setState(
                    {'notes': notes}
                )
            }
        ).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/notes/api/projects/').then(
            response => {
                const projects = response.data.results;

                this.setState(
                    {'projects': projects}
                )
            }
        ).catch(error => console.log(error))

    }

    render() {
        return (
            <div className='page'>
                <div className="navbar">
                    <ul id="myUl" className="topnav2">
                        <li><a href="#">Menu</a></li>
                        <li className="w3-hide-small"><a href="#">About</a></li>
                    </ul>
                </div>

                <BrowserRouter>
                    <nav>
                        <li>
                            <Link to={'/'}>Users</Link>
                        </li>
                        <li>
                            <Link to={'/projects'}>Projects</Link>
                        </li>
                        <li>
                            <Link to={'/notes'}>Notes</Link>
                        </li>
                    </nav>
                    <Routes>

                        <Route exact path={'/'} element=
                            {
                                <div className="users">
                                    <UsersList users={this.state.users}/>
                                </div>
                            }/>

                        <Route exact path={'/projects'} element=
                            {
                                <div className="projects">
                                    <ProjectsList projects={this.state.projects}/>
                                </div>

                            }/>

                        <Route exact path={'/notes'} element=
                            {
                                <div className="notes">
                                    <NotesList notes={this.state.notes}/>
                                </div>
                            }/>
                        <Route/>
                        <Route path="*" element={<NotFound404/>}/>
                    </Routes>
                </BrowserRouter>

                {/*<div className="users">*/}
                {/*    <UsersList users={this.state.users}/>*/}
                {/*</div>*/}

                {/*<div className="users">*/}
                {/*    <NotesList users={this.state.notes}/>*/}
                {/*</div>*/}

                {/*<div className="projects">*/}
                {/*    <UsersList projects={this.state.projects}/>*/}
                {/*</div>*/}

                <div className="footer">
                    <p class="footer_text"> Footer Created by Yellow Duck </p>
                </div>
            </div>
        )
    }
}

export default App;
