import { observer } from "mobx-react-lite";
import { Profile } from "../../app/models/profile";
import { Card, CardContent, CardHeader, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

interface Props {
    profile:Profile;
}

export default observer(function ProfileCard({profile}:Props){
    return (
        <Card as={Link} to={`/profile/${profile.username}`}>
        <Image src={profile.image || '/assets/user.png'}/>
        <CardContent>
            <CardHeader> {profile.displayName} </CardHeader>
            <CardHeader> Bio goes here </CardHeader>
        </CardContent>
        <Card.Content extra>
            <Icon name='user'/>
            20 followers
        </Card.Content>
        </Card>
    )
})