import CryptoJS from 'crypto-js';

export const encryptData = (data) =>
    CryptoJS.AES.encrypt(JSON.stringify(data), process.env.REACT_APP_SALT).toString();


export const decryptData = (ciphertext) => {
    const bytes = CryptoJS.AES.decrypt(ciphertext, process.env.REACT_APP_SALT);
    try {
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    catch (err) {
        return null;
    }
}