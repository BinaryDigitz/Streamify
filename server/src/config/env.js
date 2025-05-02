import { config } from "dotenv";

config({ path: `.env.${process.NODE_ENV || 'development'}.local`})

export const { PORT,STREAM_API_KEY, STREAM_API_SECRET, NODE_ENV, MONGODB_URI, JWT_SECRET } = process.env