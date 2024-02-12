import Avatar from "../../../components/Avatar/Avatar";
import { defaultAvatar } from "../../../constants/constants";

export default function SetAvatar () {
    return <>
    <Avatar Width="150px" Height="150px" url={defaultAvatar} />
    </>
}