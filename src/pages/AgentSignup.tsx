import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { IonPage, IonContent, IonInput, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const AgentSignup: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSignup = async () => {
  if (!fullName || !phone || !email || !password) {
    alert('Please fill all fields'); return;
  }
  if (agree !== 'agree') {
    alert('You must AGREE to the commission policy to create account. If you Disagree, you cannot register.');
    return;
  }
  setLoading(true);
  try {
    // 1. Create auth user first
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) throw signUpError;
    
    const userId = data.user?.id;
    if (!userId) throw new Error("Signup failed - no user id");

    // 2. Then create profile with that id
    const { error } = await (supabase.from("profiles") as any).insert({
      id: userId,
      full_name: fullName,
      phone_number: phone,
      whatsapp_number: whatsapp,
      email,
      agreed_to_commission: true
    });

    if (error) throw error;

    // Auto login + redirect to profile
history.push('/agent/profile');

  } catch (err: any) {
    alert(err.message);
  } finally {
    setLoading(false);
  }
};

  const inputStyle = {
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    marginBottom: '10px',
    '--padding-start': '14px',
    '--placeholder-color': '#9ca3af',
    '--placeholder-opacity': '1',
    fontSize: '13px',
    height: '44px'
  } as any;

  return (
    <IonPage>
      <IonContent style={{ '--background': '#0a1931' } as any}>
        <div style={{ maxWidth: '400px', margin: '24px auto', padding: '0 12px' }}>
          <div style={{ background: '#112240', border: '1px solid #1e3a5f', padding: '18px', borderRadius: '16px', marginBottom: '16px' }}>
            <p style={{ color: '#c9a86a', fontSize: '8px', letterSpacing: '2.2px', margin: 0, fontWeight: 700 }}>VITALIS PROPERTY HUB</p>
            <h2 style={{ color: 'white', margin: '6px 0 0 0', fontSize: '22px', lineHeight: '1.2' }}>Become a<br/><span style={{ color: '#c9a86a' }}>Verified Agent</span></h2>
            <p style={{ color: '#8da2c0', fontSize: '11px', margin: '8px 0 0 0' }}>Join Vitalis Property Hub and start listing apartments in Calabar.</p>
          </div>

          <div style={{ background: 'white', padding: '20px', borderRadius: '16px' }}>
            <h3 style={{ margin: '0', fontSize: '16px', color: '#0a1931' }}>Agent Signup</h3>
            <p style={{ margin: '2px 0 14px 0', fontSize: '11px', color: '#6b7280' }}>Create your agent account</p>

            <IonInput placeholder="Full Name" value={fullName} onIonChange={e=>setFullName(e.detail.value as string)} style={inputStyle} />
            <IonInput placeholder="Phone Number" value={phone} onIonChange={e=>setPhone(e.detail.value as string)} style={inputStyle} />
            <IonInput placeholder="WhatsApp Number" value={whatsapp} onIonChange={e=>setWhatsapp(e.detail.value as string)} style={inputStyle} />
            <IonInput placeholder="Email Address" value={email} onIonChange={e=>setEmail(e.detail.value as string)} autocomplete="off" style={inputStyle} />
            <IonInput placeholder="Password" type="password" value={password} onIonChange={e=>setPassword(e.detail.value as string)} autocomplete="new-password" style={inputStyle} />

            {/* POLICY */}
            <div style={{ background: '#fffbeb', border: '1.5px solid #fde68a', borderRadius: '10px', padding: '12px', margin: '4px 0 14px 0' }}>
              <p style={{ fontSize: '9.5px', fontWeight: 800, letterSpacing: '0.8px', margin: '0 0 6px 0', color: '#92400e' }}>AGENT COMMISSION POLICY & AGREEMENT</p>
              <p style={{ fontSize: '11px', lineHeight: '1.5', margin: '0 0 10px 0', color: '#573300', textAlign: 'justify' }}>
                By registering as an agent on Vitalis Property Hub, you agree to the following: When a client finds an apartment through our website and you receive your 10% agency fee from the client, that 10% fee shall be shared between the <b>Website Owner (20%)</b> and the <b>Agent (80%)</b>. You agree to remit the 20% platform share within 24 hours after receiving payment. Failure to comply will lead to account suspension.
              </p>
              <div style={{ display: 'flex', gap: '18px', borderTop: '1px solid #fde68a', paddingTop: '9px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
                  <input type="radio" name="policy" checked={agree==='agree'} onChange={()=>setAgree('agree')} /> Agree
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
                  <input type="radio" name="policy" checked={agree==='disagree'} onChange={()=>setAgree('disagree')} /> Disagree
                </label>
              </div>
              {agree==='disagree' && <p style={{ color: '#dc2626', fontSize: '10px', margin: '6px 0 0 0', fontWeight: 600 }}>You must Agree to create an account.</p>}
            </div>

            <IonButton 
              expand="block" 
              onClick={handleSignup} 
              disabled={loading || agree!=='agree'} 
              style={{ 
                '--background': agree==='agree' ? '#c9a86a' : '#d1d5db', 
                '--color': agree==='agree' ? '#000' : '#6b7280',
                fontSize: '13px', height: '42px', fontWeight: 700
              } as any}
            >
              {loading ? 'Creating...' : 'Create Account'}
            </IonButton>

            <p style={{ textAlign: 'center', fontSize: '11px', marginTop: '10px', color: '#6b7280' }}>Already have an account? <span style={{ color: '#c9a86a', fontWeight: 700 }}>Login</span></p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AgentSignup;