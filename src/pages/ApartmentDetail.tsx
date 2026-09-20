import { useEffect, useState } from 'react';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
  IonIcon,
} from '@ionic/react';
import { useParams } from 'react-router-dom';
import { locationOutline, playCircleOutline } from 'ionicons/icons';
import { supabase } from '../lib/supabase';
import type { Apartment } from '../types/database';
import WhatsAppFloat from '../components/WhatsAppFloat';
import './ApartmentDetail.css';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=900&q=85';

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-NG', { maximumFractionDigits: 0 }).format(price);

const ApartmentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('apartments')
        .select('*')
        .eq('id', id)
        .single();

      if (active) {
        if (!error && data) setApartment(data as Apartment);
        setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [id]);

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar color="secondary">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/apartments" />
          </IonButtons>
          <IonTitle>{apartment?.title ?? 'Apartment'}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {loading && (
          <div className="loading-row">
            <IonSpinner name="crescent" />
          </div>
        )}

        {!loading && !apartment && (
          <p className="empty-state">This listing could not be found. It may have been removed.</p>
        )}

        {!loading && apartment && (
          <div className="detail-page">
            <img
              className="detail-image"
              src={apartment.image_url ?? FALLBACK_IMAGE}
              alt={apartment.title}
            />

            <div className="detail-body">
              <h1>{apartment.title}</h1>

              <div className="detail-location">
                <IonIcon icon={locationOutline} />
                <span>{apartment.location}</span>
              </div>

              <div className="detail-price">
                ₦{formatPrice(apartment.price)}
                <small> / {apartment.price_period}</small>
              </div>

              {apartment.features && apartment.features.length > 0 && (
                <div className="feature-pills">
                  {apartment.features.map((f) => (
                    <span key={f}>{f}</span>
                  ))}
                </div>
              )}

              {apartment.description && (
                <p className="detail-description">{apartment.description}</p>
              )}

              {apartment.video_url && (
                <a className="video-link" href={apartment.video_url} target="_blank" rel="noreferrer">
                  <IonIcon icon={playCircleOutline} />
                  Watch walkthrough video
                </a>
              )}

              <a
                className="btn btn-gold full-width"
                href={`https://wa.me/2347059559238?text=${encodeURIComponent(
                  `Hi, I'm interested in "${apartment.title}" (${apartment.location}, ₦${formatPrice(
                    apartment.price
                  )}/${apartment.price_period}).`
                )}`}
              >
                Enquire on WhatsApp
              </a>
            </div>
          </div>
        )}

        <WhatsAppFloat />
      </IonContent>
    </IonPage>
  );
};

export default ApartmentDetail;
