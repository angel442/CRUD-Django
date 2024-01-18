import { useEffect, useState } from "react";

export default function Chat() {
    
  //  const [messages, setMessages] = useState([]);
  //  const [inputMessage, setInputMessage] = useState('');

    const [ws, setWs] = useState(null);
    const [onlinePeople, setOnlinePeople] = useState({});

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:4040');
        setWs(ws);
        ws.addEventListener('message', handleMessage)
    }, []);

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
        }
    }

    return (
        <div className="flex h-screen">
            <div className="bg-white-100 w-1/3 pl-4 pt-4 mb-4">
                <div className="text-blue-600 font-bold flex gap-2">
                    Chat logo
                </div>
                {Object.keys(onlinePeople).map(userId => (
                    <div className="border-b border-gray-100 py-2">
                        <div className="w-4 h-4 bg-red-50"></div>
                        {onlinePeople[userId]}
                    </div>
                ))}
            </div>
            <div className="flex flex-col bg-blue-50 w-2/3 p-2">
                <div className="flex-grow">
                    Messages
                </div>
                <div className="flex gap-2 mx-2">
                    <input 
                        type="text" 
                        placeholder="Type your message here"
                        className="bg-white flex-grow border rounded-sm p2"/>
                    <button className="bg-blue-500 p-2 text-white rounded-sm">
                        icon
                    </button>
                </div>
                
            </div>
        </div>
    );
}