import { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonSpinner,
  IonAlert,
  IonBadge,
} from '@ionic/react';
import { addOutline, logOutOutline, createOutline, trashOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useRequireAuth } from '../../lib/useRequireAuth';
import type { Apartment } from '../../types/database';
import './Admin.css';

const AdminDashboard: React.FC = () => {
  const { session, loading: authLoading } = useRequireAuth();
  const history = useHistory();
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [pendingDelete, setPendingDelete] = useState<Apartment | null>(null);

  const load = async () => {
  try {
    const { data } = await (supabase as any)
      .from('apartments')
      .select('*')
      .order('created_at', { ascending: false });
    setApartments(data || []);
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false); // <-- this stops the spinner
  }
}

const toggleFeatured = async (apt: any) => {
  const { error } = await (supabase as any)
    .from('apartments')
    .update({ is_featured: !apt.is_featured })
    .eq('id', apt.id);

  if (!error) {
    setApartments(prev => prev.map(p => 
      p.id === apt.id ? { ...p, is_featured: !p.is_featured } : p
    ));
  } else {
    console.log(error);
  }
};
  useEffect(() => {
    if (session) load();
  }, [session]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    history.replace('/admin/login');
  };

  const handleDelete = async () => {
    if (!pendingDelete) return;
    await supabase.from('apartments').delete().eq('id', pendingDelete.id);
    setPendingDelete(null);
    load();
  };

  if (authLoading) {
    return (
      <IonPage>
        <IonContent className="admin-loading">
          <IonSpinner name="crescent" />
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar color="secondary">
          <IonTitle>Manage Apartments</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleSignOut}>
              <IonIcon icon={logOutOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="admin-list">
          <IonButton expand="block" className="add-btn" onClick={() => history.push('/admin/apartments/new')}>
            <IonIcon icon={addOutline} slot="start" />
            Add New Apartment
          </IonButton>

          {loading && (
            <div className="admin-loading">
              <IonSpinner name="crescent" />
            </div>
          )}

          {!loading && apartments.length === 0 && (
            <p className="muted center">No apartments yet. Add your first one above.</p>
          )}

          {apartments.map((apt) => (
            <div className="admin-row" key={apt.id}>
              <img
                src={apt.image_url ?? 'https://placehold.co/80x80?text=No+Img'}
                alt={apt.title}
                className="admin-thumb"
              />
              <div className="admin-row-body">
                <strong>{apt.title}</strong>
                <span className="muted small">{apt.location}</span>
                <div className="admin-row-badges">
                  <IonBadge color={apt.status === 'available' ? 'success' : 'medium'}>
                    {apt.status}
                  </IonBadge>
                  {apt.featured && <IonBadge color="primary">Featured</IonBadge>}
                  {apt.video_url && <IonBadge color="tertiary">Has Video</IonBadge>}
                </div>
              </div>
              <div className="admin-row-actions">
                <IonButton size="small" color={apt.is_featured ? 'success' : 'medium'} onClick={() => toggleFeatured(apt)}>
  {apt.is_featured ? '★ On Home' : 'Add to Home'}
</IonButton>
                <IonButton
                  fill="clear"
                  onClick={() => history.push(`/admin/apartments/${apt.id}/edit`)}
                >
                  <IonIcon icon={createOutline} />
                </IonButton>
                <IonButton fill="clear" color="danger" onClick={() => setPendingDelete(apt)}>
                  <IonIcon icon={trashOutline} />
                </IonButton>
              </div>
            </div>
          ))}
        </div>

        <IonAlert
          isOpen={!!pendingDelete}
          header="Delete apartment?"
          message={`This will permanently remove "${pendingDelete?.title}".`}
          buttons={[
            { text: 'Cancel', role: 'cancel', handler: () => setPendingDelete(null) },
            { text: 'Delete', role: 'destructive', handler: handleDelete },
          ]}
          onDidDismiss={() => setPendingDelete(null)}
        />
      </IonContent>
    </IonPage>
  );
};

export default AdminDashboard;
