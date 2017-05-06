import firebase from '../firebase'

export default function(key){
    return dispatch => {

      const ref = firebase.database().ref('/'+ localStorage.getItem('uid_compare'));
      ref.once('value', db => {
        const dbVal = db.val();

        console.log('db is: ', dbVal)

        if(dbVal){
          console.log('db is: ', dbVal.items, dbVal.items.filter(item => {
            item.key != key
          }))

          ref.set({
            items: dbVal.items.filter(item => {
              item.key != key
            })
          })

        }


        dispatch({
          type: 'REMOVE_ITEM',
          payload: key
        })

      })
    }
}
