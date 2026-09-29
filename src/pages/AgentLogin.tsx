import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const AgentLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) { alert('Enter email and password'); return; }
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) { alert(error.message); return; }
    window.location.href = '/agent/dashboard';
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a1931', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '360px' }}>
        <div style={{ background: '#12264d', padding: '20px', borderRadius: '16px', marginBottom: '16px', border: '1px solid #1e3a6e' }}>
          <p style={{ color: '#c9a86a', fontSize: '10px', letterSpacing: '2px', margin: 0 }}>VITALIS PROPERTY HUB</p>
          <h2 style={{ color: 'white', margin: '4px 0 0 0' }}>Welcome Back,<br/><span style={{ color: '#c9a86a' }}>Agent</span></h2>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '16px' }}>
          <h3 style={{ color: '#0a1931', marginTop: 0 }}>Agent Login</h3>
          <input placeholder="Email Address" value={email} onChange={e=>setEmail(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '10px' }} />
          <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '14px' }} />
          <button onClick={handleLogin} disabled={loading} style={{ width: '100%', background: '#c9a86a', color: 'black', padding: '12px', borderRadius: '8px', border: 'none', fontWeight: 700 }}>{loading ? 'LOGIN...' : 'LOGIN'}</button>
          <p style={{ textAlign: 'center', fontSize: '11px', marginTop: '12px' }}>Don't have an account? <a href="/agent/signup" style={{ color: '#c9a86a', fontWeight: 700 }}>Register</a></p>
        </div>
      </div>
    </div>
  );
};

export default AgentLogin;