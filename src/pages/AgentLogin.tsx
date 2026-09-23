import { IonPage, IonContent, IonInput } from '@ionic/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const AgentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <IonPage>
      <IonContent fullscreen style={{ '--background': '#0F1E3A' } as any}>
        <div style={{ minHeight: '100vh', background: '#0F1E3A', display: 'flex', justifyContent: 'center', padding: '20px 15px' }}>
          <div style={{ width: '100%', maxWidth: '400px', borderRadius: '20px', overflow: 'hidden', height: 'fit-content' }}>
            <div style={{ background: '#0F1E3A', padding: '30px 25px', color: 'white' }}>
              <div style={{ color: '#E7C873', letterSpacing: '2px', fontSize: '10px', fontWeight: '700' }}>VITALIS PROPERTY HUB</div>
              <h1 style={{ fontSize: '28px', margin: '12px 0 0 0', fontWeight: '800' }}>Welcome Back,<br/><span style={{ color: '#E7C873' }}>Agent</span></h1>
              <p style={{ opacity: 0.7, margin: '12px 0 0 0', fontSize: '13px' }}>Manage your listings and grow your business in Calabar.</p>
            </div>
            <div style={{ background: 'white', padding: '25px' }}>
              <h2 style={{ color: '#0F1E3A', fontWeight: '800', margin: 0 }}>Agent Login</h2>
              <p style={{ color: '#888', fontSize: '12px', margin: '6px 0 20px 0' }}>Enter your credentials to continue</p>
              <IonInput placeholder="Email" value={email} onIonChange={e => setEmail(e.detail.value!)} style={{ border: '1.5px solid #E5E5E5', borderRadius: '10px', padding: '4px 12px', marginBottom: '12px' }} />
              <IonInput placeholder="Password" type="password" value={password} onIonChange={e => setPassword(e.detail.value!)} style={{ border: '1.5px solid #E5E5E5', borderRadius: '10px', padding: '4px 12px', marginBottom: '18px' }} />
              <button style={{ width: '100%', height: '48px', background: '#E7C873', color: '#000', border: 'none', borderRadius: '10px', fontWeight: '800', fontSize: '15px' }}>Login</button>
              <div style={{ textAlign: 'center', marginTop: '18px', fontSize: '13px' }}>Don't have an account? <Link to="/agent/signup" style={{ color: '#E7C873', fontWeight: '800', textDecoration: 'none', marginLeft: '4px' }}>Register</Link></div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
export default AgentLogin;