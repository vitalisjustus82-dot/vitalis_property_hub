export type ApartmentCategory =
  | 'self-contain'
  | '1-bedroom'
  | '2-bedroom'
  | '3-bedroom'
  | 'family-home'
  | 'other';

export interface Apartment {
  id: string;
  title: string;
  location: string;
  price: number;
  price_period: string;
  category: ApartmentCategory;
  bedrooms: number | null;
  bathrooms: number | null;
  features: string[] | null;
  description: string | null;
  image_url: string | null;
  video_url: string | null;
  featured: boolean;
  status: 'available' | 'taken' | 'reserved';
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  looking_for: string | null;
  message: string | null;
  apartment_id: string | null;
  created_at: string;
}

// Minimal Supabase Database type map (kept lightweight rather than
// full generated types — regenerate with `supabase gen types` once
// the project is live if you want strict end-to-end typing).
export interface Database {
  public: {
    Tables: {
      apartments: {
        Row: Apartment;
        Insert: Partial<Apartment> & Pick<Apartment, 'title' | 'location' | 'price' | 'category'>;
        Update: Partial<Apartment>;
      };
      contact_messages: {
        Row: ContactMessage;
        Insert: Partial<ContactMessage> & Pick<ContactMessage, 'name' | 'phone'>;
        Update: Partial<ContactMessage>;
      };
    };
  };
}
