import React, {Component} from 'react'
import {connect} from 'react-redux'
import addList from '../actions/addList'
import setLists from '../actions/setLists'
import {bindActionCreators} from 'redux'
import {listRef} from '../firebase'

class Lists extends Component {
  constructor(props){
    super(props)

    this.state = {
      title: 'My Lists',
      listname: ''
    }
  }

  componentWillMount(){
    this.listenForLists();
  }

  listenForLists(){
    const loadLists = (snapshot) => {
      const db = snapshot.val();
      console.log('Snapshot List: ', snapshot.val())

      if(db != null){
        this.props.setLists(snapshot.val())
      }
    }

    listRef.once('value', loadLists)
  }

  addList(e){
    e.preventDefault()
    if(this.state.listname.trim().length){
      console.log('Inside the if', this.state.listname)
      this.props.addList(this.state.listname)
      this.setState({ listname: '' })
    }
  }

  renderLists(){
    return this.props.lists.map(list => {
      // console.log('list: ', list)
      return <li>{list.name}</li>
    })
  }

  render(){

      return (
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
              <h1>{this.state.title}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-md-offset-3">

              <form onSubmit={this.addList.bind(this)} className="create-list-form form-inline">
                <input className="form-control" type="text" placeholder="What's the name of your list?"
                value={this.state.listname} onChange={e => this.setState({ listname: e.target.value })} />
                <button className="btn btn-primary create-list">Create List</button>
              </form>

              <ul className="mylists">
                {this.renderLists()}
              </ul>

            </div>
          </div>
        </div>
      );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    addList: addList,
    setLists: setLists
  },dispatch)
}

function mapStateToProps(state){
  console.log('lists state: ', state)
  return {
    lists: state.user.lists
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Lists)
