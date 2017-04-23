import React, {Component} from 'react';

class SearchBar extends Component {
  constructor(props){
    super(props)
    this.state={
      search: ""
    }
  }

  addToList(e){
    e.preventDefault();
    this.props.addItem(this.state.search);
    this.setState({search: ""});
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

export default SearchBar;
