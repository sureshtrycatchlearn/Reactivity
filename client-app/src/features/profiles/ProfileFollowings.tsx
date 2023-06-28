import { observer } from "mobx-react-lite";
import { useStore } from "../../app/store/store";
import { Card, Grid, Header, Tab } from "semantic-ui-react";
import ProfileCard from "./ProfileCard";

export default observer (function ProfileFollowings(){
    const {profileStore} = useStore();
    const {profile, followings, loadingFollowings, activeTab } = profileStore;


    return(
        <Tab.Pane loading={loadingFollowings}>
            <Grid>
                <Grid.Column width={16}>
                    <Header 
                        floated='left' 
                        icon='user' 
                        content={activeTab===3 ?`People Following ${profile?.displayName}`:`People ${profile?.displayName} is Following`}/>
                </Grid.Column >
                <Grid.Column width={16}>
                    <Card.Group itemsPerRow='5'>
                    <h1>Suresh{profile?.username} {profile?.followersCount} {profile?.followingCount}</h1>
                        {followings.map(profile=>(
                            <ProfileCard key={profile.username} profile={profile}/>
                        ))}
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})