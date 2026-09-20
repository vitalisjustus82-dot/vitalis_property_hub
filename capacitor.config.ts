import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.vitalispropertyhub.app',
  appName: 'Vitalis Property Hub',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;
