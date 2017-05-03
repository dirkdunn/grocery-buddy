import firebase from '../firebase'

function getDatabaseItems(ref){
  return new Promise(function(resolve,reject){
    ref.on('value',(snapshot)=>{
      const db = snapshot.val();
      // console.log('snapshot: ', snapshot.val());
      if(db != null){
        let items = db.items;
        console.log('items: ', items)
        resolve(items);
      } else {
        resolve([])
      }
    });
  })
}

export default function(){
  const ref = firebase.database().ref('/'+ localStorage.getItem('uid_compare'));

  return {
    type: 'GET_ITEMS',
    payload: getDatabaseItems(ref)
  }
}
