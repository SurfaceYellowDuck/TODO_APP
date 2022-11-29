import React from "react";
import {Link} from 'react-router-dom'

const NotesItem = ({note, delete_note}) => {
    if (note.is_active)
        return(
            <tr>
                <td>{note.text}</td>
                <td>{note.creator}</td>
                <td>{note.project}</td>
                <td>{note.datetime_created}</td>
                <td>{note.datetime_updated}</td>
                <td>{note.is_active}</td>
                <td>
                    <button onClick={()=>delete_note(note.id)}
                            type='button'>Delete</button>
                </td>
            </tr>
        )
}

const NotesList = ({notes, delete_note}) => {
    return(
        <table>
            <th>Text</th>
            <th>Creator</th>
            <th>Project</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Is active</th>
            {notes.map((note) => <NotesItem note={note} delete_note={delete_note}/>)}
            <Link to='/notes/create'>Create</Link>
        </table>
    )
}

export default NotesList