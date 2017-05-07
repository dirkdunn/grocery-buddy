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

    ref.once('value',(snapshot) => {
      const db = snapshot.val();
      window.devlog('snapshot: ', snapshot.val());
      if(db != null){
        // window.devlog("THIS.ITEMS", this.items, db.items)
        this.props.setItems(db.items);
      }
    });
    // ref.on('child_added',loadGroceries);
    // ref.on('child_removed',loadGroceries);
  }

  getGroceryItems(){
    return this.props.items.map((item)=>{
      window.devlog(item);
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
  window.devlog('state.user.items ',state.user.items)
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
