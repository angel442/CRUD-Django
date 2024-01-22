import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const UserContext = createContext({});

export function UserContextProvider({children}: {children: JSX.Element}) {
    const [userName, setUserName] = useState(null);
    const [id, setId] = useState(null);

    useEffect(() => {
        axios.get('/profile', {withCredentials: true}).then(response => {
            console.log("response profile: ", response.data);
            setId(response.data.id);
            setUserName(response.data.username);
        })
    }, [])

    return (
        <UserContext.Provider value={{userName, setUserName, id, setId}}>
            {children}
        </UserContext.Provider>
    );
}

