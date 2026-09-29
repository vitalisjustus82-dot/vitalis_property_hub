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
  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: '#0f2347',
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      padding: '8px 0 12px 0', zIndex: 9999,
      borderTop: '1px solid rgba(255,255,255,0.1)'
    }}>
      <a href="/" style={{ textDecoration: 'none', color: path === '/' || path === '/home' ? '#d4af37' : 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '12px', gap: '3px' }}>
        <span style={{ fontSize: '22px', lineHeight: '22px' }}>⌂</span> Home
      </a>
      <a href="/apartments" style={{ textDecoration: 'none', color: path.includes('/apartments') ? '#d4af37' : 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '12px', gap: '3px' }}>
        <span style={{ fontSize: '20px', lineHeight: '22px' }}>🏢</span> Apartments
      </a>
      <a href="/contact" style={{ textDecoration: 'none', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '12px', gap: '3px' }}>
        <span style={{ fontSize: '20px', lineHeight: '22px', border: '1.5px solid white', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>i</span> About
      </a>
      <a href="/contact" style={{ textDecoration: 'none', color: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', fontSize: '12px', gap: '3px' }}>
        <span style={{ fontSize: '20px', lineHeight: '22px' }}>📞</span> Contact
      </a>
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