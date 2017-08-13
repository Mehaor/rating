import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {user} from './reducersUser';
import {leftPanel} from './reducersLeftPanel';
import {screen} from './reducersScreen';
import {ratingData} from './reducersRating';
import {title} from './reducersTitle';

const reducers = combineReducers({user, leftPanel, screen, ratingData, title});

export const store = createStore(reducers, applyMiddleware(thunkMiddleware));

