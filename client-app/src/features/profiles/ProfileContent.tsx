import { Tab } from "semantic-ui-react"
import ProfilePhotos from "./ProfilePhotos";
import { Profile } from "../../app/models/profile";

interface Props {
    profile:Profile;
}

export default function ProfileContent({profile}:Props){
    const penes= [
        {menuItem:'About', render:() => <Tab.Pane>About Content</Tab.Pane>},
        {menuItem:'Photos', render:() => <ProfilePhotos profile={profile}/>},
        {menuItem:'Events', render:() => <Tab.Pane>Events Content</Tab.Pane>},
        {menuItem:'Followers', render:() => <Tab.Pane>Followers Content</Tab.Pane>},
        {menuItem:'Follow', render:() => <Tab.Pane>Follow Content</Tab.Pane>},
    ];
    return(
        <Tab
            menu={{fluid:true, vertical:true}}
            menuPosition='right'
            panes={penes}
        />
    )
}