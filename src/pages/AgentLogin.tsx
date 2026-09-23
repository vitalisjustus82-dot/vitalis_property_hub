import { IonButton, IonContent, IonInput, IonPage, IonTitle } from '@ionic/react';
import { useState } from 'react';
import { supabase } from '../lib/supabase';

const AgentLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { alert(error.message); return; }
    window.location.href = '/agent/dashboard';
  };

  return (
    <IonPage>
      <IonContent className="ion-padding" style={{maxWidth:'400px', margin:'80px auto'}}>
        <IonTitle>Agent Login</IonTitle>
        <IonInput placeholder="Email" value={email} onIonChange={e=>setEmail(e.detail.value!)} style={{border:'1px solid #ccc', margin:'15px 0', padding:'10px'}} />
        <IonInput placeholder="Password" type="password" value={password} onIonChange={e=>setPassword(e.detail.value!)} style={{border:'1px solid #ccc', margin:'15px 0', padding:'10px'}} />
        <IonButton expand="block" onClick={login}>Login</IonButton>
      </IonContent>
    </IonPage>
  );
};
export default AgentLogin;