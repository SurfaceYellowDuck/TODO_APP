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

    logout(){
        this.set_token('')
        this.setState({'notes': []})
        this.setState({'projects': []})
        this.setState({'users': []})
    }

    is_authenticated(){
        return !!this.state.token
    }

    set_token(token){
        console.log(token)
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())
    }

    get_token_storage(){
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.load_data())
    }

    get_token(username, password){
        // console.log(username, password)
        const data = {username: username, password: password}
        axios.post('http://localhost:8000/users/api/token/', data).then(response => {

            this.set_token(response.data['access'])
            this.setState({'username': username})
        }).catch(error => alert('Incorrect login or password'))
    }

    get_headers(){
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()){
            headers['Authorization']= 'Bearer '+ this.state.token
        }
        return headers
    }

    load_data(){
        const headers = this.get_headers()
        axios.get('http://127.0.0.1:8000/users/api/users_custom/', {headers}).then(
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
                            {this.is_authenticated()  ? <button onClick={() => this.logout()}>Logout</button> :
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
