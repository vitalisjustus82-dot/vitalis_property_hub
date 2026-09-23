import { IonPage, IonContent, IonInput } from '@ionic/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const AgentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <IonPage>
      <IonContent fullscreen style={{ '--background': '#0A1931' } as any}>
        <div style={{
          minHeight: '100vh',
          background: '#0A1931',
          display: 'flex',
          justifyContent: 'center',
          padding: '30px 16px',
        }}>
          <div style={{ width: '100%', maxWidth: '420px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* TOP CARD - SEPARATE FROM BACKGROUND */}
            <div style={{
              background: '#0F1E3A',
              borderRadius: '18px',
              padding: '28px 26px',
              border: '1px solid rgba(231,200,115,0.15)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
            }}>
              <div style={{ color: '#E7C873', letterSpacing: '2.5px', fontSize: '10px', fontWeight: '700' }}>VITALIS PROPERTY HUB</div>
              <h1 style={{ fontSize: '28px', margin: '12px 0 0 0', fontWeight: '800', color: 'white', lineHeight: '1.2' }}>
                Welcome Back,<br/><span style={{ color: '#E7C873' }}>Agent</span>
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.6)', margin: '12px 0 0 0', fontSize: '13px', lineHeight: '1.5' }}>
                Manage your listings and grow your business in Calabar.
              </p>
            </div>

            {/* DOWN CARD - LOGIN */}
            <div style={{
              background: 'white',
              borderRadius: '18px',
              padding: '26px',
              boxShadow: '0 15px 35px rgba(0,0,0,0.2)'
            }}>
              <h2 style={{ color: '#0F1E3A', fontWeight: '800', margin: '0 0 5px 0', fontSize: '20px' }}>Agent Login</h2>
              <p style={{ color: '#888', fontSize: '12px', margin: '0 0 18px 0' }}>Enter your credentials to continue</p>

              <IonInput placeholder="Email" value={email} onIonChange={e => setEmail(e.detail.value!)} style={{ border: '1.5px solid #E8E8E8', borderRadius: '10px', padding: '4px 12px', marginBottom: '12px', fontSize: '14px' }} />
              <IonInput placeholder="Password" type="password" value={password} onIonChange={e => setPassword(e.detail.value!)} style={{ border: '1.5px solid #E8E8E8', borderRadius: '10px', padding: '4px 12px', marginBottom: '18px', fontSize: '14px' }} />

              <button style={{
                width: '100%', height: '46px',
                background: '#E7C873', // SOLID GOLD
                color: '#000000', // BLACK TEXT
                border: 'none', borderRadius: '10px',
                fontWeight: '800', fontSize: '14px', cursor: 'pointer'
              }}>
                Login
              </button>

              <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '13px', color: '#333' }}>
                Don't have an account?
                <Link to="/agent/register" style={{ color: 'gold', fontWeight: '800', textDecoration: 'none', marginLeft: '5px' }}>
                  Register
                </Link>
              </div>
            </div>

          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
export default AgentLogin;