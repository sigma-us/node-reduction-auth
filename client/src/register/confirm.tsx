import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import store from '../redux/reducers/reducers';


class Confirm extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { form: store.getState() };
    if (!this.state.form.form.user) this.props.history.push('/register');

  }

  register = () => {
    console.log('submit');
  }

  editInfo = () => {
    this.props.history.push('/register');
  }


  render() {
    const formData = store.getState() as any
    const user = formData.form.user.values;
    console.log(user)

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
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

        </div>
        <div>
          <button type="button" onClick={this.register}>Submit</button>
          <button type="button" onClick={this.editInfo}>Edit Info</button>
        </div>
      </div>
    )
  }
}

export default reduxForm<any, any>({
  form: 'user',
  destroyOnUnmount: false
})(Confirm);