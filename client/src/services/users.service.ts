import { Component } from 'react';
import axios from 'axios';

interface myState {
  baseUri: string
}

export default class UserService extends Component<any, myState> {
  constructor(props: any | null) {
    super(props);
    this.state = {
      baseUri: '/api'
    };
  }

  registerUser = async (userInfo: any) => {
    return await axios.post(`${this.state.baseUri}/register`, {user: userInfo});
  }

  check = async (type: string, value: string) => {
    return await axios.get(`${this.state.baseUri}/check/${type}?${type}=${value}`);
  }

}