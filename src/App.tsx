import React from 'react';
import { IonApp, IonRouterOutlet, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Apartments from './pages/Apartments';
import ApartmentDetail from './pages/ApartmentDetail';
import AgentLogin from './pages/AgentLogin';
import AgentSignup from './pages/AgentSignup';
import AgentProfile from './pages/AgentProfile';
import AgentDashboard from './pages/AgentDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ApartmentForm from './pages/admin/ApartmentForm';

setupIonicReact({ mode: "md" });

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/home" component={Home} />
          <Route exact path="/apartments" component={Apartments} />
          <Route exact path="/apartments/:id" component={ApartmentDetail} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/agent/login" component={AgentLogin} />
          <Route exact path="/agent/signup" component={AgentSignup} />
          <Route path="/agent/profile" component={AgentProfile} exact />
          <Route exact path="/agent/register" component={AgentSignup} />
          <Route exact path="/agent/dashboard" component={AgentDashboard} />
          <Route exact path="/admin/login" component={AdminLogin} />
          <Route exact path="/admin/dashboard" component={AdminDashboard} />
          <Route exact path="/admin/apartments/new" component={ApartmentForm} />
          <Route exact path="/" render={() => <Redirect to="/home" />} />
        </IonRouterOutlet>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;