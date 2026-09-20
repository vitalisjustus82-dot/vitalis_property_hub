import { IonFab, IonFabButton, IonIcon } from '@ionic/react';
import { logoWhatsapp } from 'ionicons/icons';

const WHATSAPP_NUMBER = '2347059559238';

interface Props {
  message?: string;
}

const WhatsAppFloat: React.FC<Props> = ({ message }) => {
  const href = message
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${WHATSAPP_NUMBER}`;

  return (
    <IonFab vertical="bottom" horizontal="end" slot="fixed" style={{ marginBottom: '4px' }}>
      <IonFabButton href={href} target="_blank" style={{ '--background': '#25d366' }}>
        <IonIcon icon={logoWhatsapp} />
      </IonFabButton>
    </IonFab>
  );
};

export default WhatsAppFloat;
