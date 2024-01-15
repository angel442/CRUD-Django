import { useContext } from "react";
import Register from "./views/Register";
import Chat from "./views/Chat";
import { UserContext } from "./views/UserContext";

export default function Routes() {
    const {userEmail, id} = useContext(UserContext);

    if (userEmail) {
        return <Chat />
    }

    return(
        <Register />
    );
}


