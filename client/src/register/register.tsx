import React, { Component } from 'react';
import UserService from "../services/users.service";

interface myState {
  firstname: string,
  lastname: string,
  username: string,
  email: string,
  password: string,
  confirmpassword: string
}

class Register extends Component<any, myState> {
  constructor(props: any) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      confirmpassword: ''
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  changeHandler = (event: any) => {
    const name = event.target.name;
    const value = event.target.value;

    // sets state with form values on change
    this.setState({
      [name]: value
    } as myState);
  }

  handleSubmit = async (e: any) => {
    e.preventDefault();
    const service = new UserService(true);

    const registerRes = await service.registerUser(this.state);
    console.log(registerRes);

  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              First Name:
              <input type="text"
                name="firstname"
                value={this.state.firstname}
                onChange={this.changeHandler}
              />
            </label>
          </div>
          <div>
            <label>
              Last Name:
              <input type="text"
                name="lastname"
                value={this.state.lastname}
                onChange={this.changeHandler}
              />
            </label>
          </div>
          <div>
            <label>
              Username:
              <input type="text"
                name="username"
                value={this.state.username}
                onChange={this.changeHandler}
              />
            </label>
          </div>
          <div>
            <label>
              Email:
              <input type="email"
                name="email"
                value={this.state.email}
                onChange={this.changeHandler}
              />
            </label>
          </div>
          <div>
            <label>
              Password:
              <input type="password"
                name="password"
                value={this.state.password}
                onChange={this.changeHandler}
              />
            </label>
          </div>
          <div>
            <label>
              Confirm Password:
              <input type="password"
                name="confirmpassword"
                value={this.state.confirmpassword}
                onChange={this.changeHandler}
              />
            </label>
          </div>
          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}

export default Register;