import React from 'react'


class ProjectCreateForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {project_name: '', project_repo: '', users: []}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleUserChange(event){
        if(!event.target.selectedOptions){
            this.setState({'users': []})
            return;
        }
        let users = []
        for(let i = 0; i < event.target.selectedOptions.length; i ++){
            users.push(event.target.selectedOptions.item(i).value)
        }
        this.setState({"users": users})
        console.log(users)
    }

    handleSubmit(event) {
        this.props.create_project(this.state.project_name, this.state.users, this.state.project_repo)
        console.log(this.state.project)
        console.log(this.state.name)
        console.log(this.state.author)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="text"></label>
                    <input type="text" name="project_name" placeholder='Name of your project'
                    onChange={(event) => this.handleChange(event)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="text"></label>
                    <input type="text" name="project_repo" placeholder='Repo of your project'
                    onChange={(event) => this.handleChange(event)}/>
                </div>

                <select multiple name="users" onChange={(event) => this.handleUserChange(event)}>
                    {this.props.users.map((item) =>
                        <option value={item.id}>{item.username}</option>)}
                </select>

                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
        );
    }
}

export default ProjectCreateForm