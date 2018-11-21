import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import RequireSubject, { SubjectAPI } from '../../hoc/requireSubject';
import Worker from './about.worker'

class About extends Component{
  state = {
    uuid:''
  }
  worker = new Worker()
  onClick = () => {
    this.worker.postMessage('give me data')
    this.worker.onmessage = e => {
      this.setState({uuid:e.data})
    }
  }
  componentWillUnmount(){
    this.worker.terminate()
    console.log('terminate')
  }
  render(){
    return(
      <SubjectAPI.Consumer>
        {
          ({ post }) => (
            (
              <div id="About">
                <h2>This is an amazing About us page</h2>
                <Link to="/">Home</Link>
                <p>{post.title}</p>
                <button onClick={this.onClick}>Get UUID</button>
                <p>{this.state.uuid}</p>
              </div>
            )
          )
        }
      </SubjectAPI.Consumer>
    )
  }
}


export default RequireSubject(About);
