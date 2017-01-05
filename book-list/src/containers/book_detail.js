import React, { Component } from 'react';
import { connect } from 'react-redux';

class BookDetail extends Component {
  render() {
    // handle no book selected status = activeBook will not be set
    // if no action is triggered
    if(!this.props.activeBook) {
      return <div>Select a book to get started.</div>;
    }
    return (
      <div>
        <div>Book Details of {this.props.activeBook.title}</div>
        <div>pages: {this.props.activeBook.pages}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeBook: state.activeBook
  }
}

export default connect(mapStateToProps)(BookDetail);
