import React, { Component } from 'react';
import GroceryList from './components/GroceryList';
import SearchBar from './components/SearchBar';
import firebase from './firebase'
import axios from 'axios';
import './css/App.css';
import './css/fa/css/font-awesome.css';

class App extends Component {
  constructor(props){
    super(props)
    this.ref = firebase.database().ref('/'+ localStorage.getItem('uid_compare'));
    this.pixabayUrl = 'https://pixabay.com/api/';

    this.state = {
      title: 'Firebase Grocery List',
      items: [],
      uid: ''
    }
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
    }
  }

  setUID(uid){
    this.setState({uid})
  }

  getItemImage(query,callback){
    console.log('query: ',query)
    axios.get(this.pixabayUrl,{
      params: {
        key: '5150964-f7ec518ccbab158776052cbf6',
        category: 'food',
        q: query
      }
    }).then(response => {
      callback(response);
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

  addItem(item){
    const items = this.state.items;

    this.getItemImage(item, response => {
      if(response){
        console.log('response: ',response);

        let randomImage = Math.floor(Math.random() * 5);

        console.log('randomImage',randomImage);

        items.unshift({
            description: item,
            key: Date.now(),
            imageUrl: response.data.hits[randomImage].previewURL
        });

        this.setState({ items });
        this.persistItems();
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
        <div className="row">
          <h1>{this.state.title}</h1>
          <SearchBar addItem={this.addItem.bind(this)}/>
        </div>
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <GroceryList items={this.state.items} removeItem={this.removeItem.bind(this)}/>
            <button onClick={this.signOut}>Signout</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
