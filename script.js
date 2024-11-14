function generateKey(base, exp, mod) {
  let result = 1;
  base = base % mod;
  while (exp > 0) {
    if (exp % 2 === 1) {
      result = (result * base) % mod;
    }
    exp = Math.floor(exp / 2);
    base = (base * base) % mod;
  }
  return result;
}

function processEncryption() {
  // Foydalanuvchi kiritgan qiymatlarni olish
  const p = parseInt(document.getElementById("p").value);
  const g = parseInt(document.getElementById("g").value);
  const a = parseInt(document.getElementById("a").value);
  const b = parseInt(document.getElementById("b").value);
  const message = document.getElementById("message").value;

  if (isNaN(p) || isNaN(g) || isNaN(a) || isNaN(b) || message === "") {
    alert("Iltimos, barcha maydonlarni to'ldiring.");
    return;
  }

  // Kalitlarni generatsiya qilish
  const A = generateKey(g, a, p);
  const B = generateKey(g, b, p);
  const secretKeyAlice = generateKey(B, a, p);
  const secretKeyBob = generateKey(A, b, p);

  // Matnni shifrlash
  let encryptedText = "";
  for (let i = 0; i < message.length; i++) {
    encryptedText += String.fromCharCode(
      message.charCodeAt(i) + secretKeyAlice
    );
  }

  // Matnni deshifrlash
  let decryptedText = "";
  for (let i = 0; i < encryptedText.length; i++) {
    decryptedText += String.fromCharCode(
      encryptedText.charCodeAt(i) - secretKeyBob
    );
  }

  // Natijalarni ekranga chiqarish
  document.getElementById("originalText").innerText = message;
  document.getElementById("encryptedText").innerText = encryptedText;
  document.getElementById("decryptedText").innerText = decryptedText;
}
