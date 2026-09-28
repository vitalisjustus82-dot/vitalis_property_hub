import React, { useState } from 'react';
import { IonPage, IonContent, IonInput, IonButton, IonLabel } from '@ionic/react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://yqegkmiqxlcgbkihxzdn.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxZWdrbWlxeGxjZ2JraWh4emRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzNDE4MTgsImV4cCI6MjA3MzkxNzgxOH0.Qs1K3VX3KXaQwQy2b3cQ1x2y3z'
  // REPLACE with your real anon key from Supabase > Settings > API
);

const AgentSignup: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!fullName || !phone || !whatsapp || !email || !password) {
      alert('Fill all fields'); return;
    }
    if (agree !== 'agree') {
      alert('You must AGREE to 80/20 contract to continue');
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.from('agents').insert({
        full_name: fullName,
        phone_number: phone,
        whatsapp_number: whatsapp,
        email: email,
        agreed_to_commission: true,
        status: 'pending'
      });
      if (error) throw error;
      alert('Account created! Details saved in Supabase agents table');
      setFullName(''); setPhone(''); setWhatsapp(''); setEmail(''); setPassword(''); setAgree('');
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <IonPage>
      <IonContent className="ion-padding" style={{ '--background': '#0a1931' } as any}>
        <div style={{ maxWidth: '420px', margin: '30px auto' }}>
          <div style={{ background: '#112240', border: '1px solid #1d3557', padding: '20px', borderRadius: '16px', marginBottom: '20px' }}>
            <p style={{ color: '#c9a86a', fontSize: '9px', letterSpacing: '2px', margin: 0 }}>VITALIS PROPERTY HUB</p>
            <h2 style={{ color: 'white', margin: '6px 0 0 0', lineHeight: '1.2' }}>Become a<br/><span style={{ color: '#c9a86a' }}>Verified Agent</span></h2>
            <p style={{ color: '#8da2c0', fontSize: '12px', margin: '8px 0 0 0' }}>Join Vitalis Property Hub and start listing apartments in Calabar.</p>
          </div>

          <div style={{ background: 'white', padding: '22px', borderRadius: '16px' }}>
            <h3 style={{ margin: '0 0 2px 0', color: '#0a1931' }}>Agent Signup</h3>
            <p style={{ margin: '0 0 16px 0', fontSize: '11px', color: '#888' }}>Create your agent account</p>

            <IonInput placeholder="Full Name" value={fullName} onIonChange={e => setFullName(e.detail.value as string)} style={{ border: '1px solid #e5e7eb', borderRadius: '10px', marginBottom: '10px', paddingLeft: '10px' }} />
            <IonInput placeholder="Phone Number" value={phone} onIonChange={e => setPhone(e.detail.value as string)} style={{ border: '1px solid #e5e7eb', borderRadius: '10px', marginBottom: '10px', paddingLeft: '10px' }} />
            <IonInput placeholder="WhatsApp Number" value={whatsapp} onIonChange={e => setWhatsapp(e.detail.value as string)} style={{ border: '1px solid #e5e7eb', borderRadius: '10px', marginBottom: '10px', paddingLeft: '10px' }} />
            <IonInput placeholder="Email Address" value={email} onIonChange={e => setEmail(e.detail.value as string)} style={{ border: '1px solid #e5e7eb', borderRadius: '10px', marginBottom: '10px', paddingLeft: '10px' }} />
            <IonInput placeholder="Password" type="password" value={password} onIonChange={e => setPassword(e.detail.value as string)} style={{ border: '1px solid #e5e7eb', borderRadius: '10px', marginBottom: '14px', paddingLeft: '10px' }} />

            <div style={{ background: '#fef9ec', border: '1.5px solid #f3d78a', borderRadius: '12px', padding: '14px', marginBottom: '16px' }}>
              <p style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '1px', margin: '0 0 6px 0', color: '#7a5a0a' }}>80/20 COMMISSION AGREEMENT</p>
              <p style={{ fontSize: '11px', lineHeight: '1.4', margin: '0 0 12px 0', color: '#5a4a1f' }}>
                You agree that 10% agency fee will be shared 80% to Agent / 20% to Platform. You must remit platform share within 24hrs after deal.
              </p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                  <input type="radio" name="contract" checked={agree==='agree'} onChange={()=>setAgree('agree')} /> Agree
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                  <input type="radio" name="contract" checked={agree==='disagree'} onChange={()=>setAgree('disagree')} /> Disagree
                </label>
              </div>
            </div>

            <IonButton expand="block" onClick={handleSignup} disabled={loading || agree!=='agree'} style={{ '--background': '#d4b778', '--color': '#000' } as any}>
              {loading ? 'Creating...' : 'Create Account'}
            </IonButton>
            <p style={{ textAlign: 'center', fontSize: '11px', marginTop: '12px' }}>Already have an account? <span style={{ color: '#c9a86a', fontWeight: 600 }}>Login</span></p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AgentSignup;