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
  const { data: profile } = await supabase.from('profiles').select('phone').eq('id', apartment.agent_id).single();
  
  const myNumber = ((profile as any)?.phone || (agent as any)?.phone || '234705959238').replace(/\D/g,'');
  const msg = `Hello Vitalis! I like this apartment:\n\n ${apartment.title}\n ${apartment.location}\n ₦${apartment.price?.toLocaleString()}\n\n Link: https://vitalis-property-hub-w4a3.vercel.app/apartments/${apartment.id}`;
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
      {/* TOP IMAGE - FIX FOR BLANK WHITE BOX */}
<div style={{ width: '100%', height: '300px', background: '#f0f0f0', overflow: 'hidden' }}>
  <img
    src={
      apartment.media_urls?.[0] ||
      apartment.image_url ||
      apartment.cover_image ||
      apartment.image ||
      'https://via.placeholder.com/400x300?text=No+Image'
    }
    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    alt="apartment"
    onError={(e) => {
      // If first image fails, try next one
      const target = e.target as HTMLImageElement;
      target.src = apartment.media_urls?.[1] || 'https://via.placeholder.com/400x300';
    }}
  />
</div>

      <div style={{ padding: '16px', background: 'white' }}>
        {/* Title, Location, Price */}
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f1e3d' }}>{apartment.title}</h2>
        <p style={{ fontSize: '13px', color: 'gray', marginTop: '6px' }}>📍 {apartment.location}</p>
        <p style={{ fontSize: '22px', fontWeight: 'bold', marginTop: '10px' }}>₦{apartment.price?.toLocaleString()} / year</p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '14px' }}>
          {apartment.amenities?.map((tag:string) => (
            <span key={tag} style={{ background: '#f3f4f6', padding: '6px 12px', borderRadius: '20px', fontSize: '12px' }}>{tag}</span>
          ))}
        </div>

        {/* Description */}
        <p style={{ fontSize: '14px', lineHeight: '22px', color: '#374151', marginTop: '16px' }}>
          {apartment.description}
        </p>

        {/* 2. WATCH VIDEO TEXT + VIDEO UNDER IT */}
        {apartment.video_url && (
          <div style={{ marginTop: '20px' }}>
            <p style={{ fontWeight: 'bold', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ border: '1px solid', borderRadius: '50%', width: '20px', height: '20px', display: 'grid', placeItems: 'center' }}>▶</span>
              Watch walkthrough video
            </p>
            <div style={{ marginTop: '12px', borderRadius: '16px', overflow: 'hidden', background: 'black', aspectRatio: '16/9' }}>
              <video src={apartment.video_url} controls playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        )}

        {/* WhatsApp */}
        <a
          href={`https://wa.me/2348000000000?text=I'm interested in ${apartment.title}`}
          style={{ display: 'block', textAlign: 'center', marginTop: '24px', background: '#eab308', padding: '16px', borderRadius: '30px', fontWeight: 'bold', color: 'black', textDecoration: 'none' }}
        >
          Enquire on WhatsApp
        </a>

        {/* Extra images gallery - optional under */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginTop: '20px' }}>
          {apartment.media_urls?.slice(1).map((url:string, i:number)=>(
            <div key={i} style={{ aspectRatio: '1/1', overflow: 'hidden', borderRadius: '12px' }}>
              <img src={url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="apt" />
            </div>
          ))}
        </div>
      </div>
    </IonContent>
  </IonPage>
  );
};

export default ApartmentDetail;