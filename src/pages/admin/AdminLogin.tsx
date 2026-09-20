import { useEffect, useState } from 'react';
import {
  IonContent,
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonToast,
  IonSpinner,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import './Admin.css';

const AdminLogin: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) history.replace('/admin');
    });
  }, [history]);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      setError('Enter your email and password.');
      return;
    }
    setSubmitting(true);
    setError('');
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setSubmitting(false);

    if (signInError) {
      setError('Login failed. Check your email and password.');
      return;
    }
    history.replace('/admin');
  };

  return (
    <IonPage>
      <IonContent fullscreen className="admin-login-content">
        <div className="admin-login-card">
          <h1>Admin Login</h1>
          <p className="muted">Sign in to manage apartment listings.</p>

          <IonItem lines="full">
            <IonLabel position="stacked">Email</IonLabel>
            <IonInput
              type="email"
              value={email}
              onIonInput={(e) => setEmail(e.detail.value ?? '')}
            />
          </IonItem>

          <IonItem lines="full">
            <IonLabel position="stacked">Password</IonLabel>
            <IonInput
              type="password"
              value={password}
              onIonInput={(e) => setPassword(e.detail.value ?? '')}
            />
          </IonItem>

          <IonButton expand="block" className="submit-btn" onClick={handleLogin} disabled={submitting}>
            {submitting ? <IonSpinner name="dots" /> : 'Sign In'}
          </IonButton>
        </div>

        <IonToast
          isOpen={!!error}
          message={error}
          duration={3000}
          color="danger"
          onDidDismiss={() => setError('')}
        />
      </IonContent>
    </IonPage>
  );
};

export default AdminLogin;
