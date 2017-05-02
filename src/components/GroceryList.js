import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import GroceryItem from './GroceryItem';
import getItems from '../actions/getItem';
import '../css/fa/css/font-awesome.css';


class GroceryList extends Component {

  componentDidMount(){
    this.props.getItems()
  }

  render(){
    console.log('this.props.grocerylist',this.props.grocerylist)
    const groceryItems = this.props.grocerylist.map((item)=>{
      // console.log(item);
      return (<GroceryItem key={item.key}
                description={item.description}
                keyParam={item.key}
                removeItem={this.props.removeItem}
                imageUrl={item.imageUrl} />)
    })

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
            {groceryItems}
          </tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    grocerylist: state.grocerylist 
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    getItems
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(GroceryList)
