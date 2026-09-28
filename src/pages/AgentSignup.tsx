import { IonPage, IonContent } from '@ionic/react';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';

const AgentSignup = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    whatsapp: '',
    email: '',
    password: ''
  });

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert("You must agree to the contract to create an account");
      return;
    }
    // your supabase signup logic continues here...
    console.log("Agreed, proceed to create account", form);
  };

  return (
    <IonPage>
      <IonContent className="ion-padding" style={{ '--background': '#0A1931' } as any}>
        
        {/* THIS FIXES THE PLACEHOLDER - NO CSS FILE NEEDED */}
        <style>{`
          .custom-input {
            width: 100%;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 11px 12px;
            font-size: 14px;
            outline: none;
            background: white;
          }
          .custom-input::placeholder {
            font-size: 12px !important;
            color: #9ca3af !important;
            opacity: 1;
          }
          .custom-input:focus {
            border-color: #E5C07B;
            box-shadow: 0 0 0 2px rgba(229,192,123,0.2);
          }
        `}</style>

        <div style={{ maxWidth: '420px', margin: '0 auto' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
            <p style={{ fontSize: '10px', letterSpacing: '2px', color: '#E5C07B' }}>VITALIS PROPERTY HUB</p>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>Become a <br/><span style={{ color: '#E5C07B' }}>Verified Agent</span></h1>
          </div>

          <div style={{ background: 'white', borderRadius: '16px', padding: '20px' }}>
            <h2 style={{ fontWeight: 'bold', color: '#1e293b' }}>Agent Signup</h2>
            <p style={{ fontSize: '11px', color: 'gray', marginBottom: '15px' }}>Create your agent account</p>

            <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input className="custom-input" placeholder="Full Name" value={form.fullName} onChange={e=>setForm({...form, fullName: e.target.value})} />
              <input className="custom-input" placeholder="Phone Number" value={form.phone} onChange={e=>setForm({...form, phone: e.target.value})} />
              <input className="custom-input" placeholder="WhatsApp Number" value={form.whatsapp} onChange={e=>setForm({...form, whatsapp: e.target.value})} />
              <input className="custom-input" placeholder="Email Address" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} />
              <input className="custom-input" type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form, password: e.target.value})} />

              {/* CONTRACT POLICY AFTER PASSWORD */}
              <div style={{ background: '#FFF8E8', border: '1px solid #E5C07B66', borderRadius: '8px', padding: '12px' }}>
                <h3 style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }}>Agent Commission Agreement</h3>
                <p style={{ fontSize: '11px', lineHeight: '1.5', color: '#475569', marginTop: '6px', textAlign: 'justify' }}>
                  By registering as an agent on Vitalis Property Hub, you agree: When a client finds an apartment through our website and pays the standard <b>10% agency fee</b>, that 10% will be shared <b>80% to the Agent and 20% to the Platform Owner (Vitalis Property Hub)</b> as platform fee. You agree to remit the platform's share within 24 hours.
                </p>
                <label style={{ display: 'flex', gap: '8px', marginTop: '10px', cursor: 'pointer', alignItems: 'flex-start' }}>
                  <input type="checkbox" checked={agreed} onChange={e=>setAgreed(e.target.checked)} required style={{marginTop: '2px'}} />
                  <span style={{ fontSize: '11px', color: '#1e293b' }}>I have read and agree to the 80/20 commission contract. <span style={{color:'red'}}>*</span></span>
                </label>
              </div>

              <button disabled={!agreed || loading} type="submit" style={{ background: agreed ? '#E5C07B' : '#d1d5db', color: agreed ? '#1e293b' : '#6b7280', padding: '12px', borderRadius: '8px', fontWeight: 'bold', fontSize: '13px', cursor: agreed ? 'pointer' : 'not-allowed' }}>
                {loading ? 'Creating...' : 'Create Account'}
              </button>

              <p style={{ textAlign: 'center', fontSize: '11px' }}>Already have an account? <Link to="/agent/login" style={{ color: '#C8A96A', fontWeight: 'bold' }}>Login</Link></p>
            </form>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AgentSignup;