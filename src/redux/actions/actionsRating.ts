import {ACTIONS} from '../../constants';
import {api} from '../../api';

export function setMyRating(myData) {

    return {type: ACTIONS.RATING_MY, myData};
}

export function setOverallRating(overallData) {
    return {type: ACTIONS.RATING_ALL, overallData};
}

export function updateMyRating(myData) {
    return (dispatch) => {
        dispatch(setMyRating({loading: true}));
        dispatch(setMyRating({loading: false, rating: myData.rating, unrated: myData.unrated}));
        let newRating = myData.rating.map((item) => {return item._id});
        api.patch('/my', {rating: newRating}).then((response) => {

        }).catch((err) => { dispatch(setMyRating({loading: true})); })
    }
}

export function getUserRating() {
    
}

export function getMyRating() {
    return (dispatch) => {
        dispatch(setMyRating({loading: true, rating: [], unrated: []}));
        api.get('/my').then((response: any) => {
            dispatch(setMyRating({loading: false, rating: response.data.rating, unrated: response.data.unrated}));
        }).catch((err) => {});
    }
}

export function getOverallRating() {
    return (dispatch) => {
        dispatch(setOverallRating({loading: true, items: []}));
        api.get('/overall').then((response: any) => {
            dispatch(setOverallRating({loading: false, items: response.data}));
        }).catch((err) => {})
    }
}