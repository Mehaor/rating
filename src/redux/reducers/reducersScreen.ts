import {ACTIONS} from '../../constants';

const initialScreenState: any = {
    isDesktop: false
}

export function screen(state=initialScreenState, action: any) {
    switch(action.type) {
        case ACTIONS.SCREEN_IS_DESKTOP:
            return Object.assign({}, state, {isDesktop: action.isDesktop});
        default:
            return state;
    }
}