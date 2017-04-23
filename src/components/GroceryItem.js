import React, {Component} from 'react';

class GroceryItem extends Component {
  render(){
    return (
      <tr className="clearfix">
        <td><img className="item-img" src={this.props.imageUrl} alt="item image"/></td>
        <td className="item-name">{this.props.description}</td>
        <td className="buttons"><i onClick={e => { this.props.removeItem(this.props.keyParam)} }
          className="fa fa-trash-o" aria-hidden="true"></i>
        </td>
      </tr>
    )
  }
}

export default GroceryItem;
