import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectBook } from '../actions/index';


class BookList extends Component {
  renderList() {
    return this.props.books.map((book) => {
      return (
        <li
          key={book.title}
          className="list-group-item"
          onClick={() => this.props.selectBook(book)}>
          {book.title}
        </li>
      )
    });
  }
  render() {
    return (
      <ul className="list-group col-sm-4">
        {this.renderList()}
      </ul>
    )
  }
}

function mapStateToProps(state) {
  return {
    books: state.books
  }
}

// whatever returned from this function will end up as props on the BookList container
// we can get it by this.props.selectBook (name of the key)
function mapDispatchToProps(dispatch) {
  // selectBook (the value) is an action creator
  // whenever it gets called, it returns an action, and bindActionCreators make sure
  // the action get passed to dispatch(the distribution function) and being sent to
  // all reducers
  return bindActionCreators({ selectBook: selectBook }, dispatch);
}
// Promote BookList from a component to a container - it needs to know
// about this new dispatch method, selectBook,. Make it available as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(BookList);
