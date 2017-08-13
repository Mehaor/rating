import * as React from 'react';
import {UserListSortable, UserItem} from './shared/User';
import {connect} from 'react-redux';
import {getMyRating, updateMyRating} from '../redux/actions/actionsRating';
import CircularProgress from 'material-ui/CircularProgress';
import {setLeftPanelOpen} from '../redux/actions/actionsLeftPanel';
import {setTitle} from '../redux/actions/actionsTitle';

class MyRating extends React.Component<any, any> {

    onAddHandle(evt: any) {

        let rating: any[] = this.props.rating.map((item) => {return item});
        let unrated: any[] = this.props.unrated.map((item) => {return item});
        rating.splice(evt.newIndex, 0, unrated.splice(evt.oldIndex, 1)[0]);

        this.props.updateRating({rating, unrated});
    }

    onSortHandle(evt: any) {
        let rating: any[] = this.props.rating.map((item) => {return item});
        let value = rating.splice(evt.oldIndex, 1)[0];
        rating.splice(evt.newIndex, 0, value);
        this.props.updateRating({rating, unrated: this.props.unrated});
    }


    componentDidMount() {
        this.props.getRatingData();
        this.props.setLPOpen(false);
        this.props.setTPTitle('Мой рейтинг');
    }

    render() {
        let {loading, rating, unrated} = this.props;
        if (loading) {
            return <CircularProgress />
        }
        return (<div>
                    <div>
                        <h2>С рейтингом</h2>
                        <UserListSortable items={rating} withPlace={true} sortableOptions={{
                            group: {name: 'shared', pull: false},
                            onAdd: this.onAddHandle.bind(this),
                            onEnd: this.onSortHandle.bind(this),
                            preventOnFilter: true,
                            scroll: true,
                            handle: '.avatar'
                        }}/>
                    </div>
                    <div>
                        <h2>Без рейтинга</h2>
                        <UserListSortable items={unrated} sortableOptions={{
                            sort: false,
                            group: {name: 'shared', put: false},
                            preventOnFilter: true,
                            scroll: true,
                            handle: '.avatar'
                        }}/>
                    </div>

            </div>)
    }
}

const mapStateToProps = (state: any, ownProps: any) => {
    return {
        loading: state.ratingData.myData.loading,
        rating: state.ratingData.myData.rating,
        unrated: state.ratingData.myData.unrated,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getRatingData: () => {dispatch(getMyRating())},
        updateRating: (myData) => {dispatch(updateMyRating(myData))},
        setLPOpen: (open: boolean) => {dispatch(setLeftPanelOpen(open))},
        setTPTitle: (title: string) => {dispatch(setTitle(title))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyRating);