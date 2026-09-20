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
      <div className="property-img">
        <img src={apartment.image_url ?? FALLBACK_IMAGE} alt={apartment.title} />
        {apartment.featured && <IonBadge className="property-badge">Featured</IonBadge>}
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

        <div className="card-btn">View Details</div>
      </div>
    </article>
  );
};

export default PropertyCard;
