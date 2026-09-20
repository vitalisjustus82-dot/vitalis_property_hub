import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon } from '@ionic/react';
import {
  checkmarkCircleOutline,
  gridOutline,
  callOutline,
  refreshOutline,
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import WhatsAppFloat from '../components/WhatsAppFloat';
import './About.css';

const About: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar color="secondary">
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <section className="page-hero">
          <div className="eyebrow">Who We Are</div>
          <h1>About Vitalis Property Hub</h1>
          <p>
            A real estate platform designed to make finding an apartment simple, transparent and
            stress-free.
          </p>
        </section>

        <section className="section">
          <div className="section-kicker">About Vitalis Property Hub</div>
          <h2>Your Home, Our Priority.</h2>
          <p className="muted">
            Vitalis Property Hub is a real estate platform created to make finding an apartment
            in Calabar simple and stress-free.
          </p>
          <p className="muted">
            Instead of running around, calling multiple agents, or dealing with fake listings,
            you can now browse verified apartments right here in this app.
          </p>
          <p className="muted">
            This app was built by <strong>Vitalis Justus Chiadi</strong>, a 400L Computer
            Science student at UNICAL.
          </p>
          <p className="muted">
            My mission is to connect you to your next home with transparency, speed, and trust.
          </p>
        </section>

        <section className="section">
          <div className="section-kicker">What You'll Find Here</div>
          <h2>Built Around You</h2>

          <div className="feature-grid">
            <div className="feature">
              <IonIcon icon={checkmarkCircleOutline} />
              <h3>Verified Listings</h3>
              <p>Every apartment is inspected and confirmed before posting.</p>
            </div>
            <div className="feature">
              <IonIcon icon={gridOutline} />
              <h3>Clear Details</h3>
              <p>Real photos, real prices, full description, and exact location.</p>
            </div>
            <div className="feature">
              <IonIcon icon={callOutline} />
              <h3>Easy Contact</h3>
              <p>Chat directly on WhatsApp 07059559238 or call 08136676316.</p>
            </div>
            <div className="feature">
              <IonIcon icon={refreshOutline} />
              <h3>Fast Updates</h3>
              <p>New apartments added weekly so you can discover fresh options.</p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="cta">
            <h2>Looking for a home?</h2>
            <p>Start browsing available apartments or contact me with what you need.</p>
            <button className="btn btn-gold" onClick={() => history.push('/apartments')}>
              See Apartments
            </button>
          </div>
        </section>

        <WhatsAppFloat />
      </IonContent>
    </IonPage>
  );
};

export default About;
