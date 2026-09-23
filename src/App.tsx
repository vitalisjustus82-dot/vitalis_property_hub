import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  homeOutline,
  businessOutline,
  informationCircleOutline,
  callOutline,
} from "ionicons/icons";

import Home from "./pages/Home";
import Apartments from "./pages/Apartments";
import ApartmentDetail from "./pages/ApartmentDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AgentLogin from "./pages/AgentLogin";
import AgentSignup from "./pages/AgentSignup";
import AgentDashboard from "./pages/AgentDashboard";
import ApartmentForm from "./pages/admin/ApartmentForm";

setupIonicReact({
  mode: "md",
});

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
          <Route exact path="/admin/login" component={AdminLogin} />
          <Route exact path="/admin" component={AdminDashboard} />
          <Route exact path="/admin/apartments/new" component={ApartmentForm} />
          <Route
            exact
            path="/admin/apartments/:id/edit"
            component={ApartmentForm}
          />
          <Route exact path="/agent/login" component={AgentLogin} />
          <Route exact path="/agent/register" component={AgentSignup} />
          <Route exact path="/agent/dashboard" component={AgentDashboard} />
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>

        <IonTabBar slot="bottom" color="secondary">
          <IonTabButton tab="home" href="/home">
            <IonIcon aria-hidden="true" icon={homeOutline} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="apartments" href="/apartments">
            <IonIcon aria-hidden="true" icon={businessOutline} />
            <IonLabel>Apartments</IonLabel>
          </IonTabButton>
          <IonTabButton tab="about" href="/about">
            <IonIcon aria-hidden="true" icon={informationCircleOutline} />
            <IonLabel>About</IonLabel>
          </IonTabButton>
          <IonTabButton tab="contact" href="/contact">
            <IonIcon aria-hidden="true" icon={callOutline} />
            <IonLabel>Contact</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
