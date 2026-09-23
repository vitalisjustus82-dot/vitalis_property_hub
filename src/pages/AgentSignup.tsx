import { IonPage, IonContent, IonInput } from '@ionic/react';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';

const AgentSignup = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    whatsapp: '',
    email: '',
    password: ''
  });

  const AgentSignup = () => {
  const history = useHistory();  // 1
  const [loading, setLoading] = useState(false); // 2
  const [form, setForm] = useState({...}); // 3

  // 4. PUT IT HERE - RIGHT AFTER useState, BEFORE return
  const handleSignup = async () => {
    if (!form.email || !form.password) { alert('Fill all fields'); return; }
    localStorage.setItem('agent', JSON.stringify(form));
    alert('Account created! Now login with same email & password');
    history.push('/agent/login');
  };

  // 5. THEN RETURN
  return (
    <IonPage>
      ...
    </IonPage>
  );
};

  return (
    <IonPage>
      <IonContent fullscreen style={{ '--background': '#0A1931' } as any}>
        <div style={{ minHeight: '100vh', background: '#0A1931', display: 'flex', justifyContent: 'center', padding: '30px 16px 80px 16px' }}>
          <div style={{ width: '100%', maxWidth: '420px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{ background: '#0F1E3A', borderRadius: '18px', padding: '28px 26px', border: '1px solid rgba(231,200,115,0.15)' }}>
              <div style={{ color: '#E7C873', letterSpacing: '2.5px', fontSize: '10px', fontWeight: '700' }}>VITALIS PROPERTY HUB</div>
              <h1 style={{ fontSize: '28px', margin: '12px 0 0 0', fontWeight: '800', color: 'white' }}>Become a<br/><span style={{ color: '#E7C873' }}>Verified Agent</span></h1>
              <p style={{ color: 'rgba(255,255,255,0.6)', margin: '12px 0 0 0', fontSize: '13px' }}>Join Vitalis Property Hub and start listing apartments in Calabar.</p>
            </div>

            <div style={{ background: 'white', borderRadius: '18px', padding: '26px' }}>
              <h2 style={{ color: '#0F1E3A', fontWeight: '800', margin: '0 0 5px 0', fontSize: '20px' }}>Agent Signup</h2>
              <p style={{ color: '#888', fontSize: '12px', margin: '0 0 18px 0' }}>Create your agent account</p>

              <IonInput placeholder="Full Name" value={form.fullName} onIonChange={e => setForm({...form, fullName: e.detail.value!})} style={{ border: '1.5px solid #E8E8E8', borderRadius: '10px', padding: '4px 12px', marginBottom: '10px' }} />
              <IonInput placeholder="Phone Number" value={form.phone} onIonChange={e => setForm({...form, phone: e.detail.value!})} style={{ border: '1.5px solid #E8E8E8', borderRadius: '10px', padding: '4px 12px', marginBottom: '10px' }} />
              <IonInput placeholder="WhatsApp Number" value={form.whatsapp} onIonChange={e => setForm({...form, whatsapp: e.detail.value!})} style={{ border: '1.5px solid #E8E8E8', borderRadius: '10px', padding: '4px 12px', marginBottom: '10px' }} />
              <IonInput placeholder="Email Address" value={form.email} onIonChange={e => setForm({...form, email: e.detail.value!})} style={{ border: '1.5px solid #E8E8E8', borderRadius: '10px', padding: '4px 12px', marginBottom: '10px' }} />
              <IonInput placeholder="Password" type="password" value={form.password} onIonChange={e => setForm({...form, password: e.detail.value!})} style={{ border: '1.5px solid #E8E8E8', borderRadius: '10px', padding: '4px 12px', marginBottom: '18px' }} />

              <button
  onClick={handleSignup}
  disabled={loading}
  style={{ width: '100%', height: '46px', background: '#E7C873', color: '#000', border: 'none', borderRadius: '10px', fontWeight: '800' }}
>
  {loading ? 'Creating...' : 'Create Account'}
</button>

              <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '13px' }}>
                Already have an account? <Link to="/agent/login" style={{ color: '#C5A059', fontWeight: '800', textDecoration: 'none', marginLeft: '5px' }}>Login</Link>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
export default AgentSignup;