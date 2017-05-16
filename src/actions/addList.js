
export default function (listName){
  return {
    type: 'CREATE_LIST',
    payload: {
      name: listName,
      items: []
    }
  }
}
