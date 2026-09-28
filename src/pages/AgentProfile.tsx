import React, { useEffect, useState } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://yqegkmiqxlcgbkihxzdn.supabase.co',
  'YOUR_REAL_ANON_KEY_HERE' // <- replace with your real key from supabase.ts
);

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

  if (!agent) return <IonPage><IonContent className="ion-padding">Loading profile...</IonContent></IonPage>;

  return (
    <IonPage>
      <IonContent style={{ '--background': '#f0f2f5' } as any}>
        {/* Top Nav like Facebook */}
        <div style={{ background: 'white', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 10 }}>
          <b style={{ color: '#0a1931', fontSize: '20px' }}>Vitalis <span style={{ color: '#c9a86a' }}>Hub</span></b>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={()=>window.location.href='/agent/dashboard'} style={{ background: '#e4e6eb', border: 'none', borderRadius: '20px', padding: '8px 14px', fontWeight: 600 }}>Logout</button>
          </div>
        </div>

        {/* Cover + Profile like Facebook */}
        <div style={{ maxWidth: '900px', margin: '0 auto', background: 'white', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
          {/* Cover Photo */}
          <div style={{ height: '260px', background: 'linear-gradient(135deg,#0a1931 0%,#1e3a5f 50%,#c9a86a 100%)', position: 'relative' }}></div>

          {/* Profile Info */}
          <div style={{ padding: '0 20px 16px', position: 'relative' }}>
            <div style={{ width: '140px', height: '140px', borderRadius: '50%', border: '4px solid white', background: '#c9a86a', marginTop: '-70px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '60px', color: 'white', fontWeight: 800 }}>
              {agent.full_name? agent.full_name[0].toUpperCase() : 'A'}
            </div>
            <h1 style={{ margin: '10px 0 4px', fontSize: '28px', fontWeight: 800 }}>{agent.full_name || 'Agent'}</h1>
            <p style={{ margin: 0, color: '#65676b', fontSize: '14px' }}>{agent.email} • Real Estate Agent • {agent.phone || ''}</p>

            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <button style={{ background: '#c9a86a', color: '#000', border: 'none', borderRadius: '6px', padding: '8px 16px', fontWeight: 700, fontSize: '13px' }}>+ Add Property</button>
              <button style={{ background: '#e4e6eb', border: 'none', borderRadius: '6px', padding: '8px 16px', fontWeight: 600, fontSize: '13px' }}>Edit Profile</button>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #ddd', display: 'flex', gap: '20px', padding: '0 20px', fontSize: '13px', fontWeight: 600, color: '#65676b' }}>
            <span style={{ borderBottom: '3px solid #c9a86a', padding: '12px 0', color: '#0a1931' }}>Posts</span>
            <span style={{ padding: '12px 0' }}>About</span>
            <span style={{ padding: '12px 0' }}>Properties</span>
            <span style={{ padding: '12px 0' }}>Commission: 20%</span>
          </div>
        </div>

        {/* Content like Facebook - 2 columns */}
        <div style={{ maxWidth: '900px', margin: '16px auto', display: 'flex', gap: '16px', padding: '0 12px', flexWrap: 'wrap' }}>
          {/* Left - Intro */}
          <div style={{ flex: '0 0 340px', background: 'white', borderRadius: '8px', padding: '16px', height: 'fit-content', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 12px' }}>Intro</h3>
            <p style={{ fontSize: '13px', color: '#050505', margin: '6px 0' }}>🏠 Agent at Vitalis Property Hub</p>
            <p style={{ fontSize: '13px', color: '#050505', margin: '6px 0' }}>📍 Torugbene, Bayelsa State</p>
            <p style={{ fontSize: '13px', color: '#050505', margin: '6px 0' }}>💼 80/20 Commission - Agent gets 80%</p>
            <p style={{ fontSize: '13px', color: '#050505', margin: '6px 0' }}>📧 {agent.email}</p>
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <div style={{ background: '#f0f2f5', flex: 1, textAlign: 'center', padding: '8px', borderRadius: '6px' }}><b>0</b><br/><small>Properties</small></div>
              <div style={{ background: '#f0f2f5', flex: 1, textAlign: 'center', padding: '8px', borderRadius: '6px' }}><b>₦0</b><br/><small>Earned</small></div>
              <div style={{ background: '#f0f2f5', flex: 1, textAlign: 'center', padding: '8px', borderRadius: '6px' }}><b>0</b><br/><small>Sold</small></div>
            </div>
          </div>

          {/* Right - Feed like Facebook */}
          <div style={{ flex: '1', minWidth: '300px' }}>
            <div style={{ background: 'white', borderRadius: '8px', padding: '12px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)', marginBottom: '16px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#c9a86a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>{agent.full_name?.[0]}</div>
                <button style={{ flex: 1, background: '#f0f2f5', border: 'none', borderRadius: '20px', padding: '10px 12px', textAlign: 'left', color: '#65676b' }}>What's on your mind? List a property...</button>
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: '8px', padding: '16px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)', textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: '#65676b' }}>No properties yet. Click <b>+ Add Property</b> to list your first property and earn 80% commission!</p>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AgentProfile;