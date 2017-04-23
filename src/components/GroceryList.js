import React, {Component} from 'react';
import GroceryItem from './GroceryItem';

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
              <th>Item</th>
              <th>Name</th>
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
