import { useContext, useEffect, useState, useRef } from "react";
import Avatar from "../components/Avatar";
import Logo from "../components/Logo";
import { UserContext } from "./UserContext";
import axios from "axios";

export default function Chat() {

    const [ws, setWs] = useState(null);
    const [onlinePeople, setOnlinePeople] = useState({});
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [newMessageText, setNewMessageText] = useState('');
    const [messages, setMessages] = useState([]);

    const messagesBoxRef = useRef();
    
    const {id} = useContext(UserContext);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:4040');
        setWs(ws);
        ws.addEventListener('message', handleMessage)
    }, []);

    useEffect(() => {
        const div = messagesBoxRef.current;
        if (div) {
            div.scrollIntoView({behavior: 'smooth', block: 'end'});
        }    
    }, [messages]);


    useEffect(() => {
        if (selectedUserId) {
            console.log("user selected: ", selectedUserId);

            axios.get('/messages/'+selectedUserId).then(response => {
                setMessages(response.data.reverse());
            })
        }
    }, [selectedUserId])    


    function showOnlinePeople(peopleArr) {
        const people = {};
        peopleArr.forEach(({userId, username}) => {
            people[userId] = username;
        })
        setOnlinePeople(people);
    }

    function handleMessage(ev) {
        const messageData = JSON.parse(ev.data);
        if ('online' in messageData) {
            showOnlinePeople(messageData.online);
        } else if ('text' in messageData) {
            setMessages(prev => ([...prev, {...messageData}]));
        }
    }

    function sendMessage(ev) {
        ev.preventDefault();
        ws.send(JSON.stringify({
                recipient: selectedUserId,
                text: newMessageText,
        }));
        setNewMessageText('');
        setMessages(prev => ([...prev, {
            text: newMessageText, 
            sender: id,
            recipient: selectedUserId,
        }]));
    }


    function getMessagesWithoutDupes(): {text: String, isOur: boolean} {
        const uniqueSet = new Set();

        return messages.filter((m) => {
            const key = `${m.text}_${m.isOur}`;
            if (!uniqueSet.has(key)) {
                uniqueSet.add(key);
                return true;
            }
            return false;
        })
    }

    const onlinePeopleExclMe = {...onlinePeople};
    delete onlinePeopleExclMe[id];

    const messagesWithoutDupes = getMessagesWithoutDupes();

    return (
        <div className="flex h-screen">
            <div className="bg-white-100 w-1/3 mb-4">
                <Logo />

                {Object.keys(onlinePeopleExclMe).map(userId => (
                    <div 
                        key={userId}
                        onClick={() => setSelectedUserId(userId)} 
                        className={"border-b border-gray-100 flex items-center gap-2 cursor-pointer" + (userId === selectedUserId ? 'bg-blue-50' : '')}>
                        {userId === selectedUserId && (
                            <div className="w-1 bg-blue-500 h-12 rounded-r-md"></div>
                        )}
                        <div className="flex gap-2 py-2 pl-4 items-center">
                            <Avatar username={onlinePeople[userId]} userId={userId}/>
                            <span className="text-gray-800"> {onlinePeople[userId]} </span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex flex-col bg-blue-50 w-2/3 p-2">
                <div className="flex-grow">
                    {!selectedUserId  && (
                        <div className="flex flex-grow h-full items-center justify-center">
                            <div className="text-gray-400">&larr; Select a person from the sidebar</div>
                        </div>
                    )}
                    {!!selectedUserId && (
                        <div className="relative h-full ">
                            <div className="overflow-y-scroll absolute top-0 left-0 right-0 bottom-2">
                                {messagesWithoutDupes.map(message => (
                                    <div key={message.id} className={(message.sender === id ? 'text-right mr-2' : 'text-left')}>
                                        <div className={"text-left inline-block p-2 my-2 rounded-sm text-sm "+ (message.sender === id ? 'bg-blue-200' : 'bg-red-200')}>
                                            {message.text}
                                        </div>
                                    </div> 
                                ))}
                                <div  ref={messagesBoxRef}></div>
                            </div>
                        </div>
                    )}
                </div>
                {!!selectedUserId && (
                    <form className="flex gap-2 mx-2" onSubmit={sendMessage}>
                    <input 
                        type="text" 
                        value={newMessageText}
                        onChange={ev => setNewMessageText(ev.target.value)}
                        placeholder="Type your message here"
                        className="bg-white flex-grow border rounded-sm p2"/>
                    <button type="submit" className="bg-blue-500 p-2 text-white rounded-sm">
                        icon
                    </button>
                </form>
                )}
            </div>
        </div>
    );
}