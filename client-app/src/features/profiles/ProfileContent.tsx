import { Tab } from "semantic-ui-react"
import ProfilePhotos from "./ProfilePhotos";
import { Profile } from "../../app/models/profile";
import ProfileAbout from "./ProfileAbout";
import ProfileFollowings from "./ProfileFollowings";
import { useStore } from "../../app/store/store";
import ProfileActivities from "./ProfileActivities";

interface Props {
    profile:Profile;
}

export default function ProfileContent({profile}:Props){
    const {profileStore} = useStore();
    const penes= [
        {menuItem:'About', render:() => <ProfileAbout/>},
        {menuItem:'Photos', render:() => <ProfilePhotos profile={profile}/>},
        {menuItem:'Events', render:() =>  <ProfileActivities />},
        {menuItem:'Followers', render:() => <ProfileFollowings/>},
        {menuItem:'Following', render:() => <ProfileFollowings/>},
    ];
    return(
        <Tab
            menu={{fluid:true, vertical:true}}
            menuPosition='right'
            panes={penes}
            onTabChange={(e, data)=>profileStore.setActiveTab(data.activeIndex)}
        />
    )
}