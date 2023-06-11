import { Button, Form, Segment } from "semantic-ui-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useStore } from "../../../app/store/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import {v4 as uuid} from 'uuid'


export default observer (function ActivityForm() {
    const {activityStore} = useStore();
    const {createActivity, updateActivity, loading, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams();
    const navigate = useNavigate();

    const [activity, setActivity] = useState<Activity>({
        id: '',
        title:'',
        category:'',
        description:'',
        date:'',
        city:'',
        venue:''
    });

    useEffect(()=>{
        if (id) loadActivity(id).then(activity=>setActivity(activity!))
    },[id, loadActivity])

    function handleSubmit() {
        if(!activity.id){
            activity.id=uuid();
            createActivity(activity).then(()=>navigate(`/activities/${activity.id}`))
        } else {
            updateActivity(activity).then(()=>navigate(`/activities/${activity.id}`));
        }

        activity.id ? updateActivity(activity) : createActivity(activity);
    }

    function handleinputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const {name, value} =event.target;
        setActivity({...activity, [name]:value})
    }

    if (loadingInitial) return <LoadingComponents content="Loading Activity......."/>

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Titel'value={activity.title} name='title' onChange={handleinputChange}/>
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleinputChange}/>
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleinputChange}/>
                <Form.Input type="date" placeholder='Date' value={activity.date} name='date' onChange={handleinputChange}/>
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleinputChange}/>
                <Form.Input placeholder='Venu' value={activity.venue} name='venue' onChange={handleinputChange}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit'/>
                <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})