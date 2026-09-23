import { IonPage, IonContent, IonInput, IonButton, IonText } from '@ionic/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const AgentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <IonPage>
      <IonContent fullscreen style={{ '--background': '#0F1E3A' } as any}>
        <style>{`
          .lux-card { display: flex; width: 100%; max-width: 900px; border-radius: 20px; overflow: hidden; box-shadow: 0 25px 50px rgba(0,0,0,0.4); background: white; }
          @media (max-width: 768px) {
            .lux-card { flex-direction: column; max-width: 95%; margin: 20px auto; }
            .lux-left { padding: 25px 20px !important; }
            .lux-left h1 { font-size: 26px !important; }
            .lux-right { padding: 25px 20px !important; }
          }
        `}</style>

        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '15px',
          background: 'linear-gradient(135deg, #0F1E3A 0%, #1a2d4d 100%)'
        }}>
          <div className="lux-card">
            {/* LEFT */}
            <div className="lux-left" style={{
              flex: 1,
              background: '#0F1E3A',
              padding: '40px',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <h3 style={{ color: '#E7C873', letterSpacing: '2px', fontSize: '11px', margin: 0 }}>VITALIS PROPERTY HUB</h3>
              <h1 style={{ fontSize: '32px', marginTop: '12px', lineHeight: '1.2' }}>
                Welcome Back,<br/><span style={{ color: '#E7C873' }}>Agent</span>
              </h1>
              <p style={{ opacity: 0.8, marginTop: '15px', fontSize: '14px', lineHeight: '1.5' }}>
                Manage your listings, connect with clients, and grow your real estate business in Calabar.
              </p>
            </div>

            {/* RIGHT */}
            <div className="lux-right" style={{ flex: 1, padding: '35px', background: 'white' }}>
              <h2 style={{ color: '#0F1E3A', fontWeight: 'bold', margin: '0 0 5px 0' }}>Agent Login</h2>
              <p style={{ color: '#888', fontSize: '12px', marginBottom: '20px' }}>Enter your credentials to continue</p>

              <IonInput placeholder="Email Address" value={email} onIonChange={e => setEmail(e.detail.value!)} style={{ border: '1.5px solid #EAEAEA', borderRadius: '10px', padding: '6px 12px', marginBottom: '12px', background: '#FAF8F3' }} />
              <IonInput placeholder="Password" type="password" value={password} onIonChange={e => setPassword(e.detail.value!)} style={{ border: '1.5px solid #EAEAEA', borderRadius: '10px', padding: '6px 12px', marginBottom: '18px', background: '#FAF8F3' }} />

              <IonButton expand="block" style={{ '--background': '#E7C873', '--color': '#0F1E3A', '--border-radius': '10px', fontWeight: 'bold', height: '45px', textTransform: 'capitalize' } as any}>
                Login
              </IonButton>

              <div style={{ textAlign: 'center', marginTop: '18px', fontSize: '13px' }}>
                <IonText>Don't have an account? </IonText>
                <Link to="/agent/register" style={{ color: '#C5A059', fontWeight: 'bold', textDecoration: 'none' }}>Register</Link>
              </div>
              <div style={{ textAlign: 'center', marginTop: '12px' }}>
                <Link to="/home" style={{ fontSize: '12px', color: '#888', textDecoration: 'none' }}>← Back to Home</Link>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AgentLogin;