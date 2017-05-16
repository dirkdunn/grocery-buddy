import {listRef} from '../firebase'

export default function (listName){

  return dispatch => {
    listRef.once('value', db => {
      let newList = db.val()
      let payload = {
        type: 'CREATE_LIST',
        payload: {
          name: listName.trim().replace(/\s/g,'-'),
          items: []
        }
      };

       if(newList){
         newList.unshift(payload.payload)
         console.log('newlist: ', newList)
         listRef.set(newList)
         dispatch(payload)
       } else {
         listRef.set([payload.payload])
         dispatch(payload)
       }
    })
  }

}
