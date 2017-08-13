import {ACTIONS} from '../../constants';

const initialPanelState = {
    open: false
}

export function leftPanel(state = initialPanelState, action: any) {
    switch(action.type) {
        case ACTIONS.LEFT_PANEL_OPEN:
            return Object.assign({}, state, {open: action.open});
        default:
            return state;
    }
}