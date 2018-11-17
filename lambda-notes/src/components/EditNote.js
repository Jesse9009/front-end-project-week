import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getNotes, editNote } from '../actions/actions';

class EditNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: [],
      title: '',
      body: '',
      noteEdited: false
    };
  }

  componentDidMount() {
    console.log(this.props.notes);
    this.props.notes.map(note => {
      if (this.props.match.params.id === note._id) {
        console.log(note);
        this.setState({ title: note.title, body: note.textBody });
      }
    });
  }

  handleInput = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const id = this.props.match.params.id;
    const note = {
      title: this.state.title,
      textBody: this.state.body
    };
    console.log(note);
    this.setState({ noteEdited: true });
    this.props.editNote(id, note);
  };

  render() {
    if (this.state.noteEdited) {
      this.props.getNotes();
      return <Redirect to="/" />;
    }
    return (
      <div className="pageWrapper">
        <h1>Edit Note:</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            required
            className="inputTitle"
            placeholder="Note Title"
            name="title"
            value={this.state.title}
            onChange={this.handleInput}
          />
          <textarea
            required
            className="inputContent"
            placeholder="Note Content"
            name="body"
            value={this.state.body}
            onChange={this.handleInput}
          />
          <button>Update</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { notes: state.notes };
};

export default connect(
  mapStateToProps,
  { getNotes, editNote }
)(EditNote);
