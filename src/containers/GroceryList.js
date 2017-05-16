import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {firebase, ref, itemsRef} from '../firebase';
import GroceryItem from './GroceryItem';
import setItems from '../actions/setItems';
import Loading from '../components/Loading';
import '../css/fa/css/font-awesome.css';


class GroceryList extends Component {
  constructor(props){
    super(props)
  }

  componentWillMount(){
    this.listenForGroceries()
  }

  listenForGroceries(){
    const loadGroceries = (snapshot) => {
      const db = snapshot.val();
      
      console.log('snapshot: ', snapshot.val());
      if(db != null){
        // console.log("THIS.ITEMS", this.items, db.items)
        this.props.setItems(db.items);
      }
    }

    ref.on('value',loadGroceries);

  }

  getGroceryItems(){
    return this.props.items.map((item)=>{
      console.log(item);
      return (<GroceryItem key={item.key}
                description={item.description}
                keyParam={item.key}
                removeItem={this.props.removeItem}
                imageUrl={item.imageUrl} />)
    });
  }

  render(){

    if(!this.props.items.length)
      return (<h4>Add some items to your grocery list!</h4>)

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
            {this.getGroceryItems()}
          </tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps(state){
  console.log('state.user.items ',state.user.items)
  return {
    items: state.user.items
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    setItems
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(GroceryList)
