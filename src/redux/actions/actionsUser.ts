import * as cookie from 'js-cookie';
import * as jwt from 'jsonwebtoken';
import {ACTIONS} from '../../constants';


export function getUserFromJwt() {
    
        return (dispatch) => {
            let token = cookie.get('jwt');
            if (token) {
                let userData: any = jwt.decode(token);
                if (userData.id && userData.nickname) {
                    dispatch(setUserData(userData));
                }
            }
        }
}

export function setUserData(userData) {
    return {type: ACTIONS.USER_DATA, userData};
}
