import firebase from '../firebase'

export default function(key){
    return dispatch => {

      const ref = firebase.database().ref('/'+ localStorage.getItem('uid_compare'));
      ref.once('value', db => {
        const dbVal = db.val();

        window.devlog('db is: ', dbVal)

        if(dbVal){

          window.devlog('db is: ', dbVal.items, dbVal.items.filter(item => {
            window.devlog('items.key ', item.key, 'key ', key, item.key != key)
            return item.key != key
          }))

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
