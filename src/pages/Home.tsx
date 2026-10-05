import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonPage,
  IonSpinner,
  IonIcon,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/react';
import { logoWhatsapp, callOutline, checkmarkCircle } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Apartment } from '../types/database';
import PropertyCard from '../components/PropertyCard';
import WhatsAppFloat from '../components/WhatsAppFloat';
// @ts-ignore
import './Home.css';

 const Home: React.FC = () => {
  const history = useHistory();
  const [user, setUser] = useState<any>(null);
  const [featured, setFeatured] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

    useEffect(() => {
    const fetchFeatured = async () => {
      const { data } = await supabase.from('apartments').select('*').limit(6).order('created_at', { ascending: false });
      if (data) setFeatured(data as any);
      setLoading(false);
    };
    fetchFeatured();
  }, []);
  return (
    <IonPage>
      <IonContent fullscreen>
          <div style={{
          position: 'absolute',
          top: '15px',
          right: '15px',
          zIndex: 100
        }}>
          {!user ? (
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={() => history.push('/agent/login')} style={{ background: 'transparent', color: 'white', border: '1px solid #c9a86a', padding: '7px 16px', borderRadius: '20px', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>Login</button>
              <button onClick={() => history.push('/agent/signup')} style={{ background: '#d4af37', color: 'black', border: 'none', padding: '7px 18px', borderRadius: '20px', fontWeight: 800, fontSize: '12px', cursor: 'pointer' }}>Register</button>
            </div>
    ) : null} 
        </div>
        {/* HERO */}
        <section className="hero">
          <div className="eyebrow">Vitalis Property Hub</div>
          <h1>
            Hi, I'm <span>Vitalis Justus Chiadi</span>
          </h1>
          <div style={{display:'flex', gap:'10px', marginTop:'15px'}}>
</div>
          <p>
            <strong>Founder of Vitalis Property Hub</strong>
            <br />
            400 Level Computer Science student at UNICAL. I'm here to make it easier for you to
            find an apartment in Calabar and beyond.
          </p>
          <p className="hero-sub">
            No more stress, no more wahala. From inspection to agreement, I'll help you get a
            safe and affordable place you can call home.
          </p>

          <div className="hero-actions">
            <button className="btn btn-gold" onClick={() => history.push('/apartments')}>
              Browse Apartments
            </button>
            <button className="btn btn-outline" onClick={() => history.push('/contact')}>
              Talk to Me
            </button>
          </div>

          <div className="quick-contact">
            <a href="https://wa.me/2347059559238">
              <IonIcon icon={logoWhatsapp} /> 07059559238
            </a>
            <a href="tel:+2348136676316">
              <IonIcon icon={callOutline} /> 08136676316
            </a>
          </div>
        </section>

        {/* ABOUT INTRO */}
        <section className="section">
          <div className="section-kicker">Your Home, Our Priority</div>
          <h2>Finding an apartment should be simple.</h2>
          <p className="muted">
            Vitalis Property Hub helps you discover apartments without the usual stress of
            moving from one agent to another.
          </p>
          <ul className="check-list">
            <li>
              <IonIcon icon={checkmarkCircle} />
              <span>Browse apartment options with clear descriptions and photos.</span>
            </li>
            <li>
              <IonIcon icon={checkmarkCircle} />
              <span>Get direct contact through WhatsApp or phone calls.</span>
            </li>
            <li>
              <IonIcon icon={checkmarkCircle} />
              <span>Save time with organized listings and fast updates.</span>
            </li>
          </ul>
        </section>

        {/* FEATURED APARTMENTS */}
        <section className="section">
          <div className="section-kicker">Featured Homes</div>
          <h2>Available Apartments</h2>
          <p className="muted">Live listings pulled straight from the database.</p>

          {loading && (
            <div className="loading-row">
              <IonSpinner name="crescent" />
            </div>
          )}

          {!loading && featured.length === 0 && (
            <p className="muted">
              No apartments have been added yet. Add listings from the Supabase dashboard and
              they'll show up here automatically.
            </p>
          )}

          <div className="cards-grid">
            {featured.map((apt) => (
              <PropertyCard key={apt.id} apartment={apt} />
            ))}
          </div>
        </section>

        {/* STATS */}
        <section className="stats">
          <div className="stat">
            <strong>01</strong>
            <span>Direct communication with the property finder.</span>
          </div>
          <div className="stat">
            <strong>24/7</strong>
            <span>Send an enquiry whenever you need an apartment.</span>
          </div>
          <div className="stat">
            <strong>100%</strong>
            <span>Focused on transparency, speed and trust.</span>
          </div>
        </section>

        {/* CTA */}
        <section className="section">
          <div className="cta">
            <h2>Let's find your next apartment together</h2>
            <p>Tell me what you need and I'll help you get started.</p>
            <a className="btn btn-gold" href="https://wa.me/2347059559238">
              Chat on WhatsApp
            </a>
          </div>
        </section>

        <WhatsAppFloat />
      </IonContent>
    </IonPage>
  );
};

export default Home;
