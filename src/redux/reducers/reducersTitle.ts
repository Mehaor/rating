import {ACTIONS} from '../../constants';

const initialTitle: string = 'Рейтинг';

export function title(state=initialTitle, action: any) {
    switch(action.type) {
        case ACTIONS.TITLE_SET:
            return action.title;
        default:
            return state;
    }
}