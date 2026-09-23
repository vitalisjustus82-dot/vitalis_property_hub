import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonTitle,
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { supabase } from "../lib/supabase";

const AgentLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const login = async () => {
    const { data, error } = await supabase
      .from("agents")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .single();

    if (error || !data) {
      alert("Wrong email or password");
      return;
    }

    localStorage.setItem("agent", JSON.stringify(data));
    history.push("/agent/dashboard");
  };

  return (
    <IonPage>
      <IonContent
        className="ion-padding"
        style={{ maxWidth: "400px", margin: "80px auto" }}
      >
        <IonTitle>Agent Login</IonTitle>
        <div style={{ marginTop: "20px" }}>
          <IonInput
            placeholder="Email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
            style={{
              border: "1px solid #ccc",
              marginBottom: "10px",
              padding: "10px",
            }}
          />
          <IonInput
            placeholder="Password"
            type="password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
            style={{
              border: "1px solid #ccc",
              marginBottom: "10px",
              padding: "10px",
            }}
          />
          <IonButton expand="block" onClick={login}>
            Login
          </IonButton>
          <p style={{ textAlign: "center", marginTop: "15px" }}>
            Don't have account? <a href="/agent/register">Register</a>
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AgentLogin;
