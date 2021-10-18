import React, {useState, useEffect} from "react";
import Api from "./Api";
import './App.css';
import jwt from "jsonwebtoken";
import UserContext from "./UserContext";
import Routes from "./Components/Routes/Routes";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import NavbarComponent from "./Components/NavBar/NavBar";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [token, setToken] = useState(null);
  const [localStorage, setLocalStorageToken] = useLocalStorage("token");

  

  useEffect(() => {
    console.log("App useEffect currenUser=", currentUser, "token=", token);

    const getCurrentUser = async () => {
      if (token) {
        try {
          console.log(token);
          console.log("decoded toekn=", jwt.decode(token))
          Api.token = token;
          setLocalStorageToken(token);
          const { username } = jwt.decode(token);
          let currentUser = await Api.getUser(username);
          setCurrentUser(currentUser)
        }
        catch (e) {
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
      return { success: true };
    } catch (e) {
      console.error(e);
      return { success: false, errors: e };
    }
  }

  const login = async (loginData) => {
    try {
      const token = await Api.login(loginData);
      setToken(token);
      return { success: true };
    } catch (e) {
      console.error(e);
      return { success: false, errors: e }
    }
  }
  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    setLocalStorageToken(null);
  }
  console.log("currentUser=", currentUser)
  console.log(
    "App infoLoaded=", infoLoaded,
    "token=", token,
    "currentUser=", currentUser
  )
  return (
    <Router>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <div className="App">
          {!setInfoLoaded ? <span>Loading...</span> : null}
          <NavbarComponent logout={logout} />
          <Routes login={login} signup={signup} />
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
