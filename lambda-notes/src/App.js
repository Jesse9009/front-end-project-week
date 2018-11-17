import React, { Component } from 'react';
import axios from 'axios';
// import bootstrap from 'bootstrap';
import './reset.css';
import './App.css';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getNotes } from './actions/actions';

import NoteList from './components/NotesList';
import CreateNote from './components/CreateNote';
import ViewNote from './components/ViewNote';
import EditNote from './components/EditNote';

class App extends Component {
  constructor() {
    super();
    this.state = {
      notes: []
    };
  }

  componentDidMount() {
    this.props.getNotes();
    // setInterval(() => this.getNotes(), 500);
  }

  render() {
    console.log('On app.js ', this.props.notes);
    return (
      <div className="App">
        <aside>
          <h1>Lambda Notes</h1>
          <Link to="/" onClick={this.props.getNotes}>
            <div className="asideBtn">View Your Notes</div>
          </Link>
          <Link to="/create" onClick={this.props.getNotes}>
            <div className="asideBtn">+ Create New Note</div>
          </Link>
        </aside>
        <Route path="/" exact component={NoteList} />
        <Route path="/create" component={CreateNote} />
        <Route path="/view/:id" component={ViewNote} />
        <Route path="/edit/:id" component={EditNote} />
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
  { getNotes }
)(App);
