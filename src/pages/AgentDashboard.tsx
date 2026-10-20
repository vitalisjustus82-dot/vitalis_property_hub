import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// @ts-ignore
import { supabase } from '../lib/supabase'
// @ts-ignore
import { useRequireAuth } from '../lib/useRequireAuth'
import './AgentDashboard.css';

const AgentDashboard: React.FC = () => {
  const { session } = useRequireAuth();
  const history = useHistory();
  const [apartments, setApartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!session) return;
    const { data } = await (supabase as any)
      .from('apartments')
      .select('*')
      .eq('agent_id', session.user.id)
      .order('created_at', { ascending: false });
    setApartments(data || []);
    setLoading(false);
  };

  useEffect(() => { if(session) load(); }, [session]);

  if (loading) return <div className="agent-loading">Loading listings...</div>;

  return (
    <div className="agent-page">
      <div className="agent-header">
        <span className="count-badge">{apartments.length}</span>
      </div>

      <button className="add-apartment-btn" onClick={() => history.push('/admin/form')}>
        <span>+</span> ADD APARTMENT
      </button>

      <div className="listings-grid">
        {apartments.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🏠</div>
            <h3>No listings yet</h3>
            <p>Tap Add Apartment to create your first property</p>
          </div>
          ) : apartments.map((apt) => (
    <div key={apt.id} className="listing-card" onClick={() => history.push(`/apartments/${apt.id}`)}>
      <div className="listing-img">
        <img src={apt.images?.[0] || apt.image_url || apt.images || 'https://via.placeholder.com/300'} alt={apt.title} />
        <span className={`status-badge ${apt.status}`}>{apt.status}</span>
      </div>
      <div className="listing-info">
        <h3>{apt.title}</h3>
        <p className="listing-price">₦{Number(apt.price).toLocaleString()} / {apt.price_type}</p>
        <p className="listing-loc">📍 {apt.location}</p>
        
        {/* NEW EDIT BUTTON FOR EACH APARTMENT */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              history.push(`/admin/ApartmentForm?edit=${apt.id}`);
            }}
            style={{
              background: '#facc15',
              border: 'none',
              padding: '6px 14px',
              borderRadius: '8px',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Edit
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              history.push(`/apartments/${apt.id}`);
            }}
            style={{
              background: '#e5e7eb',
              border: 'none',
              padding: '6px 14px',
              borderRadius: '8px'
            }}
          >
            View
          </button>
        </div>

      </div>
    </div>
  ))}
      </div>
    </div>
  );
};

export default AgentDashboard;