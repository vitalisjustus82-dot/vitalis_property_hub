import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// @ts-ignore
import { supabase } from '../lib/supabase';
// @ts-ignore
import { useRequireAuth } from '../lib/useRequireAuth'
import './AgentDashboard.css';
import { useIonViewWillEnter } from '@ionic/react';

const AgentDashboard: React.FC = () => {
  const history = useHistory();
  const [apartments, setApartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMyApartments = async () => {
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from('apartments')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });
    
    setApartments(data || []);
    setLoading(false);
  };

  useIonViewWillEnter(() => {
    fetchMyApartments();
  });

  useEffect(() => {
    fetchMyApartments();
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: '90px' }}>
      {/* Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', 
        padding: '16px 20px 30px 20px',
        borderRadius: '0 0 24px 24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <button 
            onClick={() => history.goBack()}
            style={{ 
              width: '40px', height: '40px', 
              borderRadius: '50%', background: 'rgba(255,255,255,0.1)',
              border: 'none', color: 'white', fontSize: '20px'
            }}
          >
            ←
          </button>
          <h1 style={{ color: 'white', fontSize: '20px', fontWeight: 800, margin: 0 }}>
            My Listings
          </h1>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ 
            flex: 1, background: 'rgba(255,255,255,0.08)', 
            backdropFilter: 'blur(10px)',
            borderRadius: '16px', padding: '14px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 600 }}>TOTAL LISTINGS</div>
            <div style={{ color: 'white', fontSize: '24px', fontWeight: 800, marginTop: '4px' }}>{apartments.length}</div>
          </div>
          <div style={{ 
            flex: 1, background: '#facc15', 
            borderRadius: '16px', padding: '14px',
          }}>
            <div style={{ color: '#000', fontSize: '12px', fontWeight: 600, opacity: 0.7 }}>ACTIVE</div>
            <div style={{ color: '#000', fontSize: '24px', fontWeight: 800, marginTop: '4px' }}>{apartments.filter(a => a.status !== 'sold').length}</div>
          </div>
        </div>
      </div>

      {/* Add Button */}
      <div style={{ padding: '0 20px', marginTop: '-20px' }}>
        <button
          onClick={() => history.push('/add-apartment')}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #facc15 0%, #eab308 100%)',
            color: '#000',
            border: 'none',
            padding: '18px',
            borderRadius: '16px',
            fontWeight: 800,
            fontSize: '16px',
            letterSpacing: '0.5px',
            boxShadow: '0 10px 20px rgba(250, 204, 21, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <span style={{ fontSize: '20px' }}>+</span> ADD APARTMENT
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: '24px 16px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>Loading your properties...</div>
        ) : apartments.length === 0 ? (
          <div style={{ 
            background: 'white', 
            borderRadius: '24px', 
            padding: '50px 24px', 
            textAlign: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
            border: '1px solid #f1f5f9'
          }}>
            <div style={{ 
              width: '80px', height: '80px', 
              background: '#fefce8', 
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px auto',
              fontSize: '40px'
            }}>
              🏠
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: '0 0 8px 0' }}>No listings yet</h3>
            <p style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.5', margin: 0 }}>
              Tap Add Apartment to create your<br/>first property and start earning
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {apartments.map((apt) => (
              <div 
                key={apt.id}
                onClick={() => history.push(`/apartment/${apt.id}`)}
                style={{ 
                  background: 'white', 
                  borderRadius: '20px', 
                  overflow: 'hidden',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
                  border: '1px solid #f1f5f9',
                  display: 'flex',
                  cursor: 'pointer'
                }}
              >
                <div style={{ width: '110px', height: '110px', background: '#f1f5f9', flexShrink: 0, position: 'relative' }}>
                  {apt.image_url || apt.video_url ? (
                    <img src={apt.image_url || apt.thumbnail_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px' }}>🏠</div>
                  )}
                  <div style={{ 
                    position: 'absolute', bottom: '6px', left: '6px',
                    background: apt.is_available ? '#22c55e' : '#ef4444',
                    color: 'white', fontSize: '10px', fontWeight: 700,
                    padding: '3px 8px', borderRadius: '20px'
                  }}>
                    {apt.is_available ? 'AVAILABLE' : 'SOLD'}
                  </div>
                </div>
                <div style={{ padding: '14px', flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: '#0f172a', lineHeight: '1.3', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {apt.title || apt.description?.substring(0, 60)}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px', color: '#64748b', fontSize: '12px' }}>
                    📍 {apt.location || 'Lagos, Nigeria'}
                  </div>
                  <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontWeight: 800, fontSize: '16px', color: '#0f172a' }}>
                      ₦{Number(apt.price).toLocaleString()}
                    </div>
                    <div style={{ background: '#f8fafc', padding: '6px 10px', borderRadius: '8px', fontSize: '12px', fontWeight: 600 }}>
                      Edit →
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentDashboard;