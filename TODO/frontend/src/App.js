import React from "react";
import './styles/navbar.css';
import './styles/footer.css'
import './styles/page.css'
import UsersList from './components/users.js'
import axios from "axios";

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      'users': []
    }
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/users/api/users/').then(
        response => {
          const users = response.data

          this.setState(
        {'users': users}
          )
        }
    ).catch(error => console.log(error))
  }

  render() {
      return(
        <div className='page'>
            <div className="navbar">
                <ul id="myUl" className="topnav2">
                    <li><a href="#" >Menu</a></li>
                    <li className="w3-hide-small"><a href="#">About</a></li>
                </ul>
            </div>

            <div className="users">
                <UsersList users={this.state.users}/>
            </div>

            <div className="footer">
                <p class="footer_text"> Footer Created by Yellow Duck </p>
            </div>
        </div>
    )
  }
}

export default App;
