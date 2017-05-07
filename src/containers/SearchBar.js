import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import addItem from '../actions/addItem';
import toggleLoader from '../actions/toggleLoader';

class SearchBar extends Component {
  constructor(props){
    super(props)
    this.state={
      search: ""
    }
  }

  addToList(e){
    e.preventDefault();
    this.props.toggleLoader();
    this.props.addItem(this.state.search, Date.now());
    this.setState({search: ""});
    // this.props.getItems();
  }

  render(){

    return (
      <div className="form-group ">
      <form onSubmit={this.addToList.bind(this)} className="grocery-search form-inline">
        <input
          onChange={ e => this.setState({ search: e.target.value }) }
          className="grocery-input form-control"
          type="text"
          name="query"
          placeholder="Add a grocery Item"
          value={this.state.search }/>
        <button type="submit" value="Add" className="btn btn-primary add-item">Add Item</button>
      </form>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    addItem: addItem,
    toggleLoader: toggleLoader
  },dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);
