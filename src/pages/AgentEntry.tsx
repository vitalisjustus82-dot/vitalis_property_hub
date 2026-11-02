import React, { useEffect, useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';

const AgentEntry: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const [valid, setValid] = useState(false);
  const SECRET = 'VITALIS2024';

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    if (code === SECRET) {
      localStorage.setItem('isAgentPortal', 'true');
      setValid(true);
    } else {
      history.replace('/home');
    }
  }, []);

  if (!valid) return null;

  return (
    <IonPage>
      <IonContent fullscreen style={{ '--background': '#FFFEF7' } as any}>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          background: '#FFFEF7'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '360px',
            background: 'white',
            borderRadius: '20px',
            padding: '32px 24px',
            textAlign: 'center',
            boxShadow: '0 10px 40px rgba(0,0,0,0.08)',
            border: '1px solid #f0e6d3'
          }}>
            
            {/* V Logo - same gold as website */}
            <div style={{
              width: '56px',
              height: '56px',
              margin: '0 auto 16px',
              background: '#d4af37',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '26px',
              fontWeight: 900,
              color: '#1a1a1a'
            }}>V</div>

            <h1 style={{
              margin: '0 0 8px',
              fontSize: '22px',
              fontWeight: 800,
              color: '#1a2a4a',
              letterSpacing: '-0.3px'
            }}>Agent Access - Vitalis</h1>

            <p style={{
              color: '#6b7280',
              fontSize: '14px',
              margin: '0 0 24px'
            }}>Welcome agent, continue to login</p>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button onClick={() => history.push('/agent/login')} style={{
                background: '#d4af37',
                color: '#1a1a1a',
                border: 'none',
                padding: '10px 22px',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '13px',
                letterSpacing: '0.5px',
                cursor: 'pointer',
                minWidth: '90px',
                boxShadow: '0 2px 8px rgba(212,175,55,0.3)'
              }}>LOGIN</button>

              <button onClick={() => history.push('/agent/signup')} style={{
                background: 'white',
                color: '#d4af37',
                border: '1.5px solid #d4af37',
                padding: '10px 22px',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: '13px',
                letterSpacing: '0.5px',
                cursor: 'pointer',
                minWidth: '90px'
              }}>REGISTER</button>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AgentEntry;