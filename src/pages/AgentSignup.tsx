import { IonContent, IonPage, IonInput, IonButton, IonItem, IonLabel } from '@ionic/react';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useHistory } from 'react-router-dom';

const AgentRegister = () => {
  const [form, setForm] = useState({name:'', phone:'', whatsapp:'', email:'', password:''});
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleRegister = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password
    });
    if(error){ alert(error.message); setLoading(false); return; }

    const { error: profileErr } = await supabase.from('agents').insert({
      id: data.user?.id,
      full_name: form.name,
      phone: form.phone,
      whatsapp: form.whatsapp,
      email: form.email
    });
    if(profileErr){ alert(profileErr.message); }
    else { alert('Account created! Please login'); history.push('/agent/login'); }
    setLoading(false);
  };

  return (
    <IonPage>
      <IonContent className="ion-padding" style={{'--background':'#0a1931'}}>
        <div style={{background:'white', borderRadius:'20px', padding:'25px', marginTop:'40px'}}>
          <h2 style={{fontWeight:'bold', fontSize:'22px', color:'#0a1931'}}>Register as Agent</h2>
          <p style={{color:'gray', fontSize:'14px', marginBottom:'20px'}}>Join Vitalis Property Hub</p>
          
          <IonItem><IonInput placeholder="Full Name" onIonChange={e=>setForm({...form, name:e.detail.value!})}/></IonItem>
          <IonItem><IonInput placeholder="Phone Number" onIonChange={e=>setForm({...form, phone:e.detail.value!})}/></IonItem>
          <IonItem><IonInput placeholder="WhatsApp Number" onIonChange={e=>setForm({...form, whatsapp:e.detail.value!})}/></IonItem>
          <IonItem><IonInput type="email" placeholder="Email Address" onIonChange={e=>setForm({...form, email:e.detail.value!})}/></IonItem>
          <IonItem><IonInput type="password" placeholder="Create Password" onIonChange={e=>setForm({...form, password:e.detail.value!})}/></IonItem>
          
          <IonButton expand="block" onClick={handleRegister} disabled={loading} style={{marginTop:'20px', '--background':'#0a1931'}}>
            {loading ? 'Creating...' : 'Create Account'}
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};
export default AgentRegister;