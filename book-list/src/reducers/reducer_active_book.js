// state  argument is not application state
// it is only the state this reducer is resposible for
export default function(state=null, action) {
  switch(action.type) {
    case 'BOOK_SELECTED':
      return action.payload
  }
  return state;
}
