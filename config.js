const { Sequelize } = require("sequelize");
const fs = require("fs");
require('dotenv').config();

if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env', override: true });

// Function to convert text to boolean
function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

// Function to convert string to boolean
const toBool = (x) => (x && x.toLowerCase() === 'true') || false;
global.apiUrl = 'https://api.maskser.me/'
global.eypzApi = 'https://combative-sarine-eypz-god-d4cce0fc.koyeb.app/'

// Define the Sequelize instance based on DATABASE_URL
const DATABASE_URL = process.env.DATABASE_URL === undefined ? './database.db' : process.env.DATABASE_URL;
DEBUG = process.env.DEBUG === undefined ? false : convertToBool(process.env.DEBUG);
// Export configuration variables
module.exports = {
  HANDLERS: (process.env.PREFIX || '^[.,!]').trim(),
  BRANCH: "main",
  MODE: (process.env.MODE || 'private').toLowerCase(),
  ERROR_MSG: toBool(process.env.ERROR_MSG) || true,
  LOG_MSG: toBool(process.env.LOG_MSG) || true,
  READ_CMD: toBool(process.env.READ_CMD),
  SESSION_ID: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUkxd3VLQ3VVTSs0S3dhSWQvZjluN3pRWVdWZ0prT0lqd2JSQVZFV0NYMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUVp2Q2FUTVZZTXpQZ1lVQ1FDY2h5SUhJVmNNdUhrcmRTOFAvZ1BIdUpIVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpRHFMV0dVc1JyMWtmNmgzV1ZGSWt0S2lwWCtkVmdvYjlPc3ZMN2Fmb0hvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFakFTUm81clFNa3pwNVNPVDRvMmgyejF6bGJpRnlPTS9aNUhIWG9uY2pjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVFSVE1RngrWEtwYmRCSlJKOHBaZHZxYnRGTm02dXZ2VG5rMDJDUFE4SFk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVRbEtDV3NkK1AxWkRneHZaMGhoV3UwNGNzQXVEZXBHYWl5dHRmeTBKQkE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUt0eE1BcFIySGhNbDV4b0E5RTQ5d2o0aTdIYWtXRmxDd1RyNVpRWkUwUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUEFUNVdVUnZ0VTFNRzIyditmYXl5SlJxVmc0c0JiUndkcHMyQktTWGxBbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZCV21XUlNFVVVXYk1CbTBIMkxhWEhTb1dnWUJ6U0ZIZUVzSEZvcGRyMDlHaUVJRVNaa2R5dFhJbG95b1lXZS9aZUFPN2ZIaGJCaUV2RDUvNzQ5ZURRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzcsImFkdlNlY3JldEtleSI6ImhyUTJpSUh3UHplSVRwVVp3MXIvNDB6aGw3Tjg4SEhPWEFyN1Rways0b3c9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IllXbHJSOVI1UktxSEZpdTlVdTZNclEiLCJwaG9uZUlkIjoiZTU2YWFhODctOWI2YS00NTNmLWE5NWQtMTBjNGVmMjYyMzgwIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikx1T2JCc1BTQzk1eWJPVnRJYlptUEExSkxMdz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFV3BCOGRrSFN5aWJBbUZIV1JYSjFONUVLSlU9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiQkI3UkcyVjgiLCJtZSI6eyJpZCI6IjQ4Njk5NTM4NjAxOjZAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J2arvCdm4bJktaf4Y2dyaTKiMmT8J2WvvCdm4J0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNJNmJzd2tRMzVHNHVnWVlBaUFBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiIrYm5XQUtqWithd0JFUmpYZVJWczdXelcwb1U3RlFTZndQejc5MVdmekFFPSIsImFjY291bnRTaWduYXR1cmUiOiJzK0wvREVBR1M1Ykpib2krNEQ2RHVHSFpyY0owYWRaNGpPYjQ0SjVFdmR2SUNQZ1NleWxPR05YeWQ2TGVLQXRGMEUwa3pmN1BvU3FYZjROY3dNUkxDdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiSm1iNU0vcFZCZHVSdmpiQ2xXNGNSSStsM3V2WDlMc3FWRnVsSUJYNVF2QlM1UTF0TVNpcWp6WTBxUzlHVWszOFQ3STJOdWhWZ2hzRUMrVXN3NXYyQnc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI0ODY5OTUzODYwMTo2QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmZtNTFnQ28yZm1zQVJFWTEza1ZiTzFzMXRLRk94VUVuOEQ4Ky9kVm44d0IifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzMxNjczNDAsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTGo5In0=",
  MENU_URL: process.env.MENU_URL || "https://ik.imagekit.io/eypz/1722873079279_lHOJlrddC.png",
  CAPTION: process.env.CAPTION || "Iᴢᴜᴍɪ",
  READ_MSG: toBool(process.env.READ_MSG),
  OWNER_NAME: process.env.OWNER_NAME || "Eypz God",
  BOT_NAME: process.env.BOT_NAME || "𝚰𝚭𝐔𝚳𝚰-𝚅3",
  SUDO: process.env.SUDO || "48699538601"
  LANG: process.env.LANGUAGE === undefined ? 'EN' : process.env.LANGUAGE.toUpperCase(),
  STICKER_PACKNAME: process.env.STICKER_PACKNAME || "Izumi-v3,❤️",
  AUDIO_DATA: process.env.AUDIO_DATA || "Eʏᴘᴢ;Iᴢᴜᴍɪ-ᴠ3;https://i.imgur.com/cO0TZJv.jpeg",
  PROCESSNAME: process.env.PROCESSNAME || "Izumi-v3",
  AUTHOR: process.env.AUTHOR || "Eypz God",
  DELETED_LOG_CHAT: process.env.DELETED_LOG_CHAT || false,
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || "",
  HEROKU_API_KEY: process.env.HEROKU_API_KEY || "",
  KOYEB_API_KEY: process.env.KOYEB_API_KEY || "your_koyeb_api_key",
  KOYEB_APP_NAME: process.env.KOYEB_APP_NAME || '',
  KOYEB: toBool(process.env.KOYEB) || false,
  HEROKU: toBool(process.env.HEROKU) || false,
  TERMUX: toBool(process.env.TERMUX) || false,
  DATABASE_URL: DATABASE_URL,
  DATABASE:
       DATABASE_URL === './database.db' ? new Sequelize({dialect: 'sqlite', storage: DATABASE_URL, logging: false,}) : new Sequelize(DATABASE_URL, {dialect: 'postgres', ssl: true, protocol: 'postgres', dialectOptions: {native: true, ssl: { require: true, rejectUnauthorized: false },}, logging: false,}),
  DEBUG: DEBUG
};
