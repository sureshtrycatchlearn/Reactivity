import React from 'react'
import { Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/store/store';
import { observer } from 'mobx-react-lite';
import ActivityListItem from './ActivityListItem';


export default observer( function ActivityList() {
    const {activityStore} = useStore();
    const {ActivitiesByDate} = activityStore;




    return(
        <Segment>
            <Item.Group divided>
                {ActivitiesByDate.map(activity=>(
                    <ActivityListItem key={activity.id} activity={activity}/>
                ))}
            </Item.Group>
        </Segment>
    )
})