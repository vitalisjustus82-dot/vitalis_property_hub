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
      // Invalid - kick back to home
      history.replace('/home');
    }
  }, []);

  if (!valid) return null;

  return (
    <IonPage>
      <IonContent fullscreen style={{ 
        '--background': '#0a0a0a',
        background: 'radial-gradient(1200px 600px at 20% -10%, #1a1a1a 0%, #0a0a0a 60%), radial-gradient(800px 400px at 90% 0%, rgba(212,175,55,0.15) 0%, transparent 70%)'
      } as any}>
        
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Glow */}
          <div style={{
            position: 'absolute',
            top: '-100px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(212,175,55,0.18) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />

          {/* Card */}
          <div style={{
            width: '100%',
            maxWidth: '360px',
            background: 'rgba(20,20,20,0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(212,175,55,0.2)',
            borderRadius: '28px',
            padding: '36px 28px',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.1) inset',
            animation: 'fadeUp 0.6s ease'
          }}>
            
            <div style={{
              width: '64px',
              height: '64px',
              margin: '0 auto 20px',
              background: 'linear-gradient(135deg, #d4af37, #8a6d1b)',
              borderRadius: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              fontWeight: 900,
              color: 'black',
              boxShadow: '0 10px 30px rgba(212,175,55,0.3)'
            }}>V</div>

            <div style={{
              display: 'inline-block',
              background: 'rgba(212,175,55,0.12)',
              border: '1px solid rgba(212,175,55,0.25)',
              color: '#d4af37',
              fontSize: '10px',
              fontWeight: 800,
              letterSpacing: '2px',
              padding: '6px 14px',
              borderRadius: '100px',
              marginBottom: '18px'
            }}>PRIVATE ACCESS</div>

            <h1 style={{
              margin: 0,
              fontSize: '26px',
              fontWeight: 800,
              color: 'white',
              lineHeight: 1.2,
              letterSpacing: '-0.5px'
            }}>Agent Access<br/><span style={{ color: '#d4af37' }}>Vitalis</span></h1>

            <p style={{
              color: '#888',
              fontSize: '14px',
              margin: '12px 0 28px',
              lineHeight: 1.5
            }}>Welcome back. This portal is exclusive to verified Vitalis agents.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button onClick={() => history.push('/agent/login')} style={{
                width: '100%',
                background: 'linear-gradient(135deg, #d4af37, #b8941f)',
                color: 'black',
                border: 'none',
                padding: '16px',
                borderRadius: '14px',
                fontWeight: 800,
                fontSize: '14px',
                letterSpacing: '1px',
                cursor: 'pointer',
                boxShadow: '0 8px 20px rgba(212,175,55,0.3)'
              }}>LOGIN TO DASHBOARD</button>

              <button onClick={() => history.push('/agent/signup')} style={{
                width: '100%',
                background: 'transparent',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '15px',
                borderRadius: '14px',
                fontWeight: 700,
                fontSize: '14px',
                letterSpacing: '1px',
                cursor: 'pointer'
              }}>CREATE AGENT ACCOUNT</button>
            </div>

            <p style={{
              color: '#555',
              fontSize: '11px',
              marginTop: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}>
              <span style={{ width: '6px', height: '6px', background: '#00ff88', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 8px #00ff88' }}></span>
              Secure link verified • Expires in 24h
            </p>
          </div>

          <p style={{ color: '#333', fontSize: '11px', marginTop: '28px', letterSpacing: '1px', fontWeight: 600 }}>VITALIS PROPERTY HUB • EST 2024</p>
        </div>

        <style>{`@keyframes fadeUp { from { opacity:0; transform: translateY(20px)} to { opacity:1; transform: translateY(0)} }`}</style>
      </IonContent>
    </IonPage>
  );
};

export default AgentEntry;