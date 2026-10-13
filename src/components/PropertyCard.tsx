import { IonBadge, IonIcon } from '@ionic/react';
import { locationOutline, starSharp } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import type { Apartment } from '../types/database';
import './PropertyCard.css';

interface Props {
  apartment: Apartment;
}

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=85';

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-NG', { maximumFractionDigits: 0 }).format(price);

const PropertyCard: React.FC<Props> = ({ apartment }) => {
  const history = useHistory();

  return (
    <article
      className="property-card"
      onClick={() => history.push(`/apartments/${apartment.id}`)}
    >
      <div className="property-img" style={{ position: 'relative' }}>
  <img src={apartment.image_url ?? FALLBACK_IMAGE} alt={apartment.title} />
  
  {/* AGENT AVATAR + USERNAME - NEW CODE */}
  {apartment.profiles && (
    <div
      onClick={(e) => {
        e.stopPropagation();
        history.push(`/agent/${apartment.agent_id}`);
      }}
      style={{
        position: 'absolute',
        top: '8px',
        left: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        background: 'rgba(0,0,0,0.65)',
        backdropFilter: 'blur(4px)',
        padding: '3px 10px 3px 4px',
        borderRadius: '20px',
        zIndex: 5,
        cursor: 'pointer'
      }}
    >
      <img
        src={apartment.profiles.avatar_url || `https://ui-avatars.com/api/?name=${apartment.profiles.username || 'Agent'}&background=random`}
        alt="agent"
        style={{
          width: '26px',
          height: '26px',
          borderRadius: '50%',
          objectFit: 'cover',
          border: '1.5px solid white'
        }}
      />
      <span style={{ color: 'white', fontSize: '11px', fontWeight: 600, maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {apartment.profiles.username || apartment.profiles.full_name}
      </span>
    </div>
  )}

  {apartment.featured && <div className="badge featured">Featured</div>}
  <div className={`badge ${apartment.status?.toLowerCase()}`}>
    {apartment.status}
  </div>
</div>

      <div className="property-body">
        <h3>{apartment.title}</h3>

        <div className="property-location">
          <IonIcon icon={locationOutline} />
          <span>{apartment.location}</span>
        </div>

        <div className="property-price">
          ₦{formatPrice(apartment.price)}
          <small> / {apartment.price_period}</small>
        </div>

        <div className="property-stars">
          <IonIcon icon={starSharp} />
          <IonIcon icon={starSharp} />
          <IonIcon icon={starSharp} />
          <IonIcon icon={starSharp} />
          <IonIcon icon={starSharp} />
        </div>

        <div className="card-btn" onClick={() => history.push(`/apartments/${apartment.id}`)}>View Details</div>
      </div>
    </article>
  );
};

export default PropertyCard;
