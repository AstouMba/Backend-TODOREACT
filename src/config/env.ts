import dotenv from 'dotenv';
dotenv.config(); // charge les variables depuis .env

export const AMPORT = process.env.PORT || 3000;
export const AMSecret_Key = process.env.AM_SECRET_KEY as string;
