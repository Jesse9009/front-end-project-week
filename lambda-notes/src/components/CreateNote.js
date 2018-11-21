import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { getNotes, createNote } from '../actions/actions';

class CreateNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      title: '',
      body: '',
      noteAdded: false,
      addedTag: ''
    };
  }

  componentDidMount() {
    this.props.getNotes();
  }

  handleInput = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const note = {
      tags: this.state.tags,
      title: this.state.title,
      textBody: this.state.body
    };
    console.log(note);
    this.setState({
      title: '',
      body: '',
      addedTag: '',
      tags: [],
      noteAdded: true
    });
    this.props.createNote(note);
  };

  // addTag = e => {
  //   e.preventDefault();
  //   console.log('tag added');
  //   this.setState({
  //     tags: [...this.state.tags, this.state.addedTag],
  //     addedTag: ''
  //   });
  // };

  render() {
    // console.log('ON CREATE NOTE PAGE');
    if (this.state.noteAdded) {
      this.props.getNotes();
      return <Redirect to="/" />;
    }
    return (
      <div className="pageWrapper">
        <h1>Create New Note:</h1>
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
          {/* <form>
            <input
              placeholder="Add tag"
              className="inputTitle"
              value={this.state.addedTag}
              name="addedTag"
              onChange={this.handleInput}
            />
            <button onClick={this.addTag}>Add Tag</button>
          </form> */}
          <button>Save</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notes: state.notes
  };
};

export default connect(
  mapStateToProps,
  { getNotes, createNote }
)(CreateNote);
