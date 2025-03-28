import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Switch } from "react-router-dom";  // ✅ Keep using Switch for React Router v5
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails";
import JobApplication from "./pages/JobApplication";
import NotFound from "./pages/NotFound";
import { JobProvider } from "./context/JobContext";
import Navbar from "./Components/Navbar";
import About from "./pages/About";

import "@ionic/react/css/core.css";

function App() {
  return (
    <IonApp>
      <JobProvider>
        <IonReactRouter>
          <Navbar />
          <IonRouterOutlet>
            <Switch> 
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/job/:id" component={JobDetails} />
              <Route path="/apply/:id" component={JobApplication} />
              <Route component={NotFound} /> 
            </Switch>
          </IonRouterOutlet>
        </IonReactRouter>
      </JobProvider>
    </IonApp>
  );
}

export default App;





