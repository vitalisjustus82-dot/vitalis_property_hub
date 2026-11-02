import React, { useEffect } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';

const AgentEntry: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  
  const SECRET = 'VITALIS2024';

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    
    if (code === SECRET) {
      // Unlock agent mode
      localStorage.setItem('isAgentPortal', 'true');
      // Go straight to home page where Login/Register will now show
      history.replace('/home');
    } else {
      // Wrong code -> kick to home as public
      history.replace('/home');
    }
  }, []);

  // Loading screen while redirecting
  return (
    <IonPage>
      <IonContent fullscreen style={{ '--background': '#0a1a3a' } as any}>
        <div style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0a1a3a',
          color: 'white',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '3px solid rgba(212,175,55,0.3)', 
            borderTop: '3px solid #d4af37', 
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <p style={{ color: '#d4af37', fontSize: '13px', fontWeight: 700, letterSpacing: '1px' }}>VERIFYING ACCESS...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AgentEntry;