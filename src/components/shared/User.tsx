import * as React from 'react';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import * as ReactSortable from 'react-sortablejs';

export const UserItem = ({item, position=0, withPoints=false}) =>  <ListItem
    leftAvatar={
        <Avatar
          className='avatar'
          src={item.avatar}
          size={30}/>
      }>{position ? `${position}. ` : ''}{item.nickname}{withPoints ? ` (${item.points})` : ''}</ListItem>;

export const UserList = ({items}) => <List>
        {items.map((item, index) => { return <UserItem key={item._id} item={item} position={index + 1} withPoints={true} /> })}
    </List>


export const UserListSortable = ({items, sortableOptions, withPlace=false}) => 
      
    <ReactSortable options={sortableOptions} style={{minHeight: '50px'}}>
        {items.map((item: any, index: number) => { return <UserItem key={item._id} item={item} position={withPlace ? index + 1 : 0} /> })}
    </ReactSortable>

