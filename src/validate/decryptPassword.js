function decryptPassword(password){
    
    // LOAD ENCRYPT LIBRARY
    const CryptoJS = require("crypto-js");

    // SECRET KEY
    var key = "ASECRET";

    // DECRYPT
    var decipher = CryptoJS.AES.decrypt(password, key);
    decipher = decipher.toString(CryptoJS.enc.Utf8);
    // console.log(decipher);

    return decipher
}

module.exports.decryptPassword=decryptPassword;