import { useEffect, useRef, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonToggle,
  IonButton,
  IonSpinner,
  IonToast,
  IonIcon,
} from '@ionic/react';
import { imageOutline, videocamOutline, closeCircle } from 'ionicons/icons';
import { useHistory, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useRequireAuth } from '../../lib/useRequireAuth';
import type { Apartment, ApartmentCategory } from '../../types/database';
import './Admin.css';

const CATEGORIES: ApartmentCategory[] = [
  'self-contain',
  '1-bedroom',
  '2-bedroom',
  '3-bedroom',
  'family-home',
  'other',
];

const BUCKET = 'apartment-images';

const emptyForm = {
  title: '',
  location: '',
  price: '',
  price_period: 'year',
  category: 'other' as ApartmentCategory,
  bedrooms: '',
  bathrooms: '',
  features: '',
  description: '',
  featured: false,
  status: 'available' as Apartment['status'],
};

const ApartmentForm: React.FC = () => {
  const { session, loading: authLoading } = useRequireAuth();
  const history = useHistory();
  const { id } = useParams<{ id?: string }>();
  const isEdit = !!id;

  const [form, setForm] = useState(emptyForm);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [uploadStep, setUploadStep] = useState<string | null>(null);
  const [toast, setToast] = useState<{ show: boolean; message: string; color: string }>({
    show: false,
    message: '',
    color: 'success',
  });

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isEdit || !session) {
      setLoading(false);
      return;
    }
    (async () => {
      const { data, error } = await supabase.from('apartments').select('*').eq('id', id).single();
      if (!error && data) {
        const apt = data as Apartment;
        setForm({
          title: apt.title,
          location: apt.location,
          price: String(apt.price),
          price_period: apt.price_period,
          category: apt.category,
          bedrooms: apt.bedrooms != null ? String(apt.bedrooms) : '',
          bathrooms: apt.bathrooms != null ? String(apt.bathrooms) : '',
          features: apt.features?.join(', ') ?? '',
          description: apt.description ?? '',
          featured: apt.featured,
          status: apt.status,
        });
        setImageUrl(apt.image_url);
        setVideoUrl(apt.video_url);
      }
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, session]);

  const set = <K extends keyof typeof emptyForm>(key: K, value: (typeof emptyForm)[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onPickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const onPickVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setVideoFile(file);
  };

  const uploadToBucket = async (file: File, prefix: string) => {
    const ext = file.name.split('.').pop();
    const path = `${prefix}/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });
    if (error) throw error;
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    return data.publicUrl;
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.location.trim() || !form.price) {
      setToast({ show: true, message: 'Title, location and price are required.', color: 'warning' });
      return;
    }

    setSaving(true);
    try {
      let finalImageUrl = imageUrl;
      let finalVideoUrl = videoUrl;

      if (imageFile) {
        setUploadStep('Uploading photo...');
        finalImageUrl = await uploadToBucket(imageFile, 'photos');
      }
      if (videoFile) {
        setUploadStep('Uploading video...');
        finalVideoUrl = await uploadToBucket(videoFile, 'videos');
      }
      setUploadStep('Saving listing...');

      const payload = {
        title: form.title.trim(),
        location: form.location.trim(),
        price: Number(form.price),
        price_period: form.price_period.trim() || 'year',
        category: form.category,
        bedrooms: form.bedrooms ? Number(form.bedrooms) : null,
        bathrooms: form.bathrooms ? Number(form.bathrooms) : null,
        features: form.features
          ? form.features.split(',').map((s) => s.trim()).filter(Boolean)
          : null,
        description: form.description.trim() || null,
        image_url: finalImageUrl,
        video_url: finalVideoUrl,
        featured: form.featured,
        status: form.status,
      };

      if (isEdit) {
        const { error } = await supabase.from('apartments').update(payload).eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('apartments').insert(payload);
        if (error) throw error;
      }

      history.replace('/admin');
    } catch (err) {
      setToast({ show: true, message: 'Could not save listing. Please try again.', color: 'danger' });
    } finally {
      setSaving(false);
      setUploadStep(null);
    }
  };

  if (authLoading || loading) {
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
          <IonButtons slot="start">
            <IonBackButton defaultHref="/admin" />
          </IonButtons>
          <IonTitle>{isEdit ? 'Edit Apartment' : 'Add Apartment'}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="admin-form">
          {/* IMAGE UPLOAD */}
          <div className="upload-block">
            <div className="upload-preview">
              {(imagePreview ?? imageUrl) ? (
                <img src={imagePreview ?? imageUrl!} alt="Apartment" />
              ) : (
                <div className="upload-placeholder">
                  <IonIcon icon={imageOutline} />
                  <span>No photo yet</span>
                </div>
              )}
            </div>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={onPickImage}
            />
            <IonButton size="small" fill="outline" onClick={() => imageInputRef.current?.click()}>
              <IonIcon icon={imageOutline} slot="start" />
              {imageUrl || imagePreview ? 'Change Photo' : 'Upload Photo'}
            </IonButton>
          </div>

          {/* VIDEO UPLOAD */}
          <div className="upload-block">
            <div className="video-status">
              {videoFile ? (
                <span>
                  <IonIcon icon={videocamOutline} /> {videoFile.name}
                </span>
              ) : videoUrl ? (
                <span>
                  <IonIcon icon={videocamOutline} /> Video attached
                  <IonIcon
                    icon={closeCircle}
                    className="remove-video"
                    onClick={() => setVideoUrl(null)}
                  />
                </span>
              ) : (
                <span className="muted">No video yet</span>
              )}
            </div>
            <input ref={videoInputRef} type="file" accept="video/*" hidden onChange={onPickVideo} />
            <IonButton size="small" fill="outline" onClick={() => videoInputRef.current?.click()}>
              <IonIcon icon={videocamOutline} slot="start" />
              {videoUrl || videoFile ? 'Change Video' : 'Upload Video'}
            </IonButton>
          </div>

          <IonItem lines="full">
            <IonLabel position="stacked">Title</IonLabel>
            <IonInput value={form.title} onIonInput={(e) => set('title', e.detail.value ?? '')} />
          </IonItem>

          <IonItem lines="full">
            <IonLabel position="stacked">Location</IonLabel>
            <IonInput value={form.location} onIonInput={(e) => set('location', e.detail.value ?? '')} />
          </IonItem>

          <IonItem lines="full">
            <IonLabel position="stacked">Price (₦)</IonLabel>
            <IonInput
              type="number"
              value={form.price}
              onIonInput={(e) => set('price', e.detail.value ?? '')}
            />
          </IonItem>

          <IonItem lines="full">
            <IonLabel position="stacked">Price Period</IonLabel>
            <IonInput
              value={form.price_period}
              placeholder="year, month, etc."
              onIonInput={(e) => set('price_period', e.detail.value ?? '')}
            />
          </IonItem>

          <IonItem lines="full">
            <IonLabel position="stacked">Category</IonLabel>
            <IonSelect value={form.category} onIonChange={(e) => set('category', e.detail.value)}>
              {CATEGORIES.map((c) => (
                <IonSelectOption key={c} value={c}>
                  {c}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          <IonItem lines="full">
            <IonLabel position="stacked">Bedrooms</IonLabel>
            <IonInput
              type="number"
              value={form.bedrooms}
              onIonInput={(e) => set('bedrooms', e.detail.value ?? '')}
            />
          </IonItem>

          <IonItem lines="full">
            <IonLabel position="stacked">Bathrooms</IonLabel>
            <IonInput
              type="number"
              value={form.bathrooms}
              onIonInput={(e) => set('bathrooms', e.detail.value ?? '')}
            />
          </IonItem>

          <IonItem lines="full">
            <IonLabel position="stacked">Features (comma separated)</IonLabel>
            <IonInput
              value={form.features}
              placeholder="Water, Parking, Security"
              onIonInput={(e) => set('features', e.detail.value ?? '')}
            />
          </IonItem>

          <IonItem lines="full">
            <IonLabel position="stacked">Description</IonLabel>
            <IonTextarea
              value={form.description}
              autoGrow
              onIonInput={(e) => set('description', e.detail.value ?? '')}
            />
          </IonItem>

          <IonItem lines="full">
            <IonLabel position="stacked">Status</IonLabel>
            <IonSelect value={form.status} onIonChange={(e) => set('status', e.detail.value)}>
              <IonSelectOption value="available">Available</IonSelectOption>
              <IonSelectOption value="reserved">Reserved</IonSelectOption>
              <IonSelectOption value="taken">Taken</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem lines="none">
            <IonLabel>Featured on Home page</IonLabel>
            <IonToggle
              checked={form.featured}
              onIonChange={(e) => set('featured', e.detail.checked)}
            />
          </IonItem>

          <IonButton expand="block" className="submit-btn" onClick={handleSave} disabled={saving}>
            {saving ? (
              <>
                <IonSpinner name="dots" /> &nbsp;{uploadStep ?? 'Saving...'}
              </>
            ) : isEdit ? (
              'Save Changes'
            ) : (
              'Add Apartment'
            )}
          </IonButton>
        </div>

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

export default ApartmentForm;
