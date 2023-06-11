import React, { Fragment } from 'react'
import { Header, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/store/store';
import { observer } from 'mobx-react-lite';
import ActivityListItem from './ActivityListItem';
import { group } from 'console';


export default observer( function ActivityList() {
    const {activityStore} = useStore();
    const {groupedActivities} = activityStore;




    return(
        <>
            {groupedActivities.map(([group, activities]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                    <Segment>
                        <Item.Group divided>
                            {activities.map(activity => (
                                <ActivityListItem key={activity.id} activity={activity} />
                            ))}
                        </Item.Group>
                    </Segment>
                </Fragment>
            ))}
        </>

    )
})