import parseXML from 'xml-parse-from-string';
import axios from 'axios';
import {firebase, itemsRef} from '../firebase'

function getItemImage(query, callback){
  // window.devlog('query: ',query)
  const flickrURL = 'https://api.flickr.com/services/rest/';
  axios.get(flickrURL,{
    params: {
      method: 'flickr.photos.search',
      api_key: 'bac481b3714f9e9f3812760b07a97184',
      text: query,
      tags: 'food',
      safe_search: 1,
      media: 'photos',
      sort: 'relevance'
    }
  }).then(response => {
    callback(response.data);
  }).catch(error => {
    console.error(error);
    callback(false);
  })
}

function getFlickrImage(farmid,serverid,id,secret){
  return `https://farm${farmid}.staticflickr.com/${serverid}/${id}_${secret}_s.jpg`
}

function addItem(item,key){
  return new Promise(function(resolve,reject){
    getItemImage(item, response => {
      if(response){
        // window.devlog('response: ',response);

        let randRange = parseXML(response).getElementsByTagName('photo').length / 2;
        let randomImage = Math.floor(Math.random() * 1);
        let photo = parseXML(response).getElementsByTagName('photo')[0];
        let farmid = photo.getAttribute('farm');
        let serverid = photo.getAttribute('server');
        let id = photo.getAttribute('id');
        let secret = photo.getAttribute('secret');

        // window.devlog('flickrImage:', getFlickrImage(farmid,serverid,id,secret))
        window.devlog('key is: ', key)

        resolve({
            description: item,
            key: key,
            imageUrl: getFlickrImage(farmid,serverid,id,secret)
        })

      } else {
        reject(false);
      }
    })
  })
}


export default function(query,key){
  const addItemPromise = addItem(query,key);

  return dispatch => {
    addItemPromise.then(item => {
      itemsRef.once('value', db => {
        let keyVal = db.val() ? db.val().length : 0;
        window.devlog('children', keyVal)

        itemsRef.child(keyVal).set(item)
        dispatch({
          type: 'ADD_ITEM',
          payload: item
        })
      })
    }).catch(e => console.error('Error adding item: ', e))
  }

}
