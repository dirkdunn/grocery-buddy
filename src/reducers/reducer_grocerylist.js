import firebase from '../firebase'

function persistItems(items,ref){
  var itemsToPersist = {};
  itemsToPersist[localStorage.getItem('uid_compare')] = items;
  ref.set({items: items});
}


export default function(state=[],action){
  const ref = firebase.database().ref('/'+ localStorage.getItem('uid_compare'));

  switch(action.type){
    case 'ADD_ITEM_FULFILLED':
      console.log('new state:', [ action.payload, ...state])
      const newList = [ action.payload, ...state];
      persistItems(newList,ref)

      return newList;
    break;
    case 'GET_ITEMS_FULFILLED':
      console.log('reducer payload: ', action.payload)
      return [...action.payload]
    break;
    default:
      return state;
    break;
  }
}
