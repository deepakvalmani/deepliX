import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Database Configuration
  mongo: {
    uri: process.env.MONGODB_URI || '',
    dbName: process.env.MONGODB_DB_NAME || 'deeplixdb',
  },
  
  // Email Dispatch Services
  email: {
    resendApiKey: process.env.RESEND_API_KEY || '',
    senderEmail: process.env.SENDER_EMAIL || 'rajvalmani@gmail.com',
    adminNotificationEmail: process.env.CONTACT_NOTIFICATION_EMAIL || process.env.NOTIFICATION_EMAIL || 'rajvalmani@gmail.com',
    smtp: {
      host: process.env.SMTP_HOST || '',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_SECURE === 'true',
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
      from: process.env.SMTP_FROM || '',
    },
  },
  
  // AI & Gemini Engine
  gemini: {
    apiKey: process.env.GEMINI_API_KEY || '',
  },
  
  // Company & Brand Metadata
  brand: {
    name: 'deepliX',
    founder: 'Deepak Raj',
    websiteUrl: process.env.WEBSITE_URL || 'https://deeplix.com',
    linkedinUrl: process.env.LINKEDIN_URL || 'https://www.linkedin.com/company/111716037/',
    calendlyUrl: process.env.VITE_CALENDLY_URL || 'https://calendly.com/deeplix',
  },
};
