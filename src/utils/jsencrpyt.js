//对数据进行加解密 公钥加密私钥解密

import JSEncrypt from 'jsencrypt/bin/jsencrypt.min'

// 密钥对生成 http://web.chacuo.net/netrsakeypair

// 公钥
const publicKey="MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMAXkY16VUvJEVqY82/k2hxCjGkCQfne\n" +
    "Gn7Vq3hsCLuGmmxYa6JeNeBkRIdkIWIGWvnXfbjPu/4AQ/TmsgRa2CcCAwEAAQ==";
// 私钥
const privateKey="MIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEAwBeRjXpVS8kRWpjz\n" +
    "b+TaHEKMaQJB+d4aftWreGwIu4aabFhrol414GREh2QhYgZa+dd9uM+7/gBD9Oay\n" +
    "BFrYJwIDAQABAkEAqY7kSwbV7byBFgB2uak/obxYZoS4qg+UQarn3bc3ChceewcT\n" +
    "nT2Dp47J/UAoM3Yudn9mWfnaJmul18LrfNqh4QIhAP3eA8fdzdlSVUrG9woWc2p/\n" +
    "npTCuNq7xdkOJj6atKT3AiEAwbSyFPGfNFrkHA1WYxthcCmVt+aNGyZC15t+9IAH\n" +
    "ClECICSQOF0t7frx58ToWSZDy4W4Mb/dN8CRMNKtPgbgQ0pLAiBRP5qmoEZ37lvZ\n" +
    "zFpczaJMKpUrAuBS7/R/fTB+G6lYUQIgNSvKBaW92oVS8vGHCokLEUevTP0bc33e\n" +
    "GDhI52QNvgo=";

//加密
export function encrypt(txt) {
    const encryptor = new JSEncrypt()
    encryptor.setPublicKey(publicKey) // 设置公钥
    return encryptor.encrypt(txt) // 对数据进行加密
}

// 解密
export function decrypt(txt) {
    const encryptor = new JSEncrypt()
    encryptor.setPrivateKey(privateKey) // 设置私钥
    return encryptor.decrypt(txt) // 对数据进行解密
}