import { IonPage, IonContent, IonInput } from "@ionic/react";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";

const AgentLogin = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Check that both fields have been filled
    if (!email.trim() || !password) {
      alert("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      // Get the registered agent from localStorage
      const savedAgent = localStorage.getItem("agent");

      if (!savedAgent) {
        alert("No account found. Please register first.");
        history.push("/agent/register");
        return;
      }

      // Convert the saved string back into an object
      const agent = JSON.parse(savedAgent);

      // Make sure the saved account has the required information
      if (!agent.email || !agent.password) {
        alert("Your account information is incomplete. Please register again.");

        localStorage.removeItem("isAgentLoggedIn");
        localStorage.removeItem("currentAgent");

        return;
      }

      // Clean the email addresses before comparing them
      const enteredEmail = email.trim().toLowerCase();
      const savedEmail = String(agent.email).trim().toLowerCase();

      // CHECK EMAIL
      if (enteredEmail !== savedEmail) {
        alert("Incorrect email address.");

        // Make absolutely sure the user is NOT logged in
        localStorage.removeItem("isAgentLoggedIn");
        localStorage.removeItem("currentAgent");

        return;
      }

      // CHECK PASSWORD
      const enteredPassword = password;
      const savedPassword = String(agent.password);

      if (enteredPassword !== savedPassword) {
        alert("Incorrect password. Please try again.");

        // Make absolutely sure the user is NOT logged in
        localStorage.removeItem("isAgentLoggedIn");
        localStorage.removeItem("currentAgent");

        return;
      }

      // ------------------------------------------------
      // EMAIL AND PASSWORD ARE CORRECT
      // ------------------------------------------------

      localStorage.setItem("isAgentLoggedIn", "true");
      localStorage.setItem("currentAgent", JSON.stringify(agent));

      alert(`Welcome back, ${agent.fullName || "Agent"}!`);

      history.push("/agent/dashboard");
    } catch (error) {
      console.error("Login error:", error);

      // Never allow login if an error occurs
      localStorage.removeItem("isAgentLoggedIn");
      localStorage.removeItem("currentAgent");

      alert("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent
        fullscreen
        style={{ "--background": "#0A1931" } as React.CSSProperties}
      >
        <div
          style={{
            minHeight: "100vh",
            background: "#0A1931",
            display: "flex",
            justifyContent: "center",
            padding: "30px 16px 80px 16px",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "420px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {/* HEADER */}
            <div
              style={{
                background: "#0F1E3A",
                borderRadius: "18px",
                padding: "28px 26px",
                border: "1px solid rgba(231,200,115,0.15)",
              }}
            >
              <div
                style={{
                  color: "#E7C873",
                  letterSpacing: "2.5px",
                  fontSize: "10px",
                  fontWeight: "700",
                }}
              >
                VITALIS PROPERTY HUB
              </div>

              <h1
                style={{
                  fontSize: "28px",
                  margin: "12px 0 0 0",
                  fontWeight: "800",
                  color: "white",
                }}
              >
                Welcome Back,
                <br />
                <span style={{ color: "#E7C873" }}>Agent</span>
              </h1>
            </div>

            {/* LOGIN FORM */}
            <div
              style={{
                background: "white",
                borderRadius: "18px",
                padding: "26px",
              }}
            >
              <h2
                style={{
                  color: "#0F1E3A",
                  fontWeight: "800",
                  margin: "0 0 18px 0",
                }}
              >
                Agent Login
              </h2>

              {/* EMAIL */}
              <IonInput
                type="email"
                placeholder="Email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value || "")}
                style={{
                  border: "1.5px solid #E8E8E8",
                  borderRadius: "10px",
                  padding: "4px 12px",
                  marginBottom: "12px",
                }}
              />

              {/* PASSWORD */}
              <IonInput
                type="password"
                placeholder="Password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value || "")}
                style={{
                  border: "1.5px solid #E8E8E8",
                  borderRadius: "10px",
                  padding: "4px 12px",
                  marginBottom: "18px",
                }}
              />

              {/* LOGIN BUTTON */}
              <button
                type="button"
                onClick={handleLogin}
                disabled={loading}
                style={{
                  width: "100%",
                  height: "46px",
                  background: loading ? "#BDBDBD" : "#E7C873",
                  color: "#000",
                  border: "none",
                  borderRadius: "10px",
                  fontWeight: "800",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Checking..." : "Login"}
              </button>

              {/* REGISTER LINK */}
              <div
                style={{
                  textAlign: "center",
                  marginTop: "16px",
                  fontSize: "13px",
                  color: "#555",
                }}
              >
                Don't have an account?
                <Link
                  to="/agent/register"
                  style={{
                    color: "#C5A059",
                    fontWeight: "800",
                    textDecoration: "none",
                    marginLeft: "5px",
                  }}
                >
                  Register
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
