import firebase from '../firebase'

function persistItems(items){
  const ref = firebase.database().ref('/'+ localStorage.getItem('uid_compare'));
  const  itemsToPersist = {};
  itemsToPersist[localStorage.getItem('uid_compare')] = items;
  ref.set({items: items});
}

export default function(state={},action){
  switch(action.type){
    case 'ADD_ITEM_FULFILLED':
      const newListWithAddedItem = Object.assign({}, state, {
        items: [ action.payload, ...state.items],
        loading: !state.loading
      });
      persistItems([ action.payload, ...state.items])
      return newListWithAddedItem;
    break;
    case 'GET_ITEMS_FULFILLED':
      const groceryList = Object.assign({}, state, {
        items: [...action.payload]
      });
      return groceryList;
    break;
    case 'REMOVE_ITEM':
      const newListWithRemovedItem = state.items.filter(item => {
        return (item.key !== action.payload)
      });
      persistItems(newListWithRemovedItem)
      return Object.assign({},state,{
        items: newListWithRemovedItem
      });
    break;
    case 'TOGGLE_LOADER':
      return Object.assign({},state,{
        loading: !state.loading
      })
    break;
    default:
      return {
        items: state.items || [],
        loading: state.loading || false
      };
    break;
  }
}
