import { useState, useEffect } from "react";
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
import { camera, add, images, logoWhatsapp, logOut } from "ionicons/icons";
import { supabase } from '../lib/supabase';

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
  setLoading(false);
  setUser(null);
  return; 
}
      setUser(user);
      try {
        const { data: prof } = await supabase.from("profiles").select("*").eq("id", user.id).single();
        setProfile(prof);
      } catch(e){}
      try {
        const { data: apts } = await supabase.from("apartments").select("*").eq("agent_id", user.id).order("created_at", {ascending: false});
        setApartments(apts || []);
      } catch(e){}
    } catch(e){ console.log(e) } finally { setLoading(false) }
  };

  const uploadAvatar = async (e: any) => {
    const file = e.target.files[0];
    if(!file ||!user) return;
    setUploading(true);
    const fileName = `${user.id}-${Date.now()}.${file.name.split('.').pop()}`;
    const { error } = await supabase.storage.from("avatars").upload(fileName, file, {upsert: true});
    if(!error){
      const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);
      await supabase.from("profiles").upsert({ id: user.id, avatar_url: data.publicUrl, email: user.email });
      setProfile({...profile, avatar_url: data.publicUrl});
    }
    setUploading(false);
  };

  const handleAddApartment = async () => {
    if(!newApt.title ||!mediaFiles) return alert("Add title and media");
    setUploading(true);
    const urls: string[] = [];
    for(let i=0; i<mediaFiles.length; i++){
      const f = mediaFiles[i];
      const name = `${user.id}/${Date.now()}-${f.name}`;
      const { error } = await supabase.storage.from("apartment-media").upload(name, f);
      if(!error){
        const { data } = supabase.storage.from("apartment-media").getPublicUrl(name);
        urls.push(data.publicUrl);
      }
    }
    await supabase.from("apartments").insert({ agent_id: user.id, title: newApt.title, price: newApt.price, location: newApt.location, description: newApt.description, media_urls: urls });
    setUploading(false);
    setShowAdd(false);
    fetchAll();
  };

  if(loading) return <IonPage><IonContent className="ion-padding"><IonSpinner /></IonContent></IonPage>;

  return (
    <IonPage>
      <IonHeader><IonToolbar><IonButtons slot="start"><IonBackButton /></IonButtons><IonTitle>Agent Profile</IonTitle><IonButtons slot="end"><IonButton onClick={async()=>{await supabase.auth.signOut(); history.push("/agent/login")}}><IonIcon icon={logOut}/></IonButton></IonButtons></IonToolbar></IonHeader>
      <IonContent className="ion-padding">
  {!user && !loading && (
    <div style={{textAlign:'center', marginTop:'100px'}}>
      <h2>Please Login First</h2>
      <IonButton onClick={()=> history.push("/agent/login")}>Go to Login</IonButton>
    </div>
  )}

 <div style={{textAlign:'center', padding:'20px', background:'#f0f2f5', borderRadius:'15px'}}>
          <div style={{position:'relative', display:'inline-block'}}>
            <IonAvatar style={{width:'120px', height:'120px', margin:'0 auto'}}><img src={profile?.avatar_url || "https://ionicframework.com/docs/img/demos/avatar.svg"} /></IonAvatar>
            <label htmlFor="av" style={{position:'absolute', bottom:0, right:0, background:'#1877f2', borderRadius:'50%', padding:'8px', cursor:'pointer'}}><IonIcon icon={camera} style={{color:'white'}}/></label>
            <input id="av" type="file" hidden accept="image/*" onChange={uploadAvatar} />
          </div>
          <h2>{profile?.full_name || user?.email}</h2>
          <p style={{color:'gray'}}>{user?.email}</p>
          {uploading && <IonSpinner />}
        </div>

        <IonButton expand="block" onClick={()=>setShowAdd(!showAdd)} style={{margin:'15px 0'}}><IonIcon icon={add} slot="start"/> {showAdd? "Cancel" : "Post New Apartment"}</IonButton>

        {showAdd && (
          <IonCard><IonCardContent>
            <IonInput label="Title" labelPlacement="floating" fill="outline" value={newApt.title} onIonChange={e=>setNewApt({...newApt, title: e.detail.value!})} style={{marginBottom:'10px'}}/>
            <IonInput label="Price" labelPlacement="floating" fill="outline" value={newApt.price} onIonChange={e=>setNewApt({...newApt, price: e.detail.value!})} style={{marginBottom:'10px'}}/>
            <IonInput label="Location" labelPlacement="floating" fill="outline" value={newApt.location} onIonChange={e=>setNewApt({...newApt, location: e.detail.value!})} style={{marginBottom:'10px'}}/>
            <IonTextarea label="Description" labelPlacement="floating" fill="outline" value={newApt.description} onIonChange={e=>setNewApt({...newApt, description: e.detail.value!})} style={{marginBottom:'10px'}}/>
            <input type="file" multiple accept="image/*,video/*" onChange={e=>setMediaFiles(e.target.files)} style={{margin:'10px 0'}}/>
            <IonButton expand="block" onClick={handleAddApartment} disabled={uploading}>{uploading? <IonSpinner/> : "Post"}</IonButton>
          </IonCardContent></IonCard>
        )}

        <h3><IonIcon icon={images}/> Your Posts ({apartments.length})</h3>
        <IonGrid><IonRow>
          {apartments.map((apt:any)=>(
            <IonCol size="12" sizeMd="6" key={apt.id}>
              <IonCard>
                {apt.media_urls?.[0]?.includes("mp4")? <video src={apt.media_urls[0]} controls style={{width:'100%', maxHeight:'250px'}}/> : <img src={apt.media_urls?.[0] || "https://via.placeholder.com/300"} style={{width:'100%', height:'250px', objectFit:'cover'}}/>}
                <IonCardContent>
                  <h2>{apt.title}</h2><p>{apt.location} - ₦{apt.price}</p>
                  <IonButton expand="block" color="success" onClick={()=>{
                    const num = "2348012345678"; // CHANGE TO YOUR NUMBER
                    const msg = `Hello, I'm interested in ${apt.title} at ${apt.location}. Agent: ${profile?.full_name || user.email}`;
                    window.open(`https://wa.me/${num}?text=${encodeURIComponent(msg)}`, "_blank");
                  }}><IonIcon icon={logoWhatsapp} slot="start"/> Enquire on WhatsApp</IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
          ))}
        </IonRow></IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default AgentProfile;