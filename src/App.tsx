import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Apartments from './pages/Apartments';
import ApartmentDetail from './pages/ApartmentDetail';
import Contact from './pages/Contact';
import AgentSignup from './pages/AgentSignup';
import AgentLogin from './pages/AgentLogin';
import AgentDashboard from './pages/AgentDashboard';
import AgentProfile from './pages/AgentProfile';
import '@ionic/react/css/core.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/"><Home /></Route>
        <Route exact path="/apartments"><Apartments /></Route>
        <Route exact path="/apartments/:id"><ApartmentDetail /></Route>
        <Route exact path="/contact"><Contact /></Route>
        <Route exact path="/agent/signup"><AgentSignup /></Route>
        <Route exact path="/agent/login"><AgentLogin /></Route>
        <Route exact path="/agent/dashboard"><AgentDashboard /></Route>
        <Route exact path="/agent/profile"><AgentProfile /></Route>
        <Route exact path="/home"><Redirect to="/" /></Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;