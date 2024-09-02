import { createCipheriv, createDecipheriv, randomBytes } from "crypto";
import NodeRSA from "node-rsa";

// 生成 RSA 密钥对
const generateKeyPair = () => {
  const key = new NodeRSA({ b: 512 });
  return {
    publicKey: key.exportKey("public"),
    privateKey: key.exportKey("private"),
  };
};

// AES 加密函数
const aesEncrypt = (data, key) => {
  const cipher = createCipheriv("aes-128-ecb", Buffer.from(key), null);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

// AES 解密函数
const aesDecrypt = (encryptedData, key) => {
  const decipher = createDecipheriv("aes-128-ecb", Buffer.from(key), null);
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

// RSA 加密函数
const rsaEncrypt = (data, publicKey) => {
  const key = new NodeRSA(publicKey);
  return key.encrypt(data, "base64");
};

// RSA 解密函数
const rsaDecrypt = (encryptedData, privateKey) => {
  const key = new NodeRSA(privateKey);
  return key.decrypt(encryptedData, "utf8");
};
function hexToBase64(hex) {
  // 将十六进制字符串转换为字节数组
  const byteArray = new Uint8Array(
    hex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16))
  );

  // 将字节数组转换为 Base64 字符串
  let binaryString = "";
  const len = byteArray.length;
  for (let i = 0; i < len; i++) {
    binaryString += String.fromCharCode(byteArray[i]);
  }

  return btoa(binaryString);
}

function base64ToHex(base64) {
  // 将 Base64 字符串转换为字节数组
  const binaryString = atob(base64);
  const binaryLen = binaryString.length;
  let hexString = "";

  for (let i = 0; i < binaryLen; i++) {
    const hex = binaryString.charCodeAt(i).toString(16);
    hexString += (hex.length === 1 ? "0" : "") + hex; // 确保每个字节都是两位数
  }

  return hexString;
}

// 主函数
const main = () => {
  const { publicKey, privateKey } = generateKeyPair();
  const originalData = "Hello, this is a secret message!";
  console.log("原始数据:", originalData);

  // 1. 生成 AES 密钥（16 字节）
  const key1 = randomBytes(16); // 16 bytes = 128 bits
  console.log("1. 生成 AES 密钥:", key1.toString("hex"));

  // 2. AES 加密

  const contentEncryptHex = base64ToHex(aesEncrypt(originalData, key1));
  console.log("2. AES 加密得到 contentEncryptHex:", contentEncryptHex);

  // 3. RSA 加密 AES 密钥
  const keyEncryptHex = rsaEncrypt(key1.toString("hex"), publicKey);
  console.log("3. RSA 加密 AES 密钥 得到:keyEncryptHex", keyEncryptHex);

  // 解密过程
  // 4. RSA 解密 AES 密钥
  const decryptedKey1 = rsaDecrypt(keyEncryptHex, privateKey);
  console.log("4. RSA 解密 AES 密钥:", decryptedKey1);

  // 5. AES 解密内容
  const decryptedContent = aesDecrypt(
    hexToBase64(contentEncryptHex),
    Buffer.from(decryptedKey1, "hex")
  );
  console.log("5. AES 解密内容:", decryptedContent);
};
// 根据数据解密

// 运行主函数
main();
