import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import GroceryItem from './GroceryItem';
import Loading from './Loading';
import getItems from '../actions/getItems';
import '../css/fa/css/font-awesome.css';


class GroceryList extends Component {

  componentWillMount(){
    this.props.getItems()
  }

  getGroceryItems(){
    return this.props.items.map((item)=>{
      // console.log(item);
      return (<GroceryItem key={item.key}
                description={item.description}
                keyParam={item.key}
                removeItem={this.props.removeItem}
                imageUrl={item.imageUrl} />)
    });
  }

  render(){

    if(!this.props.items.length)
      return (<Loading show={true}/>)

    return (
      <div className="table-responsive">
        <table className="list-group grocery-list table">
          <thead>
            <tr>
              <th></th>
              <th>Item</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            { this.getGroceryItems() }
          </tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    items: state.user.items
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getItems
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(GroceryList)
