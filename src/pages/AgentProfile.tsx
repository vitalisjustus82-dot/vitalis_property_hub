import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { IonPage, IonContent, IonIcon, IonButton, IonSpinner } from "@ionic/react";
import { camera, videocam, images, locationOutline, callOutline, add } from "ionicons/icons";
import { supabase } from "../supabase";

const AgentProfile = () => {
  const history = useHistory();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>({});
  const [apartments, setApartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { history.push("/agent/login"); return; }
    setUser(user);

    // get profile
    let { data: prof } = await supabase.from("profiles").select("*").eq("id", user.id).single();
    if (!prof) {
      // create if not exists
      const { data } = await supabase.from("profiles").insert({ id: user.id, email: user.email }).select().single();
      prof = data;
    }
    setProfile(prof || {});

    // get my apartments
    const { data: apt } = await supabase.from("apartments").select("*").eq("agent_id", user.id).order("created_at", { ascending: false });
    setApartments(apt || []);
    setLoading(false);
  };

  const uploadAvatar = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const fileName = `${user.id}_${Date.now()}.jpg`;
    await supabase.storage.from("avatars").upload(fileName, file);
    const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(fileName);
    await supabase.from("profiles").update({ avatar_url: urlData.publicUrl }).eq("id", user.id);
    setProfile({...profile, avatar_url: urlData.publicUrl });
    setUploading(false);
  };

  if (loading) return <IonPage><IonContent className="ion-padding" style={{display:'flex', justifyContent:'center', alignItems:'center'}}><IonSpinner /></IonContent></IonPage>;

  return (
    <IonPage>
      <IonContent fullscreen>
        {/* COVER */}
        <div style={{ height: '180px', background: 'linear-gradient(135deg,#1a2a6c,#b21f1f,#fdbb2d)', position: 'relative' }}></div>

        {/* PROFILE HEADER - Facebook style */}
        <div style={{ padding: '0 16px', marginTop: '-50px', position:'relative' }}>
          <div style={{ display:'flex', alignItems:'flex-end', gap:'16px' }}>
            <div style={{ position:'relative' }}>
              <img src={profile.avatar_url || `https://ui-avatars.com/api/?name=${profile.full_name || user.email}&background=0D8ABC&color=fff&size=200`}
                style={{ width:'110px', height:'110px', borderRadius:'50%', border:'4px solid white', objectFit:'cover' }} />
              <label style={{ position:'absolute', bottom:0, right:0, background:'white', borderRadius:'50%', width:'32px', height:'32px', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 2px 6px rgba(0,0,0,0.3)', cursor:'pointer' }}>
                <IonIcon icon={camera} />
                <input type="file" accept="image/*" onChange={uploadAvatar} style={{ display:'none' }} />
              </label>
              {uploading && <div style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)'}}><IonSpinner /></div>}
            </div>
            <div style={{ flex:1, paddingBottom:'10px' }}>
              <h2 style={{ margin:0, fontWeight:'800', fontSize:'22px' }}>{profile.full_name || 'Agent Name'}</h2>
              <p style={{ margin:'2px 0', color:'#65676B', fontSize:'13px' }}>{apartments.length} Listings • Joined {new Date(user.created_at).getFullYear()}</p>
            </div>
          </div>

          <div style={{ marginTop:'12px', display:'flex', gap:'8px' }}>
            <IonButton expand="block" style={{flex:1}} onClick={() => history.push("/agent/edit-profile")} fill="solid">
              Edit Profile
            </IonButton>
            <IonButton expand="block" style={{flex:1}} onClick={() => history.push("/agent/dashboard")} fill="outline">
              <IonIcon icon={add} slot="start" /> Add Apartment
            </IonButton>
          </div>

          <div style={{ marginTop:'14px', background:'#f0f2f5', padding:'12px', borderRadius:'10px' }}>
            <div style={{ display:'flex', gap:'8px', alignItems:'center', fontSize:'14px', marginBottom:'6px' }}><IonIcon icon={locationOutline} /> {profile.location || 'Add location'}</div>
            <div style={{ display:'flex', gap:'8px', alignItems:'center', fontSize:'14px', marginBottom:'6px' }}><IonIcon icon={callOutline} /> {profile.phone || user.phone || 'Add phone'}</div>
            <p style={{ fontSize:'14px', margin:'8px 0 0' }}>{profile.bio || 'No bio yet. Tell clients about yourself.'}</p>
          </div>
        </div>

        {/* TABS */}
        <div style={{ display:'flex', borderTop:'1px solid #ddd', borderBottom:'1px solid #ddd', marginTop:'16px' }}>
          <div style={{ flex:1, textAlign:'center', padding:'12px', fontWeight:'bold', borderBottom:'3px solid #1877f2', color:'#1877f2' }}><IonIcon icon={images} /> Posts</div>
          <div style={{ flex:1, textAlign:'center', padding:'12px', color:'#65676B' }}><IonIcon icon={videocam} /> Videos</div>
        </div>

        {/* MY APARTMENTS FEED - Facebook grid */}
        <div style={{ padding:'8px' }}>
          {apartments.length === 0? (
            <div style={{ textAlign:'center', padding:'40px 20px', color:'#65676B' }}>
              <h3>No posts yet</h3>
              <p>When you add apartments, they will appear here like Facebook posts.</p>
              <IonButton onClick={() => history.push("/agent/dashboard")}>Add First Apartment</IonButton>
            </div>
          ) : (
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'2px' }}>
              {apartments.map((apt) => (
                <div key={apt.id} onClick={() => history.push(`/apartments/${apt.id}`)} style={{ position:'relative', aspectRatio:'1', background:'#eee', overflow:'hidden', cursor:'pointer' }}>
                  {apt.video_url? (
                    <video src={apt.video_url} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  ) : (
                    <img src={apt.image_urls?.[0] || apt.image_url || 'https://via.placeholder.com/300'} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                  )}
                  {apt.video_url && <div style={{ position:'absolute', top:'6px', left:'6px', background:'rgba(0,0,0,0.6)', borderRadius:'4px', padding:'2px 4px' }}><IonIcon icon={videocam} style={{ color:'white', fontSize:'12px' }} /></div>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ height:'80px' }}></div>
      </IonContent>
    </IonPage>
  );
};

export default AgentProfile;