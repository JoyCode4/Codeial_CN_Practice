const development = {
    name : "development",
    asset_path:"./assests",
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
}

module.exports = development;