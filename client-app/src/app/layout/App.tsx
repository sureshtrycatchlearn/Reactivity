import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';

import NavBar from './NavBar';
import ActivityDashBoard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponents from './LoadingComponents';
import { useStore } from '../store/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {activityStore} = useStore();

  useEffect (()=>{
    activityStore.loadActivities();
  },[activityStore])


  if(activityStore.loadingInitial) return <LoadingComponents content='Loading App....'/>

  return (
    <>
      <NavBar />
        <Container style = {{marginTop:'7em'}}>

          <ActivityDashBoard />
          </Container>
    </>
  );
}

export default observer(App) ;
