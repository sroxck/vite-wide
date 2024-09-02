import { randomBytes } from "crypto";
import {
  generateKeyPair,
  base64ToHex,
  hexToBase64,
  aesEncrypt,
  rsaEncrypt,
  rsaDecrypt,
  aesDecrypt,
} from "./utils";

const main = () => {
  const { publicKey, privateKey } = generateKeyPair();
  const originalData = "Hello, this is a secret message!";
  console.log("原始数据:", originalData, "\n");
  console.log("RSA私钥:");
  console.log(privateKey, "\n");
  console.log("RSA公钥:");
  console.log(publicKey, "\n");

  // 1. 生成 AES 密钥（16 字节）
  const key1 = randomBytes(16); // 16 bytes = 128 bits
  console.log("1. 生成 AES 密钥");
  console.log("hex:", key1.toString("hex"));
  console.log("base64:", key1.toString("base64"), "\n");
  // 2. AES 加密

  const contentEncryptHex = base64ToHex(aesEncrypt(originalData, key1));
  const contentEncryptHex1 = aesEncrypt(originalData, key1);
  console.log("2. AES 加密得到 contentEncrypt:");
  console.log("hex:", contentEncryptHex);
  console.log("base64:", hexToBase64(contentEncryptHex1), "\n");
  // 3. RSA 加密 AES 密钥
  const keyEncryptHex = base64ToHex(
    rsaEncrypt(key1.toString("hex"), publicKey)
  );
  console.log("3. RSA 加密 AES 密钥 得到:keyEncrypt(hex格式)");
  console.log(keyEncryptHex, "\n");

  // 解密过程
  // 4. RSA 解密 AES 密钥
  const decryptedKey1 = rsaDecrypt(hexToBase64(keyEncryptHex), privateKey);
  console.log("4. RSA 解密 AES 密钥");
  console.log("hex:", decryptedKey1);
  console.log("base64:", hexToBase64(decryptedKey1), "\n");

  // 5. AES 解密内容
  const decryptedContent = aesDecrypt(
    hexToBase64(contentEncryptHex),
    Buffer.from(decryptedKey1, "hex")
  );
  console.log("5. AES 解密内容:", decryptedContent);
};

// 运行主函数
main();
