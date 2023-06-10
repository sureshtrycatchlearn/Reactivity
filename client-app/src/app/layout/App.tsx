import React, { useEffect, useState } from 'react';
import { Button, Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashBoard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid'
import agent from '../api/agent';
import LoadingComponents from './LoadingComponents';
import { useStore } from '../store/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {activityStore} = useStore();
  const [Activities, setActivities]= useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity| undefined>(undefined)
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting]= useState(false);

  useEffect (()=>{
    agent.Activities.list().then(resoponse=>{
      let activities:Activity[]=[];
      resoponse.forEach(activity=> {
        activity.date=activity.date.split('T')[0];
        activities.push(activity);
      })
      setActivities(activities);
      setLoading(false);
    })
  },[])

  function handleSelectActivity(id:string){
    setSelectedActivity(Activities.find(x=>x.id === id))
    
  }

  function handleCancelSelectActivity(){
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?:string){
    id? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose(){
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity:Activity){
    setSubmitting(true)
    if(activity.id){
      agent.Activities.update(activity).then(()=>{
        setActivities([...Activities.filter(x=>x.id != activity.id), activity])
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    } else {
      activity.id=uuid();
      agent.Activities.create(activity).then(()=>{
        setActivities([...Activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }

  function handleDeleteSelectActivity(id:string){
    setSubmitting(true);
    agent.Activities.delete(id).then(()=>{
      setActivities([...Activities.filter(x=>x.id !== id)])
    })
    setSubmitting(false);
  }

  if(loading) return <LoadingComponents content='Loading App....'/>

  return (
    <>
      <NavBar openForm={handleFormOpen}/>
        <Container style = {{marginTop:'7em'}}>
          <h2>{activityStore.title}</h2>
          <Button content='Add exclamation' positive onClick={activityStore.setTitle}/>
          <ActivityDashBoard activities={Activities}
           selectedActivity={selectedActivity}
           selectActivity={handleSelectActivity}
           cancelSelectActivity={handleCancelSelectActivity}
           editMode={editMode}
           openForm={handleFormOpen}  
           closeForm={handleFormClose}
           createOrEdit={handleCreateOrEditActivity}
           deleteActivity={handleDeleteSelectActivity}
           submitting={submitting}
          />
          </Container>
    </>
  );
}

export default observer(App) ;
