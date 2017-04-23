import React, {Component} from 'react';
import GroceryItem from './GroceryItem';
import '../css/fa/css/font-awesome.css';


class GroceryList extends Component {
  render(){
    const groceryItems = this.props.items.map((item)=>{
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

export default GroceryList;
