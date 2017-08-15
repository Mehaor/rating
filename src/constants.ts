import {yellow500, amber500, green500, blue500, red900, deepPurple500, teal500} from 'material-ui/styles/colors';

export namespace ACTIONS {
    export const USER_DATA: string = 'user_data';

    export const LEFT_PANEL_OPEN: string = 'left_panel_open';

    export const RATING_TOTAL: string = 'rating_total';
    export const RATING_ALL: string = 'rating_all';
    export const RATING_MY: string = 'rating_my';
    export const RATING_USERS: string = 'rating_users';

    export const TITLE_SET: string = 'title_set';

    export const SCREEN_IS_DESKTOP: string = 'screen_is_desktop';
}

export namespace SIZES {
    export const LEFT_PANEL_SIZE: number = 200;
    export const MAX_CONTENT_WIDTH: number = 800;
}

export const WEEKDAY_PRIMARY_COLORS: string[] = [yellow500, amber500, green500, blue500, red900, deepPurple500, teal500];