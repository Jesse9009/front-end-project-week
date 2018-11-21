import React, { Component } from 'react';
import { Button, Modal, ModalBody } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getNotes, deleteNote } from '../actions/actions';

class ViewNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      backdrop: true,
      toList: false
    };

    // this.toggle = this.toggle.bind(this);
    this.changeBackdrop = this.changeBackdrop.bind(this);
  }

  // componentDidMount() {
  //   this.props.getNotes();
  // }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  changeBackdrop(e) {
    let value = e.target.value;
    if (value !== 'static') {
      value = JSON.parse(value);
    }
    this.setState({ backdrop: value });
  }

  handleDelete = e => {
    e.preventDefault();
    this.props.deleteNote(this.props.match.params.id);
    // this.props.getNotes();
    this.setState({ toList: true });
  };

  render() {
    // console.log('on view notes ', this.props.notes);
    // console.log(this.props.match.params.id);
    if (this.state.toList) {
      this.props.getNotes();
      return <Redirect to="/" />;
    }
    return (
      <div className="pageWrapper">
        <div className="actionButtons">
          <Link
            to={`/edit/${this.props.match.params.id}`}
            onClick={this.props.getNotes}
          >
            edit
          </Link>
          <a onClick={this.toggle}>delete</a>
        </div>
        {this.props.notes.map(note => {
          if (this.props.match.params.id === note._id) {
            // console.log(note.title);
            return (
              <div key={note._id}>
                <p className="viewNoteTitle">{note.title}</p>
                <p className="viewNoteBody">{note.textBody}</p>
              </div>
            );
          }
        })}
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          backdrop={this.state.backdrop}
        >
          {/* <ModalHeader toggle={this.toggle}>Delete Note</ModalHeader> */}
          <ModalBody>
            <p>Are you sure you want to delete this?</p>
            <div>
              <Button color="danger" onClick={this.handleDelete}>
                Delete
              </Button>{' '}
              <Button color="primary" onClick={this.toggle}>
                No
              </Button>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { notes: state.notes };
};

export default connect(
  mapStateToProps,
  { getNotes, deleteNote }
)(ViewNote);
