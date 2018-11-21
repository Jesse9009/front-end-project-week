import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { getNotes } from '../actions/actions';

class NoteList extends Component {
  constructor(props) {
    super(props);
    this.state = { notes: [], sorted: false };
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

  compare = (a, b) => {
    // console.log(a._id);
    // console.log(b._id - a._id);
    if (a._id > b._id) {
      // console.log('a is after');
      return -1;
    } else {
      // console.log('b is after');
      return 1;
    }
  };

  sortNewToOld = notes => {
    // console.log(notes);
    // return notes.sort(this.compare);
    this.setState({ notes: notes.sort(this.compare), sorted: true });
    // console.log(notes);
  };

  sortOldToNew = notes => {
    // console.log(notes);
    // return notes.sort(this.compare);
    this.setState({ notes: notes.sort(this.compare).reverse(), sorted: true });
    // console.log(notes);
  };

  render() {
    // console.log('props ', this.props.notes);
    // console.log('NoteList ', this.props.notes);
    // if (this.props.fetching) {
    //   return (
    //     <div className="pageWrapper">
    //       <h1>Loading Notes...</h1>
    //     </div>
    //   );
    // }
    if (this.state.sorted) {
      return (
        <div className="pageWrapper">
          <h1>Your Notes:</h1>
          <button onClick={() => this.sortNewToOld(this.props.notes)}>
            Show Newest Notes First
          </button>
          <button onClick={() => this.sortOldToNew(this.props.notes)}>
            Show Oldest Notes First
          </button>
          <div className="noteList">
            {this.state.notes.map(note => {
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
    return (
      <div className="pageWrapper">
        <h1>Your Notes:</h1>
        <button onClick={() => this.sortNewToOld(this.props.notes)}>
          Show Newest Notes First
        </button>
        <button onClick={() => this.sortOldToNew(this.props.notes)}>
          Show Oldest Notes First
        </button>
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
  return { notes: state.notes, fetching: state.fetching };
};

export default connect(
  mapStateToProps,
  { getNotes }
)(NoteList);
