import {ACTIONS} from '../../constants';

export function setTitle(title: string) {
    return { type: ACTIONS.TITLE_SET, title}
}