import React from 'react'


class NotesCreateForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {project: [], text: '', users: []}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleUserChange(event) {
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

    handleProjectChange(event) {
        if(!event.target.selectedOptions){
            this.setState({'project': []})
            return;
        }
        let project = 0
        // for(let i = 0; i < event.target.selectedOptions.length; i ++){
        project = event.target.selectedOptions.item(0).value
        // }
        this.setState({"project": project})
        console.log(project)
    }

    handleSubmit(event) {
        this.props.create_note(this.state.project, this.state.text, this.state.users)
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
                    <input type="text" name="text" placeholder='TODO text'
                    onChange={(event) => this.handleChange(event)}/>
                </div>

                <select multiple name="users" onChange={(event) => this.handleUserChange(event)}>
                    {this.props.users.map((item) =>
                        <option value={item.id}>{item.username}</option>)}
                </select>

                <select name="project" onChange={(event) => this.handleProjectChange(event)}>
                    {this.props.project.map((item) =>
                        <option value={item.id}>{item.project_name}</option>)}
                </select>
                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
        );
    }
}

export default NotesCreateForm