import React, { useState, useCallback, useEffect } from "react";
import User from "./Users/Pages/User";
import Auth from "./Users/Pages/Auth";
import Chat from "./MyUser/Pages/Chat";
import Profile from './MyUser/Pages/Profile';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import MainNavigation from "./Shared/Navigation/MainNavigation";
import { AuthContext } from "./Shared/Context/AuthContext";
function App() {
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
    
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }

    if (storedData && new Date(storedData.expiration) <= new Date()) {
      logout();
    }
  }, [login]);

  let pages;

  if(!token){
    pages = (
      <Switch>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  } else {
    pages = (
      <Switch>
        <Route path="/" exact>
          <User />
        </Route>
        <Route path="/:uid/chat" exact>
          <Chat />
        </Route>
        <Route path="/:uid/profile" exact>
          <Profile />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <BrowserRouter>
        <MainNavigation />
        <main>{pages}</main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
