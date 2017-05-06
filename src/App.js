import React, { Component } from 'react';
import GroceryList from './containers/GroceryList';
import SearchBar from './containers/SearchBar';
import firebase from './firebase'
import Loading from './components/Loading';
import {connect} from 'react-redux';
import './css/App.css';
import './css/fa/css/font-awesome.css';

/*
Key: bac481b3714f9e9f3812760b07a97184
Secret: 2b61260c888893d6
*/

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      title: 'Your Grocery List',
      uid: ''
    }
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
    // console.log("LOADING: ", this.props.loading)
    return (
      <div className="container">
        <Loading show={this.props.loading} />
        <div className="row">
          <div className="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
            <h1>{this.state.title}</h1>
            <SearchBar />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <GroceryList />
            <button className="btn btn-primary" onClick={this.signOut}>Signout</button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  console.log('state is: ', state)
  return {
    loading: state.user.loading
  }
}

export default connect(mapStateToProps)(App);
