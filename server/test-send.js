const nodemailer = require('nodemailer');

(async () => {
  try {
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: { user: testAccount.user, pass: testAccount.pass }
    });

    const info = await transporter.sendMail({
      from: 'no-reply@example.com',
      to: 'recipient@example.com',
      subject: 'Test email from Mochan-D local test',
      text: 'This is a test message sent via Nodemailer Ethereal test account.'
    });

    console.log('MessageId:', info.messageId);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.error('Error sending test email', err);
    process.exit(1);
  }
})();
