import { StudentInfo, ExamResult, ExamSession } from '../types';

export const transmitResults = async (session: ExamSession, result: ExamResult) => {
  console.log('TRANS-LINK READY. INITIATING UPLINK...', { session, result });
  
  const payload = {
    studentName: session.student.name,
    school: session.student.school,
    score: result.score,
    totalCorrect: result.correctCount,
    violations: result.violations,
    answers: session.answers,
    timestamp: new Date().toISOString()
  };

  // Optional: Google Sheets Webhook
  const webhookUrl = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      console.log('SATELLITE UPLINK SUCCESSFUL (SHEETS)');
    } catch (e) {
      console.error('UPLINK FAILED', e);
    }
  }

  // Optional: Email logic would typically happen on server
  const teacherEmail = import.meta.env.VITE_TEACHER_EMAIL;
  if (teacherEmail) {
    console.log(`PREPARING ENCRYPTED DATA PACKET FOR: ${teacherEmail}`);
    // In a real app, you would fetch to your own Express /api/email endpoint
  }
};
