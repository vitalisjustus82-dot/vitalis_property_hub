import { IonPage, IonContent, IonInput } from '@ionic/react';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';

const AgentLogin = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please enter email and password');
      return;
    }

    setLoading(true);
    try {
      const saved = localStorage.getItem('agent');
      
      if (!saved) {
        alert('No account found. Please register first!');
        history.push('/agent/register');
        return;
      }

      const agent = JSON.parse(saved);

      // CHECK EMAIL
      if (agent.email.toLowerCase().trim() !== email.toLowerCase().trim()) {
        alert('Wrong email! Account not found.');
        return;
      }

      // CHECK PASSWORD
      if (agent.password !== password) {
        alert('Wrong password! Please try again.');
        return;
      }

      // CORRECT - LOGIN SUCCESS
      localStorage.setItem('isAgentLoggedIn', 'true');
      localStorage.setItem('currentAgent', JSON.stringify(agent));
      alert(`Welcome back ${agent.fullName}!`);
      history.push('/agent/dashboard');

    } catch (error: any) {
      alert('Login failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen style={{ '--background': '#0A1931' } as any}>
        <div style={{ minHeight: '100vh', background: '#0A1931', display: 'flex', justifyContent: 'center', padding: '30px 16px 80px 16px' }}>
          <div style={{ width: '100%', maxWidth: '420px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            <div style={{ background: '#0F1E3A', borderRadius: '18px', padding: '28px 26px', border: '1px solid rgba(231,200,115,0.15)' }}>
              <div style={{ color: '#E7C873', letterSpacing: '2.5px', fontSize: '10px', fontWeight: '700' }}>VITALIS PROPERTY HUB</div>
              <h1 style={{ fontSize: '28px', margin: '12px 0 0 0', fontWeight: '800', color: 'white' }}>Welcome Back,<br/><span style={{ color: '#E7C873' }}>Agent</span></h1>
            </div>

            <div style={{ background: 'white', borderRadius: '18px', padding: '26px' }}>
              <h2 style={{ color: '#0F1E3A', fontWeight: '800', margin: '0 0 18px 0' }}>Agent Login</h2>
              
              <IonInput placeholder="Email" value={email} onIonChange={e => setEmail(e.detail.value!)} style={{ border: '1.5px solid #E8E8E8', borderRadius: '10px', padding: '4px 12px', marginBottom: '12px' }} />
              <IonInput placeholder="Password" type="password" value={password} onIonChange={e => setPassword(e.detail.value!)} style={{ border: '1.5px solid #E8E8E8', borderRadius: '10px', padding: '4px 12px', marginBottom: '18px' }} />

              <button onClick={handleLogin} disabled={loading} style={{ width: '100%', height: '46px', background: '#E7C873', color: '#000', border: 'none', borderRadius: '10px', fontWeight: '800' }}>
                {loading ? 'Checking...' : 'Login'}
              </button>

              <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '13px' }}>
                Don't have an account? <Link to="/agent/register" style={{ color: '#C5A059', fontWeight: '800', textDecoration: 'none', marginLeft: '5px' }}>Register</Link>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
export default AgentLogin;