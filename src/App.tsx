import React from 'react';
import { Route } from 'react-router-dom';
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

const BottomNav: React.FC = () => {
  const path = window.location.pathname;
  if (path.startsWith('/agent')) return null;
  const active = (p: string) => path === p || (p !== '/' && path.includes(p)) ? '#c9a86a' : '#ffffff';
  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#0a1931', display: 'flex', justifyContent: 'space-around', padding: '10px 0 14px 0', zIndex: 9999, borderTop: '1px solid #1e3a6e' }}>
      <a href="/" style={{ color: active('/'), textDecoration: 'none', textAlign: 'center', fontSize: '11px', fontWeight: 600 }}><div style={{ fontSize: '18px' }}>⌂</div>Home</a>
      <a href="/apartments" style={{ color: active('/apartments'), textDecoration: 'none', textAlign: 'center', fontSize: '11px', fontWeight: 600 }}><div style={{ fontSize: '18px' }}>⊞</div>Apartments</a>
      <a href="/contact" style={{ color: active('/contact'), textDecoration: 'none', textAlign: 'center', fontSize: '11px', fontWeight: 600 }}><div style={{ fontSize: '18px' }}>ⓘ</div>About</a>
      <a href="/contact" style={{ color: active('/contact'), textDecoration: 'none', textAlign: 'center', fontSize: '11px', fontWeight: 600 }}><div style={{ fontSize: '18px' }}>☎</div>Contact</a>
    </div>
  );
};

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/"><Home /></Route>
        <Route exact path="/home"><Home /></Route>
        <Route exact path="/apartments"><Apartments /></Route>
        <Route exact path="/apartments/:id"><ApartmentDetail /></Route>
        <Route exact path="/contact"><Contact /></Route>
        <Route exact path="/agent/signup"><AgentSignup /></Route>
        <Route exact path="/agent/login"><AgentLogin /></Route>
        <Route exact path="/agent/dashboard"><AgentDashboard /></Route>
        <Route exact path="/agent/profile"><AgentProfile /></Route>
      </IonRouterOutlet>
      <BottomNav />
    </IonReactRouter>
  </IonApp>
);

export default App;