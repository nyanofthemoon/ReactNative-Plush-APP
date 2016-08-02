import { combineReducers } from 'redux';

import app    from './app';
import user   from './user';
import routes from './routes';

export default combineReducers({
  app,
  user,
  routes
});
