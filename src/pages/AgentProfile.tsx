import { useState, useEffect, useRef } from 'react';
import { IonPage, IonContent, IonButton, IonIcon, IonSpinner } from '@ionic/react';
import { camera, addOutline, logOutOutline, locationOutline, mailOutline, shieldCheckmarkOutline, imagesOutline } from 'ionicons/icons';
import { supabase } from '../lib/supabase';
import { useHistory } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
// @ts-ignore
import './AgentProfile.css';

const AgentProfile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [apartments, setApartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const fileInputRef = useRef<HTMLInputElement>(null);
const [uploading, setUploading] = useState(false);

const handleAvatarClick = () => {
  fileInputRef.current?.click();
};

const handleFileChange = async (e: any) => {
  const file = e.target.files[0];
  if (!file) return;
  setUploading(true);
  try {
    const fileName = `${user.id}_${Date.now()}`;
    const { error } = await supabase.storage.from('avatars').upload(fileName, file);
    if (error) throw error;
    const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
    await (supabase.from("profiles") as any).update({ avatar_url: data.publicUrl }).eq("id", user.id);
    setProfile({...profile, avatar_url: data.publicUrl });
  } catch (err) {
    alert("Upload failed");
    console.log(err);
  } finally {
    setUploading(false);
  }
};

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setLoading(false); return; }
    setUser(user);
    const { data: prof } = await (supabase.from("profiles") as any).select("*").eq("id", user.id).single();
    setProfile(prof);
    const { data: apts } = await (supabase.from("apartments") as any).select("*").eq("agent_id", user.id).order("created_at", { ascending: false });
    setApartments(apts || []);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    history.push("/agent/login");
  };

  if (loading) return <IonPage><IonContent className="ion-padding ion-text-center"><IonSpinner /></IonContent></IonPage>;

  if (!user) {
    return (
      <IonPage>
        <IonContent className="fb-profile-empty">
          <h2>Please Login First</h2>
          <IonButton onClick={() => history.push("/agent/login")} className="gold-btn">GO TO LOGIN</IonButton>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonContent fullscreen className="fb-bg">
        {/* COVER */}
        <div className="fb-cover-wrap">
          <div className="fb-cover"></div>
          <div className="fb-cover-overlay">
            <div className="fb-avatar-wrap">
              <img src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.full_name || user.email}&background=0a1931&color=fff`} alt="avatar" className="fb-avatar" />
            <div className="camera-icon" onClick={handleAvatarClick} style={{cursor: 'pointer'}}>
              <IonIcon icon={camera} />              
              </div>
                <input
  type="file"
  ref={fileInputRef}
  onChange={handleFileChange}
  accept="image/*"
  style={{ display: 'none' }}
/>
            </div>
            <div className="fb-name-block">
              <h1>{profile?.full_name || "Agent Name"} {profile?.is_verified && <IonIcon icon={shieldCheckmarkOutline} className="verified" />}</h1>
              <p>@{user.email?.split("@")[0]} • {apartments.length} listings • Agent</p>
              <div className="fb-actions">
                <IonButton size="small" fill="outline" className="fb-btn-outline">Edit Profile</IonButton>
                <IonButton size="small" fill="clear" onClick={handleLogout}><IonIcon icon={logOutOutline} /></IonButton>
              </div>
            </div>
          </div>
        </div>

        <div className="fb-tabs">
          <span className="active">Posts</span><span>About</span><span>Listings</span><span>Photos</span><span>Reviews</span><span>More</span>
        </div>

        <div className="fb-layout">
          {/* LEFT - INTRO */}
          <div className="fb-left">
            <div className="fb-card">
              <h3>Intro</h3>
              <div className="fb-intro-item"><IonIcon icon={mailOutline} /> {user.email}</div>
              <div className="fb-intro-item"><IonIcon icon={locationOutline} /> Based in Calabar, Cross River</div>
              <div className="fb-intro-item"><IonIcon icon={shieldCheckmarkOutline} /> Verified Agent • Joined {new Date(user.created_at).getFullYear()}</div>
              <IonButton expand="block" className="fb-edit-btn">Edit details</IonButton>
            </div>

            <div className="fb-card">
              <div className="fb-card-head"><h3>Photos • {apartments.length}</h3><span>See all</span></div>
              <div className="fb-photo-grid">
                {apartments.slice(0, 6).map((apt, i) => (
                  <img key={i} src={apt.media_urls?.[0] || 'https://via.placeholder.com/300'} alt="" />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT - POSTS */}
          <div className="fb-right">
            <div className="fb-card fb-create-post">
              <div className="fb-create-top">
                <img src={profile?.avatar_url || `https://ui-avatars.com/api/?name=${profile?.full_name}`} alt="" />
                <button onClick={() => history.push("/agent/post")}>What's new listing, {profile?.full_name?.split(" ")[0]}?</button>
              </div>
              <button onClick={() => history.push('/admin/apartments/new')} style={{ background: '#d4af37', width: '100%', padding: '12px', borderRadius: '6px', fontWeight: 800, border: 'none', cursor: 'pointer' }}>
    + POST NEW APARTMENT
</button>
            </div>

            <div className="fb-card">
              <div className="fb-card-head"><h3><IonIcon icon={imagesOutline} /> Your Posts ({apartments.length})</h3></div>
              {apartments.length === 0? <p className="no-post">No posts yet. Create your first listing!</p> :
                <div className="fb-posts-grid">
                  {apartments.map((apt) => <PropertyCard key={apt.id} apartment={apt} />)}
                </div>
              }
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AgentProfile;