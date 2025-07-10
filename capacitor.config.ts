import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.1c818eabad5445d4b4cee4ceb5919932',
  appName: 'campus-finance-manager',
  webDir: 'dist',
  server: {
    url: 'https://1c818eab-ad54-45d4-b4ce-e4ceb5919932.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    CapacitorSQLite: {
      iosDatabaseLocation: 'Library/CapacitorDatabase',
      androidDatabaseLocation: 'default'
    }
  }
};

export default config;