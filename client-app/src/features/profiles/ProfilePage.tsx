import { Grid } from "semantic-ui-react";
import ProfileHEader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { string } from "yup";
import { useStore } from "../../app/store/store";
import { useEffect } from "react";
import LoadingComponents from "../../app/layout/LoadingComponents";
import ProfileHeader from "./ProfileHeader";

export default observer (function ProfilePage(){
    const {username} = useParams<{username:string}>();
    const {profileStore} = useStore();
    const {loadProfile, loadingProfile, profile} =profileStore
    
    useEffect(()=>{
        if(username)loadProfile(username);
    },[loadProfile, username])

    if (loadingProfile) return <LoadingComponents content='Loading Profile.....'/>

    return(
        <Grid>
            <Grid.Column width={16}>
                {profile &&
                <ProfileHeader profile={profile}/>}
                <ProfileContent/>
            </Grid.Column>
        </Grid>
    )
})