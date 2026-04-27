// ============================================================
// PETUNJUK PENGGUNAAN:
// 1. Buka Google Sheets kamu
// 2. Klik Extensions > Apps Script
// 3. Hapus semua kode yang ada, lalu paste kode ini
// 4. Klik Deploy > New Deployment
//    - Pilih type: Web App
//    - Execute as: Me
//    - Who has access: Anyone
// 5. Copy URL deployment dan masukkan ke file .env:
//    VITE_GOOGLE_SHEETS_WEBHOOK="https://script.google.com/macros/s/xxxxx/exec"
// 6. Pastikan VITE_TEACHER_EMAIL di .env sudah diisi email guru
// ============================================================

function doPost(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("Hasil Ujian");
    
    // Buat sheet jika belum ada
    if (!sheet) {
      sheet = ss.insertSheet("Hasil Ujian");
      // Header row
      sheet.appendRow([
        "No",
        "Timestamp",
        "Nama Siswa",
        "Sekolah",
        "Skor (%)",
        "Jawaban Benar",
        "Jawaban Salah",
        "Essay",
        "Pelanggaran",
        "Detail Jawaban"
      ]);
      // Format header
      var headerRange = sheet.getRange(1, 1, 1, 10);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#1a1a2e");
      headerRange.setFontColor("#00f0ff");
    }
    
    // Ambil data dari request
    var data = e.parameter;
    var rowNum = sheet.getLastRow();
    
    // Tambah baris data baru
    sheet.appendRow([
      rowNum,                              // No
      data.timestamp || new Date().toLocaleString('id-ID'),  // Timestamp
      data.studentName || "",              // Nama
      data.school || "",                   // Sekolah
      data.score || 0,                     // Skor
      data.totalCorrect || 0,              // Benar
      data.wrongCount || 0,                // Salah
      data.essayCount || 0,                // Essay
      data.violations || 0,                // Pelanggaran
      data.answers || ""                   // Detail jawaban
    ]);
    
    // Kirim email notifikasi ke guru
    var teacherEmail = data.teacherEmail;
    if (teacherEmail) {
      try {
        var subject = "📋 Hasil Ujian Baru - " + (data.studentName || "Siswa");
        var body = "═══════════════════════════════════════\n"
                 + "        LAPORAN HASIL UJIAN ONLINE\n"
                 + "═══════════════════════════════════════\n\n"
                 + "👤 Nama Siswa  : " + (data.studentName || "-") + "\n"
                 + "🏫 Sekolah     : " + (data.school || "-") + "\n"
                 + "📅 Waktu       : " + (data.timestamp || new Date().toLocaleString('id-ID')) + "\n\n"
                 + "───────────────────────────────────────\n"
                 + "              HASIL PENILAIAN\n"
                 + "───────────────────────────────────────\n"
                 + "📊 Skor           : " + (data.score || 0) + "%\n"
                 + "✅ Jawaban Benar  : " + (data.totalCorrect || 0) + "\n"
                 + "❌ Jawaban Salah  : " + (data.wrongCount || 0) + "\n"
                 + "📝 Essay          : " + (data.essayCount || 0) + "\n"
                 + "⚠️ Pelanggaran    : " + (data.violations || 0) + "\n\n"
                 + "───────────────────────────────────────\n"
                 + "Lihat detail lengkap di Google Sheets:\n"
                 + ss.getUrl() + "\n\n"
                 + "Dikirim otomatis oleh Exam PAK Online System";
        
        MailApp.sendEmail({
          to: teacherEmail,
          subject: subject,
          body: body
        });
        
        Logger.log("Email sent to: " + teacherEmail);
      } catch (emailError) {
        Logger.log("Email error: " + emailError.toString());
      }
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", row: rowNum }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log("Error: " + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Fungsi test untuk cek koneksi
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "online", message: "Exam PAK Online Webhook Active" }))
    .setMimeType(ContentService.MimeType.JSON);
}
