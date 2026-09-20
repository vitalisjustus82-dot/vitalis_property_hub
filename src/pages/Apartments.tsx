import { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSpinner,
  IonChip,
} from '@ionic/react';
import { supabase } from '../lib/supabase';
import type { Apartment, ApartmentCategory } from '../types/database';
import PropertyCard from '../components/PropertyCard';
import WhatsAppFloat from '../components/WhatsAppFloat';
import './Apartments.css';

const FILTERS: { label: string; value: ApartmentCategory | 'all' }[] = [
  { label: 'All Apartments', value: 'all' },
  { label: 'Self-Contain', value: 'self-contain' },
  { label: '1 Bedroom', value: '1-bedroom' },
  { label: '2 Bedrooms', value: '2-bedroom' },
  { label: 'Family Homes', value: 'family-home' },
];

const Apartments: React.FC = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<ApartmentCategory | 'all'>('all');

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      let query = supabase
        .from('apartments')
        .select('*')
        .eq('status', 'available')
        .order('created_at', { ascending: false });

      if (activeFilter !== 'all') {
        query = query.eq('category', activeFilter);
      }

      const { data, error } = await query;
      if (active) {
        if (!error && data) setApartments(data as Apartment[]);
        setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [activeFilter]);

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar color="secondary">
          <IonTitle>Apartments</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar color="secondary">
            <IonTitle size="large">Apartments</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="apartments-page">
          <p className="intro">
            Browse apartments and check the details before contacting me for inspection.
          </p>

          <div className="filter-bar">
            {FILTERS.map((f) => (
              <IonChip
                key={f.value}
                color={activeFilter === f.value ? 'primary' : undefined}
                outline={activeFilter !== f.value}
                onClick={() => setActiveFilter(f.value)}
              >
                {f.label}
              </IonChip>
            ))}
          </div>

          {loading && (
            <div className="loading-row">
              <IonSpinner name="crescent" />
            </div>
          )}

          {!loading && apartments.length === 0 && (
            <p className="empty-state">
              No apartments match this filter yet. Try a different category, or check back soon
              — new listings are added directly through Supabase.
            </p>
          )}

          <div className="cards-grid">
            {apartments.map((apt) => (
              <PropertyCard key={apt.id} apartment={apt} />
            ))}
          </div>
        </div>

        <WhatsAppFloat />
      </IonContent>
    </IonPage>
  );
};

export default Apartments;
