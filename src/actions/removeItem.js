import {firebase, ref} from '../firebase'

export default function(key){
    return dispatch => {

      ref.once('value', db => {
        const dbVal = db.val();

        console.log('db is: ', dbVal)

        if(dbVal){
          ref.set({
            items: dbVal.items.filter(item => item.key != key)
          })
        }

        dispatch({
          type: 'REMOVE_ITEM',
          payload: key
        })

      })
    }
}
