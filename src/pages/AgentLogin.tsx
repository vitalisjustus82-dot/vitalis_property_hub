import React, { useState, useEffect } from 'react';
import { IonPage, IonContent, IonInput, IonButton } from '@ionic/react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://yqegkmiqxlcgbkihxzdn.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxZWdrbWlxeGxjZ2JraWh4emRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzNDE4MTgsImV4cCI6MjA3MzkxNzgxOH0.Qs1K3VX3KXaQwQy2b3cQ1x2y3z1x' // REPLACE with your real anon key from supabase.ts
);

const AgentLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // kill chrome autofill
    setTimeout(() => { setEmail(''); setPassword(''); }, 100);
  }, []);

  const handleLogin = async () => {
    setEmailError(''); setPassError('');
    if (!email) { setEmailError('Enter your email'); return; }
    if (!password) { setPassError('Enter your password'); return; }

    setLoading(true);
    // 1. Check if email exists in agents table
    const { data: agent } = await supabase.from('agents').select('email').eq('email', email).single();
    
    if (!agent) {
      setEmailError('Wrong email - account not found');
      setLoading(false); return;
    }

    // 2. Try supabase auth login
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setPassError('Wrong password');
      setLoading(false); return;
    }

    alert('Login successful!');
    setLoading(false);
    // window.location.href = '/agent/dashboard';
  };

  const inputStyle = (hasError: boolean) => ({
    border: hasError ? '1.5px solid #ef4444' : '1px solid #e5e7eb',
    borderRadius: '10px',
    '--padding-start': '16px',
    '--padding-end': '12px',
    '--padding-top': '13px',
    '--padding-bottom': '13px',
    '--placeholder-color': '#9ca3af',
    '--placeholder-opacity': '1',
    fontSize: '13px',
    background: hasError ? '#fef2f2' : 'white',
    marginBottom: '4px'
  } as any);

  return (
    <IonPage>
      <IonContent style={{ '--background': '#0a1931' } as any} className="ion-padding">
        <div style={{ maxWidth: '380px', margin: '40px auto' }}>
          <div style={{ background: '#112240', border: '1px solid #1e3a5f', padding: '18px', borderRadius: '16px', marginBottom: '16px' }}>
            <p style={{ color: '#c9a86a', fontSize: '8px', letterSpacing: '2px', margin: 0, fontWeight: 700 }}>VITALIS PROPERTY HUB</p>
            <h2 style={{ color: 'white', margin: '6px 0 0 0', fontSize: '22px' }}>Welcome Back,<br/><span style={{ color: '#c9a86a' }}>Agent</span></h2>
          </div>

          <div style={{ background: 'white', padding: '22px', borderRadius: '16px' }}>
            <h3 style={{ margin: '0 0 16px 0', color: '#0a1931', fontSize: '18px' }}>Agent Login</h3>
            
            <form autoComplete="off">
              <input type="text" style={{ display: 'none' }} />
              <input type="password" style={{ display: 'none' }} />

              <IonInput 
                placeholder="Email Address" 
                type="text"
                autocomplete="off"
                name="vph_no_fill_email_123"
                value={email} 
                onIonInput={e=>{ setEmail((e.target as any).value); setEmailError(''); }} 
                style={inputStyle(!!emailError)} 
              />
              {emailError && <p style={{ color: '#ef4444', fontSize: '11px', margin: '0 0 10px 4px', fontWeight: 600 }}>{emailError}</p>}

              <IonInput 
                placeholder="Password" 
                type="password"
                autocomplete="new-password"
                name="vph_no_fill_pass_123"
                value={password} 
                onIonInput={e=>{ setPassword((e.target as any).value); setPassError(''); }} 
                style={inputStyle(!!passError)} 
              />
              {passError && <p style={{ color: '#ef4444', fontSize: '11px', margin: '0 0 10px 4px', fontWeight: 600 }}>{passError}</p>}
            </form>

            <IonButton onClick={handleLogin} expand="block" disabled={loading} style={{ '--background': '#c9a86a', '--color': '#000', marginTop: '12px', height: '42px', fontWeight: 700, fontSize: '13px' } as any}>
              {loading ? 'Checking...' : 'Login'}
            </IonButton>
            <p style={{ textAlign: 'center', fontSize: '11px', marginTop: '12px', color: '#6b7280' }}>
  Don't have an account? <a href="/agent/signup" style={{ color: '#c9a86a', fontWeight: 700, textDecoration: 'none' }}>Register</a>
</p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AgentLogin;