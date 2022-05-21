import './App.scss';
import { Routes, Route } from "react-router-dom";
import projectRoutes from "./routes/routes";
import {useEffect, useState} from "react";
import {UserContext} from "./context/UserContext";

function App() {
  const [currentRoutes, setCurrentRoutes] = useState([])
  const [user, setUser] = useState({
      user: {},
      token: ''
  })

    useEffect(() => {
        routes()
    }, [user])

    const getUserData = () => {
      return user.user.email ? user.user : localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
    }

  const routes = () => {
      let userData = getUserData()
      const userRoutes = projectRoutes.filter((projectRoute) => (projectRoute.public && !userData.role) || projectRoute.permissions.includes(userData.role))
      setCurrentRoutes(userRoutes)
  }

  return (
      <UserContext.Provider value={user}>
          <div className="App">
              <Routes>
                  {currentRoutes.map((route) => {
                      const Component = route.component.type
                      return <Route exact path={route.route} element={<Component user={getUserData()} setUser={setUser} />} key={route.id}  />
                  })}
              </Routes>
          </div>
      </UserContext.Provider>
  );
}

export default App;
