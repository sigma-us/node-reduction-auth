import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
  form: formReducer
})

const store = createStore(rootReducer, composeWithDevTools());

export default store;