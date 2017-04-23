import React, { Component } from 'react';
import GroceryList from './components/GroceryList';
import SearchBar from './components/SearchBar';
import firebase from './firebase'
import Loading from './components/Loading';
import axios from 'axios';
import parseXML from 'xml-parse-from-string';
import './css/App.css';
import './css/fa/css/font-awesome.css';

/*
Key: bac481b3714f9e9f3812760b07a97184
Secret: 2b61260c888893d6
*/

class App extends Component {
  constructor(props){
    super(props)
    this.ref = firebase.database().ref('/'+ localStorage.getItem('uid_compare'));
    this.flickrURL = 'https://api.flickr.com/services/rest/';

    this.state = {
      title: 'Firebase Grocery List',
      items: [],
      uid: '',
      loading: false
    }
  }

  loadToggle(){
    this.setState({ loading: !this.state.loading })
  }


  componentDidMount(){
    this.getDatabaseItems()
  }

  componentWillMount(){
    console.log(this.state, this.props)
    // console.log('uid: ',  this.props.location.state.uid)
    this.ensureLoggedIn()
  }

  ensureLoggedIn(){
    const uidFind = localStorage.getItem('uid_compare');
    const uidNotInStorage = !uidFind;
    const user = JSON.parse(localStorage.getItem('user'));

    if(uidNotInStorage || uidFind !== user.uid){
      window.location.replace('/');
    } else {
      localStorage.setItem('loginToken', true);
    }
  }

  setUID(uid){
    this.setState({uid})
  }

  getItemImage(query,callback){
    console.log('query: ',query)
    axios.get(this.flickrURL,{
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

  getDatabaseItems(){
    this.ref.on('value',(snapshot)=>{
      const db = snapshot.val();
      // console.log('snapshot: ', snapshot.val());

      if(db != null){
        let items = db.items;
        console.log('items: ', items)
        this.setState({ items })
      }

    });
  }

  persistItems(){
    var itemsToPersist = {};
    itemsToPersist[localStorage.getItem('uid_compare')] = this.state.items;

    this.ref.set({items: this.state.items});
  }

  getFlickrImage(farmid,serverid,id,secret){
    return `https://farm${farmid}.staticflickr.com/${serverid}/${id}_${secret}_s.jpg`
  }

  addItem(item){
    const items = this.state.items;
    this.loadToggle();

    this.getItemImage(item, response => {
      if(response){
        console.log('response: ',response);
        let randRange = parseXML(response).getElementsByTagName('photo').length / 2;
        let randomImage = Math.floor(Math.random() * 1);

        let photo = parseXML(response).getElementsByTagName('photo')[0];
        let farmid = photo.getAttribute('farm');
        let serverid = photo.getAttribute('server');
        let id = photo.getAttribute('id');
        let secret = photo.getAttribute('secret');

        console.log('flickrImage:', this.getFlickrImage(farmid,serverid,id,secret))

        items.unshift({
            description: item,
            key: Date.now(),
            imageUrl: this.getFlickrImage(farmid,serverid,id,secret)
        });

        this.loadToggle();
        this.setState({ items });
        this.persistItems();
      } else {
        this.loadToggle();
      }
    })

  }

  removeItem(key){
    let items = this.state.items;

    items.forEach( (item,i) => {
      if(item.key === key)
        items.splice(i,1);
    });

    this.setState({ items });
    this.persistItems();
  }

  signOut(){
    firebase.auth().signOut().then(function() {
     console.log("Logged out!");
     localStorage.removeItem('user');
     localStorage.removeItem('uid_compare');

     window.location.replace('/');
    }, function(error) {
     console.log(error.code);
     console.log(error.message);
    });
  }

  render() {
    return (
      <div className="container">
        <Loading show={this.state.loading} />
        <div className="row">
        <div className="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <h1>{this.state.title}</h1>
          <SearchBar addItem={this.addItem.bind(this)}/>
          </div>
        </div>
        <div className="row">

          <div className="col-md-6 col-md-offset-3">
            <GroceryList items={this.state.items} removeItem={this.removeItem.bind(this)}/>
            <button className="btn btn-primary" onClick={this.signOut}>Signout</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
