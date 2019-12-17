import React, { Component } from 'react';
import UserService from "../services/users.service";
import { Field, reduxForm } from 'redux-form';
import store from '../redux/reducers/reducers';
import validate from './validate';


export interface myState {
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


  renderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
  }: any) => (
      <div>
        <label>{label}</label>
        <div>
          <input {...input} placeholder={label} type={type} />
          {touched &&
            ((error && <span>{error}</span>) ||
              (warning && <span>{warning}</span>))}
        </div>
      </div>
    )


  render() {
    const { pristine, submitting, reset } = this.props;

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <form onSubmit={this.handleSubmit}>
          <div>
            <Field
              type="text"
              label="First Name:"
              component={this.renderField}
              name="firstname"
              placeholder="First Name"
            />
          </div>
          <div>
            <Field
              type="text"
              label="Last Name:"
              component={this.renderField}
              name="lastname"
              placeholder="Last Name"
            />
          </div>
          <div>
            <Field
              type="text"
              label="Username"
              component={this.renderField}
              name="username"
              placeholder="Username"
            />
          </div>
          <div>
            <Field
              type="email"
              label="Email"
              component={this.renderField}
              name="email"
              placeholder="Email"
            />
          </div>
          <div>
            <Field
              type="password"
              label="Password"
              component={this.renderField}
              name="password"
              placeholder="Password"
            />
          </div>
          <div>
            <Field
              type="password"
              label="Confirm Password"
              component={this.renderField}
              name="confirmpassword"
              placeholder="Confirm Password"
            />
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
  destroyOnUnmount: false,
  validate
  // validator goes here
})(Register);