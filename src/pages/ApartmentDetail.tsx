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
  {/* SQUARE GALLERY - 2 cols on mobile, 3 on desktop */}
  <div style={{display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:'6px', padding:'8px'}}>
    {apartment.media_urls?.map((url:string,i:number)=>(
      <div key={i} style={{aspectRatio:'1/1', overflow:'hidden', borderRadius:'12px', background:'#f0f0f0'}}>
        <img src={url} style={{width:'100%', height:'100%', objectFit:'cover'}} alt="apt" />
      </div>
    ))}
    {apartment.video_url && (
      <div style={{aspectRatio:'1/1', overflow:'hidden', borderRadius:'12px'}}>
        <video src={apartment.video_url} controls playsInline style={{width:'100%', height:'100%', objectFit:'cover'}} />
      </div>
    )}
  </div>
      </IonContent>
    </IonPage>
  );
};

export default ApartmentDetail;