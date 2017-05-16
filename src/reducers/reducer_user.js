
export default function(state={},action){
  switch(action.type){
    case 'ADD_ITEM':
      return {
        ...state,
        items: [ action.payload, ...state.items],
        loading: !state.loading
      };
    break;
    case 'REMOVE_ITEM':
      const newListWithRemovedItem = state.items.filter( item => {
        return (item.key !== action.payload)
      })
      return { ...state, items: newListWithRemovedItem }
    break;
    case 'SET_ITEMS':
      return { ...state, items: action.payload }
    break;
    case 'TOGGLE_LOADER':
      return { ...state, loading: !state.loading }
    break;
    case 'CREATE_LIST':
      console.log('action.payload: ', action.payload, state.lists,[ action.payload, ...state.lists])
      return {
        ...state,
        lists: [ action.payload, ...state.lists]
      }
    break;
    case 'SET_LISTS':
      return {
        ...state,
        lists: action.payload
      }
    break;
    default:
      return {
        lists: state.lists || [],
        loading: state.loading || false
      };
    break;
  }
}
