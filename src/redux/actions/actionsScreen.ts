import {ACTIONS} from '../../constants';

export function setIsDesktop(isDesktop: boolean) {
    return { type: ACTIONS.SCREEN_IS_DESKTOP, isDesktop }
}