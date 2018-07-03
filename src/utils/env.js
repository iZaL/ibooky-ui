const defaults = {};

if (__DEV__) {
  module.exports = {
    ...defaults,
    // PROTOCOL:'https://',
    PROTOCOL:'http://',
    // API_URL: 'hungryr.ideasowners.net/api',
    API_URL: '192.168.1.104:9000/api',
    // API_URL: 'ibooky.test/api',
    PAYMENT_ENDPOINT: 'http://192.168.1.104:9000/payment',
    // PAYMENT_ENDPOINT: 'http://ibooky.test/payment',
    // PAYMENT_ENDPOINT: 'https://hungryr.ideasowners.net/payment',
    SOCKET_SERVER: 'http://ibooky.test:3000',
    GOOGLE_MAPS_KEY: 'AIzaSyCpQX4H0QPxVgKuNMZ0ELG_ymgT8RHcKh4',
    GOOGLE_MAPS_IOS_KEY: 'AIzaSyDPCgdWqrkBe4v3uSuU-MZGJIZ0AQxfbCo',
    GOOGLE_MAPS_ANDROID_KEY: 'AIzaSyCpQX4H0QPxVgKuNMZ0ELG_ymgT8RHcKh4',
    DEFAULT_LANGUAGE: 'en',
    DEFAULT_COUNTRY: 'KW',
    AUTH_KEY: 'AUTH_KEY',
    INSTALLED_KEY: 'INSTALLED_KEY',
    LANGUAGE_KEY: 'LANGUAGE_KEY',
    PUSH_TOKEN_KEY: 'PUSH_TOKEN_KEY',
    COUNTRY_KEY: 'COUNTRY_KEY',
    CODE_PUSH_ENABLED: true,
  };
} else {
  module.exports = {
    ...defaults,
    PROTOCOL:'https://',
    API_URL: 'hungryr.ideasowners.net/api',
    PAYMENT_ENDPOINT: 'https://hungryr.ideasowners.net/payment',
    SOCKET_SERVER: 'http://hungryr.ideasowners.net:3000',
    GOOGLE_MAPS_KEY: 'AIzaSyCpQX4H0QPxVgKuNMZ0ELG_ymgT8RHcKh4',
    GOOGLE_MAPS_IOS_KEY: 'AIzaSyDPCgdWqrkBe4v3uSuU-MZGJIZ0AQxfbCo',
    GOOGLE_MAPS_ANDROID_KEY: 'AIzaSyCpQX4H0QPxVgKuNMZ0ELG_ymgT8RHcKh4',
    DEFAULT_LANGUAGE: 'en',
    DEFAULT_COUNTRY: 'KW',
    AUTH_KEY: 'AUTH_KEY',
    INSTALLED_KEY: 'INSTALLED_KEY',
    LANGUAGE_KEY: 'LANGUAGE_KEY',
    PUSH_TOKEN_KEY: 'PUSH_TOKEN_KEY',
    COUNTRY_KEY: 'COUNTRY_KEY',
    CODE_PUSH_ENABLED: true,
  };
}
