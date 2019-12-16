import { Component } from 'react';
import axios from 'axios';

interface myState {
  baseUri: string
}

export default class UserService extends Component<any, myState> {
  constructor(props: any) {
    super(props);
    this.state = {
      baseUri: '/api'
    };
  }

  registerUser = async (userInfo: any) => {
    return await axios.post(`${this.state.baseUri}/register`, {user: userInfo});
  }

}