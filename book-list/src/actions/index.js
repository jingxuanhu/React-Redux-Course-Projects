// import {} from 'react-redux';

// action creator, needs to return an action: a object with a 'type' property
export function selectBook(book) {
  return {
    type: 'BOOK_SELECTED',
    payload: book
  }
}
