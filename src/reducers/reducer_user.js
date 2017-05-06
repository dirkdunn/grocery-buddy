
export default function(state={},action){
  switch(action.type){
    case 'ADD_ITEM':
      const newListWithAddedItem = Object.assign({}, state, {
        items: [ action.payload, ...state.items],
        loading: !state.loading
      });
      return newListWithAddedItem;
    break;
    case 'REMOVE_ITEM':
      const newListWithRemovedItem = state.items.filter(item => {
        return (item.key !== action.payload)
      });
      return Object.assign({},state,{
        items: newListWithRemovedItem
      });
    break;
    case 'SET_ITEMS':
      return Object.assign({},state,{
        items: action.payload
      })
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
