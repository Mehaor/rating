import {ACTIONS} from '../../constants';

let initialState: any = {
    myData: {loading: false, rating: [], unrated: []},
    overall: {loading: false, items: []},
}
export function ratingData(state=initialState, action) {

    switch(action.type) {
        case ACTIONS.RATING_MY:
            let myData = Object.assign({}, state.myData, action.myData);
            return Object.assign({}, state, {myData: myData});
        case ACTIONS.RATING_ALL:
            let overallData = Object.assign({}, state.overallData, action.overallData);
            return Object.assign({}, state, {overall: overallData});
    }

    return state;
}