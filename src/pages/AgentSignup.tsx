import { IonPage, IonContent, IonInput, IonButton, IonText } from '@ionic/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const AgentRegister = () => {
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    whatsapp: '',
    email: '',
    password: ''
  });

  const handleRegister = () => {
    // your supabase register logic here
    console.log(form);
  };

  const inputStyle = {
    border: '1.5px solid #EAEAEA',
    borderRadius: '10px',
    padding: '4px 12px',
    marginBottom: '12px',
    background: '#FAF8F3'
  };

  return (
    <IonPage>
      <IonContent fullscreen style={{ '--background': '#0F1E3A' } as any}>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          background: 'linear-gradient(135deg, #0F1E3A 0%, #1a2d4d 100%)'
        }}>
          <div style={{
            display: 'flex',
            width: '100%',
            maxWidth: '950px',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
            background: 'white'
          }}>
            {/* LEFT - Branding - matches homepage */}
            <div style={{
              flex: 0.9,
              background: '#0F1E3A',
              padding: '40px',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <h3 style={{ color: '#E7C873', letterSpacing: '2px', fontSize: '11px', margin: 0 }}>VITALIS PROPERTY HUB</h3>
              <h1 style={{ fontSize: '30px', marginTop: '12px', lineHeight: '1.2', fontWeight: 'bold' }}>
                Become a<br />
                <span style={{ color: '#E7C873' }}>Verified Agent</span>
              </h1>
              <p style={{ opacity: 0.75, marginTop: '15px', fontSize: '13px', lineHeight: '1.6' }}>
                Join Vitalis Property Hub. List apartments, get verified clients in Calabar and beyond. No more wahala.
              </p>
              <div style={{ marginTop: '25px', fontSize: '12px', opacity: 0.6 }}>
                ✓ Trusted by 400L UNICAL Founder<br/>
                ✓ Direct WhatsApp leads<br/>
                ✓ Safe & affordable focus
              </div>
            </div>

            {/* RIGHT - Form */}
            <div style={{ flex: 1.1, padding: '35px 35px', background: 'white' }}>
              <h2 style={{ color: '#0F1E3A', fontWeight: '800', margin: '0 0 5px 0', fontSize: '22px' }}>Register As Agent</h2>
              <p style={{ color: '#888', fontSize: '12px', marginBottom: '20px' }}>Join Vitalis Property Hub</p>

              <IonInput placeholder="Full Name" value={form.fullName} onIonChange={e => setForm({...form, fullName: e.detail.value!})} style={inputStyle} />
              <IonInput placeholder="Phone Number" type="tel" value={form.phone} onIonChange={e => setForm({...form, phone: e.detail.value!})} style={inputStyle} />
              <IonInput placeholder="WhatsApp Number" type="tel" value={form.whatsapp} onIonChange={e => setForm({...form, whatsapp: e.detail.value!})} style={inputStyle} />
              <IonInput placeholder="Email Address" type="email" value={form.email} onIonChange={e => setForm({...form, email: e.detail.value!})} style={inputStyle} />
              <IonInput placeholder="Create Password" type="password" value={form.password} onIonChange={e => setForm({...form, password: e.detail.value!})} style={inputStyle} />

              <IonButton
                expand="block"
                onClick={handleRegister}
                style={{
                  '--background': '#0F1E3A',
                  '--color': '#E7C873',
                  '--border-radius': '10px',
                  '--border-color': '#E7C873',
                  '--border-width': '1.5px',
                  '--border-style': 'solid',
                  fontWeight: 'bold',
                  height: '46px',
                  marginTop: '10px',
                  textTransform: 'capitalize',
                  letterSpacing: '0.5px'
                } as any}
              >
                Create Account
              </IonButton>

              <div style={{ textAlign: 'center', marginTop: '18px', fontSize: '13px' }}>
                <IonText style={{ color: '#666' }}>Already have an account? </IonText>
                <Link to="/agent/login" style={{ color: '#C5A059', fontWeight: 'bold', textDecoration: 'none' }}>Login</Link>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AgentRegister;