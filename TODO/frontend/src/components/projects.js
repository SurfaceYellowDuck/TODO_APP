import React from "react";

const ProjectsItem = ({project}) => {
    return (
        <tr>
            <td>{project.project_name}</td>
            <td>{project.project_repo}</td>
            <td>{project.users}</td>
        </tr>
    )
}

const ProjectsList = ({projects}) => {
    return (
        <table>
            <th>Project naming</th>
            <th>Project repository</th>
            <th>Project users</th>
            {projects.map((project)=> <ProjectsItem project = {project}/>)}
        </table>
    )
}


export default ProjectsList