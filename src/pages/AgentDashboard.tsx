import { IonButton, IonContent, IonPage, IonTitle } from '@ionic/react';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AgentDashboard: React.FC = () => {
  const [list, setList] = useState<any[]>([]);
  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase.from('apartments').select('*').eq('agent_id', user.id);
      setList(data || []);
    };
    load();
  }, []);
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonTitle>My Listings: {list.length}</IonTitle>
        <IonButton routerLink="/admin/apartments/new" color="success" style={{margin:'20px 0'}}> + Add Apartment</IonButton>
        {list.map(a=> <div key={a.id} style={{border:'1px solid #ddd', padding:'10px', margin:'5px 0'}}>{a.title} - {a.status}</div>)}
      </IonContent>
    </IonPage>
  );
};
export default AgentDashboard;