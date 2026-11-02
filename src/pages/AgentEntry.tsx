import { IonContent, IonPage, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const AgentEntry: React.FC = () => {
  const history = useHistory();
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

  // YOUR SECRET CODE - change it to anything
  const SECRET = 'VITALIS2024';

  if (code !== SECRET) {
    return (
      <IonPage><IonContent className="ion-padding">
        <h2>Invalid Agent Link</h2>
        <p>Contact Vitalis admin for correct link.</p>
      </IonContent></IonPage>
    )
  }

  // Unlock agent portal
  localStorage.setItem('isAgentPortal', 'true');

  return (
    <IonPage>
      <IonContent className="ion-padding" style={{textAlign:'center', marginTop:'50px'}}>
        <h1>Agent Access - Vitalis</h1>
        <p>Welcome agent, continue to login</p>
        <IonButton onClick={()=> history.push('/agent/login')}>Login</IonButton>
        <IonButton fill="outline" onClick={()=> history.push('/agent/signup')}>Register</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default AgentEntry;