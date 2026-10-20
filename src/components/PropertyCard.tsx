import React from 'react';
import { useHistory } from 'react-router-dom';

interface Props {
  apartment: any;
}

const FALLBACK_IMAGE = "https://via.placeholder.com/400x300?text=No+Image";

const PropertyCard: React.FC<Props> = ({ apartment }) => {
  const history = useHistory();

  return (
    <div style={{
      background: '#fff',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid #eef2f7',
      boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* IMAGE - This fixes your stretched image bug */}
      <div style={{ position: 'relative', width: '100%', height: '210px', background: '#eee' }}>
        <img
          src={apartment.image_url || apartment.image_urls?.[0] || FALLBACK_IMAGE}
          alt={apartment.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />

        {/* AGENT - Top Left */}
        <div style={{
          position: 'absolute', top: 8, left: 8,
          background: 'rgba(0,0,0,0.65)', color: '#fff',
          padding: '3px 8px', borderRadius: '20px',
          fontSize: '11px', display: 'flex', alignItems: 'center', gap: '5px'
        }}>
          {/* AGENT PROFILE PICTURE */}
<img
  src={apartment.profiles?.avatar_url || `https://ui-avatars.com/api/?name=${apartment.profiles?.full_name || 'AG'}&background=dcfce7&color=166534`}
  alt="agent"
  style={{
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '1px solid #fff'
  }}
/>
{apartment.profiles?.full_name || 'Pablo Escobar'}
        </div>

        {/* STATUS - Top Right */}
        <span style={{
  position: 'absolute', bottom: 8, right: 8,
  background: apartment.status === 'taken' ? '#ef4444' : '#22c55e',
  color: '#fff', padding: '4px 10px', borderRadius: '4px',
  fontSize: '10px', fontWeight: 700
}}>
  {apartment.status || 'available'}
</span>

        {/* Featured */}
        {apartment.is_featured && (
          <span style={{
            position: 'absolute', bottom: 8, left: 8,
            background: '#1e293b', color: '#fff',
            padding: '3px 8px', borderRadius: '4px', fontSize: '10px'
          }}>Featured</span>
        )}
      </div>

      {/* CONTENT */}
      <div style={{ padding: '10px 12px 12px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '14px', fontWeight: 600, lineHeight: '1.3', height: '38px', overflow: 'hidden' }}>
          {apartment.title}
        </div>

        <div style={{ fontSize: '11px', color: '#64748b', margin: '6px 0' }}>
          📍 {apartment.location || apartment.street || 'Calabar'}
        </div>

        <div style={{ fontWeight: 800, fontSize: '15px', marginBottom: '4px' }}>
          ₦{Number(apartment.price || 0).toLocaleString()} <span style={{ fontWeight: 400, fontSize: '11px', color: '#64748b' }}>/ year</span>
        </div>

        <div style={{ color: '#f5b800', fontSize: '12px', marginBottom: '10px' }}>★★★★★</div>

        <button
          onClick={() => history.push(`/apartments/${apartment.id}`)}
          style={{
            marginTop: 'auto', width: '100%', background: '#fff',
            border: '1.5px solid #f5b800', padding: '8px',
            borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer'
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;