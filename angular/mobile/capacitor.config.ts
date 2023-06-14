import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ngx.app',
  appName: 'NGX',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
      "SplashScreen": {
          "launchShowDuration": 3000,
          "launchAutoHide": true,
          "androidScaleType": "CENTER_CROP",
          "splashImmersive": true,
          "backgroundColor": "#ffffff"
      }
  }
};

export default config;
