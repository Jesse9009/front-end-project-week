import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { getNotes } from '../actions/actions';

class NoteList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getNotes();
  }

  truncateString = (str, num) => {
    if (str.length > num && num > 3) {
      return str.slice(0, num - 3) + '...';
    } else if (str.length > num && num <= 3) {
      return str.slice(0, num) + '...';
    } else {
      return str;
    }
  };

  render() {
    // console.log('props ', this.props.notes);
    // console.log('NoteList ', this.props.notes);
    return (
      <div className="pageWrapper">
        <h1>Your Notes:</h1>
        <div className="noteList">
          {this.props.notes.map(note => {
            // console.log(note);
            const body = this.truncateString(note.textBody, 210);
            // console.log(body);
            return (
              <Link
                to={`/view/${note._id}`}
                key={note._id}
                className="note"
                onClick={this.props.getNotes}
              >
                <p className="noteTitle">{note.title}</p>
                <hr />
                <p className="noteBody">{body}</p>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { notes: state.notes };
};

export default connect(
  mapStateToProps,
  { getNotes }
)(NoteList);
