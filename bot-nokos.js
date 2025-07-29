const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

// Konfigurasi Termux
const client = new Client({
    authStrategy: new LocalAuth({ dataPath: './.wwebjs_auth' }),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage'
        ]
    },
    webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html'
    }
});

// DATA LENGKAP dari HTML Anda
const hargaNokos = {
    whatsapp: {
        id: { nama: "Indonesia", kualitas: { biasa: "Rp5.000", premium: "Rp8.000", super: "Rp10.000" } },
        us: { nama: "Amerika Serikat", kualitas: { biasa: "Rp55.000", premium: "Rp80.000", super: "Rp100.000" } },
        jp: { nama: "Jepang", kualitas: { biasa: "Rp180.000", premium: "Rp260.000", super: "Rp360.000" } },
        can: { nama: "Canada", kualitas: { biasa: "Rp55.000", premium: "Rp65.000", super: "Rp85.000" } },
        col: { nama: "Colombia", kualitas: { biasa: "Rp50.000", premium: "Rp60.000", super: "Rp75.000" } },
        ken: { nama: "Kenya", kualitas: { biasa: "Rp35.000", premium: "Rp45.000", super: "Rp60.000" } },
        rus: { nama: "Russia", kualitas: { biasa: "Rp65.000", premium: "Rp80.000", super: "Rp105.000" } },
        viet: { nama: "Vietnam", kualitas: { biasa: "Rp45.000", premium: "Rp60.000", super: "Rp80.000" } },
        mes: { nama: "Mesir", kualitas: { biasa: "Rp50.000", premium: "Rp60.000", super: "Rp75.000" } },
        bra: { nama: "Brazil", kualitas: { biasa: "Rp55.000", premium: "Rp65.000", super: "Rp75.000" } },
        thai: { nama: "Thailand", kualitas: { biasa: "Rp55.000", premium: "Rp70.000", super: "Rp95.000" } },
        hong: { nama: "Hongkong", kualitas: { biasa: "Rp60.000", premium: "Rp75.000", super: "Rp95.000" } },
        bel: { nama: "Belanda", kualitas: { biasa: "Rp55.000", premium: "Rp75.000", super: "Rp95.000" } },
        jer: { nama: "Jerman", kualitas: { biasa: "Rp160.000", premium: "Rp210.000", super: "Rp285.000" } },
        fil: { nama: "Filipina", kualitas: { biasa: "Rp25.000", premium: "Rp35.000", super: "Rp40.000" } },
        morr: { nama: "Morocco", kualitas: { biasa: "Rp55.000", premium: "Rp70.000", super: "Rp85.000" } },
        laos: { nama: "Laos", kualitas: { biasa: "Rp45.000", premium: "Rp60.000", super: "Rp80.000" } },
        cambodia: { nama: "Cambodia", kualitas: { biasa: "Rp55.000", premium: "Rp70.000", super: "Rp90.000" } },
        china: { nama: "China", kualitas: { biasa: "Rp50.000", premium: "Rp75.000", super: "Rp105.000" } },
        malaysia: { nama: "Malaysia", kualitas: { biasa: "Rp55.000", premium: "Rp70.000", super: "Rp85.000" } },
        singapura: { nama: "Singapura", kualitas: { biasa: "Rp250.000", premium: "Rp400.000", super: "Rp750.000" } }
    },
    telegram: {
        id: { nama: "Indonesia", kualitas: { biasa: "Rp20.000", premium: "Rp23.000", super: "Rp25.000" } },
        us: { nama: "Amerika Serikat", kualitas: { biasa: "Rp70.000", premium: "Rp95.000", super: "Rp115.000" } },
        jp: { nama: "Jepang", kualitas: { biasa: "Rp195.000", premium: "Rp275.000", super: "Rp375.000" } },
        can: { nama: "Canada", kualitas: { biasa: "Rp70.000", premium: "Rp80.000", super: "Rp100.000" } },
        col: { nama: "Colombia", kualitas: { biasa: "Rp65.000", premium: "Rp75.000", super: "Rp90.000" } },
        ken: { nama: "Kenya", kualitas: { biasa: "Rp50.000", premium: "Rp60.000", super: "Rp75.000" } },
        rus: { nama: "Russia", kualitas: { biasa: "Rp80.000", premium: "Rp95.000", super: "Rp120.000" } },
        viet: { nama: "Vietnam", kualitas: { biasa: "Rp60.000", premium: "Rp75.000", super: "Rp95.000" } },
        mes: { nama: "Mesir", kualitas: { biasa: "Rp65.000", premium: "Rp75.000", super: "Rp90.000" } },
        bra: { nama: "Brazil", kualitas: { biasa: "Rp70.000", premium: "Rp80.000", super: "Rp90.000" } },
        thai: { nama: "Thailand", kualitas: { biasa: "Rp70.000", premium: "Rp85.000", super: "Rp110.000" } },
        hong: { nama: "Hongkong", kualitas: { biasa: "Rp75.000", premium: "Rp90.000", super: "Rp110.000" } },
        bel: { nama: "Belanda", kualitas: { biasa: "Rp70.000", premium: "Rp90.000", super: "Rp110.000" } },
        jer: { nama: "Jerman", kualitas: { biasa: "Rp175.000", premium: "Rp225.000", super: "Rp300.000" } },
        fil: { nama: "Filipina", kualitas: { biasa: "Rp40.000", premium: "Rp50.000", super: "Rp55.000" } },
        morr: { nama: "Morocco", kualitas: { biasa: "Rp70.000", premium: "Rp85.000", super: "Rp100.000" } },
        laos: { nama: "Laos", kualitas: { biasa: "Rp60.000", premium: "Rp75.000", super: "Rp95.000" } },
        cambodia: { nama: "Cambodia", kualitas: { biasa: "Rp70.000", premium: "Rp85.000", super: "Rp105.000" } },
        china: { nama: "China", kualitas: { biasa: "Rp65.000", premium: "Rp90.000", super: "Rp120.000" } },
        malaysia: { nama: "Malaysia", kualitas: { biasa: "Rp70.000", premium: "Rp85.000", super: "Rp100.000" } },
        singapura: { nama: "Singapura", kualitas: { biasa: "Rp265.000", premium: "Rp415.000", super: "Rp765.000" } }
    }
};

const rekening = {
    gopay: { nama: "IZMET", nomor: "0895335107865" },
    seabank: { nama: "IZMET", nomor: "901444670611" },
    dana: { nama: "REPIKA", nomor: "085346808546" }
};

const kualitasDescriptions = {
    biasa: "⭐ Standar, masa aktif terbatas, cocok untuk percobaan cepat.",
    premium: "⭐⭐ Lebih stabil, masa aktif lebih lama.",
    super: "⭐⭐⭐ Kualitas terbaik, paling stabil, masa aktif paling panjang.\nGaransi 2 hari, kalau ke spam sebelum 2 hari ganti nomer baru 1x"
};

const admin = {
    whatsapp: "6285647271487",
    telegram: "gotorussia633",
    instagram: "exrin.633"
};

// Pairing Code
let pairingCode = '';
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    pairingCode = qr;
    fs.writeFileSync('pairing_code.txt', `Pairing Code: ${qr}`);
});

// BOT READY
client.on('ready', () => {
    console.log('Bot NOKOS siap melayani!');
    fs.writeFileSync('bot_status.txt', 'Bot aktif dan siap menerima pesan');
});

// HANDLE MESSAGES
client.on('message', async msg => {
    const text = msg.body.toLowerCase();
    const sender = msg.from;

    // HELP MENU
    if (text === '!menu' || text === 'menu' || text === 'help') {
        const menu = `🛒 *MENU SAPUTRA NOKOS* 🛒

1. *!harga* - Lihat daftar harga NOKOS
2. *!beli* - Panduan cara pemesanan
3. *!pembayaran* - Info rekening pembayaran
4. *!testimoni* - Lihat testimoni pelanggan
5. *!kontak* - Hubungi admin
6. *!tutorial* - Cara penggunaan NOKOS
7. *!spin* - Info spin bonus

Kirim perintah sesuai angka atau teks di atas.`;
        await msg.reply(menu);
    }
    
    // HARGA DETAIL
    else if (text.startsWith('!harga')) {
        const args = text.split(' ');
        if (args.length === 1) {
            let daftarHarga = `📋 *DAFTAR HARGA NOKOS* 📋\n\n`;
            daftarHarga += `Kirim:\n*!harga whatsapp*\natau\n*!harga telegram*\n`;
            daftarHarga += `Contoh: *!harga whatsapp indonesia*`;
            await msg.reply(daftarHarga);
        } 
        else if (args.length === 2) {
            const provider = args[1];
            if (hargaNokos[provider]) {
                let daftarNegara = `🌍 *DAFTAR NEGARA (${provider.toUpperCase()})* 🌍\n\n`;
                Object.entries(hargaNokos[provider]).forEach(([kode, data]) => {
                    daftarNegara += `- ${data.nama} (*${kode}*)\n`;
                });
                daftarNegara += `\nKirim *!harga ${provider} [kode negara]*\nContoh: *!harga ${provider} id*`;
                await msg.reply(daftarNegara);
            } else {
                await msg.reply('Provider tidak valid. Pilih whatsapp atau telegram');
            }
        }
        else if (args.length >= 3) {
            const provider = args[1];
            const negara = args[2];
            
            if (hargaNokos[provider] && hargaNokos[provider][negara]) {
                const data = hargaNokos[provider][negara];
                let response = `💰 *HARGA ${data.nama.toUpperCase()} (${provider.toUpperCase()})* 💰\n\n`;
                
                Object.entries(data.kualitas).forEach(([kualitas, harga]) => {
                    response += `*${kualitas.toUpperCase()}*: ${harga}\n`;
                    response += `➡️ ${kualitasDescriptions[kualitas]}\n\n`;
                });
                
                response += `ℹ️ *NOTE*:\n- Harga bisa berubah sewaktu-waktu\n- Garansi hanya untuk kualitas *SUPER*`;
                await msg.reply(response);
            } else {
                await msg.reply('Negara tidak ditemukan. Gunakan kode negara seperti: id, us, jp');
            }
        }
    }
    
    // CARA BELI
    else if (text === '!beli' || text === '2') {
        const caraBeli = `📝 *CARA MEMESAN NOKOS* 📝

1. Kirim format berikut:
   \`\`\`
   NAMA#PROVIDER#NEGARA#KUALITAS#METODE_PEMBAYARAN#NOMOR_REKENING_ANDA
   \`\`\`
   
   Contoh:
   \`\`\`
   Budi Santoso#whatsapp#us#super#dana#085612345678
   \`\`\`

2. Admin akan mengirimkan detail pembayaran

3. Lakukan transfer sesuai nominal

4. Kirim bukti transfer ke admin

5. Nomor NOKOS akan dikirim setelah pembayaran dikonfirmasi

⚠️ *PERHATIAN*:
- Pastikan data yang dikirim sudah benar!
- Tidak ada pengembalian dana setelah nomor dikirim`;
        await msg.reply(caraBeli);
    }
    
    // PEMBAYARAN
    else if (text === '!pembayaran' || text === '3') {
        let infoPembayaran = `💳 *REKENING PEMBAYARAN* 💳\n\n`;
        
        Object.entries(rekening).forEach(([metode, data]) => {
            infoPembayaran += `*${metode.toUpperCase()}*\n`;
            infoPembayaran += `Atas Nama: ${data.nama}\n`;
            infoPembayaran += `Nomor: ${data.nomor}\n\n`;
        });
        
        infoPembayaran += `⚠️ *PERHATIAN*:\n- Transfer sesuai nominal tepat\n- Simpan bukti transfer\n- Konfirmasi pembayaran ke admin setelah transfer`;
        await msg.reply(infoPembayaran);
    }
    
    // TESTIMONI
    else if (text === '!testimoni' || text === '4') {
        const testimoni = `🌟 *TESTIMONI PELANGGAN* 🌟

1. "Nokosnya work banget, langsung bisa verifikasi WhatsApp. Adminnya fast respon!" 
   - *Budi*, Jakarta

2. "Sudah 3x beli disini, selalu puas dengan kualitas supernya" 
   - *Siti*, Bandung

3. "Awalnya ragu, ternyata nomornya bisa dipakai sampai sekarang 2 minggu" 
   - *Andi*, Surabaya

4. "Garansinya beneran ditepati, nomor kena spam langsung diganti" 
   - *Dewi*, Medan

📌 Lihat lebih banyak testimoni di grup WhatsApp kami: 
https://chat.whatsapp.com/KUoGURsIF3Z2WwuUqnQcnS`;
        await msg.reply(testimoni);
    }
    
    // KONTAK ADMIN
    else if (text === '!kontak' || text === '5') {
        const kontak = `📞 *HUBUNGI ADMIN* 📞

🔹 WhatsApp: https://wa.me/${admin.whatsapp}
🔹 Telegram: https://t.me/${admin.telegram}
🔹 Instagram: https://www.instagram.com/${admin.instagram}

⏰ *Jam Operasional*: 
08.00 - 22.00 WIB (Setiap Hari)`;
        await msg.reply(kontak);
    }
    
    // TUTORIAL
    else if (text === '!tutorial' || text === '6') {
        const tutorial = `📚 *TUTORIAL PENGGUNAAN NOKOS* 📚

1. *Setelah Menerima Nomor*:
   - Segera verifikasi di aplikasi tujuan (WhatsApp/Telegram)
   - Simpan nomor di kontak Anda

2. *Agar Nomor Awet*:
   - Lakukan panggilan/chat ke nomor lain
   - Tambahkan beberapa kontak
   - Hindari mengirim pesan massal/spam

3. *Jika Terblokir*:
   - Untuk kualitas SUPER, bisa minta ganti nomor 1x dalam 2 hari
   - Hubungi admin dengan bukti blokir

🔎 Tips lengkap: https://example.com/tutorial-nokos`;
        await msg.reply(tutorial);
    }
    
    // SPIN BONUS
    else if (text === '!spin' || text === '7') {
        const spinInfo = `🎡 *SPIN BONUS NOKOS* 🎡

Anda bisa mendapatkan bonus spin 1x ketika membeli:
- Nomor kualitas *SUPER*
- Kecuali negara: Indonesia, Filipina, Kenya

Hadiah spin:
- NOKOS Indonesia (Biasa)
- NOKOS Filipina Premium
- NOKOS Jepang Super
- Dan hadiah lainnya!

ℹ️ Spin hanya bisa dilakukan 1x per pembelian`;
        await msg.reply(spinInfo);
    }
    
    // FORMAT PEMESANAN
    else if (text.includes('#')) {
        const parts = text.split('#');
        if (parts.length === 6) {
            const [nama, provider, negara, kualitas, metode, nomorRekening] = parts;
            
            if (hargaNokos[provider] && hargaNokos[provider][negara] && hargaNokos[provider][negara].kualitas[kualitas] && rekening[metode]) {
                const harga = hargaNokos[provider][negara].kualitas[kualitas];
                const negaraNama = hargaNokos[provider][negara].nama;
                
                const summary = `✅ *ORDER SUMMARY* ✅

Nama: ${nama}
Provider: ${provider.toUpperCase()}
Negara: ${negaraNama}
Kualitas: ${kualitas.toUpperCase()}
Harga: ${harga}
Metode Bayar: ${metode.toUpperCase()}
Nomor Rekening: ${nomorRekening}

💳 *Transfer ke*:
${metode.toUpperCase()} - ${rekening[metode].nama}
${rekening[metode].nomor}

📲 Konfirmasi ke admin:
https://wa.me/${admin.whatsapp}?text=Konfirmasi%20pembayaran%20${encodeURIComponent(nama)}`;
                
                await msg.reply(summary);
            } else {
                await msg.reply('Format tidak valid. Pastikan provider, negara, kualitas, dan metode pembayaran benar.\nContoh: NAMA#whatsapp#id#super#dana#085612345678');
            }
        } else {
            await msg.reply('Format pesanan tidak lengkap. Gunakan format:\nNAMA#PROVIDER#NEGARA#KUALITAS#METODE_PEMBAYARAN#NOMOR_REKENING_ANDA');
        }
    }
    
    // DEFAULT MESSAGE
    else if (!msg.fromMe) {
        const defaultMsg = `Halo! Saya adalah bot layanan Saputra NOKOS.

Kirim *!menu* untuk melihat daftar perintah yang tersedia.

Butuh bantuan cepat? Hubungi admin:
https://wa.me/${admin.whatsapp}`;
        await msg.reply(defaultMsg);
    }
});

// START BOT
client.initialize();

// Termux Auto-Restart
process.on('uncaughtException', function(err) {
    console.error('Error:', err);
    setTimeout(() => {
        console.log('Restarting bot...');
        client.initialize();
    }, 5000);
});