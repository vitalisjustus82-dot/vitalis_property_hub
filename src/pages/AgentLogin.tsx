import { IonPage, IonContent, IonInput, IonButton, IonText } from '@ionic/react';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';

const AgentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = () => {
    // your supabase login logic here
    console.log(email, password);
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
            maxWidth: '900px',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
            background: 'white'
          }}>
            {/* LEFT - Branding */}
            <div style={{
              flex: 1,
              background: '#0F1E3A',
              padding: '40px',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <h3 style={{ color: '#E7C873', letterSpacing: '2px', fontSize: '12px' }}>VITALIS PROPERTY HUB</h3>
              <h1 style={{ fontSize: '32px', marginTop: '10px', lineHeight: '1.2' }}>
                Welcome Back, <br />
                <span style={{ color: '#E7C873' }}>Agent</span>
              </h1>
              <p style={{ opacity: 0.8, marginTop: '15px', fontSize: '14px' }}>
                Manage your listings, connect with clients, and grow your real estate business in Calabar.
              </p>
            </div>

            {/* RIGHT - Form */}
            <div style={{ flex: 1, padding: '40px', background: 'white' }}>
              <h2 style={{ color: '#0F1E3A', fontWeight: 'bold', marginBottom: '5px' }}>Agent Login</h2>
              <p style={{ color: '#666', fontSize: '13px', marginBottom: '25px' }}>Enter your credentials to continue</p>

              <div style={{ marginBottom: '15px' }}>
                <IonInput
                  placeholder="Email Address"
                  type="email"
                  value={email}
                  onIonChange={e => setEmail(e.detail.value!)}
                  style={{
                    border: '1.5px solid #EAEAEA',
                    borderRadius: '10px',
                    padding: '6px 12px',
                    '--padding-start': '10px'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <IonInput
                  placeholder="Password"
                  type="password"
                  value={password}
                  onIonChange={e => setPassword(e.detail.value!)}
                  style={{
                    border: '1.5px solid #EAEAEA',
                    borderRadius: '10px',
                    padding: '6px 12px'
                  }}
                />
              </div>

              <IonButton
                expand="block"
                onClick={handleLogin}
                style={{
                  '--background': '#E7C873',
                  '--color': '#0F1E3A',
                  '--border-radius': '10px',
                  fontWeight: 'bold',
                  height: '45px',
                  textTransform: 'capitalize'
                } as any}
              >
                Login
              </IonButton>

              <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px' }}>
                <IonText>Don't have an account? </IonText>
                <Link to="/agent/register" style={{ color: '#C5A059', fontWeight: 'bold', textDecoration: 'none' }}>
                  Register
                </Link>
              </div>

              <div style={{ textAlign: 'center', marginTop: '15px' }}>
                <Link to="/home" style={{ fontSize: '12px', color: '#888', textDecoration: 'none' }}>
                  ← Back to Home
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