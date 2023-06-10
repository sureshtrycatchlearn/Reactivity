import { Button, Card, Image } from 'semantic-ui-react';
import { useStore } from '../../../app/store/store';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';


export default observer (function ActivityDetails() {
    const {activityStore} = useStore();
    const {selectedActivity:activity, loadingInitial, loadActivity} = activityStore;
    const {id} = useParams();

    useEffect(()=> {
        if (id) loadActivity(id);
    }, [id, loadActivity])

    if(loadingInitial || !activity) return <LoadingComponents/>;

    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`}  />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button  basic color='blue' content='Edit'/>
                    <Button  basic color='grey' content='Cancel'/> 
                </Button.Group>
            </Card.Content>
        </Card>
    )
})