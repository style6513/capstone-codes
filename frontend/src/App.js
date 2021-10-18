import React from "react";
import Api from "./Api";
import './App.css';
import jwt from "jsonwebtoken";
import UserContext from "./UserContext";
import Routes from "./Components/Routes/Routes";
import { BrowserRouter as Router } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
function App() {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [infoLoaded, setInfoLoaded] = React.useState(false);
  const [token, setToken] = React.useState(null);
  const [localStorage, setLocalStorageToken] = useLocalStorage("token");

  console.debug(
    "App infoLoaded=", infoLoaded,
    "token=", token,

  )
  React.useEffect(() => {
    console.debug("App useEffect currenUser=", currentUser, "token=", token);
    const getCurrentUser = async () => {
      if(token) {
        try {
          console.log(token);
          
          Api.token = token;
          setLocalStorageToken(token);
          let currentUser = await Api.getUser(username);
          setCurrentUser(currentUser)
        }
        catch(e) {
          console.error(e);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true)
    }
    setInfoLoaded(false);
    getCurrentUser(); 
  }, [token]);

  const signup = async (signupData) => {
    try {
      const token = await Api.register(signupData);
      setToken(token);
      return { success : true };
    } catch(e) {
      console.error(e);
      return { success : false, errors : e };
    }
  }

  const login = async (loginData) => {
    try {
      const token = await Api.login(loginData);
      setToken(token);
      return { success : true };
    } catch(e) {
      console.error(e);
      return { success : false, errors : e }
    }
  } 
  console.debug("currentUser=", currentUser)
  return (
    <Router>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <div className="App">
        {!setInfoLoaded ? <span>Loading...</span> : null }
        <Routes login={login} signup={signup} />
      </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
