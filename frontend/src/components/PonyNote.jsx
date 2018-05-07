import React, { Component } from 'react';
import {connect} from 'react-redux';

import {notes} from "../actions";

class PonyNote extends Component {
    componentDidMount() {
        this.props.fetchNotes();
    }

    state = {
        text: "",
        updateNoteId: null,
    }
    

    resetForm = () => {
        this.setState({text: "", updateNoteId: null});
    }
    
    selectForEdit = (id) => {
        let note = this.props.notes[id];
        this.setState({text: note.text, updateNoteId: id});
    }

    submitNote = (e) => {
        e.preventDefault();
        if (this.state.updateNoteId === null) {
            this.props.addNote(this.state.text).then(this.resetForm)
        } else {
            this.props.updateNote(this.state.updateNoteId, this.state.text).then(this.resetForm);
        }
    }

    render() {
        return (
            <div>
                <nav>
                    <div className="nav-wrapper blue lighten-2">
                    <a href="" className="brand-logo">Welcome to PonyNote!</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href="sass.html">Sass</a></li>
                        <li><a href="badges.html">Components</a></li>
                        <li><a href="collapsible.html">JavaScript</a></li>
                    </ul>
                    </div>
                </nav>
                <div className="row">
                    <div className="col s12">
                        <div className="card">   
                        <div className="card-content">
                        <span className="card-title">Add new note</span>             
                        <form onSubmit={this.submitNote}>
                        <div className="row">
                            <div className="input-field col s12">
                                <input
                                    id="enter_note"
                                    value={this.state.text}
                                    type="text"
                                    onChange={(e) => this.setState({text: e.target.value})}
                                    required />
                                <label htmlFor="enter_note">Enter Note</label>
                            </div>
                        </div>
                        <div className="row">
                        <div className="col s12">
                            <a className="btn blue lighten-2" onClick={this.resetForm}>Reset</a>  
                            <input className="btn blue lighten-2" type="submit" value="Save Note" />
                        </div>
                        </div>
                        </form>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                <div className="col s12">
                <div className="card">
                <div className="card-content">
                <div className="card-title">Notes</div>
                <table>
                    <tbody>
                    {this.props.notes.map((note, id) => (
                    <tr key={`note_${note.id}`}>
                        <td>{note.text}</td>
                        <td><a className="btn" onClick={() => this.selectForEdit(id)}>edit</a></td>
                        <td><a className="btn" onClick={() => this.props.deleteNote(id)}>delete</a></td>
                    </tr>
                    ))}
                    </tbody>
                </table>
                </div>
                </div>
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        notes: state.notes,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchNotes: () => {
            dispatch(notes.fetchNotes());
        },
        addNote: (text) => {
            return dispatch(notes.addNote(text));
        },
        updateNote: (id, text) => {
            return dispatch(notes.updateNote(id, text));
        },
        deleteNote: (id) => {
            dispatch(notes.deleteNote(id));
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PonyNote);

