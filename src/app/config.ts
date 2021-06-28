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
    },
  },
  mapbox: {
    apiKey: process.env.MAPBOX_API_KEY || '',
  },
};

export { config };
