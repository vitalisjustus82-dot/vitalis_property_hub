import { IonPage, IonContent, IonInput, IonButton } from "@ionic/react";
import { Link } from "react-router-dom";
import { useState } from "react";

const AgentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <IonPage>
      <IonContent fullscreen style={{ "--background": "#0F1E3A" } as any}>
        <style>{`
          .lux-wrapper { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; background: #0F1E3A; }
          .lux-card { display: flex; width: 100%; max-width: 850px; border-radius: 18px; overflow: hidden; background: white; }
          .lux-left { flex: 1; background: #0F1E3A; padding: 35px; color: white; display: flex; flex-direction: column; justify-content: center; }
          .lux-right { flex: 1; padding: 30px; background: white; }
          
          /* MOBILE - THIS FIXES YOUR SCREENSHOT CUT */
          @media (max-width: 768px) {
            .lux-wrapper { padding: 15px; align-items: flex-start; padding-top: 25px; }
            .lux-card { flex-direction: column; width: 100%; max-width: 100%; }
            .lux-left { padding: 22px; }
            .lux-right { padding: 22px; }
          }
        `}</style>

        <div className="lux-wrapper">
          <div className="lux-card">
            <div className="lux-left">
              <div
                style={{
                  color: "#E7C873",
                  letterSpacing: "2px",
                  fontSize: "10px",
                  fontWeight: "700",
                }}
              >
                VITALIS PROPERTY HUB
              </div>
              <h1
                style={{
                  fontSize: "30px",
                  margin: "12px 0 0 0",
                  fontWeight: "800",
                  lineHeight: "1.2",
                }}
              >
                Welcome Back,
                <br />
                <span style={{ color: "#E7C873" }}>Agent</span>
              </h1>
              <p
                style={{
                  opacity: 0.7,
                  marginTop: "12px",
                  fontSize: "13px",
                  lineHeight: "1.5",
                }}
              >
                Manage your listings, connect with clients, and grow your real
                estate business in Calabar.
              </p>
            </div>

            <div className="lux-right">
              <h2 style={{ color: "#0F1E3A", fontWeight: "800", margin: 0 }}>
                Agent Login
              </h2>
              <p
                style={{
                  color: "#888",
                  fontSize: "11px",
                  margin: "6px 0 18px 0",
                }}
              >
                Enter your credentials to continue
              </p>

              <IonInput
                placeholder="Email Address"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
                style={{
                  border: "1.5px solid #E6E6E6",
                  borderRadius: "8px",
                  padding: "4px 10px",
                  marginBottom: "10px",
                  fontSize: "14px",
                }}
              />
              <IonInput
                placeholder="Password"
                type="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
                style={{
                  border: "1.5px solid #E6E6E6",
                  borderRadius: "8px",
                  padding: "4px 10px",
                  marginBottom: "16px",
                  fontSize: "14px",
                }}
              />

              {/* SOLID GOLD BUTTON - NOT FADED */}
              <button
                style={{
                  width: "100%",
                  height: "44px",
                  background: "#E7C873",
                  color: "#000000",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "800",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Login
              </button>

              <div
                style={{
                  textAlign: "center",
                  marginTop: "16px",
                  fontSize: "12px",
                  color: "#333",
                }}
              >
                Don't have an account?
                <Link
                  to="/agent/register"
                  style={{
                    color: "#C19A4B",
                    fontWeight: "800",
                    textDecoration: "none",
                    marginLeft: "4px",
                  }}
                >
                  Register
                </Link>
              </div>
              <div style={{ textAlign: "center", marginTop: "10px" }}>
                <Link
                  to="/home"
                  style={{
                    fontSize: "11px",
                    color: "#999",
                    textDecoration: "none",
                  }}
                >
                  ← Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AgentLogin;
