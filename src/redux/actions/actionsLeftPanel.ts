import {ACTIONS} from '../../constants';

export function setLeftPanelOpen(open: boolean) {
    return {type: ACTIONS.LEFT_PANEL_OPEN, open}
}