import { IonPage, IonContent, IonInput, IonButton } from '@ionic/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const AgentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <IonPage>
      <IonContent fullscreen style={{ '--background': '#0F1E3A' } as any}>
        <style>{`
          .lux-wrapper { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; background: linear-gradient(135deg, #0F1E3A 0%, #1a2d4d 100%); }
          .lux-card { display: flex; width: 100%; max-width: 900px; border-radius: 20px; overflow: hidden; box-shadow: 0 25px 50px rgba(0,0,0,0.4); background: white; }
          .lux-left { flex: 1; background: #0F1E3A; padding: 40px; color: white; display: flex; flex-direction: column; justify-content: center; }
          .lux-right { flex: 1; padding: 35px; background: white; }
          @media (max-width: 768px) {
            .lux-wrapper { padding: 10px; align-items: flex-start; padding-top: 30px; }
            .lux-card { flex-direction: column; border-radius: 16px; }
            .lux-left { padding: 25px 20px !important; }
            .lux-left h1 { font-size: 24px !important; }
            .lux-right { padding: 25px 20px !important; }
          }
        `}</style>

        <div className="lux-wrapper">
          <div className="lux-card">
            <div className="lux-left">
              <h3 style={{ color: '#E7C873', letterSpacing: '2px', fontSize: '11px', margin: 0 }}>VITALIS PROPERTY HUB</h3>
              <h1 style={{ fontSize: '32px', marginTop: '12px', lineHeight: '1.2', fontWeight: '800' }}>
                Welcome Back,<br/><span style={{ color: '#E7C873' }}>Agent</span>
              </h1>
              <p style={{ opacity: 0.75, marginTop: '15px', fontSize: '13px' }}>
                Manage your listings, connect with clients, and grow your real estate business in Calabar.
              </p>
            </div>

            <div className="lux-right">
              <h2 style={{ color: '#0F1E3A', fontWeight: '800', margin: '0 0 5px 0' }}>Agent Login</h2>
              <p style={{ color: '#888', fontSize: '12px', marginBottom: '20px' }}>Enter your credentials to continue</p>

              <IonInput placeholder="Email Address" value={email} onIonChange={e => setEmail(e.detail.value!)} style={{ border: '1.5px solid #EAEAEA', borderRadius: '10px', padding: '5px 12px', marginBottom: '12px', background: '#FAF8F3' }} />
              <IonInput placeholder="Password" type="password" value={password} onIonChange={e => setPassword(e.detail.value!)} style={{ border: '1.5px solid #EAEAEA', borderRadius: '10px', padding: '5px 12px', marginBottom: '18px', background: '#FAF8F3' }} />

              {/* LOGIN BUTTON - BLACK TEXT */}
              <IonButton 
                expand="block" 
                style={{ 
                  '--background': '#E7C873', 
                  '--background-hover': '#D9B95C',
                  '--color': '#000000', 
                  '--border-radius': '10px', 
                  fontWeight: '800', 
                  height: '46px', 
                  textTransform: 'none',
                  fontSize: '15px'
                } as any}
              >
                Login
              </IonButton>

              <div style={{ textAlign: 'center', marginTop: '18px', fontSize: '13px', color: '#333' }}>
                Don't have an account? 
                <Link to="/agent/register" style={{ color: '#E7C873', fontWeight: '800', textDecoration: 'none', marginLeft: '5px' }}>
                  Register
                </Link>
              </div>

              <div style={{ textAlign: 'center', marginTop: '14px' }}>
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