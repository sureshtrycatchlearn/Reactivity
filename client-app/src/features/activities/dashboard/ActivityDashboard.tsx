import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/store/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import ActivityFilters from "./ActivityFilters";


export default observer( function ActivityDashBoard(){
    const {activityStore} = useStore();
    const {loadActivities, activityRegistry} = activityStore;

    useEffect (()=>{
      if(activityRegistry.size <=1) loadActivities();
    },[loadActivities, activityRegistry.size])
  
  
    if(activityStore.loadingInitial) return <LoadingComponents content='Loading App....'/>

    return(
        <Grid >
            <Grid.Column width='12' >    
                <ActivityList/>
            </Grid.Column>
            <Grid.Column width='4'>
                <ActivityFilters/>
            </Grid.Column>
        </Grid>
    )
})