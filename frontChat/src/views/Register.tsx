import axios from "axios";
import { useContext, useState } from "react"
import { UserContext } from "./UserContext";


function Register() {

    const [name, setName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const [isLoginOrRegister, setIsLoginOrRegister] = useState('register');

    const {setUserEmail, setId} = useContext(UserContext);
    
    //TODO duplicar per fer un login i utilitzar un router de veritat
    async function register(ev: Event) {
      ev.preventDefault();

      if (isLoginOrRegister === 'register') {
        //TODO check if the password === pasword2
        const response = await axios.post('/register', {name, secondName, email, password, userName});
        setUserEmail(email);
        setId(response.data.id);
      }
      else {
        const response = await axios.post('/login', {email, password});
        console.log("loggin: ", response);
        console.log("email: ", email);
        setUserEmail(email);
        setId(response.data.id);
      }
      //TODO control of register and login errors bad passward bad email ...
    }


    return (
      <div className="bg-blue-50 h-screen flex items-center">
        <form className="w-64 mx-auto mb-12" onSubmit={register}>
            <input value={name} 
              onChange={ev => setName(ev.target.value)} 
              type="text" 
              placeholder="First name" 
              className="block w-full rounded-sm p-2 mb-2 border"/>
            <input value={secondName} 
              onChange={ev => setSecondName(ev.target.value)} 
              type="text" 
              placeholder="Second name" 
              className="block w-full rounded-sm p-2 mb-2 border"/>
            <input value={userName} 
              onChange={ev => setUserName(ev.target.value)} 
              type="text" 
              placeholder="Username" 
              className="block w-full rounded-sm p-2 mb-2 border"/> 
            <input value={email} 
              onChange={ev => setEmail(ev.target.value)} 
              type="text" 
              placeholder="Email" 
              className="block w-full rounded-sm p-2 mb-2 border"/>
            <input 
              value={password} 
              onChange={ev => setPassword(ev.target.value)} 
              type="password" 
              placeholder="Password" 
              className="block w-full rounded-sm p-2 mb-2 border"/>
            <input 
              value={password2} 
              onChange={ev => setPassword2(ev.target.value)} 
              type="password" 
              placeholder="Confirm password" 
              className="block w-full rounded-sm p-2 mb-2 border"/>
              
            <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
              {isLoginOrRegister === 'register' ? 'Register' : 'Loggin'}
            </button>
            <div className="text-center mt-2">
              {isLoginOrRegister == 'register' && (
                <div>
                  Already a member? 
                  <button onClick={() => setIsLoginOrRegister('login')}>
                    Login here
                  </button>
                </div>
              )}
              {isLoginOrRegister == 'login' && (
                <div>
                  Dont have an account? 
                  <button onClick={() => setIsLoginOrRegister('register')}>
                    Register here
                  </button>
                </div>
              )}
            </div>
        </form>
      </div>
    )
  }
  
  export default Register
  