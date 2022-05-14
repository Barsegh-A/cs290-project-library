import './App.scss';
import { Routes, Route } from "react-router-dom";
import projectRoutes from "./routes/routes";
import {useEffect, useState} from "react";

function App() {
  const [currentRoutes, setCurrentRoutes] = useState([])

    useEffect(() => {
        routes()
    }, [])

  const routes = () => {
      let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
      const userRoutes = projectRoutes.filter((projectRoute) => (projectRoute.public && !user.role) || projectRoute.permissions.includes(user.role))
      setCurrentRoutes(userRoutes)
  }

  return (
    <div className="App">
      <Routes>
          {currentRoutes.map((route) => (
              <Route path={route.route} element={route.component} key={route.id} />
          ))}
      </Routes>
    </div>
  );
}

export default App;
