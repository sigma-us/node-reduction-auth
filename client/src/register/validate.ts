import {myState} from './register';

const validate = (values: myState) => {
  const errors: any = {};
  if (!values.firstname) {
    errors.firstname = 'Required'
  }
  if (!values.lastname) {
    errors.lastname = 'Required'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (!values.username) {
    errors.username = 'Required'
  }
  if (!values.password) {
    errors.password = 'Required'
  }
  if (!values.confirmpassword) {
    errors.confirmpassword = 'Required'
  } else if (values.confirmpassword !== values.password) {
    errors.confirmpassword = 'Passwords do not match'
  }
  return errors
}

export default validate