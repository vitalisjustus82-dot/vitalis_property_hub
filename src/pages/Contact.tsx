import { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonButton,
  IonIcon,
  IonToast,
  IonSpinner,
} from '@ionic/react';
import { logoWhatsapp, callOutline, mailOutline, locationOutline, settingsOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import WhatsAppFloat from '../components/WhatsAppFloat';
import './Contact.css';

const LOOKING_FOR_OPTIONS = [
  'Self-Contain',
  '1 Bedroom',
  '2 Bedroom',
  '3 Bedroom',
  'Family House',
  'Other',
];

const Contact: React.FC = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [lookingFor, setLookingFor] = useState('Self-Contain');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; message: string; color: string }>({
    show: false,
    message: '',
    color: 'success',
  });

  const resetForm = () => {
    setName('');
    setPhone('');
    setLookingFor('Self-Contain');
    setMessage('');
  };

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim()) {
      setToast({ show: true, message: 'Please add your name and phone number.', color: 'warning' });
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from('contact_messages').insert({
      name: name.trim(),
      phone: phone.trim(),
      looking_for: lookingFor,
      message: message.trim() || null,
    });
    setSubmitting(false);

    if (error) {
      setToast({ show: true, message: 'Could not send enquiry. Please try again.', color: 'danger' });
      return;
    }

    setToast({ show: true, message: 'Enquiry sent! I will get back to you shortly.', color: 'success' });
    resetForm();
  };

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar color="secondary">
          <IonTitle>Contact</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <section className="page-hero">
          <div className="eyebrow">Let's Talk</div>
          <h1>Contact Vitalis Property Hub</h1>
          <p>Tell me what kind of apartment you are looking for and let's get you started.</p>
        </section>

        <section className="contact-card">
          <h2>Get in touch</h2>

          <div className="contact-item">
            <IonIcon icon={logoWhatsapp} />
            <div>
              <strong>WhatsApp</strong>
              <a href="https://wa.me/2347059559238">07059559238</a>
            </div>
          </div>

          <div className="contact-item">
            <IonIcon icon={callOutline} />
            <div>
              <strong>Call</strong>
              <a href="tel:+2348136676316">08136676316</a>
            </div>
          </div>

          <div className="contact-item">
            <IonIcon icon={mailOutline} />
            <div>
              <strong>Email</strong>
              <a href="mailto:vitalisjustus82@gmail.com">vitalisjustus82@gmail.com</a>
            </div>
          </div>

          <div className="contact-item">
            <IonIcon icon={locationOutline} />
            <div>
              <strong>Service Area</strong>
              <span>Calabar and beyond</span>
            </div>
          </div>

          <a className="btn btn-gold full-width" href="https://wa.me/2347059559238">
            WhatsApp Chat
          </a>

          <div className="office">
            <strong>Office Working Hours</strong>
            Available: Mon - Sat, 8am - 8pm
          </div>
        </section>

        <section className="contact-form">
          <h2>Tell me what you need</h2>

          <IonItem lines="full">
            <IonLabel position="stacked">Name</IonLabel>
            <IonInput
              value={name}
              placeholder="Your full name"
              onIonInput={(e) => setName(e.detail.value ?? '')}
            />
          </IonItem>

          <IonItem lines="full">
            <IonLabel position="stacked">Phone</IonLabel>
            <IonInput
              type="tel"
              value={phone}
              placeholder="Your phone number"
              onIonInput={(e) => setPhone(e.detail.value ?? '')}
            />
          </IonItem>

          <IonItem lines="full">
            <IonLabel position="stacked">What are you looking for?</IonLabel>
            <IonSelect value={lookingFor} onIonChange={(e) => setLookingFor(e.detail.value)}>
              {LOOKING_FOR_OPTIONS.map((opt) => (
                <IonSelectOption key={opt} value={opt}>
                  {opt}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          <IonItem lines="full">
            <IonLabel position="stacked">Message</IonLabel>
            <IonTextarea
              value={message}
              placeholder="Tell me your preferred location, budget and apartment type..."
              autoGrow
              onIonInput={(e) => setMessage(e.detail.value ?? '')}
            />
          </IonItem>

          <IonButton expand="block" color="primary" className="submit-btn" onClick={handleSubmit} disabled={submitting}>
            {submitting ? <IonSpinner name="dots" /> : 'Send Enquiry'}
          </IonButton>
        </section>

        <div className="admin-link" onClick={() => history.push('/admin')}>
          <IonIcon icon={settingsOutline} /> Admin
        </div>

        <WhatsAppFloat />

        <IonToast
          isOpen={toast.show}
          message={toast.message}
          duration={3000}
          color={toast.color}
          onDidDismiss={() => setToast((t) => ({ ...t, show: false }))}
        />
      </IonContent>
    </IonPage>
  );
};

export default Contact;
