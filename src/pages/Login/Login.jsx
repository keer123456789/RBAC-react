import React, { Component } from 'react';
import UserLogin from './components/UserLogin';
import './Login.scss';
import cookie from 'react-cookies';
export default class Login extends Component {
  static displayName = 'Login';

  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount(){
    
    const userid=cookie.select("userid");
    const password=cookie.select("password");
    const address=cookie.select("address");
    if(userid!=null&&password!=null&&address!=null){
     
    }else{
      window.location.href =  `${window.location.origin}/#/login`;
    }
  }

  render() {
    return (
      <div className="login-page">
        <UserLogin />
      </div>
    );
  }
}
