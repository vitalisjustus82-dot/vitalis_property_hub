import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonAvatar,
  IonIcon,
  IonButton,
  IonCard,
  IonCardContent,
  IonInput,
  IonTextarea,
  IonSpinner,
  IonGrid,
  IonRow,
  IonCol,
  IonButtons,
  IonBackButton
} from "@ionic/react";
import { camera, add, videocam, images, logoWhatsapp, logOut } from "ionicons/icons";
import { supabase } from "../supabase/supabaseClient";

const AgentProfile = () => {
  const history = useHistory();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [apartments, setApartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  
  const [showAdd, setShowAdd] = useState(false);
  const [newApt, setNewApt] = useState({ title: "", price: "", location: "", description: "" });
  const [mediaFiles, setMediaFiles] = useState<FileList | null>(null);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        history.push("/agent/login");
        return;
      }
      setUser(user);

      // Get profile
      const { data: prof } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      setProfile(prof);

      // Get apartments posted by this agent
      const { data: apts } = await supabase.from("apartments").select("*").eq("agent_id", user.id).order("created_at", { ascending: false });
      setApartments(apts || []);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  // Upload profile picture
  const uploadAvatar = async (e: any) => {
    const file = e.target.files[0];
    if (!file ||!user) return;
    setUploading(true);
    const fileName = `${user.id}-${Date.now()}.${file.name.split('.').pop()}`;
    const { error } = await supabase.storage.from("avatars").upload(fileName, file, { upsert: true });
    if (!error) {
      const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);
      await supabase.from("profiles").upsert({ id: user.id, avatar_url: data.publicUrl, email: user.email });
      setProfile({...profile, avatar_url: data.publicUrl });
    }
    setUploading(false);
  };

  // Add new apartment with image/video from profile
  const handleAddApartment = async () => {
    if (!newApt.title ||!mediaFiles) return alert("Add title and at least one image/video");
    setUploading(true);
    const uploadedUrls: string[] = [];

    for (let i = 0; i < mediaFiles.length; i++) {
      const file = mediaFiles[i];
      const fileName = `${user.id}/${Date.now()}-${file.name}`;
      const { error } = await supabase.storage.from("apartment-media").upload(fileName, file);
      if (!error) {
        const { data } = supabase.storage.from("apartment-media").getPublicUrl(fileName);
        uploadedUrls.push(data.publicUrl);
      }
    }

    const { error } = await supabase.from("apartments").insert({
      agent_id: user.id,
      title: newApt.title,
      price: newApt.price,
      location: newApt.location,
      description: newApt.description,
      media_urls: uploadedUrls,
      agent_phone: profile?.phone || "YOUR_WHATSAPP_NUMBER"
    });

    setUploading(false);
    if (!error) {
      setNewApt({ title: "", price: "", location: "", description: "" });
      setMediaFiles(null);
      setShowAdd(false);
            fetchAll();
    }
  };

  if (loading) { {
    return (
      <IonPage>
        <IonContent className="ion-padding" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <IonSpinner />
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start"><IonBackButton /></IonButtons>
          <IonTitle>Agent Profile</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={async () => { await supabase.auth.signOut(); history.push("/agent/login"); }}>
              <IonIcon icon={logOut} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* FACEBOOK STYLE HEADER */}
        <div style={{ textAlign: 'center', padding: '20px', background: '#f0f2f5', borderRadius: '15px' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <IonAvatar style={{ width: '120px', height: '120px', margin: '0 auto' }}>
              <img src={profile?.avatar_url || "https://ionicframework.com/docs/img/demos/avatar.svg"} alt="profile" />
            </IonAvatar>
            <label htmlFor="avatarUpload" style={{ position: 'absolute', bottom: '0', right: '0', background: '#1877f2', borderRadius: '50%', padding: '8px', cursor: 'pointer' }}>
              <IonIcon icon={camera} style={{ color: 'white' }} />
            </label>
            <input id="avatarUpload" type="file" accept="image/*" hidden onChange={uploadAvatar} />
          </div>
          <h2 style={{ marginTop: '10px' }}>{profile?.full_name || user?.email}</h2>
          <p style={{ color: 'gray' }}>{user?.email}</p>
          {uploading && <IonSpinner />}
        </div>

        {/* ADD NEW POST BUTTON */}
        <IonButton expand="block" onClick={() => setShowAdd(!showAdd)} style={{ margin: '15px 0' }}>
          <IonIcon icon={add} slot="start" /> {showAdd? "Cancel" : "Post New Apartment Video/Image"}
        </IonButton>

        {showAdd && (
          <IonCard>
            <IonCardContent>
              <IonInput label="Title" labelPlacement="floating" fill="outline" value={newApt.title} onIonChange={e => setNewApt({...newApt, title: e.detail.value! })} style={{ marginBottom: '10px' }} />
              <IonInput label="Price" labelPlacement="floating" fill="outline" value={newApt.price} onIonChange={e => setNewApt({...newApt, price: e.detail.value! })} style={{ marginBottom: '10px' }} />
              <IonInput label="Location" labelPlacement="floating" fill="outline" value={newApt.location} onIonChange={e => setNewApt({...newApt, location: e.detail.value! })} style={{ marginBottom: '10px' }} />
              <IonTextarea label="Description" labelPlacement="floating" fill="outline" value={newApt.description} onIonChange={e => setNewApt({...newApt, description: e.detail.value! })} style={{ marginBottom: '10px' }} />

              <label>Select Images / Videos:</label>
              <input type="file" multiple accept="image/*,video/*" onChange={e => setMediaFiles(e.target.files)} style={{ margin: '10px 0' }} />

              <IonButton expand="block" onClick={handleAddApartment} disabled={uploading}>
                {uploading? <IonSpinner /> : "Post Apartment"}
              </IonButton>
            </IonCardContent>
          </IonCard>
        )}

        {/* POSTED APARTMENTS */}
        <h3 style={{ marginTop: '20px' }}><IonIcon icon={images} /> Your Posts ({apartments.length})</h3>
        <IonGrid>
          <IonRow>
            {apartments.map((apt) => (
              <IonCol size="12" sizeMd="6" key={apt.id}>
                <IonCard>
                  {apt.media_urls && apt.media_urls[0]?.includes("mp4")? (
                    <video src={apt.media_urls[0]} controls style={{ width: '100%', maxHeight: '250px' }} />
                  ) : (
                    <img src={apt.media_urls?.[0] || "https://via.placeholder.com/300"} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                  )}
                  <IonCardContent>
                    <h2>{apt.title}</h2>
                    <p>{apt.location} - ₦{apt.price}</p>
                    <p style={{ fontSize: '12px', color: 'gray' }}>{apt.description?.slice(0, 80)}...</p>

                    {/* WHATSAPP ENQUIRE - Client will be redirected to YOUR whatsapp with agent info */}
                    <IonButton
                      expand="block"
                      color="success"
                      onClick={() => {
                        const agentNumber = "2348012345678"; // <-- CHANGE TO YOUR WHATSAPP NUMBER (with country code, no +)
                        const message = `Hello, I'm interested in your apartment: *${apt.title}* at ${apt.location}. Price: ${apt.price}. Posted by Agent: ${profile?.full_name} (${user.email})`;
                        window.open(`https://wa.me/${agentNumber}?text=${encodeURIComponent(message)}`, "_blank");
                      }}
                    >
                      <IonIcon icon={logoWhatsapp} slot="start" /> Enquire on WhatsApp
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        {apartments.length === 0 && <p style={{ textAlign: 'center', color: 'gray' }}>You have not posted any apartment yet.</p>}

      </IonContent>
    </IonPage>
  );
};

export default AgentProfile;