import { useContext } from "react";
import Register from "./views/Register";
import Chat from "./views/Chat";
import { UserContext } from "./views/UserContext";

export default function Routes() {
    const {userName, id} = useContext(UserContext);

    if (userName) {
        return <Chat />
    }

    return(
        <Register />
    );
}


