import { StudentInfo, ExamResult, ExamSession } from '../types';

export const transmitResults = async (session: ExamSession, result: ExamResult) => {
  console.log('TRANS-LINK READY. INITIATING UPLINK...', { session, result });
  
  const payload = {
    studentName: session.student.name,
    school: session.student.school,
    score: result.score,
    totalCorrect: result.correctCount,
    wrongCount: result.wrongCount,
    essayCount: result.essayCount,
    violations: result.violations,
    answers: JSON.stringify(session.answers),
    timestamp: new Date().toLocaleString('id-ID'),
    teacherEmail: import.meta.env.VITE_TEACHER_EMAIL
  };

  // Google Sheets Webhook via Apps Script
  const webhookUrl = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK;
  if (webhookUrl) {
    try {
      // Gunakan URL query params agar Apps Script bisa membaca data
      // karena mode 'no-cors' + JSON body tidak bisa dibaca oleh doPost
      const formData = new URLSearchParams();
      Object.entries(payload).forEach(([key, value]) => {
        formData.append(key, String(value ?? ''));
      });

      const response = await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString()
      });
      console.log('SATELLITE UPLINK SUCCESSFUL (DATA TRANSMITTED)');
      return true;
    } catch (e) {
      console.error('UPLINK ERROR:', e);
      return false;
    }
  } else {
    console.warn('CRITICAL: Webhook URL not configured. Data stored locally only.');
    return false;
  }
};
