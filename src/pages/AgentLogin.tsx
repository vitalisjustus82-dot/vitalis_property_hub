import { supabase } from '../lib/supabase';
import React, { useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';

const AgentLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) { alert('Enter email and password'); return; }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) alert(error.message);
    else window.location.href = '/agent/dashboard';
  };

  return (
    <IonPage>
      <IonContent fullscreen style={{ '--background': '#0a1931' } as any}>
        <div style={{ minHeight: '100vh', background: '#0a1931', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#132a54', padding: '20px 25px', borderRadius: '18px', width: '100%', maxWidth: '400px', marginBottom: '20px' }}>
            <div style={{ color: '#c9a86a', fontSize: '11px', letterSpacing: '1.5px', fontWeight: 700 }}>VITALIS PROPERTY HUB</div>
            <div style={{ color: 'white', fontSize: '26px', fontWeight: 700, marginTop: '5px' }}>Welcome Back,</div>
            <div style={{ color: '#c9a86a', fontSize: '26px', fontWeight: 700 }}>Agent</div>
          </div>
          <div style={{ background: 'white', borderRadius: '18px', padding: '25px', width: '100%', maxWidth: '400px' }}>
            <div style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px', color: '#0a1931' }}>Agent Login</div>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" autoComplete="off" style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #ddd', background: '#eef2ff', marginBottom: '12px' }} />
            <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" autoComplete="new-password" style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #ddd', background: '#eef2ff', marginBottom: '16px' }} />
            <button onClick={handleLogin} disabled={loading} style={{ width: '100%', background: '#c9a86a', color: 'black', border: 'none', padding: '14px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer' }}>{loading ? 'LOGIN...' : 'LOGIN'}</button>
            <p style={{ textAlign: 'center', fontSize: '11px', marginTop: '12px' }}>Don't have an account? <a href="/agent/signup" style={{ color: '#c9a86a', fontWeight: 700, cursor: 'pointer' }}>Register</a></p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
export default AgentLogin;