//imports
import 'dotenv/config';
import dotenv from 'dotenv';
	dotenv.config();

//.env variables
const merakiApiKey = process.env.MERAKIAPIKEY;
const merakiCompanyUrl = process.env.MERAKICOMPANYURL; //only if there is a company-specific domain


//auth variables
const merakiAuth = `Bearer ${merakiApiKey}`;
const merakiAuthObject = {header: {Authorization: merakiAuth}};

export {
    merakiAuth,
    merakiAuthObject
}