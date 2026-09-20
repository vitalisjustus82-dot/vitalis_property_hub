import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import type { Session } from '@supabase/supabase-js';
import { supabase } from './supabase';

export function useRequireAuth() {
  const history = useHistory();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session);
      setLoading(false);
      if (!data.session) history.replace('/admin/login');
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      if (!newSession) history.replace('/admin/login');
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { session, loading };
}
