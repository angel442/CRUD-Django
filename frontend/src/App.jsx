import io from 'socket.io-client'
import { useState, useEffect } from 'react';


const socket = io('/');

function App() {

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  function sendMessage() {
    setMessages([...messages, {from: 'Me', msg: message}]);
    socket.emit('message', message);
  }

  useEffect(() => {
    socket.on('message', reciveMessage)

    return () => {
      socket.off('message', reciveMessage)
    };
  }, [])

  const reciveMessage = message => setMessages(state => [...state, message]);

  return (
    <div style={{marginLeft: 250}}>
        <input type="text" placeholder='Write your message...' onChange={(e) => setMessage(e.target.value)}/>
        <button onClick={ sendMessage }>Send</button>
        <div>
          <ul>
            {
              messages.map((m, i)=> {
                return (
                  <li key={i}>{m.from}: {m.msg}</li>
                )
              })
            }
          </ul>
        </div>
    </div>
  )
}

export default App;
