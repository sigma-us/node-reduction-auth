import React, { Component } from 'react';
import UserService from "../services/users.service";
import { Field, reduxForm } from 'redux-form';
import store from '../redux/reducers/reducers';


interface myState {
  props: any,
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
    try {
      e.preventDefault();
      const state = store.getState();
      const user = state.form.user.values as myState;
      const service = new UserService(null);
      const checkRes = await service.check('email', user.email);
      if (checkRes.data.length) alert('Email in use');
      const checkUs = await service.check('username', user.username);
      if (checkUs.data.length) alert('Username in use');
      

      console.log(checkRes, checkUs);

      if (!checkRes.data.length && !checkUs.data.length) {
        this.props.history.push('/register/confirm');
      }
    } catch (e) {
      console.log('Error: ', e);
    }
  }


  render() {
    const { pristine, submitting, reset } = this.props;

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              First Name:
              <Field
                type="text"
                component="input"
                name="firstname"
                placeholder="First Name"
              />
            </label>
          </div>
          <div>
            <label>
              Last Name:
              <Field
                type="text"
                component="input"
                name="lastname"
                placeholder="Last Name"
              />
            </label>
          </div>
          <div>
            <label>
              Username:
              <Field
                type="text"
                component="input"
                name="username"
                placeholder="Username"
              />
            </label>
          </div>
          <div>
            <label>
              Email:
              <Field
                type="email"
                component="input"
                name="email"
                placeholder="Email"
              />
            </label>
          </div>
          <div>
            <label>
              Password:
              <Field
                type="password"
                component="input"
                name="password"
                placeholder="Password"
              />
            </label>
          </div>
          <div>
            <label>
              Confirm Password:
              <Field
                type="password"
                component="input"
                name="confirmpassword"
                placeholder="Confirm Password"
              />
            </label>
          </div>
          <div>
            <button type="submit" disabled={pristine || submitting}>
              Submit
            </button>
            <button type="button" disabled={pristine || submitting} onClick={reset}>
              Clear Values
            </button>
          </div>
        </form>
      </div>
    );
  }
}


export default reduxForm<any, myState>({
  form: 'user',
  destroyOnUnmount: false
  // validator goes here
})(Register);