import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import store from '../redux/reducers/reducers';
import UserService from "../services/users.service";



class Confirm extends Component<any, any> {
  // constructor(props: any) {
  //   super(props);

  //   // attempt at preventing user from entering this page without submitting user form
  //   // could use Protected routes, not of utmost importance right now
  //   // if (!this.state.form.form.user) this.props.history.push('/register');

  // }

  register = async () => {
    try {
      const state = store.getState();
      const user = state.form.user.values;
      const service = new UserService(null);
      const registerRes = await service.registerUser(user);
      if (registerRes.data) {
        console.log(registerRes);
        this.props.history.push('/welcome'); 
      }
    } catch (e) {

    }
  }

  editInfo = () => {
    this.props.history.push('/register');
  }


  render() {
    const formData = store.getState() as any
    const user = formData.form.user.values;

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <p>Please confirm your account information or return edit</p>
          <div>
            First Name: {user.firstname}
          </div>
          <div>
            Last Name: {user.lastname}
          </div>
          <div>
            Username: {user.username}
          </div>
          <div>
            Email: {user.email}
          </div>
          <div>
            Password: {user.password}
          </div>

          <div>
            <button type="button" onClick={this.register}>Submit</button>
            <button type="button" onClick={this.editInfo}>Edit Info</button>
          </div>
        </div>

      </div>
    )
  }
}

export default reduxForm<any, any>({
  form: 'user',
  destroyOnUnmount: false
})(Confirm);