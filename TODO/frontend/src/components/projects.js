import React from "react";
import {Link} from "react-router-dom";

function handleSearchChange(event){
    let search_name = event.target.value.trim()
    let search_items = document.querySelectorAll("#project_item")

    if(search_name !== ''){
        search_items.forEach(function (elem){
            let project_name = (elem.querySelector("#project_name")).innerText
            if(project_name.search(search_name) == -1){
                elem.style.display = "none"
            }
            else {
                elem.style.display = ""
            }
        })
    }
    else{
        search_items.forEach(function (elem){
            elem.style.display = ""
        })
    }
}

const ProjectsItem = ({project, delete_project}) => {
    return (
        <tr id="project_item">
            <td id="project_name">{project.project_name}</td>
            <td>{project.project_repo}</td>
            <td>{project.users}</td>
            <td>
                <button onClick={() => delete_project(project.id)}
                        type='button' name="project_name">Delete
                </button>
            </td>
        </tr>
    )
}

const ProjectsList = ({projects, delete_project}) => {

    return (
        <div>
            <input type="text" placeholder="search" onChange={(event) => handleSearchChange(event)}/>
            <table>
                <th>Project naming</th>
                <th>Project repository</th>
                <th>Project users</th>
                {projects.map((project) => <ProjectsItem project={project} delete_project={delete_project}/>)}
                <Link to='/projects/create'>Create</Link>
            </table>
        </div>

    )
}


export default ProjectsList