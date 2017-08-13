import * as React from 'react';
import {UserList, UserItem} from './shared/User';
import {connect} from 'react-redux';
import {getOverallRating} from '../redux/actions/actionsRating';
import CircularProgress from 'material-ui/CircularProgress';
import {setLeftPanelOpen} from '../redux/actions/actionsLeftPanel';
import {setTitle} from '../redux/actions/actionsTitle';

class OverallRating extends React.Component<any, any> {

    componentDidMount() {
        this.props.getRatingData();
        this.props.setLPOpen(false);
        this.props.setTPTitle('ЧАТОВИДЕНЬЕ');
    }

    render() {
        let {loading, items} =  this.props;
        return loading ? <CircularProgress /> : <UserList items={items} />
    }
}

const mapStateToProps = (state: any, ownProps: any) => {
    return {
        loading: state.ratingData.overall.loading,
        items: state.ratingData.overall.items,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getRatingData: () => {dispatch(getOverallRating())},
        setLPOpen: (open: boolean) => {dispatch(setLeftPanelOpen(open))},
        setTPTitle: (title: string) => {dispatch(setTitle(title))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OverallRating);