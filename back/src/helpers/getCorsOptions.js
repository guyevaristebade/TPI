// Fetch allowed origins from environment variables
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];

// Configure CORS
export const corsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
  credentials: true
};
