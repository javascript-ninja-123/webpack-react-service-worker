import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import RequireSubject, {SubjectAPI} from '../../hoc/requireSubject';


class Home extends Component{
  backGroundSync = () => {
    navigator.serviceWorker.ready.then(function(swRegistration) {
      return swRegistration.sync.register('myFirstSync');
    })
  }
  render(){
      return(
        <Fragment>
        <SubjectAPI.Consumer>
        {
          ({subject, post, onClick,num}) => (
            <div id="Home">
              <button onClick={() => onClick(subject,num)}>Click this fucking button</button>
              <h2>This is an amazing setup</h2>
              <p>{post.title}</p>
              <Link to='/about'>About us</Link>
            </div>
          )
        }
        </SubjectAPI.Consumer>

        <SubjectAPI.Consumer>
        {
          ({subject, post, onClick,num}) => (
            <div id="Home">
              <button onClick={() => onClick(subject,num)}>Click this fucking button</button>
              <h2>This is an amazing setup</h2>
              <p>{post.title}</p>
              <Link to='/about'>About us</Link>
            </div>
          )
        }
        </SubjectAPI.Consumer>
        <div>
         <button onClick={this.backGroundSync}>Fetch Data from me Background Sync</button>
        </div>
        </Fragment>
      )
  }
}


export default RequireSubject(Home);
