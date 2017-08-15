import * as React from 'react';
import {Link} from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import * as ReactSortable from 'react-sortablejs';
import {connect} from 'react-redux';
import {getOverallRating} from '../../redux/actions/actionsRating';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import {setTitle} from '../../redux/actions/actionsTitle';
import {grey200} from 'material-ui/styles/colors';

import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card';

import {withRouter} from 'react-router-dom';

export const UserItem = ({item, position=0, withPoints=false}) =>  <ListItem
    leftAvatar={
        <Avatar
          className='avatar'
          src={item.avatar}
          size={30}/>
      }>{position ? `${position}. ` : ''}
        {item.nickname}{withPoints ? ` (${item.points})` : ''}
        {item.otherPosition ? ` [${item.otherPosition} место]` : ''}
    </ListItem>;

export const LinkItem = ({item, position=0, withPoints=false}) => <Link to={`/u/${item.username}`} >
    <UserItem item={item} position={position} withPoints={withPoints} />
</Link>;

export const UserList = ({items, linked=false, withPoints=true, listPosition=false}) => <List>
        {items.map((item, index) => {
            let ItemComponent: any = linked ? LinkItem : UserItem;
            let position = listPosition ? index + 1 : item.position;
            return <ItemComponent key={item._id} item={item} position={position} withPoints={withPoints} /> 
        })}
    </List>;


export const UserListSortable = ({items, sortableOptions, withPlace=false}) => 
      
    <ReactSortable options={sortableOptions} style={{minHeight: '50px'}}>
        {items.map((item: any, index: number) => { return <UserItem key={item._id} item={item} position={withPlace ? index + 1 : 0} /> })}
    </ReactSortable>;

const UserData = ({item}) => item ? <Card style={{backgroundColor: grey200}}>

    <CardHeader title={item.nickname} subtitle={`Место ${item.position}, очков ${item.points}`} avatar={item.avatar} />
    <CardText>
        {item.ratingList.length ? [
            <Subheader key="subheader">ЛИЧНЫЙ РЕЙТИНГ</Subheader>,
            <UserList key="list" items={item.ratingList} linked={true} withPoints={false} listPosition={true} />,
            <Divider key="divider" />
            ] : null}

        {
            item.ratedBy.length ? [
                <Subheader key="subheader">В ЧУЖИХ РЕЙТИНГАХ</Subheader>,
                <UserList key="list" items={item.ratedBy} linked={true} withPoints={false} listPosition={true} />,
            ] : null
        }
    </CardText>
</Card> : null;

function findUserInList(val: any, index: number, obj: any[]) {
    return val.username == this.props.match.params.username;
}

class UsersClass extends React.Component<any, any> {

    constructor() {
        super();
        this.state = {userData: null};
    }

    getUserData(username: string = null, items: any[] = []): any {
        username = username || this.props.match.params.username;
        items = items.length ? items : this.props.items;

        let val: any = items.find((val: any, index: number, obj: any[]) => {
            return val.username == username;
        });
        if (!val) {
            this.setState({userData: null});
            return null;
        }

        val.ratingList = val.rating.map((id) => { return items.find((v: any, i: number, o: any[]) => {
            return v._id == id;
        }) });

        val.ratedBy = [];
        items.forEach((item: any) => {
            let ratingIndex = item.rating.indexOf(val._id);
            if (ratingIndex != -1) {
                val.ratedBy.push(Object.assign({}, item, {otherPosition: ratingIndex + 1}));
            }
        });
        this.props.setTPTitle(val.nickname);
        this.setState({userData: val});
    }

    componentWillReceiveProps(nextProps) {
        if ((nextProps.items.length != this.props.items.length) || (nextProps.match.params.username != this.props.match.params.username) ) {
            this.getUserData(nextProps.match.params.username, nextProps.items);
        }
    }

    componentDidMount() {
        this.props.getRatingData();
        this.props.setTPTitle('Пользователи');
    }

    render() {
        let {items, loading} = this.props;
        return <div>
            {this.state.userData ? [
                <UserData item={this.state.userData} key="user_data" />,
                <Divider key="divider"/>
            ] : null}

            <UserList items={items} linked={true} />
        </div>
    }
}

const mapUserListStateToProps = (state: any, ownProps: any) => {
    return {
        loading: state.ratingData.overall.loading,
        items: state.ratingData.overall.items,
    }
}

const mapUserListDispatchToProps = (dispatch: any) => {
    return {
        getRatingData: () => {dispatch(getOverallRating(true))},
        setTPTitle: (title: string) => {dispatch(setTitle(title))},
    }
}

export const Users = withRouter(connect(mapUserListStateToProps, mapUserListDispatchToProps)(UsersClass));

