import React from "react";


const NotesItem = ({note}) => {
    return(
        <tr>
            <td>{note.text}</td>
            <td>{note.creator}</td>
            <td>{note.project}</td>
            <td>{note.datetime_created}</td>
            <td>{note.datetime_updated}</td>
            <td>{note.is_active}</td>
        </tr>
    )
}

const NotesList = ({notes}) => {
    return(
        <table>
            <th>Text</th>
            <th>Creator</th>
            <th>Project</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Is active</th>
            {notes.map((note) => <NotesItem note={note}/>)}
        </table>
    )
}

export default NotesList