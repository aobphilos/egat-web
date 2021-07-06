const config = {
  egat: {
    ppa: {
      url: process.env.EGAT_PPA_URL || '',
      username: process.env.EGAT_PPA_USERNAME || '',
      password: process.env.EGAT_PPA_PASSWORD || '',
      tokenExpires: Number(process.env.EGAT_PPA_TOKEN_EXPIRES) || 4 * 60 * 60 * 1000, // the cache expires in 4 hours.
    },
    forecast: {
      url: process.env.EGAT_FORECAST_URL || '',
      totalPowersExpires: Number(process.env.EGAT_FORECAST_POWERS_EXPIRES) || 24 * 60 * 60 * 1000, // the cache expires in 24 hours.
    },
  },
  mapbox: {
    apiKey: process.env.MAPBOX_API_KEY || '',
  },
  weather: {
    apiKey: process.env.WEATHER_API_KEY || '',
  },
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  },
};

export { config };
