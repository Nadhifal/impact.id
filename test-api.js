async function testAPIs() {
  console.log("=== Menguji API Rekomendasi Challenge ===");
  // Gunakan User ID yang dihasilkan dari seed
  const userId = "8895c73f-fc41-4d76-b8e9-350d4304c65e";
  
  try {
    const resReq = await fetch(`http://localhost:3000/api/challenges/recommendations?userId=${userId}`);
    const dataReq = await resReq.json();
    console.log("Hasil Rekomendasi:");
    console.log(JSON.stringify(dataReq, null, 2));
  } catch (e) {
    console.error("Gagal tes rekomendasi:", e);
  }

  console.log("\n=== Menguji API AI Mentor ===");
  const challengeId = "fa3d69a7-c661-438e-b2c7-31cd19163b24"; // ID dari seed
  try {
    const resMentor = await fetch(`http://localhost:3000/api/mentor`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Halo Mentor! Saya agak bingung bagaimana cara memetakan produk UMKM ke katalog digital, dari mana saya harus mulai?",
        challengeId: challengeId
      })
    });
    const dataMentor = await resMentor.json();
    console.log("Respons AI Mentor:");
    console.log(dataMentor.reply || dataMentor);
  } catch (e) {
    console.error("Gagal tes AI Mentor:", e);
  }
}

testAPIs();
