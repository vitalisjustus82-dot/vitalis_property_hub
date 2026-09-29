import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  IonPage,
  IonContent,
  IonIcon,
  IonButton,
  IonSpinner,
} from "@ionic/react";
import { videocam, images, add } from "ionicons/icons";
import { supabase } from "../supabase";

const AgentProfile = () => {
  const history = useHistory();
  const [user, setUser] = useState<any>(null);
  const [apartments, setApartments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        history.push("/agent/login");
        return;
      }
      setUser(user);
      const { data } = await supabase
        .from("apartments")
        .select("*")
        .eq("agent_id", user.id)
        .order("created_at", { ascending: false });
      setApartments(data || []);
      setLoading(false);
    })();
  }, []);

  if (loading)
    return (
      <IonPage>
        <IonContent
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <IonSpinner />
        </IonContent>
      </IonPage>
    );

  return (
    <IonPage>
      <IonContent>
        <div style={{ height: "160px", background: "#1877f2" }}></div>
        <div style={{ padding: "16px", marginTop: "-60px" }}>
          <div style={{ display: "flex", gap: "14px", alignItems: "flex-end" }}>
            <img
              src={`https://ui-avatars.com/api/?name=${user?.email}&background=1877f2&color=fff&size=200`}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                border: "4px solid white",
              }}
            />
            <div>
              <h2 style={{ margin: 0, fontWeight: "800" }}>
                {user?.email?.split("@")[0]}
              </h2>
              <p style={{ margin: 0, color: "#555" }}>
                {apartments.length} Listings • Facebook Style
              </p>
            </div>
          </div>
          <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
            <IonButton
              style={{ flex: 1 }}
              onClick={() => history.push("/agent/dashboard")}
            >
              <IonIcon icon={add} slot="start" /> Add Apartment
            </IonButton>
            <IonButton
              style={{ flex: 1 }}
              fill="outline"
              onClick={async () => {
                await supabase.auth.signOut();
                history.push("/home");
              }}
            >
              Logout
            </IonButton>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            borderTop: "1px solid #ddd",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              flex: 1,
              textAlign: "center",
              padding: "12px",
              fontWeight: "bold",
              color: "#1877f2",
              borderBottom: "2px solid #1877f2",
            }}
          >
            <IonIcon icon={images} /> Posts
          </div>
          <div
            style={{
              flex: 1,
              textAlign: "center",
              padding: "12px",
              color: "#888",
            }}
          >
            <IonIcon icon={videocam} /> Videos
          </div>
        </div>
        <div
          style={{
            padding: "2px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "2px",
          }}
        >
          {apartments.length === 0 ? (
            <div
              style={{
                gridColumn: "1/4",
                textAlign: "center",
                padding: "40px",
              }}
            >
              No posts yet. Add apartments from Dashboard and they will show
              here like Facebook.
            </div>
          ) : (
            apartments.map((a: any) => (
              <div
                key={a.id}
                onClick={() => history.push(`/apartments/${a.id}`)}
                style={{ aspectRatio: "1", background: "#eee" }}
              >
                <img
                  src={
                    a.image_urls?.[0] ||
                    a.image_url ||
                    "https://via.placeholder.com/300"
                  }
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            ))
          )}
        </div>
        <div style={{ height: "80px" }}></div>
      </IonContent>
    </IonPage>
  );
};
export default AgentProfile;
