
import {ACTIONS} from '../../constants';

export function user(state = null, action) {
    switch(action.type) {
        
        case ACTIONS.USER_DATA:
            return action.userData;
    }
    return state;
}
