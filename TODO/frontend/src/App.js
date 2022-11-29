import React from "react";
import './styles/navbar.css';
import './styles/footer.css'
import './styles/page.css'
import UsersList from './components/users.js'
import NotesList from "./components/notes";
import ProjectsList from "./components/projects";
import LoginForm from "./components/Auth";
import NotFound404 from "./components/NotFound404";
import axios from "axios";
import Cookies from "universal-cookie/";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import NotesCreateForm from "./components/NoteCreateForm";
import ProjectCreateForm from "./components/ProjectCreateForm"

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'notes': [],
            'projects': [],
            'token': []
        }
    }

    create_project(project_name, users, project_repo) {
        const headers = this.get_headers()
        const data = {project_name: project_name, project_repo: project_repo, users: users}
        axios.post(`http://127.0.0.1:8000/notes/api/projects/`, data, {headers}).then(
            response => {
                this.load_data()
            }
        ).catch(error => {
            console.log(error)
        })
    }

    delete_project(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/notes/api/projects/${id}/`, {headers}).then(response => {
            this.load_data()
        }).catch(error => {
            console.log(error)
        })
    }

    create_note(project, text, users) {
        const headers = this.get_headers()
        const data = {project: project, text: text, creator: users}
        axios.post(`http://127.0.0.1:8000/notes/api/project_notes/`, data, {headers}).then(
            response => {
                this.load_data()
            }
        ).catch(error => {
            console.log(error)
            this.setState({notes: []})
        })
    }

    delete_note(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/notes/api/project_notes/${id}/`, {headers}).then(response => {
            this.load_data()
        }).catch(error => {
            console.log(error)
            this.setState({notes: []})
        })
    }

    logout() {
        this.set_token('')
        this.setState({'notes': []})
        this.setState({'projects': []})
        this.setState({'users': []})
    }

    is_authenticated() {
        return !!this.state.token
    }

    set_token(token) {

        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())
    }

    get_token_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.load_data())
    }

    get_token(username, password) {
        const data = {username: username, password: password}
        axios.post('http://localhost:8000/users/api/token/', data).then(response => {

            this.set_token(response.data['access'])
            this.setState({'username': username})
        }).catch(error => alert('Incorrect login or password'))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()) {
            headers['Authorization'] = 'Bearer ' + this.state.token
        }
        return headers
    }

    load_data() {
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/users/api/users/', {headers}).then(
            response => {
                const users = response.data.results;

                this.setState(
                    {'users': users}
                )
            }
        ).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/notes/api/project_notes/', {headers}).then(
            response => {
                const notes = response.data.results;

                this.setState(
                    {'notes': notes}
                )
            }
        ).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/notes/api/projects/', {headers}).then(
            response => {
                const projects = response.data.results;

                this.setState(
                    {'projects': projects}
                )
            }
        ).catch(error => console.log(error))

    }


    componentDidMount() {
        this.get_token_storage()
        this.load_data()
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
                {this.is_authenticated() ? <p>{this.state.username}</p> : <p></p>}
                <BrowserRouter>
                    <nav>
                        <li>
                            {this.is_authenticated() ? <button onClick={() => this.logout()}>Logout</button> :
                                <Link to='/login'>Login</Link>}
                        </li>
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

                        <Route exact path={'/login'} element=
                            {
                                <div className="login">
                                    <LoginForm get_token={(username, password) =>
                                        this.get_token(username, password)}/>
                                </div>
                            }/>

                        <Route exact path={'/projects/create'} element=
                            {
                                <div className="projects">
                                    <ProjectCreateForm users={this.state.users}
                                                       create_project={(project_name, users, project_repo) => this.create_project(project_name, users, project_repo)}/>
                                </div>

                            }/>

                        <Route exact path={'/projects'} element=
                            {
                                <div className="projects">
                                    <ProjectsList projects={this.state.projects} delete_project={(id) => this.delete_project(id)}/>
                                </div>

                            }/>

                        <Route exact path={'/notes/create'} element=
                            {
                                <div className="notes">
                                    <NotesCreateForm project={this.state.projects} users={this.state.users}
                                                     create_note={(project, name, users) => this.create_note(project, name, users)}/>
                                </div>

                            }/>

                        <Route exact path={'/notes'} element=
                            {
                                <div className="notes">
                                    <NotesList notes={this.state.notes} delete_note={(id) => this.delete_note(id)}/>
                                </div>
                            }/>

                        <Route/>
                        <Route path="*" element={<NotFound404/>}/>
                    </Routes>
                </BrowserRouter>
                <div className="footer">
                    <p class="footer_text"> Footer Created by Yellow Duck </p>
                </div>
            </div>
        )
    }
}

export default App;
