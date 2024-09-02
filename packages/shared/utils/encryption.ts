import JSEncrypt from "jsencrypt";
import CryptoJS from "crypto-js";
export function useDecrypt() {
  const decrypt = new JSEncrypt();
  // rsa秘钥
  const privateKey =
    "MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBALYV9hGF5SqIIzYR2IzW1qoodkeGktZUbdkv/TA8ICkWhfBStNkIVGsl9OESuEzqFldolH3mguPnwRazrWVUf+qPWmcFL23nzQXLj7m5eL3E2W2CrC0kyth+SqGYo8kWjVB70LX8icOygnl8COw6vAw47sxZl0kiF0C4j+zk0ORjAgMBAAECgYAwAppfBG7oR/0AxLPUbtErDIAjW9hbqudL3NtlXHUeYFHwi94jW47msZtfvQ/bN92sLmb4y063yOOgmL+feChBviXijuqKb/adYZ6sdGnlQmpZDeHuo5/pQ1FTZfGvDLB8CCN5bHk7RC8gguZA2aMG7SPF6zwkf/SyuxlF8kigAQJBAO3yVdbwGB9Gk//5GVg0f+gtqRlZwCAwRWFEmXoIkWY998Wb5hhz1Fi9FoeVHo55QBI7WW0/Udj5kMeeIGywBWECQQDD5qJpyWOc5Q/G5/VuNaObBHx3nlRIp6hmHHNjvu+nTzeixs3CJmmzN5GfBNCE2veGx40/wAd2QPdK1zwt9PxDAkBqKJ8hiPbKJVvsbP9gufOC67Qw6jjsY3zgu5FZv67XFbiQglBzAmJvwNTnYqFCYVgziiUIt6JVkmqElMjUlOehAkAafW9s2pyrtJXDkc4wTvSGm76w9inzgShWVnaMAF+rwhyF2Fgubr9QSq1YUXBY5rsd8JH7Et5vcS1/Y0dx93S9AkBg08lQwVaUWX7exB7DRuTcwH+SKFHm/K6YzdHw4HzfOz6ntWa4Mjyv/5wHkoYkAFnmwnPB9tHas+sh3L7pCSrX";
  // 加密后的aes秘钥
  const hex =
    "JM5XCQ2lOEyACBGNuGB4ArBUb+YygTv8Woneq1qcY5xBEdTwmhRMJ+u6gGeePPpoUcKMgHunh6kL5Xz6o3Xpj65wfX93xvsFNXMXyWijaWkjW1pC81SSRHHZQtXBKM+HJBQPxvs6zgpfR3IhbtwvR4pXEz245ofWm6dNuoPBNWc=";
  decrypt.setPrivateKey(privateKey);
  // 解密后的aes秘钥
  var decryptMsg = decrypt.decrypt(hex) as any;
  console.log(decryptMsg, "AES秘钥");
  // 加密内容
  const contentEncryptHex =
    "68fcd81ddc46fbca057ca5e4a3b9057a47a87c66bc4fa17a21d54124f4d7d915f05a14b2fd296fb45a2c14bb8e303a5fcd75b10fc5f1b43bd29201f9948c53c23030f507689851fffe02f0f671472a58350c8302533cb1b34a0c45c442a8273da282077f88b1048276748ccdd35d780830a26c2f215731345cf6d53a6b2cd0d11fee0d872147326344900469331dbb78b68fa1cccad59b2d9fa8617bdd97184b"; // 替换为您的 HEX 字符串
  function hexToBase64(hex: any) {
    // 将十六进制字符串转换为字节数组
    const byteArray = new Uint8Array(
      hex.match(/.{1,2}/g).map((byte: any) => parseInt(byte, 16))
    );

    // 将字节数组转换为 Base64 字符串
    let binaryString = "";
    const len = byteArray.length;
    for (let i = 0; i < len; i++) {
      binaryString += String.fromCharCode(byteArray[i]);
    }

    return btoa(binaryString);
  }
  var decrypt2 = CryptoJS.AES.decrypt(
    hexToBase64(contentEncryptHex),
    decryptMsg,
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  console.log(atob(decrypt2.toString()));
}
function hexToBase64(hex: any) {
  // 将十六进制字符串转换为字节数组
  const byteArray = new Uint8Array(
    hex.match(/.{1,2}/g).map((byte: any) => parseInt(byte, 16))
  );

  // 将字节数组转换为 Base64 字符串
  let binaryString = "";
  const len = byteArray.length;
  for (let i = 0; i < len; i++) {
    binaryString += String.fromCharCode(byteArray[i]);
  }

  return btoa(binaryString);
}
