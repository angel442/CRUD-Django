import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const UserContext = createContext({});

export function UserContextProvider({children}: {children: JSX.Element}) {
    const [userEmail, setUserEmail] = useState(null);
    const [id, setId] = useState(null);

    useEffect(() => {
        axios.get('/profile', {withCredentials: true}).then(response => {
            console.log("response profile: ", response.data);
            setId(response.data.id);
            setUserEmail(response.data.email);
        })
    }, [])

    return (
        <UserContext.Provider value={{userEmail, setUserEmail, id, setId}}>
            {children}
        </UserContext.Provider>
    );
}

