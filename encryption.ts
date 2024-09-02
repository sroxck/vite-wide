import CryptoJS from "crypto-js";
import NodeRSA from "node-rsa";
import { Buffer } from "buffer";

// 你的私钥
const privateKeyBase64 = `MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBALaK0E6Z9GnTxlETRpg+tVm5lPJ5/5fMZqlfVRMZSFDS+wKVghUrRNw81fm2kcAH1fjotj9kkKzKclUdI9rRPaKkuJpOtcN2+JGQM019FaafVgicgeoE/qNHpey/aOzrQzkKPbiy9EqesaawSG315Fz8a8Zba1VE6ojtEisXkRyvAgMBAAECgYEAqP6QZQRw23yc8Dg5Nf9wI1YFSAqcDuvD62//sgPJCFKa4cSKPpDlWkPUES/tdWuLs7m157BxpBZ0jMnChPUL6jB5Tme4I95mHh0634rH24uL25j0CjthiBGHrECBO39xxj0u2KblLKoURwVRkCjk9DUZK1TknSIhuwrlbAbAQFECQQD2nBqVHqi4Ifg9TOw1PtgO3heLcOYqNHlYGC7HjEFmDUt0prxllhMpwkMC6kCOTybN5hBAAHWPo4XryP3sKpAnAkEAvX4xq9mLP2bQVHPjoVEjB5MWmksoIo2ghjXkYV1SZpxhEnK4lTlgDd+vP07jgD6SQHC0prK3aQfAHPm0nA9cOQJBAJP4/wpTJzG1UFqX+XPJjaL+KGqHB9RzQAxYFlmuEt/FQm1wTsM11bHM2qC5Jps9ay9IyJ9epyvVFtpv88ztjSkCQDHsN0XhMHBps+UsCwKLD8GFHOVVe6Nu0KXLOPn1zim+dUyY8MxPq2C8V71EGWfGFF3p044/c1a2dgSsPMsIuPECQEezBEGYfPsS5iFxPLdGIoopymNJjwuB31xUwEUS2QOjCDHq8aYOQDZ9zsSlkZT9r7PW0ovksoI+RekWrbLSZ+Y=`;

// 你的加密数据
const keyEncryptHex = `4e973fbddce450b496ea48ebca5d7fbc4bcb26bb08649b7b79df25c6a5ffc42d5a46130eb2956c08b299a4ff209b8f6c3cf9983ea031ee2ba0c4b5bc314eb39075e05e1a5f29006cefa72702cd68cc80094517de0601bfde3ff7e106d17336dfea09e6a772d6f9a6a9bceab2f8f17db6b3740917b1e3db5262dd054503650223`;

const contentEncryptHex = `635db6ca3391dfb3cdaf087ec9c69668bb97f98b7fb7bdf9c97f6fac80047d46c107ec1145b7fcfce9ff93ea229e93509a994da6073678c0ce2741234bedfea2ca06a4c86ac1cf517e78777a41819eb87227221dd7a58679a5034ec69e69184d9d17cd171619e3c9777c59f59b3ec2957ac43dafa977e106ab8a1d2faa43a087ba5c8724f1bd3044040150e1caf2d08c6279dbefbe8e311b8052f69ed2975bc0`;

// Step 1: 使用RSA私钥解密keyEncryptHex
function decryptKey(keyEncryptHex, privateKeyBase64) {
  const privateKey = new NodeRSA();
  // 使用 buffer 库的 Buffer.from 方法
  privateKey.importKey(
    Buffer.from(privateKeyBase64, "base64").toString("ascii"),
    "pkcs1-private-pem"
  );
  privateKey.setOptions({ encryptionScheme: "pkcs1" });
  // 使用 buffer 库的 Buffer.from 方法处理十六进制字符串
  const key1 = privateKey.decrypt(Buffer.from(keyEncryptHex, "hex"));
  return key1.toString("hex");
}

// Step 2: 使用AES对contentEncryptHex解密
function decryptContent(contentEncryptHex, key1Hex) {
  const key = CryptoJS.enc.Hex.parse(key1Hex);
  const decrypted = CryptoJS.AES.decrypt(
    {
      ciphertext: CryptoJS.enc.Hex.parse(contentEncryptHex),
    },
    key,
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  return decrypted.toString(CryptoJS.enc.Utf8);
}

// 执行解密
const key1Hex = decryptKey(keyEncryptHex, privateKeyBase64);
const decryptedContent = decryptContent(contentEncryptHex, key1Hex);

console.log("解密后的数据:", decryptedContent);
