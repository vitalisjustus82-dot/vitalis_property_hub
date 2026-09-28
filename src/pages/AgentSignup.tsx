import React, { useState } from 'react';
import { IonPage, IonContent, IonInput, IonButton, IonLabel } from '@ionic/react';
import { supabase } from '../components/lib/supabase';

const AgentSignup: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!fullName || !phone || !whatsapp) {
      alert('Fill all 3 fields');
      return;
    }
    if (!agreed) {
      alert('Agree to 80/20 contract');
      return;
    }
    setLoading(true);
    const { error } = await supabase.from('agents').insert([{
      full_name: fullName,
      phone_number: phone,
      whatsapp_number: whatsapp,
      agreed_to_commission: true,
      commission_split: '80/20',
      status: 'pending'
    }]);
    setLoading(false);
    if (error) {
      alert('Error: ' + error.message);
    } else {
      alert('Saved! Check Supabase agents table');
      setFullName(''); setPhone(''); setWhatsapp(''); setAgreed(false);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding" style={{ '--background': '#0f1e3a' } as any}>
        <div style={{ maxWidth: '420px', margin: '30px auto' }}>
          <div style={{ background: '#132040', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
            <p style={{ color: '#c9a86a', fontSize: '10px', letterSpacing: '2px', margin: '0 0 8px 0' }}>VITALIS PROPERTY HUB</p>
            <h2 style={{ color: 'white', margin: 0 }}>Become a<br/><span style={{ color: '#c9a86a' }}>Verified Agent</span></h2>
          </div>
          <div style={{ background: 'white', padding: '24px', borderRadius: '12px' }}>
            <IonInput placeholder="Full Name" value={fullName} onIonChange={e => setFullName(e.detail.value!)} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '0 10px', marginBottom: '12px' }} />
            <IonInput placeholder="Phone Number" value={phone} onIonChange={e => setPhone(e.detail.value!)} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '0 10px', marginBottom: '12px' }} />
            <IonInput placeholder="WhatsApp Number" value={whatsapp} onIonChange={e => setWhatsapp(e.detail.value!)} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '0 10px', marginBottom: '16px' }} />
            <div style={{ background: '#fdf6e9', border: '1px solid #f0d9a0', borderRadius: '8px', padding: '12px', marginBottom: '16px' }}>
              <p style={{ fontSize: '10px', fontWeight: 'bold', margin: '0 0 6px 0' }}>80/20 COMMISSION AGREEMENT</p>
              <p style={{ fontSize: '11px', margin: 0 }}>10% agency fee shared 80% Agent / 20% Platform. Remit within 24hrs.</p>
              <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
                <IonLabel style={{ fontSize: '11px' }}>I agree to 80/20 contract *</IonLabel>
              </div>
            </div>
            <IonButton expand="block" onClick={handleSignup} disabled={!agreed || loading} style={{ '--background': '#0f1e3a' } as any}>
              {loading ? 'Saving...' : 'Create Account'}
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};
export default AgentSignup;