const jwk = require('jsonwebtoken');
const token = require('./token_data.json')

class TokenManager{
    static getGenarateToken(playload){
        return jwk.sign(playload,token["Secert_key"],{"expiresIn":"10s"});
    }

    static checkAuthenication(request){
        try {
            let accessToken = request.headers.authorization.split("")[1];
            let jwkResponse = jwk.verify(String(accessToken),token["Secert_key"]);
            return jwkResponse;
        } catch (error) {
            return false;
        }
    }

    static getSecert(){
        return require("crypto").randomBytes(64).toString("hex");
    }
}

module.exports = TokenManager;