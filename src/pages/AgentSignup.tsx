import { IonPage, IonContent, IonInput } from '@ionic/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const AgentSignup = () => {
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    whatsapp: '',
    email: '',
    password: ''
  });

  return (
    <IonPage>
      <IonContent fullscreen style={{ '--background': '#0F1E3A' } as any}>
        <div style={{
          minHeight: '100vh',
          background: '#0F1E3A',
          display: 'flex',
          justifyContent: 'center',
          padding: '20px 15px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '400px',
            borderRadius: '20px',
            overflow: 'hidden',
            height: 'fit-content',
            background: 'white'
          }}>
            {/* TOP - Welcome */}
            <div style={{
              background: '#0F1E3A',
              padding: '30px 25px',
              color: 'white'
            }}>
              <div style={{ color: '#E7C873', letterSpacing: '2px', fontSize: '10px', fontWeight: '700' }}>VITALIS PROPERTY HUB</div>
              <h1 style={{ fontSize: '28px', margin: '12px 0 0 0', fontWeight: '800', lineHeight: '1.2' }}>
                Become a<br/><span style={{ color: '#E7C873' }}>Verified Agent</span>
              </h1>
              <p style={{ opacity: 0.7, margin: '12px 0 0 0', fontSize: '13px', lineHeight: '1.4' }}>
                Join Vitalis Property Hub and start listing apartments in Calabar.
              </p>
            </div>

            {/* DOWN - Signup Form */}
            <div style={{ background: 'white', padding: '25px' }}>
              <h2 style={{ color: '#0F1E3A', fontWeight: '800', margin: '0 0 5px 0', fontSize: '20px' }}>Agent Signup</h2>
              <p style={{ color: '#888', fontSize: '12px', margin: '0 0 18px 0' }}>Create your agent account</p>

              <IonInput placeholder="Full Name" value={form.fullName} onIonChange={e => setForm({...form, fullName: e.detail.value!})} style={{ border: '1.5px solid #E5E5E5', borderRadius: '10px', padding: '4px 12px', marginBottom: '10px', fontSize: '14px' }} />
              <IonInput placeholder="Phone Number" value={form.phone} onIonChange={e => setForm({...form, phone: e.detail.value!})} style={{ border: '1.5px solid #E5E5E5', borderRadius: '10px', padding: '4px 12px', marginBottom: '10px', fontSize: '14px' }} />
              <IonInput placeholder="WhatsApp Number" value={form.whatsapp} onIonChange={e => setForm({...form, whatsapp: e.detail.value!})} style={{ border: '1.5px solid #E5E5E5', borderRadius: '10px', padding: '4px 12px', marginBottom: '10px', fontSize: '14px' }} />
              <IonInput placeholder="Email Address" value={form.email} onIonChange={e => setForm({...form, email: e.detail.value!})} style={{ border: '1.5px solid #E5E5E5', borderRadius: '10px', padding: '4px 12px', marginBottom: '10px', fontSize: '14px' }} />
              <IonInput placeholder="Password" type="password" value={form.password} onIonChange={e => setForm({...form, password: e.detail.value!})} style={{ border: '1.5px solid #E5E5E5', borderRadius: '10px', padding: '4px 12px', marginBottom: '18px', fontSize: '14px' }} />

              {/* GOLD BUTTON BLACK TEXT */}
              <button
                style={{
                  width: '100%',
                  height: '48px',
                  background: '#E7C873',
                  color: '#000000',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: '800',
                  fontSize: '15px',
                  cursor: 'pointer'
                }}
              >
                Create Account
              </button>

              <div style={{ textAlign: 'center', marginTop: '18px', fontSize: '13px', color: '#333' }}>
                Already have an account?
                <Link to="/agent/login" style={{ color: '#E7C873', fontWeight: '800', textDecoration: 'none', marginLeft: '5px' }}>
                  Login
                </Link>
              </div>

              <div style={{ textAlign: 'center', marginTop: '12px' }}>
                <Link to="/home" style={{ fontSize: '11px', color: '#999', textDecoration: 'none' }}>← Back to Home</Link>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AgentSignup;