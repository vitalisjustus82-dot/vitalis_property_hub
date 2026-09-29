import React, { useEffect, useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const AgentProfile: React.FC = () => {
  const [agent, setAgent] = useState<any>(null);

  useEffect(() => {
    const getAgent = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { window.location.href = '/agent/login'; return; }
      const { data } = await supabase.from('agents').select('*').eq('email', user.email).single();
      setAgent(data);
    };
    getAgent();
  }, []);

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h2>Agent Profile</h2>
        {agent ? (
          <div>
            <p>Name: {agent.full_name}</p>
            <p>Email: {agent.email}</p>
            <p>Phone: {agent.phone}</p>
          </div>
        ) : <p>Loading...</p>}
      </IonContent>
    </IonPage>
  );
};

export default AgentProfile;