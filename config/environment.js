const development = {
    name : "development",
    assets_path:"./assets",
    session_cookie_key:"jayesh",
    db:"codeial_development",
    smtp:{
        service : "outlook",
        host : "smtp.outlook.com",
        port:587,
        secure:false,
        auth:{
            user:"jaywadhonkar@outlook.com",
            pass:"joy00004"
        }
    },
    google_client_id : "1068024344356-9lu3kblbfofjs0ler8ou6jme3k2km8jg.apps.googleusercontent.com",
    google_client_secret : "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",
    google_call_back_url : "http://localhost:8000/users/auth/google/callback",
    jwt_secret:"codeial",
}

const production = {
    name : "production",
    assets_path:process.env.CODEIAL_ASSETS_PATH,
    session_cookie_key:process.env.CODEIAL_SESSION_COOKIE_KEY,
    db:process.env.CODEIAL_DB,
    smtp:{
        service : "outlook",
        host : "smtp.outlook.com",
        port:587,
        secure:false,
        auth:{
            user:process.env.CODEIAL_OUTLOOK_USERNAME,
            pass:process.env.CODEIAL_OUTLOOK_PASSWORD
        }
    },
    google_client_id :process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret : process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url : process.env.CODEIAL_CALL_BACK_URL,
    jwt_secret:process.env.CODEIAL_JWT_SECRET,
}

// module.exports = eval(process.env.NODE_ENV) == undefined ? development:eval(process.env.NODE_ENV);
module.exports = development;