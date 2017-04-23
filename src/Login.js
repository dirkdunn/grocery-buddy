import React, {Component} from 'react';
import { Redirect, Route } from 'react-router';
import firebase from './firebase';
import App from './App';
import './css/Login.css';
import './css/fa/css/font-awesome.css';

class Login extends Component {
  constructor(props){
    super(props)

    this.state = {
      signup: {
        email: '',
        password: ''
      },
      login: {
        email: '',
        password: ''
      },
      errorMessage: '',
      showSignup: true,
      redirect: false
    }
  }

  redirectToGroceryList(){
    this.setState({ redirect: true })
  }

  signup(e){
    e.preventDefault();
    var email = this.state.signup.email;
    var password = this.state.signup.password;

    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        console.log('user is: ', user);
        localStorage.setItem('user',JSON.stringify(user));
        this.redirectToGroceryList()
      })
      .catch(error => {
         console.log(error.code);
         console.log(error.message);
         this.setState({
           errorMessage: error.message
         })
      });
  }

  login(e){
    e.preventDefault();
    var email = this.state.showSignup ? this.state.signup.email : this.state.login.email;
    var password = this.state.showSignup ? this.state.signup.password : this.state.login.password;

    console.log(email,password)

    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        console.log('user is: ', user);
        localStorage.setItem('user',JSON.stringify(user));
        this.redirectToGroceryList()
      })
      .catch(error => {
         console.log(error.code);
         console.log(error.message);
         this.setState({
           errorMessage: error.message
         })
      });
  }

  render(){

    if(this.state.redirect){
      const uid = JSON.parse(localStorage.getItem('user')).uid;
      localStorage.setItem('uid_compare', uid);
      return(
        <Redirect test="test" to={{
          pathname: '/grocerylist'
        }} />
      )
    }

    return (
      <div className="container registration-page">

        <div className="row registration-section">
        <div className="col-xs-10 col-xs-offset-1 col-sm-5 col-sm-offset-1 descriptor">
          <i className="fa fa-cutlery login-icon" aria-hidden="true"></i>
          <h1>Grocery Buddy</h1>
          <p>One grocery list, all devices.</p>
        </div>
          <div className="col-xs-12 col-sm-4 ">
            <h3>{this.state.showSignup ? 'Sign Up' : 'Login'}</h3>
            <div className="form-group">
            <form onSubmit={this.signup.bind(this)} className="signup" style={{display: this.state.showSignup ? 'block' : 'none'}}>
              <input
              type="text"
              placeholder="email"
              value={this.state.email}
              className="form-control"
              onChange={e => this.setState({
                signup: { email : e.target.value, password: this.state.signup.password}
              })} />

              <input
              type="password"
              placeholder="password"
              value={this.state.password}
              className="form-control"
              onChange={e => this.setState({
                signup: { email : this.state.signup.email, password: e.target.value}
              })} />
              <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>

            <form onSubmit={this.login.bind(this)} className="login" style={{display: this.state.showSignup ? 'none' : 'block'}}>
              <input
              type="text"
              placeholder="email"
              value={this.state.login.email}
              className="form-control"
              onChange={e => this.setState({
                login: { email : e.target.value, password: this.state.login.password}
              })} />

              <input
              type="password"
              placeholder="password"
              value={this.state.login.password}
              className="form-control"
              onChange={e => this.setState({
                login: { email : this.state.login.email, password: e.target.value}
              })} />
              <button type="submit" className="btn btn-primary">Login</button>
            </form>
            </div>

            <p className="error">{this.state.errorMessage}</p>
            <p>{ this.state.showSignup ? 'Already have an account?' : 'Don\'t have an account?' }</p>
            <button
              onClick={e => this.setState({ showSignup: !this.state.showSignup})}
              className="toggle-form btn btn-default">
            { this.state.showSignup ? 'Login' : 'Sign Up' }
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
