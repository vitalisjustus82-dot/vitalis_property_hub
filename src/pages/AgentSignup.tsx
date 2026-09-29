import { supabase } from '../lib/supabase';
import React, { useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';

const AgentSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password) { alert('Fill all fields'); return; }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: { data: { full_name: fullName } }
    });
    setLoading(false);
    if (error) {
      alert(error.message);
    } else {
      alert('Account created! Check your email to confirm, then login.');
      window.location.href = '/agent/login';
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen style={{ '--background': '#0a1931' } as any}>
        <div style={{ minHeight: '100vh', background: '#0a1931', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#132a54', padding: '20px 25px', borderRadius: '18px', width: '100%', maxWidth: '400px', marginBottom: '20px' }}>
            <div style={{ color: '#c9a86a', fontSize: '11px', letterSpacing: '1.5px', fontWeight: 700 }}>VITALIS PROPERTY HUB</div>
            <div style={{ color: 'white', fontSize: '26px', fontWeight: 700, marginTop: '5px' }}>Create Account,</div>
            <div style={{ color: '#c9a86a', fontSize: '26px', fontWeight: 700 }}>Agent</div>
          </div>
          <div style={{ background: 'white', borderRadius: '18px', padding: '25px', width: '100%', maxWidth: '400px' }}>
            <div style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px', color: '#0a1931' }}>Agent Signup</div>
            <input value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="Full Name" style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #ddd', background: '#eef2ff', marginBottom: '12px' }} />
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email e.g. james@gmail.com" style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #ddd', background: '#eef2ff', marginBottom: '12px' }} />
            <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password (min 6 chars)" style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #ddd', background: '#eef2ff', marginBottom: '16px' }} />
            <button onClick={handleSignup} disabled={loading} style={{ width: '100%', background: '#c9a86a', color: 'black', border: 'none', padding: '14px', borderRadius: '10px', fontWeight: 800, cursor: 'pointer' }}>{loading ? 'CREATING...' : 'SIGN UP'}</button>
            <div style={{ textAlign: 'center', marginTop: '15px', fontSize: '13px' }}>Already have an account? <a href="/agent/login" style={{ color: '#c9a86a', fontWeight: 700 }}>Login</a></div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
export default AgentSignup;