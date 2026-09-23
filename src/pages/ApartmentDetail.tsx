import { IonContent, IonPage, IonButton } from '@ionic/react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const ApartmentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [apartment, setApartment] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const handleEnquire = async () => {
    if (!apartment) return;
    const { data: agent } = await supabase.from('agents').select('*').eq('id', apartment.agent_id).single();
    const myNumber = "2347059559238";
    const msg = `Hello Vitalis! I like this apartment:\n\n🏠 ${apartment.title}\n📍 ${apartment.location}\n💰 ${apartment.price}\n\nAgent: ${agent?.full_name}\nPhone: ${agent?.phone}\nWhatsApp: ${agent?.whatsapp}`;
    window.open(`https://wa.me/${myNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  useEffect(() => {
    const fetchApartment = async () => {
      const { data } = await supabase.from('apartments').select('*').eq('id', id).single();
      setApartment(data);
      setLoading(false);
    };
    fetchApartment();
  }, [id]);

  if (loading) return <IonPage><IonContent>Loading...</IonContent></IonPage>;
  if (!apartment) return <IonPage><IonContent>Not found</IonContent></IonPage>;

  return (
    <IonPage>
      <IonContent>
        {apartment.video_url && (
          <div style={{ width: '100%', height: '300px' }}>
            <video
              src={apartment.video_url}
              controls
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}

        <div style={{ padding: '15px' }}>
          <h2>{apartment.title}</h2>
          <p>{apartment.location}</p>
          <p style={{ fontWeight: 'bold' }}>{apartment.price} / {apartment.price_period}</p>
        </div>

        <div style={{ padding: '15px' }}>
          <IonButton onClick={handleEnquire} expand="block" color="success">
            Enquire on WhatsApp
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ApartmentDetail;