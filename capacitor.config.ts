import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'covidcarnet',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    url: 'http://192.168.1.2:4200',
    cleartext: true,
  },
};

export default config;
