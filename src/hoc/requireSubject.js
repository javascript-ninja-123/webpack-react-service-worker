import React, {Component, createContext} from 'react';
import {Subject, AsyncSubject} from 'rxjs'
import { switchMap } from 'rxjs/operators';
import { ajax } from "rxjs/ajax";
export const SubjectAPI = createContext()


export default BaseComponent => {
  class RequireSubject extends Component{
    constructor(props){
      super(props);
      this.state = {
        subject:new AsyncSubject(),
        post:{},
        num:1,
        onClick:this.onClick
      }

      this.state.subject
      .pipe(
        switchMap((payload) => ajax.getJSON(`https://jsonplaceholder.typicode.com/posts/${payload}`))
      )
      .subscribe(
        x => this.setState({post:x})
      )
    }

    onClick = (subject,num) => {
      subject.next(1)
      subject.next(2)
      subject.complete()
    }


    render(){
      return(
        <SubjectAPI.Provider value={this.state}>
          <BaseComponent {...this.props}/>
        </SubjectAPI.Provider>
      )
    }
  }
  return RequireSubject;
}
