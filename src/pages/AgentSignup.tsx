import React, { useState } from 'react';
import { IonPage, IonContent, IonInput, IonButton } from '@ionic/react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const AgentSignup: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!fullName || !email || !password || !phone) { alert('Fill all fields'); return; }
    if (!agree) { alert('You must agree to policy'); return; }
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      const { error: dbError } = await supabase.from('agents').insert([{ full_name: fullName, phone, whatsapp, email }]);
      if (dbError) throw dbError;
      alert('Account created! Now login');
      window.location.href = '/agent/login';
    } catch (err: any) {
      alert(err.message || 'Failed to fetch - check Supabase keys in Vercel');
    }
    setLoading(false);
  };

  return (
    <IonPage>
      <IonContent style={{ '--background': '#0a1931' } as any} className="ion-padding">
        <div style={{ maxWidth: '380px', margin: '20px auto', background: 'white', padding: '20px', borderRadius: '16px' }}>
          <h2 style={{ color: '#0a1931' }}>Create Agent Account</h2>
          <IonInput placeholder="Full Name" value={fullName} onIonInput={e=>setFullName((e.target as any).value)} style={{ border: '1px solid #ddd', borderRadius: '8px', marginBottom: '10px', '--padding-start': '12px' } as any} />
          <IonInput placeholder="Phone 070..." value={phone} onIonInput={e=>setPhone((e.target as any).value)} style={{ border: '1px solid #ddd', borderRadius: '8px', marginBottom: '10px', '--padding-start': '12px' } as any} />
          <IonInput placeholder="WhatsApp" value={whatsapp} onIonInput={e=>setWhatsapp((e.target as any).value)} style={{ border: '1px solid #ddd', borderRadius: '8px', marginBottom: '10px', '--padding-start': '12px' } as any} />
          <IonInput placeholder="Email Address" type="email" value={email} onIonInput={e=>setEmail((e.target as any).value)} style={{ border: '1px solid #ddd', borderRadius: '8px', marginBottom: '10px', '--padding-start': '12px' } as any} />
          <IonInput placeholder="Password" type="password" value={password} onIonInput={e=>setPassword((e.target as any).value)} style={{ border: '1px solid #ddd', borderRadius: '8px', marginBottom: '10px', '--padding-start': '12px' } as any} />
          
          <div style={{ background: '#fef9e7', padding: '10px', borderRadius: '8px', fontSize: '10px', marginBottom: '12px', border: '1px solid #f5e6a3' }}>
            <b>AGENT COMMISSION POLICY</b><br/>By registering, you agree: When client finds apartment through website and you receive 10% agency fee, 10% fee shall be shared: Website Owner (20%) and Agent (80%).
            <div style={{ marginTop: '8px' }}><label><input type="radio" checked={agree} onChange={()=>setAgree(true)} /> Agree</label> <label style={{ marginLeft: '10px' }}><input type="radio" checked={!agree} onChange={()=>setAgree(false)} /> Disagree</label></div>
          </div>

          <IonButton expand="block" onClick={handleSignup} disabled={loading} style={{ '--background': '#c9a86a', '--color': '#000' } as any}>{loading ? 'CREATING...' : 'Create Account'}</IonButton>
          <p style={{ textAlign: 'center', fontSize: '11px', marginTop: '10px' }}>Already have an account? <a href="/agent/login" style={{ color: '#c9a86a', fontWeight: 700 }}>Login</a></p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AgentSignup;